import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import isUndefined from 'lodash/isUndefined'

export class CreateAtomicSwapAskRequestBuilder {
  /**
     * Creates atomic swap request
     * @param {object} opts
     *
     * @param {string} opts.bidID - id of bid for which request will be created.
     * @param {string} opts.baseAmount - amount which will be bought
     * @param {string} opts.quoteAsset - accepted assets
     * @param {object} opts.creatorDetails - request details set by creator
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     *
     * @returns {xdr.Operation}
     */
  static createAtomicSwapAskRequest (opts) {
    let rawRequest = {}
    if (!BaseOperation.isValidAmount(opts.baseAmount)) {
      throw new Error('opts.amount is invalid')
    }
    rawRequest.baseAmount = BaseOperation._toUnsignedXDRAmount(
      opts.baseAmount)

    if (!BaseOperation.isValidAsset(opts.quoteAsset)) {
      throw new Error('opts.quoteAssets is invalid')
    }

    if (isUndefined(opts.creatorDetails)) {
      throw new Error('opts.creatorDetails is undefined')
    }

    rawRequest.quoteAsset = opts.quoteAsset
    rawRequest.creatorDetails = JSON.stringify(opts.creatorDetails)
    rawRequest.bidId = UnsignedHyper.fromString(opts.bidID)
    rawRequest.ext = new xdr.CreateAtomicSwapAskRequestExt(
      xdr.LedgerVersion.emptyVersion())

    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.createAtomicSwapAskRequest(
      new xdr.CreateAtomicSwapAskRequestOp({
        request: new xdr.CreateAtomicSwapAskRequest(rawRequest),
        ext: new xdr.CreateAtomicSwapAskRequestOpExt(
          xdr.LedgerVersion.emptyVersion())
      }))

    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createAtomicSwapAskRequestToObject (result, attrs) {
    result.bidID = attrs.request().bidId().toString()
    result.baseAmount = BaseOperation._fromXDRAmount(
      attrs.request().baseAmount())
    result.quoteAsset = attrs.request().quoteAsset().toString()
    result.creatorDetails = JSON.parse(attrs.request().creatorDetails().toString())
  }
}
