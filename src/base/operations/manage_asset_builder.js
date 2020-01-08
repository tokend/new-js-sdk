import xdr from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'

export class ManageAssetBuilder {
  /**
   * Creates operation to create asset creation request
   * @param {object} opts
   *
   * @param {string} opts.code - Asset code
   * @param {string} opts.securityType - asset type
   * @param {string} opts.maxIssuanceAmount - Max amount can be issued of that asset
   * @param {number} opts.trailingDigitsCount - Count of digits after the comma
   * @param {number} opts.state - arbitrary state of the asset
   * @param {object} opts.details - Additional details about asset
   * @param {string} opts.details.name - Name of the asset
   * @param {array}  opts.details.documents - Documents attached to asset
   * @param {string} opts.details.logo - Asset picture
   * @param {string} opts.details.logo.key - Key to compose asset picture url
   * @param {string} opts.details.logo.type - Content type of asset logo
   * @param {string} opts.details.terms - Asset terms
   * @param {string} opts.details.terms.type - Content type of terms document
   * @param {string} opts.details.terms.name - Name of terms document
   *
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   *
   * @returns {xdr.CreateAssetOp}
   */
  static createAsset (opts) {
    if (!BaseOperation.isValidAsset(opts.code)) {
      throw new Error('opts.code is invalid')
    }

    let attrs = {
      code: opts.code,
      details: JSON.stringify(ManageAssetBuilder._getValidDetails(opts))
    }

    if (!BaseOperation.isValidAmount(opts.maxIssuanceAmount, true)) {
      throw new Error('opts.maxIssuanceAmount is invalid')
    }

    attrs.maxIssuanceAmount = BaseOperation._toUnsignedXDRAmount(opts.maxIssuanceAmount)

    attrs.securityType = Number.parseInt(opts.securityType, 10)
    if (Number.isNaN(opts.trailingDigitsCount) ||
      opts.trailingDigitsCount < 0 || opts.trailingDigitsCount > 6) {
      throw new Error('opts.trailingDigitsCount is invalid')
    }
    if (Number.isNaN(opts.state)) {
      opts.state = 0
    }
    attrs.state = Number.parseInt(opts.state, 10)
    attrs.trailingDigitsCount = Number.parseInt(opts.trailingDigitsCount, 10)
    attrs.ext = new xdr.CreateAssetOpExt(xdr.LedgerVersion.emptyVersion())

    let op = new xdr.CreateAssetOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createAsset(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Creates operation to create asset update request
   * @param {object} opts
   *
   * @param {string} opts.code - Asset code
   * @param {string} opts.maxIssuanceAmount - Max amount can be issued of that asset
   * @param {number} opts.state - arbitrary state of the asset
   * @param {object} opts.details - Additional details about asset
   * @param {string} opts.details.name - Name of the asset
   * @param {string} opts.details.logo - Asset picture
   * @param {string} opts.details.logo.key - Key to compose asset picture url
   * @param {string} opts.details.logo.type - Content type of asset logo
   * @param {string} opts.details.terms - Asset terms
   * @param {string} opts.details.terms.type - Content type of terms document
   * @param {string} opts.details.terms.name - Name of terms document
   *
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   *
   * @returns {xdr.UpdateAssetOp}
   */
  static updateAsset (opts) {
    if (!BaseOperation.isValidAsset(opts.code)) {
      throw new Error('opts.code is invalid')
    }

    let attrs = {
      code: opts.code
    }

    if (!isUndefined(opts.details)) {
      let details = ManageAssetBuilder._getValidDetails(opts)
      attrs.details = JSON.stringify(details)
    }
    if (!isUndefined(opts.maxIssuanceAmount)) {
      if (!BaseOperation.isValidAmount(opts.maxIssuanceAmount, true)) {
        throw new Error('opts.maxIssuanceAmount is invalid')
      }
      attrs.maxIssuanceAmount = BaseOperation._toUnsignedXDRAmount(opts.maxIssuanceAmount)
    }

    attrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    let op = new xdr.UpdateAssetOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.updateAsset(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static _getValidDetails (opts) {
    let details = opts.details

    if (isUndefined(details)) {
      details = {}
    }

    if (isUndefined(details.name)) {
      details.name = ''
    }

    if (isUndefined(details.terms)) {
      details.terms = {}
    }

    if (isUndefined(details.terms.key)) {
      details.terms.key = ''
    }

    if (isUndefined(details.terms.type)) {
      details.terms.type = ''
    }

    if (isUndefined(details.terms.name)) {
      details.terms.name = ''
    }

    if (isUndefined(details.logo)) {
      details.logo = {}
    }

    if (isUndefined(details.logo.key)) {
      details.logo.key = ''
    }

    if (isUndefined(details.logo.type)) {
      details.logo.type = ''
    }

    return details
  }

  static createAssetToObject (result, attrs) {
    result.code = attrs.code().toString()
    result.maxIssuanceAmount = BaseOperation
      ._fromXDRAmount(attrs.maxIssuanceAmount())
    result.details = JSON.parse(attrs.details())
    result.securityType = attrs.securityType().toString()
  }

  static updateAssetToObject (result, attrs) {
    result.code = attrs.code().toString()
    if (!isUndefined(attrs.maxIssuanceAmount)) {
      result.maxIssuanceAmount = BaseOperation
        ._fromXDRAmount(attrs.maxIssuanceAmount())
    }
    if (!isUndefined(attrs.details())) {
      result.details = JSON.parse(attrs.details())
    }
    if (!isUndefined(attrs.state())) {
      result.state = attrs.state().toString()
    }
  }
}
