import { ResourceGroupBase } from '../../resource_group_base'

/**
 * History Offers.
 *
 * @class
 */
export class HistoryOffers extends ResourceGroupBase {
  /**
   * Get the order book
   * @param query
   * @param query.base_asset - Base asset from the pair
   * @param query.quote_asset - Quote asset from the pair
   * @param query.owner_id - the result will return only history offers for specific account ID
   * @returns {HorizonResponse}
   */
  getAll (query) {
    return this._makeCallBuilderWithSignature()
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('history_offers')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
