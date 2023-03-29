import { ResourceGroupBase } from '../../resource_group_base'

/**
 * V3.
 *
 * @class
 */
export class V3 extends ResourceGroupBase {
  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('v3')
  }
}
