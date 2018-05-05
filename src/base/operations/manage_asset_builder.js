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
     *
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

    attrs.maxIssuanceAmount = BaseOperation
      ._toUnsignedXDRAmount(opts.maxIssuanceAmount)

    if (isUndefined(opts.initialPreissuedAmount)) {
      opts.initialPreissuedAmount = '0'
    }

    if (!BaseOperation.isValidAmount(opts.initialPreissuedAmount, true)) {
      throw new Error('opts.initialPreissuedAmount is invalid')
    }

    attrs.initialPreissuedAmount = BaseOperation
      ._toUnsignedXDRAmount(opts.initialPreissuedAmount)

    attrs.ext = new xdr.AssetCreationRequestExt(
      xdr.LedgerVersion.emptyVersion()
    )

    let assetCreationRequest = new xdr.AssetCreationRequest(attrs)
    return ManageAssetBuilder._createManageAssetOp(
      opts,
      new xdr.ManageAssetOpRequest.createAssetCreationRequest(
        assetCreationRequest
      )
    )
  }

  /**
     * Creates operation to create asset update request
     * @param {object} opts
     *
     * @param {string} opts.requestID - request ID, if 0 - creates new, updates otherwise
     * @param {string} opts.code - Asset code
     * @param {number} opts.policies - asset policies
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
    attrs.ext = new xdr.AssetUpdateRequestExt(xdr.LedgerVersion.emptyVersion())
    let assetUpdateRequest = new xdr.AssetUpdateRequest(attrs)

    return ManageAssetBuilder._createManageAssetOp(
      opts,
      new xdr.ManageAssetOpRequest.createAssetUpdateRequest(assetUpdateRequest)
    )
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

    return {
      name: details.name,
      logo: details.logo,
      terms: details.terms
    }
  }

  static _createUpdateAttrs (opts) {
    if (!BaseOperation.isValidAsset(opts.code)) {
      throw new Error('opts.code is invalid')
    }

    if (isUndefined(opts.policies) || opts.policies < 0) {
      throw new Error('opts.policies must be nonnegative number')
    }

    let details = ManageAssetBuilder._getValidDetails(opts)

    let attrs = {
      code: opts.code,
      policies: opts.policies,
      details: JSON.stringify(details)
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

    let opAttributes = {}
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
        let request = attrs.request().createAsset()
        result.code = request.code()
        result.preissuedAssetSigner = BaseOperation
          .accountIdtoAddress(request.preissuedAssetSigner())
        result.policies = request.policies()
        result.maxIssuanceAmount = BaseOperation
          ._fromXDRAmount(request.maxIssuanceAmount())
        result.initialPreissuedAmount = BaseOperation
          ._fromXDRAmount(request.initialPreissuedAmount())
        result.details = JSON.parse(request.details())
        break
      }
      case xdr.ManageAssetAction.createAssetUpdateRequest():
      {
        let request = attrs.request().updateAsset()
        result.code = request.code()
        result.policies = request.policies()
        result.details = JSON.parse(request.details())
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
        result.code = request.code()
        result.accountID = BaseOperation.accountIdtoAddress(request.accountId())
        break
      }
    }
  }
}
