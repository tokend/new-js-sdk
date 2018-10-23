import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'

export class CancelAtomicSwapBidBuilder {
  /**
     * Cancel atomic swap bid
     * @param {object} opts
     * @param {string} opts.bidID - id of bid which will be canceled.
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     *
     * @returns {xdr.CancelASwapBidOp}
     */
  static cancelASwapBid (opts) {
    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.cancelAswapBid(
      new xdr.CancelASwapBidOp({
        bidId: UnsignedHyper.fromString(opts.bidID),
        ext: new xdr.CancelASwapBidOpExt(
          xdr.LedgerVersion.emptyVersion())
      }))

    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static cancelASwapBidToObject (result, attrs) {
    result.bidID = attrs.bidId().toString()
  }
}
