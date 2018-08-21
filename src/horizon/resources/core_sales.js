import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Core sales.
 *
 * @class
 */
export class CoreSales extends ResourceGroupBase {
  /**
   * Get the core sales.
   *
   * @return {HorizonResponse}
   */
  get () {
    return this._makeCallBuilderWithSignature().get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('core_sales')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
