import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'

export class SaleRequestBuilder {
  /**
     * Creates operation to create withdraw request with autoconversion
     * @param {object} opts
     * @param {string} opts.requestID - ID of the request. 0 - to create new;
     * @param {string} opts.baseAsset - asset for which sale will be performed
     * @param {string} opts.defaultQuoteAsset - asset in which hardcap/soft cap will be calculated
     * @param {string} opts.startTime - start time of the sale
     * @param {string} opts.endTime - close time of the sale
     * @param {string} opts.softCap - minimum amount of quote asset to be received at which sale will be considered a successful
     * @param {string} opts.hardCap - max amount of quote asset to be received
     * @param {object} opts.details - sale specific details
     * @param {object} opts.details.name - name of the sale
     * @param {object} opts.details.short_description - short description of the sale
     * @param {object} opts.details.desciption - sale specific details
     * @param {object} opts.details.logo - details of the logo
     * @param {array} opts.quoteAssets - accepted assets
     * @param {object} opts.quoteAssets.price - price for 1 baseAsset in terms of quote asset
     * @param {object} opts.quoteAssets.asset - asset code of the quote asset
     * @param {object} opts.isCrowdfunding - states if sale type is crowd funding
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CreateSaleCreationRequestOp}
     */
  static createSaleCreationRequest (opts) {
    let attrs = {}

    if (!BaseOperation.isValidAsset(opts.baseAsset)) {
      throw new Error('opts.baseAsset is invalid')
    }
    attrs.baseAsset = opts.baseAsset

    if (!BaseOperation.isValidAsset(opts.defaultQuoteAsset)) {
      throw new Error('opts.defaultQuoteAsset is invalid')
    }
    attrs.defaultQuoteAsset = opts.defaultQuoteAsset

    if (isUndefined(opts.startTime)) {
      throw new Error('opts.startTime is invalid')
    }
    attrs.startTime = UnsignedHyper.fromString(opts.startTime)

    if (isUndefined(opts.endTime)) {
      throw new Error('opts.endTime is invalid')
    }
    attrs.endTime = UnsignedHyper.fromString(opts.endTime)

    if (!BaseOperation.isValidAmount(opts.softCap, true)) {
      throw new Error('opts.softCap is invalid')
    }
    attrs.softCap = BaseOperation._toUnsignedXDRAmount(opts.softCap)

    if (!BaseOperation.isValidAmount(opts.hardCap, true)) {
      throw new Error('opts.hardCap is invalid')
    }
    attrs.hardCap = BaseOperation._toUnsignedXDRAmount(opts.hardCap)

    SaleRequestBuilder.validateDetail(opts.details)
    attrs.details = JSON.stringify(opts.details)
    attrs.ext = new xdr.SaleCreationRequestExt(xdr.LedgerVersion.emptyVersion())

    let isCrowdfunding = !isUndefined(opts.isCrowdfunding) &&
      opts.isCrowdfunding
    if (isCrowdfunding) {
      let crowdFundingSale = new xdr.CrowdFundingSale({
        ext: new xdr.CrowdFundingSaleExt(xdr.LedgerVersion.emptyVersion())
      })
      let saleTypeExtTypedSale = xdr.SaleTypeExtTypedSale
        .crowdFunding(crowdFundingSale)
      let saleTypeExt = new xdr.SaleTypeExt({
        typedSale: saleTypeExtTypedSale
      })

      attrs.ext = xdr.SaleCreationRequestExt.typedSale(saleTypeExt)
    }
    let request = new xdr.SaleCreationRequest(attrs)

    if (isUndefined(opts.requestID)) {
      opts.requestID = '0'
    }

    if (isUndefined(opts.quoteAssets) || opts.quoteAssets.length === 0) {
      throw new Error('opts.quoteAssets is invalid')
    }

    attrs.quoteAssets = []
    for (let i = 0; i < opts.quoteAssets.length; i++) {
      let quoteAsset = opts.quoteAssets[i]
      let minAmount
      let maxAmount
      if (isCrowdfunding) {
        minAmount = 1
        maxAmount = 1
      }

      let validAmount = BaseOperation.isValidAmount(
        quoteAsset.price,
        false,
        minAmount,
        maxAmount
      )
      if (!validAmount) {
        throw new Error(
          `opts.quoteAssets[i].price is invalid: ${quoteAsset.price}`
        )
      }

      if (isUndefined(quoteAsset.asset)) {
        throw new Error('opts.quoteAssets[i].asset is invalid')
      }

      attrs.quoteAssets.push(new xdr.SaleCreationRequestQuoteAsset({
        price: BaseOperation._toUnsignedXDRAmount(quoteAsset.price),
        quoteAsset: quoteAsset.asset,
        ext: new xdr.SaleCreationRequestQuoteAssetExt(
          xdr.LedgerVersion.emptyVersion()
        )
      }))
    }

    let withdrawRequestOp = new xdr.CreateSaleCreationRequestOp({
      requestId: UnsignedHyper.fromString(opts.requestID),
      request: request,
      ext: new xdr.CreateSaleCreationRequestOpExt(
        xdr.LedgerVersion.emptyVersion()
      )
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createSaleRequest(withdrawRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static validateDetail (details) {
    if (isUndefined(details)) {
      throw new Error('details is invalid')
    }

    if (isUndefined(details.short_description)) {
      throw new Error('details.short_description is invalid')
    }

    if (isUndefined(details.description)) {
      throw new Error('details.description is invalid')
    }

    if (isUndefined(details.logo)) {
      throw new Error('details.logo is invalid')
    }

    if (isUndefined(details.name)) {
      throw new Error('details.name is invalid')
    }
  }

  static crateSaleCreationRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    let request = attrs.request()
    result.baseAsset = request.baseAsset()
    result.defaultQuoteAsset = request.defaultQuoteAsset()
    result.startTime = request.startTime().toString()
    result.endTime = request.endTime().toString()
    result.softCap = BaseOperation._fromXDRAmount(request.softCap())
    result.hardCap = BaseOperation._fromXDRAmount(request.hardCap())
    result.details = JSON.parse(request.details())
    result.quoteAssets = []
    for (let i = 0; i < request.quoteAssets().length; i++) {
      result.quoteAssets.push({
        price: BaseOperation._fromXDRAmount(request.quoteAssets()[i].price()),
        asset: request.quoteAssets()[i].quoteAsset()
      })
    }
  }

  /**
     * Creates operation to check sale state
     * @param {object} opts
     * @param {string} saleID - id of the sale to check
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CheckSaleStateOp}
     */
  static checkSaleState (opts) {
    if (isUndefined(opts.saleID)) {
      throw new Error('Invalid opts.saleID')
    }

    let checkSaleStateOp = new xdr.CheckSaleStateOp({
      saleId: UnsignedHyper.fromString(opts.saleID),
      ext: new xdr.CheckSaleStateOpExt(xdr.LedgerVersion.emptyVersion())
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.checkSaleState(checkSaleStateOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static checkSaleStateToObject (result, attrs) {
    result.saleID = attrs.saleId().toString()
  }
}
