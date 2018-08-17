import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Limits.
 *
 * @class
 */
export class Limits extends ResourceGroupBase {
  /**
   * @param {object} query
   * @param {string} query.asset - Asset on which limits are imposed on
   * @param [query.stats_op_type] - Stats operation type on which limits are imposed on
   * @param [query.account_id] - Account id on on which limits are imposed on
   * @param [query.account_type] - Account type on on which limits are imposed on
   *
   * @returns {HorizonResponse}
   */
  get (query) {
    return this._makeCallBuilder()
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('limits')
  }
}
