import { ResourceGroupBase } from '../../resource_group_base'

/**
 * V2.
 *
 * @class
 */
export class V2 extends ResourceGroupBase {
  getAllTransactions (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('transactions')
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('v2')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
