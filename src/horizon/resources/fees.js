import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Fees.
 *
 * @class
 */
export class Fees extends ResourceGroupBase {
  /**
   * Get all fees for specific type
   *
   * @param {number} feeType
   * @param {object} [query] Request query
   * @param {string} [query.asset] For specific asset
   * @param {number} [query.subtype] For specific subtype
   * @param {string} [query.account] For specific account
   * @param {string} [query.amount] For specific amount
   *
   * @return {HorizonResponse}
   */
  get (feeType, query = {}) {
    return this._makeCallBuilder()
      .appendUrlSegment(feeType)
      .get()
  }

  /**
   * Get all fees existing in the system
   *
   * @param {object} [query] Request query
   * @param [query.account_id]
   * @param [query.account_type]
   * @return {HorizonResponse}
   */
  getAll (query = {}) {
    return this._makeCallBuilder()
      .get(query)
  }

  /**
   * Get all fees existing in the system excluding specific account/account_type fees and default generated entries
   *
   * @param {object} [query] Request query
   * @param [query.account_id]
   * @param [query.account_type]
   * @return {HorizonResponse}
   */
  getOverview (query = {}) {
    return this._server._makeCallBuilder()
      .appendUrlSegment('fees_overview')
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('fees')
  }
}
