import { default as xdr } from '../generated/xdr_generated'
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
     * @param {object} opts.newDetails - new sale specific details
     * @param {object} opts.newDetails.name - name of the sale
     * @param {object} opts.newDetails.short_description - short description of the sale
     * @param {object} opts.newDetails.description - sale description
     * @param {object} opts.newDetails.logo - details of the logo
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
