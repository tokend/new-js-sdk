import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Public.
 *
 * @class
 */
export class Public extends ResourceGroupBase {
  getOperation (id) {
    return this._makeCallBuilder()
      .appendUrlSegment(['operations', id])
      .get()
  }

  getAllOperations () {
    return this._makeCallBuilder()
      .appendUrlSegment('operations')
      .get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('public')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
