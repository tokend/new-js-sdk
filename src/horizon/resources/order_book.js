import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Order Book.
 *
 * @class
 */
export class OrderBook extends ResourceGroupBase {
  /**
   * Get the order book
   * @param query
   * @param query.base_asset - Base asset from the pair
   * @param query.quote_asset - Quote asset from the pair
   * @param query.is_buy - Defines if the offers are buying or selling the base asset
   * @param [query.owner_id] - Account ID of the owner of offers
   * @param [query.order_book_id] - Order book ID, 0 - for secondary market, otherwise - sale ID
   * @returns {HorizonResponse}
   */
  getAll (query) {
    return this._makeCallBuilderWithSignature()
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('order_book')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
