import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Trades.
 *
 * @class
 */
export class Trades extends ResourceGroupBase {
  getAll () {
    return this._makeCallBuilder()
      .get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('trades')
  }
}
