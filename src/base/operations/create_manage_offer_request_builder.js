import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { ManageOfferBuilder } from './manage_offer_builder'

export class CreateManageOfferRequestBuilder {
  /**
   * Creates manage offer request
   * @param {object} opts
   * @param {string} opts.baseBalance
   * @param {string} opts.quoteBalance
   * @param {boolean} opts.isBuy - if true - buys base asset, false - sells base asset
   * @param {string} opts.amount - Amount of the base asset
   * @param {string} opts.price - Price of the offer
   * @param {string} opts.orderBookID - 0 - for secondary market, otherwise to participate in sale
   * For this operation, back-end creates a "calculated fee", that calculates
   * as amount * percent fee. We can ignore the fixed fee because of it's a
   * back-end business.
   * @param {string} opts.fee – Percent fee of the offer
   * @param {number} [opts.allTasks] - Bitmask of all tasks which must be completed for the request approval
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   * @returns {xdr.CreateManageOfferRequestOp}
   */
  static createManageOfferRequest (opts) {
    let manageOfferOp = ManageOfferBuilder.prepareManageOfferOp(opts)

    let createManageOfferRequestOp = new xdr.CreateManageOfferRequestOp({
      request: new xdr.ManageOfferRequest({
        op: manageOfferOp,
        ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
      }),
      allTasks: opts.allTasks,
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody
      .createManageOfferRequest(createManageOfferRequestOp)

    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static createManageOfferRequestToObject (result, attrs) {
    ManageOfferBuilder.manageOfferOpToObject(result, attrs.request().op())
    result.allTasks = attrs.allTasks()
  }
}
