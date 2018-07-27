import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Account.
 *
 * @class
 */
export class Account extends ResourceGroupBase {
  /**
   * Get user's account.
   *
   * @param {string} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  get (accountId) {
    return this._makeCallBuilderWithSignature(accountId).get()
  }

  /**
   * Get balances.
   *
   * @param {object} [query] Request options.
   * @param {Number} [query.limit] Page limit.
   * @param {string} [query.cursor] Page cursor.
   * @param {string} [query.order] Sorting order.
   * @param {string} [accountId] User's account ID. Use account ID of the attached wallet by default.
   *
   * @return {HorizonResponse} Collection of balances.
   */
  getBalances (query, accountId) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment('balances')
      .get(query)
  }

  /**
   * Get balances details.
   *
   * @param {string} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  getDetails (accountId) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment(['balances', 'details'])
      .get()
  }

  /**
   * Get account's payment history
   * @param {string} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @param {object} [query] request query.
   * @param {Number} [query.limit] Page limit.
   * @param {string} [query.cursor] Page cursor.
   * @param {string} [query.order] Sorting order.
   * @param {string} [query.balance_id] Balance ID of payment subject.
   * @param {string} [query.asset] Asset of payment.
   * @param {string} [query.reference] Payment reference.
   * @param {string} [query.since] Date interval value.
   * @param {string} [query.to] Date interval value.
   * @param {string} [query.completed_only] Only completed payments will be returned.
   * @param {string} [query.pending_only] Only pending payments will be returned (processing deposits/withdrawals etc.).
   * @return {HorizonResponse}
   */
  getPayments (accountId, query = {}) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment('payments')
      .get(query)
  }

  /**
   * Get referrals.
   *
   * @param {object} [query] Request options.
   * @param {Number} [query.limit] Page limit.
   * @param {string} [query.cursor] Page cursor.
   * @param {string} [query.order] Sorting order.
   * @param {string} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  getReferrals (query, accountId) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment('referrals')
      .get(query)
  }

  /**
   * Get account signers.
   *
   * @param {string} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  getSigners (accountId = null) {
    return this._makeCallBuilder(accountId)
      .appendUrlSegment('signers')
      .get()
  }

  /**
   * Get account signers.
   *
   * @param {string} signerId Signer ID.
   * @param {string} [accountId] User's account ID. Use account ID of the attached wallet by default.
   * @return {HorizonResponse}
   */
  getSigner (signerId, accountId) {
    return this._makeCallBuilder(accountId)
      .appendUrlSegment(['signers', signerId])
      .get()
  }

  /**
   * Get balances.
   *
   * @param {object} [query] Request options.
   * @param {Number} [query.since] Start of the timespan.
   * @param {Number} [query.to] End of the timespan.
   * @param {string} [accountId] User's account ID. Use account ID of the attached wallet by default.
   *
   * @return {HorizonResponse} Collection of balances.
   */
  getSummary (query, accountId) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment('summary')
      .get(query)
  }

  _makeCallBuilder (accountId) {
    return this._server._makeCallBuilder()
      .appendUrlSegment('accounts')
      .appendAccountId(accountId)
  }

  _makeCallBuilderWithSignature (accountId) {
    return this._makeCallBuilder(accountId).withSignature()
  }
}
