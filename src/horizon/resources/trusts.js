import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Trusts.
 *
 * @class
 */
export class Trusts extends ResourceGroupBase {
  getAll (balanceId) {
    return this._makeCallBuilder()
      .appendUrlSegment(balanceId)
      .get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('trusts')
  }
}
