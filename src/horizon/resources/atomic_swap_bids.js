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
   * @param [query] - request query
   * @return {Promise}
   */
  getPage (query) {
    return this._makeCallBuilder()
      .get(query)
  }

  /**
   * Provides information on a single atomic swap bid.
   *
   * @param {string} id Bid id
   * @return {Promise}
   */
  get (id) {
    return this._makeCallBuilder()
      .appendUrlSegment(id)
      .get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('atomic_swap_bids')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
