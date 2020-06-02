import xdr from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { UnsignedHyper, Hyper } from 'js-xdr'
import { encodeCheck } from '../strkey'
import BigNumber from 'bignumber.js'
import { bestR } from '../util/continued_fraction'
import isUndefined from 'lodash/isUndefined'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isFinite from 'lodash/isFinite'

const ONE = 1000000
const MAX_DECIMAL_PLACES = 6
const MAX_INT64 = '9223372036854775807'
const MAX_INT64_AMOUNT = '9223372036854.775807'

export class BaseOperation {
  static get MAX_INT64 () {
    return MAX_INT64
  }

  static get ONE () {
    return ONE
  }

  static get MAX_INT64_AMOUNT () {
    return MAX_INT64_AMOUNT
  }

  static isPayment (op) {
    if (!(op instanceof xdr.Operation)) {
      throw new Error('should be used for operations')
    }
    return op.body().switch().name === 'payment'
  }

  static isValidAsset (value) {
    return isString(value) && /^[a-z\d]{1,16}$/i.test(value)
  }

  static isValidString (value, minSize, maxSize) {
    if (!isString(value)) {
      return false
    }

    if (!isUndefined(minSize) && value.length < minSize) {
      return false
    }

    if (!isUndefined(maxSize) && value.length > maxSize) {
      return false
    }

    return true
  }

  static isValidSubject (value) {
    return BaseOperation.isValidString(value, 0, 1000)
  }

  static isValidArray (value, minSize) {
    return Array.isArray(value) && value.length >= minSize
  }

  static isValidArrayOfClass (value, minSize, cls) {
    if (!BaseOperation.isValidArray(value, minSize)) {
      return false
    }
    for (let i = 0; i < value.length; i++) {
      if (!(value[i] instanceof cls)) {
        return false
      }
    }
    return true
  }

  static isValidPeriod (value, allowZero = false) {
    if (!isString(value)) {
      return false
    }

    let period
    try {
      period = new BigNumber(value)
    } catch (e) {
      return false
    }

    // == 0
    if (!allowZero && period.isZero()) {
      return false
    }

    // < 0
    if (period.isNegative()) {
      return false
    }

    if (period.decimalPlaces() > 0) {
      return false
    }

    // Infinity
    if (!period.isFinite()) {
      return false
    }

    // NaN
    if (period.isNaN()) {
      return false
    }

    return true
  }

  static isValidAmount (
    value,
    allowZero = false,
    max = undefined,
    min = undefined,
    maxDecimalPlaces = MAX_DECIMAL_PLACES
  ) {
    if (maxDecimalPlaces > MAX_DECIMAL_PLACES) {
      throw new Error(
        `maxDecimalPlaces cannot exceed ${MAX_DECIMAL_PLACES}`
      )
    }

    if (!isString(value)) {
      return false
    }

    let amount
    try {
      amount = new BigNumber(value)
    } catch (e) {
      return false
    }

    // == 0
    if (!allowZero && amount.isZero()) {
      return false
    }

    // < 0
    if (amount.isNegative()) {
      return false
    }

    // > Max value
    if (amount.times(ONE).greaterThan(new BigNumber(MAX_INT64).toString())) {
      return false
    }

    if (max && amount.greaterThan(new BigNumber(max).toString())) {
      return false
    }

    if (min && new BigNumber(min).greaterThan(amount.toString())) {
      return false
    }

    // Decimal places
    if (amount.decimalPlaces() > maxDecimalPlaces) {
      return false
    }

    // Infinity
    if (!amount.isFinite()) {
      return false
    }

    // NaN
    if (amount.isNaN()) {
      return false
    }

    return true
  }

  /**
     * Returns value converted to uint32 value or undefined.
     * If `value` is not `Number`, `String` or `Undefined` then throws an error.
     * Used in {@link Operation.setOptions}.
     * @private
     * @param {string} name Name of the property (used in error message only)
     * @param {*} value Value to check
     * @param {function(value, name)} isValidFunction Function to check other constraints (the argument will be a `Number`)
     * @returns {undefined|Number}
     * @private
     */
  static _checkUnsignedIntValue (name, value, isValidFunction = null) {
    if (isUndefined(value)) {
      return undefined
    }

    if (isString(value)) {
      value = parseFloat(value)
    }

    if (!isNumber(value) || !isFinite(value) || value % 1 !== 0) {
      throw new Error(`${name} value is invalid`)
    }

    if (value < 0) {
      throw new Error(`${name} value must be unsigned`)
    }

    if (!isValidFunction ||
            (isValidFunction && isValidFunction(value, name))) {
      return value
    }

    throw new Error(`${name} value is invalid`)
  }

  static calcPercentFee (amountValue, percentValue) {
    let amount = new BigNumber(amountValue)
    let rate = new BigNumber(percentValue).div(100)
    return amount.times(rate).toString()
  }

  /**
     * @private
     */
  static _toXDRAmount (value) {
    let amount = new BigNumber(value).mul(ONE)
    return Hyper.fromString(amount.toString())
  }

  /**
     * @private
     */
  static _toUnsignedXDRAmount (value) {
    let amount = new BigNumber(value).mul(ONE)
    return UnsignedHyper.fromString(amount.toString())
  }

  /**
     * @private
     */
  static _fromXDRAmount (value) {
    return new BigNumber(value).div(ONE).toString()
  }

  /**
     * @private
     */
  static _fromXDRPrice (price) {
    let n = new BigNumber(price.n())
    return n.div(new BigNumber(price.d())).toString()
  }

  /**
     * @private
     */
  static _numberFromXDR (value) {
    return new BigNumber(value).toString()
  }

  /**
     * @private
     */
  static _toXDRPrice (price) {
    let xdrObject
    if (price.n && price.d) {
      xdrObject = new xdr.Price(price)
    } else {
      price = new BigNumber(price)
      let approx = bestR(price)
      xdrObject = new xdr.Price({
        n: parseInt(approx[0]),
        d: parseInt(approx[1])
      })
    }

    if (xdrObject.n() < 0 || xdrObject.d() < 0) {
      throw new Error('price must be positive')
    }

    return xdrObject
  }

  static _statsOpTypeFromNumber (rawStatsOpType) {
    if (!BaseOperation._isValidStatsOpType(rawStatsOpType)) {
      throw new Error(`XDR Read Error: Unknown StatsOpType member for value ${rawStatsOpType}`)
    }

    return xdr.StatsOpType._byValue.get(rawStatsOpType)
  }

  static _keyValueTypeFromNumber (rawKVType) {
    if (!BaseOperation._isValidKVType(rawKVType)) {
      throw new Error(`XDR Read Error: Unknown KeyValueType number for value ${rawKVType}`)
    }

    return xdr.KeyValueEntryType._byValue.get(rawKVType)
  }

  static _keyValueActionFromNumber (rawKVAction) {
    if (!BaseOperation._isValidKVAction(rawKVAction)) {
      throw new Error(`XDR Read Error: Unknown KeyValueAction number for value ${rawKVAction}`)
    }

    return xdr.ManageKvAction._byValue.get(rawKVAction)
  }

  static isFeeValid (fee) {
    return BaseOperation.isValidAmount(fee.fixed, true) &&
      BaseOperation.isValidAmount(fee.percent, true)
  }

  static feeToXdr (fee) {
    let attrs = {
      fixed: BaseOperation._toUnsignedXDRAmount(fee.fixed),
      percent: BaseOperation._toUnsignedXDRAmount(fee.percent),
      ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
    }

    return new xdr.Fee(attrs)
  }

  static _requestTypeFromNumber (rawRequestType) {
    if (!BaseOperation._isValidRequestType(rawRequestType)) {
      throw new Error(
        `XDR Read Error: Unknown RequestType member for value ${rawRequestType}`
      )
    }

    return xdr.RequestType._byValue.get(rawRequestType)
  }

  static _isValidStatsOpType (rawStatsOpType) {
    return xdr.StatsOpType._byValue.has(rawStatsOpType)
  }

  static _isValidKVType (rawKVType) {
    return xdr.KeyValueEntryType._byValue.has(rawKVType)
  }

  static _isValidKVAction (rawKVAction) {
    return xdr.ManageKvAction._byValue.has(rawKVAction)
  }

  static _isValidRequestType (rawRequestType) {
    return xdr.RequestType._byValue.has(rawRequestType)
  }

  static accountIdtoAddress (accountId) {
    return encodeCheck('accountId', accountId.ed25519())
  }

  static balanceIdtoString (balanceId) {
    return encodeCheck('balanceId', balanceId.ed25519())
  }

  /**
     * This operation set SourceAccount
     * @param {object} [opts]
     * @returns undefined
     */
  static setSourceAccount (opAttributes, opts) {
    if (opts.source) {
      if (!Keypair.isValidPublicKey(opts.source)) {
        throw new Error('Source address is invalid')
      }
      opAttributes.sourceAccount = Keypair
        .fromAccountId(opts.source)
        .xdrAccountId()
    }
  }
}
