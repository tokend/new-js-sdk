import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'

export class ManageAssetBuilder {
  /**
     * Creates operation to create asset creation request
     * @param {object} opts
     *
     * @param {string} opts.requestID - request ID, if 0 - creates new, updates otherwise
     * @param {string} opts.code - Asset code
     * @param {string} opts.preissuedAssetSigner - AccountID of keypair which will sign request for asset to be authrorized to be issued
     * @param {string} opts.maxIssuanceAmount - Max amount can be issued of that asset
     * @param {number} opts.policies - Asset policies
     * @param {string} opts.initialPreissuedAmount - Amount of pre issued tokens available after creation of the asset
     * @param {string} opts.trailingDigitsCount - Count of digits after the comma
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
     * @returns {xdr.ManageAssetOp}
     */
  static assetCreationRequest (opts) {
    let attrs = ManageAssetBuilder._createUpdateAttrs(opts)

    if (!Keypair.isValidPublicKey(opts.preissuedAssetSigner)) {
      throw new Error('opts.preissuedAssetSigner is invalid')
    }

    attrs.preissuedAssetSigner = Keypair
      .fromAccountId(opts.preissuedAssetSigner)
      .xdrAccountId()

    if (!BaseOperation.isValidAmount(opts.maxIssuanceAmount, true)) {
      throw new Error('opts.maxIssuanceAmount is invalid')
    }

    attrs.maxIssuanceAmount = BaseOperation._toUnsignedXDRAmount(opts.maxIssuanceAmount)

    if (isUndefined(opts.initialPreissuedAmount)) {
      opts.initialPreissuedAmount = '0'
    }

    if (!BaseOperation.isValidAmount(opts.initialPreissuedAmount, true)) {
      throw new Error('opts.initialPreissuedAmount is invalid')
    }

    attrs.initialPreissuedAmount = BaseOperation
      ._toUnsignedXDRAmount(opts.initialPreissuedAmount)
    attrs.sequenceNumber = 0

    if (Number.isNaN(opts.trailingDigitsCount) &&
      opts.trailingDigitsCount >= 0 && opts.trailingDigitsCount <= 6) {
      throw new Error('opts.trailingDigitsCount is invalid')
    }

    attrs.trailingDigitsCount = opts.trailingDigitsCount

    if (Number.isNaN(opts.trailingDigitsCount) &&
      opts.trailingDigitsCount >= 0 && opts.trailingDigitsCount <= 6) {
      throw new Error('opts.trailingDigitsCount is invalid')
    }

    attrs.trailingDigitsCount = opts.trailingDigitsCount

    attrs.ext = new xdr.AssetCreationRequestExt(
      xdr.LedgerVersion.emptyVersion()
    )

    if (isUndefined(opts.allTasks)) {
      opts.allTasks = 0
    }

    let r = xdr.ManageAssetOpRequest.createAssetCreationRequest()
    r.set('createAssetCreationRequest', new xdr.ManageAssetOpCreateAssetCreationRequest({
      createAsset: new xdr.AssetCreationRequest(attrs),
      allTasks: opts.allTasks,
      ext: new xdr.ManageAssetOpCreateAssetCreationRequestExt(xdr.LedgerVersion.emptyVersion())
    }))

    return ManageAssetBuilder._createManageAssetOp(opts, r)
  }

  /**
     * Creates operation to create asset update request
     * @param {object} opts
     *
     * @param {string} opts.requestID - request ID, if 0 - creates new, updates otherwise
     * @param {string} opts.code - Asset code
     * @param {number} opts.policies - asset policies
     * @param {number} opts.allTasks - tasks for the request
     *
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
     * @returns {xdr.ManageAssetOp}
     */
  static assetUpdateRequest (opts) {
    let attrs = ManageAssetBuilder._createUpdateAttrs(opts)
    attrs.sequenceNumber = 0
    attrs.ext = new xdr.AssetUpdateRequestExt(xdr.LedgerVersion.emptyVersion())

    let r = xdr.ManageAssetOpRequest.createAssetUpdateRequest()
    r.set('createAssetUpdateRequest', new xdr.ManageAssetOpCreateAssetUpdateRequest({
      updateAsset: new xdr.AssetUpdateRequest(attrs),
      allTasks: opts.allTasks,
      ext: new xdr.ManageAssetOpCreateAssetUpdateRequestExt(xdr.LedgerVersion.emptyVersion())
    }))

    return ManageAssetBuilder._createManageAssetOp(opts, r)
  }

  /**
     * Creates operation to cancel asset creation/update request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ManageAssetOp}
     */
  static cancelAssetRequest (opts) {
    let attrs = {
      ext: new xdr.CancelAssetRequestExt(xdr.LedgerVersion.emptyVersion())
    }
    let cancelAssetRequest = new xdr.CancelAssetRequest(attrs)

    return ManageAssetBuilder._createManageAssetOp(
      opts,
      new xdr.ManageAssetOpRequest.cancelAssetRequest(cancelAssetRequest)
    )
  }

  /**
     * Creates operation to cancel asset creation/update request
     * @param {object} opts
     * @param {string} opts.accountID - accountID to whome rights will be passed
     * @param {string} opts.code - asset code for which to rights will be passed
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ManageAssetOp}
     */
  static changeAssetPreIssuer (opts) {
    if (!Keypair.isValidPublicKey(opts.accountID)) {
      throw new Error('opts.accountID is invalid')
    }

    if (isUndefined(opts.code)) {
      throw new Error('opts.code is invalid - must be string')
    }

    opts.requestID = '0'

    let attrs = {
      ext: new xdr.AssetChangePreissuedSignerExt(
        xdr.LedgerVersion.emptyVersion()
      ),
      accountId: Keypair.fromAccountId(opts.accountID).xdrAccountId(),
      code: opts.code
    }
    let changePreissuedSigner = new xdr.AssetChangePreissuedSigner(attrs)

    return ManageAssetBuilder._createManageAssetOp(
      opts,
      new xdr.ManageAssetOpRequest.changePreissuedAssetSigner(
        changePreissuedSigner
      )
    )
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

    if (isUndefined(details.externalSystemType)) {
      details.externalSystemType = ''
    }

    return details
  }

  static _createUpdateAttrs (opts) {
    if (!BaseOperation.isValidAsset(opts.code)) {
      throw new Error('opts.code is invalid')
    }

    if (isUndefined(opts.policies) || opts.policies < 0) {
      throw new Error('opts.policies must be nonnegative number')
    }

    if (isUndefined(opts.requestID)) {
      opts.requestID = '0'
    }

    if (isUndefined(opts.sequenceNumber)) {
      opts.sequenceNumber = 0
    }

    let details = ManageAssetBuilder._getValidDetails(opts)

    let attrs = {
      code: opts.code,
      policies: opts.policies,
      details: JSON.stringify(details),
      sequenceNumber: opts.sequenceNumber
    }

    return attrs
  }

  static _createManageAssetOp (opts, request) {
    if (isUndefined(opts.requestID)) {
      throw new Error('opts.requestID is invalid')
    }

    let assetUpdateOp = new xdr.ManageAssetOp({
      requestId: UnsignedHyper.fromString(opts.requestID),
      request: request,
      ext: new xdr.ManageAssetOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttributes = { source: undefined }
    opAttributes.body = xdr.OperationBody.manageAsset(assetUpdateOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static manageAssetToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    result.requestType = attrs.request().switch().name
    switch (attrs.request().switch()) {
      case xdr.ManageAssetAction.createAssetCreationRequest():
      {
        let request = attrs.request().createAssetCreationRequest().createAsset()
        result.code = request.code().toString()
        result.preissuedAssetSigner = BaseOperation.accountIdtoAddress(
          request.preissuedAssetSigner()
        )
        result.policies = request.policies()
        result.maxIssuanceAmount = BaseOperation
          ._fromXDRAmount(request.maxIssuanceAmount())
        result.initialPreissuedAmount = BaseOperation
          ._fromXDRAmount(request.initialPreissuedAmount())
        result.details = JSON.parse(request.details())
        result.allTasks = attrs.request().createAssetCreationRequest().allTasks()
        break
      }
      case xdr.ManageAssetAction.createAssetUpdateRequest():
      {
        let request = attrs.request().createAssetUpdateRequest().updateAsset()
        result.code = request.code().toString()
        result.policies = request.policies()
        result.details = JSON.parse(request.details())
        result.allTasks = attrs.request().createAssetUpdateRequest().allTasks()
        break
      }
      case xdr.ManageAssetAction.cancelAssetRequest():
      {
        // nothing to do here
        break
      }
      case xdr.ManageAssetAction.changePreissuedAssetSigner():
      {
        let request = attrs.request().changePreissuedSigner()
        result.code = request.code().toString()
        result.accountID = BaseOperation.accountIdtoAddress(request.accountId())
        break
      }
    }
  }
}
