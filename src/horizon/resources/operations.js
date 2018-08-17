import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Operations.
 *
 * @class
 */
export class Operations extends ResourceGroupBase {
  /**
   * Get operation by id
   * @param {number} id - Operation ID
   * @return {HorizonResponse}
   */
  get (id) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment(id)
      .get()
  }

  /**
   * Get operations history.
   *
   * @param {object} [query] request query.
   * @param {string} [query.account_id] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @param {number} [query.limit] Page limit.
   * @param {string} [query.cursor] Page cursor.
   * @param {string} [query.order] Sorting order (asc/desc)
   * @param {string} [query.balance_id] - For fetching operations only for specified balance ID
   * @param {string} [query.asset] - For fetching operations only for specified asset
   * @param {string} [query.tx_id] - For specific transaction ID
   * @param {string} [query.reference] - For specific reference
   * @param {string} [query.reference] Payment reference.
   * @param {string} [query.since] Date interval value.
   * @param {boolean} [query.completed_only] Only completed payments will be returned. (true by default)
   * @param {boolean} [query.pending_only] Only pending payments will be returned (processing deposits/withdrawals etc.).
   * @param {boolean} [query.skip_canceled], Skips canceled operations (true by default)
   *
   * @return {HorizonResponse}
   * Note: query_params `pending_only` and `completed_only` can't both be set
   *
   */
  getAll (query) {
    return this._makeCallBuilderWithSignature().get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('operations')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
