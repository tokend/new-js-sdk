import { ResourceGroupBase } from '../../resource_group_base'

/**
 * AtomicSwapBib.
 *
 * In short, AtomicSwapBib are the central data structure for payment system.
 *
 * @class
 */
export class AtomicSwapBid extends ResourceGroupBase {
  /**
   * This endpoint represents atomic swap bids filters them by owner id and base asset
   *
   * @param {string} owner Owner id
   * @param {string} baseAsset Base asset code
   * @return {HorizonResponse}
   */
  getBids (owner = '', baseAsset) {
    return this._makeCallBuilder()
      .get({
        owner_id: owner,
        base_asset: baseAsset
      })
  }

  /**
   * Provides information on a single atomic swap bid.
   *
   * @param {string} bidId Bid id
   * @return {HorizonResponse}
   */
  getBid (bidId) {
    return this._makeCallBuilder()
      .appendUrlSegment([bidId])
      .get()
  }

  /**
   * Provides information on user atomic swap bid.
   *
   * @param {string} accountId like `GCTCU6ZGTOFWPBKPSC56B6HHNFCRERPDOIBDQSAEX4JRPPZQOY33VUAV`
   * @return {HorizonResponse}
   */
  getSwapRequests (accountId) {
    return this._makeCallBuilderWithSignature()
      .get({
        requestor: accountId
      })
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment(['atomic_swap_bids'])
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
      .appendUrlSegment(['atomic_swap_bids'])
  }
}
