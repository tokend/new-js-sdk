import xdr from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import { SaleRequestBuilder } from './sale_request_builder'

export class ManageSaleBuilder {
  /**
     * Creates request to update manage sale details
     * @param {object} opts
     * @param {number|string} opts.requestID - set to zero to create new request
     * @param {string} opts.saleID - ID of the sale to create new update details request
     * @param {object} opts.creatorDetails - new sale specific details
     * @param {object} opts.creatorDetails.name - name of the sale
     * @param {object} opts.creatorDetails.short_description - short description of the sale
     * @param {object} opts.creatorDetails.description - sale description
     * @param {object} opts.creatorDetails.logo - details of the logo
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.ManageSaleOp}
     */
  static createUpdateSaleDetailsRequest (opts) {
    if (isUndefined(opts.requestID)) {
      throw new Error('opts.requestID is invalid')
    }

    if (isUndefined(opts.saleID)) {
      throw new Error('opts.saleID is invalid')
    }

    SaleRequestBuilder.validateDetail(opts.newDetails)

    let updateSaleDetailsData = new xdr.UpdateSaleDetailsData({
      requestId: UnsignedHyper.fromString(opts.requestID),
      newDetails: JSON.stringify(opts.newDetails),
      ext: new xdr.UpdateSaleDetailsDataExt(xdr.LedgerVersion.emptyVersion())
    })

    let manageSaleOp = new xdr.ManageSaleOp({
      saleId: UnsignedHyper.fromString(opts.saleID),
      data: new xdr.ManageSaleOpData.createUpdateDetailsRequest(
        updateSaleDetailsData
      ),
      ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  /**
   * Creates request to update manage sale end time
   * @param {object} opts
   * @param {number|string} opts.requestID - set to zero to create new request
   * @param {string} opts.saleID - ID of the sale to create new update end time request
   * @param {number|string} opts.newEndTime - new sale end time
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   * @returns {xdr.ManageSaleOp}
   */
  static createUpdateSaleEndTimeRequest (opts) {
    if (isUndefined(opts.requestID)) {
      throw new Error('opts.requestID is invalid')
    }

    if (isUndefined(opts.saleID)) {
      throw new Error('opts.saleID is invalid')
    }

    if (isUndefined(opts.newEndTime)) {
      throw new Error('opts.newEndTime is invalid')
    }

    let updateSaleEndTimeData = new xdr.UpdateSaleEndTimeData({
      requestId: UnsignedHyper.fromString(opts.requestID),
      newEndTime: UnsignedHyper.fromString(opts.newEndTime),
      ext: new xdr.UpdateSaleEndTimeDataExt(xdr.LedgerVersion.emptyVersion())
    })

    let manageSaleOp = new xdr.ManageSaleOp({
      saleId: UnsignedHyper.fromString(opts.saleID),
      data: new xdr.ManageSaleOpData.createUpdateEndTimeRequest(
        updateSaleEndTimeData
      ),
      ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  /**
   * Creates request to update details of the sale in state "PROMOTION"
   * @param {object} opts
   * @param {string} opts.saleID - ID of the sale to create new promotion update request
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
   * @param {object} opts.saleType - states sale type
   * @param {string} opts.requiredBaseAssetForHardCap - specifies the amount of base asset required for hard cap
   * @param {SaleState} opts.saleState - specifies the initial state of the sale
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   * @returns {xdr.ManageSaleOp}
   */
  static createPromotionUpdateRequest (opts) {
    if (isUndefined(opts.saleID)) {
      throw new Error('opts.saleID is invalid')
    }

    let request = SaleRequestBuilder.validateSaleCreationRequest(opts)

    let promotionUpdateData = new xdr.PromotionUpdateData({
      requestId: UnsignedHyper.fromString(opts.requestID),
      newPromotionData: request,
      ext: new xdr.PromotionUpdateDataExt(xdr.LedgerVersion.emptyVersion())
    })

    let manageSaleOp = new xdr.ManageSaleOp({
      saleId: UnsignedHyper.fromString(opts.saleID),
      data: new xdr.ManageSaleOpData.createPromotionUpdateRequest(
        promotionUpdateData
      ),
      ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  /**
     * Creates manage sale operation for cancel sale
     * @param {object} opts
     * @param {string} opts.saleID - ID of the sale to cancel
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.ManageSaleOp}
     */
  static cancelSale (opts) {
    if (isUndefined(opts.saleID)) {
      throw new Error('opts.saleID is invalid')
    }

    let manageSaleOp = new xdr.ManageSaleOp({
      saleId: UnsignedHyper.fromString(opts.saleID),
      data: new xdr.ManageSaleOpData.cancel(),
      ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  /**
   * Sets sale state (only allowed for admins)
   * @param {object} opts
   * @param {string} opts.saleID - ID of the sale to cancel
   * @param {string} opts.saleState - state to set
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   * @returns {xdr.ManageSaleOp}
   */
  static setSaleState (opts) {
    if (isUndefined(opts.saleID)) {
      throw new Error('opts.saleID is invalid')
    }

    if (isUndefined(opts.saleState)) {
      throw new Error('opts.saleState is invalid')
    }

    let manageSaleOp = new xdr.ManageSaleOp({
      saleId: UnsignedHyper.fromString(opts.saleID),
      data: new xdr.ManageSaleOpData.setState(opts.saleState),
      ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static manageSaleToObject (result, attrs) {
    result.saleID = attrs.saleId().toString()
    switch (attrs.data().switch()) {
      case xdr.ManageSaleAction.createUpdateDetailsRequest(): {
        let data = attrs.data().updateSaleDetailsData()
        result.requestID = data.requestId().toString()
        result.newDetails = JSON.parse(data.newDetails())
        break
      }
    }
  }
}
