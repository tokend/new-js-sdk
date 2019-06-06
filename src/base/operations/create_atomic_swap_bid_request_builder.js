import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import {
  validateAmount,
  validateAssetCode,
  validateCreatorDetails,
  validateUint64
} from '../../utils/validators'

export class CreateAtomicSwapBidRequestBuilder {
  /**
     * Creates atomic swap request
     * @param {object} opts
     *
     * @param {string} opts.askID - id of bid for which request will be created.
     * @param {string} opts.baseAmount - amount which will be bought
     * @param {string} opts.quoteAsset - accepted assets
     * @param {object} opts.creatorDetails - request details set by creator
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     *
     * @returns {xdr.Operation}
     */
  static createAtomicSwapBidRequest (opts) {
    this._validateCreateAtomicSwapBidOp(opts)

    let rawRequest = {}
    rawRequest.baseAmount = BaseOperation._toUnsignedXDRAmount(opts.baseAmount)
    rawRequest.quoteAsset = opts.quoteAsset
    rawRequest.creatorDetails = JSON.stringify(opts.creatorDetails)
    rawRequest.askId = UnsignedHyper.fromString(opts.askID)
    rawRequest.ext = new xdr.CreateAtomicSwapBidRequestExt(
      xdr.LedgerVersion.emptyVersion())

    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.createAtomicSwapBidRequest(
      new xdr.CreateAtomicSwapBidRequestOp({
        request: new xdr.CreateAtomicSwapBidRequest(rawRequest),
        ext: new xdr.CreateAtomicSwapBidRequestOpExt(
          xdr.LedgerVersion.emptyVersion())
      }))

    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createAtomicSwapBidRequestToObject (result, attrs) {
    result.askID = attrs.request().askId().toString()
    result.baseAmount = BaseOperation._fromXDRAmount(
      attrs.request().baseAmount())
    result.quoteAsset = attrs.request().quoteAsset().toString()
    result.creatorDetails = JSON.parse(attrs.request().creatorDetails().toString())
  }

  static _validateCreateAtomicSwapBidOp (opts) {
    validateUint64({ value: opts.askID, fieldName: 'opts.askID' })
    validateAmount({ value: opts.baseAmount, fieldName: 'opts.baseAmount' })
    validateCreatorDetails({ value: opts.creatorDetails, fieldName: 'opts.creatorDetails' })
    validateAssetCode({ value: opts.quoteAsset, fieldName: 'opts.quoteAsset' })
  }
}
