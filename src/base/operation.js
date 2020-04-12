import xdr from './generated/xdr_generated'
import { Keypair } from './keypair'
import { UnsignedHyper, Hyper } from 'js-xdr'
import { hash } from './hashing'
import { encodeCheck } from './strkey'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './operations/base_operation'
import { ManageSignerBuilder } from './operations/manage_signer_builder'
import { CreateAccountBuilder } from './operations/create_account_builder'
import { ManageKeyValueBuilder } from './operations/manage_key_value_builder'
import { StampBuilder } from './operations/stamp'
import { LicenseBuilder } from './operations/license_operation'
import { ManageAccountRoleBuilder } from './operations/manage_account_role_builder'
import { CreateDataBuilder } from './operations/create_data_builder'
import { UpdateDataBuilder } from './operations/update_data_builder'
import { RemoveDataBuilder } from './operations/remove_data_builder'

export class Operation extends BaseOperation {
  /**
     * Create a payment operation.
     * @param {object} opts
     * @param {string} opts.sourceBalanceId - The balance id of source.
     * @param {string} opts.destinationBalanceId - The destination balance ID.
     * @param {boolean} opts.feeFromSource - if true - fee charged from source account, if false - from destination
     * @param {string} opts.amount - The amount to send.
     * @param {string} opts.paymentFee - The payment fee.
     * @param {string} opts.fixedFee - The fixed fee.
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.PaymentOp}
     */
  static payment (opts) {
    let attributes = {}
    if (!Operation.isValidAmount(opts.amount)) {
      throw new TypeError('amount argument must be of type String and represent a positive number')
    }
    if (!Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
      throw new TypeError('sourceBalanceId is invalid')
    }
    if (!Keypair.isValidBalanceKey(opts.destinationBalanceId)) {
      throw new TypeError('destinationBalanceId is invalid')
    }
    if (!Operation.isValidSubject(opts.subject)) {
      throw new Error('subject argument must be of type String 0-256 long')
    }

    if (!isUndefined(opts.feeData)) {
      let sourceFee = new xdr.Fee({
        percent: BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.percent),
        fixed: BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.fixed),
        ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
      })
      let destinationFee = new xdr.Fee({
        percent: BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.percent),
        fixed: BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.fixed),
        ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
      })
      attributes.feeData = new xdr.PaymentFeeData({
        sourceFee,
        destinationFee,
        sourcePaysForDest: opts.feeData.sourcePaysForDest,
        ext: new xdr.PaymentFeeDataExt(xdr.LedgerVersion.emptyVersion())
      })
    } else {
      throw new Error('feeData argument must be defined')
    }

    if (isUndefined(opts.reference)) {
      opts.reference = ''
    }

    attributes.amount = BaseOperation._toUnsignedXDRAmount(opts.amount)
    attributes.sourceBalanceId = Keypair
      .fromBalanceId(opts.sourceBalanceId)
      .xdrBalanceId()

    let d = xdr.PaymentOpDestination.balance()
    d.set('balance', Keypair
      .fromBalanceId(opts.destinationBalanceId)
      .xdrBalanceId())
    attributes.destination = d

    attributes.subject = opts.subject
    attributes.reference = opts.reference
    attributes.ext = new xdr.PaymentOpExt(xdr.LedgerVersion.emptyVersion())
    let payment = new xdr.PaymentOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.payment(payment)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Set Fees to the ledger
   * @param {object} opts
   * @param {string} opts.destination - Destination account ID to create an account for.
   * @param {Object} [opts.fee] - Amount in XLM the account should be funded for.
   * @param {string} opts.fee.feeType - feeType
   * @param {string} opts.fee.feeAmount - fee amount
   * @param {string} opts.fee.accountRole - id of account role
   * @param {bool} [opts.isDelete] - isDelete - true for remove fee
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.SetFeesOp}
   */
  static setFees (opts) {
    let attributes = {
      ext: new xdr.SetFeesOpExt(xdr.LedgerVersion.emptyVersion())
    }

    if (!isUndefined(opts.fee)) {
      if (!Operation.isValidAmount(opts.fee.fixedFee, true)) {
        throw new TypeError(
          'fixedFee argument must be of type String and represent a non-negative number'
        )
      }
      if (!Operation.isValidAmount(opts.fee.percentFee, true, 100)) {
        throw new TypeError(
          'percentFee argument must be of type String and represent a non-negative number less than 100'
        )
      }
      if (isUndefined(opts.fee.feeType)) {
        throw new TypeError('feeType must be defined')
      }
      if (!(opts.fee.feeType instanceof xdr.FeeType)) {
        throw new TypeError('feeType must be xdr.FeeType')
      }
      if (!Operation.isValidAsset(opts.fee.asset)) {
        throw new TypeError('Asset is invalid')
      }
      if (isUndefined(opts.fee.period)) {
        opts.fee.period = '0' // <<clear
      }
      if (isUndefined(opts.fee.subtype)) {
        opts.fee.subtype = '0'
      }
      if (isUndefined(opts.fee.lowerBound)) {
        opts.fee.lowerBound = '0'
      }
      if (isUndefined(opts.fee.upperBound)) {
        opts.fee.upperBound = BaseOperation.MAX_INT64_AMOUNT
      }

      let feeData = {
        fixedFee: Operation._toXDRAmount(opts.fee.fixedFee),
        percentFee: Operation._toXDRAmount(opts.fee.percentFee),
        feeType: opts.fee.feeType,
        asset: opts.fee.asset,
        subtype: Hyper.fromString(opts.fee.subtype),
        lowerBound: Operation._toXDRAmount(opts.fee.lowerBound),
        upperBound: Operation._toXDRAmount(opts.fee.upperBound),
        ext: new xdr.FeeEntryExt(xdr.LedgerVersion.emptyVersion())
      }
      let data = `type:${opts.fee.feeType.value}asset:${opts.fee.asset}subtype:${opts.fee.subtype.toString()}`
      if (opts.fee.accountId) {
        if (!Keypair.isValidPublicKey(opts.fee.accountId)) {
          throw new TypeError('accountId is invalid')
        } else {
          feeData.accountId = Keypair
            .fromAccountId(opts.fee.accountId)
            .xdrAccountId()
          data += `accountID:${opts.fee.accountId}`
        }
      }
      if (opts.fee.accountRole) {
        feeData.accountRole = UnsignedHyper.fromString(opts.fee.accountRole)
        data += `accountRole:${opts.fee.accountRole}`
      }
      feeData.hash = hash(data)
      attributes.fee = new xdr.FeeEntry(feeData)
    }

    if (isUndefined(opts.isDelete)) {
      attributes.isDelete = false
    } else {
      attributes.isDelete = opts.isDelete
    }

    let setfees = new xdr.SetFeesOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.setFee(setfees)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Returns an XDR ManageBalanceOp. A "manage account" operations creates|deletes balance for account.
     * @param {object} opts
     * @param {string} opts.destination - Account to create account for.
     * @param {string} opts.asset - Asset to manage asset for.
     * @param {xdr.ManageBalanceAction} – Delete or create
     * @returns {xdr.ManageBalanceOp}
     */
  static manageBalance (opts) {
    let attributes = {
      ext: new xdr.ManageBalanceOpExt(xdr.LedgerVersion.emptyVersion())
    }

    if (!Keypair.isValidPublicKey(opts.destination)) {
      throw new Error('account is invalid')
    }
    if (!(opts.action instanceof xdr.ManageBalanceAction)) {
      throw new TypeError('action argument should be value of xdr.ManageBalanceAction enum')
    }
    if (!Operation.isValidAsset(opts.asset)) {
      throw new TypeError('asset is invalid')
    }

    attributes.destination = Keypair
      .fromAccountId(opts.destination)
      .xdrAccountId()
    attributes.action = opts.action
    attributes.asset = opts.asset

    let manageBalanceOp = new xdr.ManageBalanceOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageBalance(manageBalanceOp)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Returns an XDR ManageAssetPairOp. A "manage asset pair" operations creates|updates asset pair.
     * @param {object} opts
     * @param {string} opts.base - base asset
     * @param {string} opts.quote - quote asset
     * @param {number|string} opts.policies - asset pair policies
     * @param {number|string} opts.physicalPriceCorrection - correction of physical price in percents. If physical price is set and restriction by physical price set, mininal price for offer for this pair will be physicalPrice * physicalPriceCorrection
     * @param {number|string} opts.maxPriceStep - max price step in percent. User is allowed to set offer with price < (1 - maxPriceStep)*currentPrice and > (1 + maxPriceStep)*currentPrice
     * @param {number|string} opts.physicalPrice - physical price
     * @param {xdr.ManageAssetPairAction} – Create or update
     * @returns {xdr.ManageBalanceOp}
     */
  static manageAssetPair (opts) {
    let attributes = {
      ext: new xdr.ManageAssetPairOpExt(xdr.LedgerVersion.emptyVersion())
    }
    if (!Operation.isValidAsset(opts.base)) {
      throw new TypeError('base is invalid')
    }

    if (!Operation.isValidAsset(opts.quote)) {
      throw new TypeError('quote is invalid')
    }

    if (!(opts.action instanceof xdr.ManageAssetPairAction)) {
      throw new TypeError(
        'action argument should be value of xdr.ManageAssetPairAction enum'
      )
    }

    if (isUndefined(opts.policies)) {
      throw new TypeError('policies are not defined')
    }

    if (!Operation.isValidAmount(opts.physicalPriceCorrection, true)) {
      throw new TypeError(
        'physicalPriceCorrection argument must be of type String and represent a positive number or zero'
      )
    }

    if (!Operation.isValidAmount(opts.maxPriceStep, true)) {
      throw new TypeError(
        'maxPriceStep argument must be of type String and represent a positive number or zero'
      )
    }

    if (!Operation.isValidAmount(opts.physicalPrice, true)) {
      throw new TypeError(
        'physicalPrice argument must be of type String and represent a positive number or zero'
      )
    }

    attributes.base = opts.base
    attributes.quote = opts.quote
    attributes.policies = opts.policies
    attributes.action = opts.action
    attributes.physicalPriceCorrection = Operation
      ._toXDRAmount(opts.physicalPriceCorrection)
    // won't be updated
    attributes.physicalPrice = Operation._toXDRAmount(opts.physicalPrice)
    attributes.maxPriceStep = Operation._toXDRAmount(opts.maxPriceStep)

    let manageAssetPairOp = new xdr.ManageAssetPairOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageAssetPair(manageAssetPairOp)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Converts the XDR Operation object to the opts object used to create the XDR
     * operation.
     * @param {xdr.Operation} operation - An XDR Operation.
     * @return {Operation}
     */
  static operationToObject (operation) {
    function accountIdtoAddress (accountId) {
      return encodeCheck('accountId', accountId.ed25519())
    }

    let result = {}
    if (operation.sourceAccount()) {
      result.source = accountIdtoAddress(operation.sourceAccount())
    }

    let attrs = operation.body().value()
    result.type = operation.body().switch().name
    switch (operation.body().switch()) {
      case xdr.OperationType.createAccount():
        CreateAccountBuilder.createAccountToObject(result, attrs)
        break
      case xdr.OperationType.manageSigner():
        ManageSignerBuilder.manageSignerToObject(result, attrs)
        break
      case xdr.OperationType.manageKeyValue():
        ManageKeyValueBuilder.manageKeyValueOpToObject(result, attrs)
        break
      case xdr.OperationType.stamp():
        StampBuilder.stampToObject(result, attrs)
        break
      case xdr.OperationType.license():
        LicenseBuilder.licenseToObject(result, attrs)
        break
      case xdr.OperationType.manageAccountRole():
        ManageAccountRoleBuilder.manageAccountRoleToObject(result, attrs)
        break
      case xdr.OperationType.createDatum():
        CreateDataBuilder.createDataToObject(result, attrs)
        break
      case xdr.OperationType.updateDatum():
        UpdateDataBuilder.updateDataToObject(result, attrs)
        break
      case xdr.OperationType.removeDatum():
        RemoveDataBuilder.removeDataToObject(result, attrs)
        break
      default:
        throw new Error('Unknown operation')
    }
    return result
  }
}
