import { ResourceGroupBase } from '../../resource_group_base'

/**
 * SaleAntes.
 *
 * @class
 */
export class SaleAntes extends ResourceGroupBase {
  /**
   * Returns sale antes already charged in the system
   *
   * @param {object} [query]
   * @param {number} [query.sale_id] If present, the result will return only return antes charged from specific sale
   * @param {number} [query.participant_balance_id] If present, the result will return only antes charged from specific balance
   * @returns {HorizonResponse}
   */
  getPage (query) {
    return this._makeCallBuilderWithSignature()
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('sale_antes')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
