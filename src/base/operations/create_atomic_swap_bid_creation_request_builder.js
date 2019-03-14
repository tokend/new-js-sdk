import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class CreateAtomicSwapBidCreationRequestBuilder {
  /**
     * Creates atomic swap bid creation request
     * @param {object} opts
     *
     * @param {string} opts.balanceID - balance from which specified amount
     * will be used in atomic swap
     * @param {string} opts.amount - amount which will used in swap (will be locked)
     * @param {object} opts.creatorDetails - details about atomic swap bid
     * @param {array} opts.quoteAssets - accepted assets
     * @param {object} opts.quoteAssets.price - price for 1 baseAsset in terms of quote asset
     * @param {object} opts.quoteAssets.asset - asset code of the quote asset
     * @param {string} [opts.allTasks] - tasks which will be used instead of tasks from key value
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     *
     * @returns {xdr.CreateASwapBidCreationRequestOp}
     */
  static createASwapBidCreationRequest (opts) {
    let rawRequest = {}
    if (!BaseOperation.isValidAmount(opts.amount)) {
      throw new Error('opts.amount is invalid')
    }
    rawRequest.amount = BaseOperation._toUnsignedXDRAmount(opts.amount)

    if (!Keypair.isValidBalanceKey(opts.balanceID)) {
      throw new Error('opts.balanceID is invalid')
    }
    rawRequest.baseBalance = Keypair.fromBalanceId(opts.balanceID)
      .xdrBalanceId()

    if (isUndefined(opts.quoteAssets) || opts.quoteAssets.length === 0) {
      throw new Error('opts.quoteAssets is invalid')
    }

    rawRequest.quoteAssets = []
    for (let i = 0; i < opts.quoteAssets.length; i++) {
      let quoteAsset = opts.quoteAssets[i]

      if (!BaseOperation.isValidAmount(quoteAsset.price)) {
        throw new Error('opts.quoteAssets[' + i + '].price is invalid: ' +
                    quoteAsset.price)
      }

      if (!BaseOperation.isValidAsset(quoteAsset.asset)) {
        throw new Error('opts.quoteAssets[i].asset is invalid')
      }

      rawRequest.quoteAssets.push(new xdr.ASwapBidQuoteAsset({
        price: BaseOperation._toUnsignedXDRAmount(quoteAsset.price),
        quoteAsset: quoteAsset.asset,
        ext: new xdr.ASwapBidQuoteAssetExt(xdr.LedgerVersion.emptyVersion())
      }))
    }

    rawRequest.creatorDetails = JSON.stringify(opts.creatorDetails)
    rawRequest.ext = new xdr.ASwapBidCreationRequestExt(
      xdr.LedgerVersion.emptyVersion())

    let tasks
    if (!isUndefined(opts.allTasks)) {
      tasks = BaseOperation._checkUnsignedIntValue('opts.allTasks', opts.allTasks)
    }

    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.createAswapBidRequest(
      new xdr.CreateASwapBidCreationRequestOp({
        request: new xdr.ASwapBidCreationRequest(rawRequest),
        allTasks: tasks,
        ext: new xdr.CreateASwapBidCreationRequestOpExt(
          xdr.LedgerVersion.emptyVersion())
      }))

    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createASwapBidCreationRequestToObject (result, attrs) {
    result.balanceID = BaseOperation.balanceIdtoString(
      attrs.request().baseBalance())
    result.amount = BaseOperation._fromXDRAmount(
      attrs.request().amount())
    result.creatorDetails = JSON.parse(attrs.request().creatorDetails())

    if (!isUndefined(attrs.allTasks())){
      result.allTasks = attrs.allTasks().toString()
    }

    result.quoteAssets = []
    let rawQuoteAssets = attrs.request().quoteAssets()
    for (let i = 0; i < rawQuoteAssets.length; i++) {
      result.quoteAssets.push({
        price: BaseOperation._fromXDRAmount(rawQuoteAssets[i].price()),
        asset: rawQuoteAssets[i].quoteAsset().toString()
      })
    }
  }
}
