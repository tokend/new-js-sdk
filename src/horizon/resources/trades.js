import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Trades.
 *
 * @class
 */
export class Trades extends ResourceGroupBase {
  /**
   * Get the page of the history of completed trades.
   *
   * @param query
   * @param query.base_asset - Base asset from the pair of assets, which history, we're requesting
   * @param query.quote_asset - Quote asset from the pair of assets, which history, we're requesting
   * @param [query.order_book_id] - If present, the result will return only trades for specific order book (0 - for secondary market, sale ID otherwise)
   * @return {HorizonResponse}
   */
  getPage (query) {
    return this._makeCallBuilder()
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('trades')
  }
}
