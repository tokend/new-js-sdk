import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Payments.
 *
 * @class
 */
export class Payments extends ResourceGroupBase {
  /**
   * Get payments history. Payments are operations {@link getOperations} that modify account's balance
   *
   * @param {object} [query] request query.
   * @param {string} [query.account_id] - If present, the result will return only payments for specific account
   * @param {string} [query.balance_id] - If present, the result will return only payments for specific balance
   * @param {string} [query.asset] - If present, the result will return only payments for specific asset
   * @param {string} [query.tx_id] - If present, the result will return only payments from specific transaction
   * @param {string} [query.reference] - If present, the result will return only payments with specific reference
   * @param {string} [query.since] - Should be valid `RFC 3339` string. If present, the result will return only payments submitted after specific date.
   * @param {boolean} [query.completed_only] - If present, the result will return only completed payments. (true by default)
   * @param {boolean} [query.pending_only] - If present, the result will return only pending payments. (processing deposits/withdrawals etc.).
   * @param {boolean} [query.skip_canceled], -  If present, the result will not return canceled payments (true by default)
   * @param {number} [query.limit] - If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] - If present, the result records will start from specific point.
   * @param {string} [query.order] - If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @return {HorizonResponse}
   * Note: query_params `pending_only` and `completed_only` can't both be set
   *
   */
  getPage (query) {
    return this._makeCallBuilderWithSignature().get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('payments')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
