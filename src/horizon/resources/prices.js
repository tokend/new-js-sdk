import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Prices.
 *
 * @class
 */
export class Prices extends ResourceGroupBase {
  getHistory (query = {}) {
    return this._makeCallBuilder()
      .appendUrlSegment('history')
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('prices')
  }
}
