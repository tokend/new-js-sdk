import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Liquidity Pools.
 *
 * @class
 */
export class LiquidityPool extends ResourceGroupBase {
  /**
   * Get liquidity pool by ID
   *
   * @param id - the ID of the liquidity pool
   * @returns {Promise}
   */
  get (id) {
    return this._makeCallBuilder()
      .appendUrlSegment(id)
      .get()
  }

  getPage (query = {}) {
    return this._makeCallBuilder()
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('liquidity-pools')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
