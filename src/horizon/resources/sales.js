import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Balances.
 *
 * @class
 */
export class Sales extends ResourceGroupBase {
  /**
   * Get sale by ID
   * @param id - ID of the sale
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
   * @return {Promise} Collection of balances.
   */
  getAll (query = {}) {
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
