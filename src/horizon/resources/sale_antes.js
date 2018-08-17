import { ResourceGroupBase } from '../../resource_group_base'

/**
 * SaleAntes.
 *
 * @class
 */
export class SaleAntes extends ResourceGroupBase {
  getAll () {
    return this._makeCallBuilderWithSignature().get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('sale_antes')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
