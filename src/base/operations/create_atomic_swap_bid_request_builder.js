import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class CreateAtomicSwapBidRequestBuilder {
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
     * @returns {xdr.Operation}
     */
  static createAtomicSwapBidRequest (opts) {
    let rawRequest = {}
    if (!BaseOperation.isValidAmount(opts.amount)) {
      throw new Error('opts.amount is invalid')
    }
    rawRequest.amount = BaseOperation._toUnsignedXDRAmount(opts.amount)

    if (!Keypair.isValidBalanceKey(opts.balanceID)) {
      console.log(opts.balanceID + 'kek')
      throw new Error('opts.balanceID is invalid ' + opts.balanceID)
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

      rawRequest.quoteAssets.push(new xdr.AtomicSwapBidQuoteAsset({
        price: BaseOperation._toUnsignedXDRAmount(quoteAsset.price),
        quoteAsset: quoteAsset.asset,
        ext: new xdr.AtomicSwapBidQuoteAssetExt(xdr.LedgerVersion.emptyVersion())
      }))
    }

    rawRequest.creatorDetails = JSON.stringify(opts.creatorDetails)
    rawRequest.ext = new xdr.CreateAtomicSwapBidRequestExt(
      xdr.LedgerVersion.emptyVersion())

    let tasks
    if (!isUndefined(opts.allTasks)) {
      tasks = BaseOperation._checkUnsignedIntValue('opts.allTasks', opts.allTasks)
    }

    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.createAtomicSwapBidRequest(
      new xdr.CreateAtomicSwapBidRequestOp({
        request: new xdr.CreateAtomicSwapBidRequest(rawRequest),
        allTasks: tasks,
        ext: new xdr.CreateAtomicSwapBidRequestOpExt(
          xdr.LedgerVersion.emptyVersion())
      }))

    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createAtomicSwapBidRequestToObject (result, attrs) {
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
