import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Balances.
 *
 * @class
 */
export class Sales extends ResourceGroupBase {
  /**
   * Get sale by ID
   *
   * @param id - the ID of the sale
   * @returns {Promise}
   */
  get (id) {
    return this._makeCallBuilder()
      .appendUrlSegment(id)
      .get()
  }

  /**
   * Get sales.
   * @param [query] - request query
   * @param [query.owner] - If present, the result will return only sales created by specific account ID
   * @param [query.base_asset] - If present, the result will return only attached to specific asset
   * @param [query.name] - If present, the result will return only sales with specific name
   * @param [query.open_only] - If present, the result will return only sales with open state (including upcoming)
   * @param [query.upcoming] - If present, the result will return only sales with open state and upcoming
   *                           start date (combining this filter set to `false` with `open_only=true`
   *                           will actually return all opened, but not upcoming sales)
   * @param [query.voting] - If present, the result will return only sales with voting state
   * @param [query.promotions] - If present, the result will return only sales with promotion state
   * @param [query.sort_by] - If present, the result will return sort sales by:
   *                          start time (default) - 1
   *                          most founded - 2
   *                          end time - 3
   *                          popularity - 4
   *                          start time - 5
   *
   * @return {Promise} Collection of balances.
   *
   * Note: Actually the page will include all existing sales, so that's why default query params, such as
   * cursor/limit/order are obsolete. Although filters described in this section will work, consider a
   * workaround about filtering/sorting the records on the client side
   */
  getPage (query = {}) {
    return this._makeCallBuilder()
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('sales')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
