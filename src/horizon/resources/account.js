import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Account.
 *
 * In short, Accounts are the central data structure in TokenD.
 *
 * For detailed information, see {@link https://tokend.gitbook.io/knowledge-base/technical-details/accounts}
 * @class
 */
export class Account extends ResourceGroupBase {
  /**
   * Get account by ID.
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @return {HorizonResponse}
   */
  get (accountId) {
    return this._makeCallBuilderWithSignature(accountId)
      .get()
  }

  /**
   * Gets account kyc (returns only blob ID, for how to get full KYC data, see {@link Blobs})
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @return {HorizonResponse}
   */
  getAccountKyc (accountId) {
    return this._makeCallBuilder(accountId)
      .appendUrlSegment('account_kyc')
      .get()
  }

  /**
   * Get account balances.
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @return {HorizonResponse}
   */
  getBalances (accountId) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment('balances')
      .get()
  }

  /**
   * Get balances details, which includes the list of owned tokens and opened sales.
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @return {HorizonResponse}
   */
  getDetails (accountId) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment(['balances', 'details'])
      .get()
  }

  /**
   * Get account limits
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @returns {HorizonResponse}
   */
  getLimits (accountId) {
    return this._makeCallBuilder(accountId)
      .appendUrlSegment('limits')
      .get()
  }

  /**
   * Get user open offers
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @param {object} [query] Request options.
   * @param {string} [query.base_asset] For specific base asset
   * @param {string} [query.quote_asset] - For specific quote asset
   * @param {boolean} [query.is_buy] - Defines whether offer is about buying base from current account
   * @param {number} [query.offer_id] - For specific offer
   * @param {number} [query.order_book_id] - For specific order book (0 - for secondary market, sale ID - for sale offers)
   * @param {boolean} [query.only_primary] - Do not include secondary market offers
   * @return {HorizonResponse}
   *
   * Note: query params `base_asset` and `quote_asset` should both be set or both not set
   */
  getOffers (accountId, query = {}) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment('offers')
      .get(query)
  }

  /**
   * Get account operations history
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @param {object} [query] request query.
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
   * @param {number} [query.operation_type] - For specific type of operation. Should be {xdr.OperationType} value
   * @return {HorizonResponse}
   *
   * Note: query_params `pending_only` and `completed_only` can't both be set
   *
   */
  getOperations (accountId, query) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment('operations')
      .get(query)
  }

  /**
   * Get account payments history. Payments are operations {@link getOperations} that modify account's balance
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @param {object} [query] request query.
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
  getPayments (accountId, query = {}) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment('payments')
      .get(query)
  }

  /**
   * Get account references
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @return {HorizonResponse}
   */
  getReferences (accountId) {
    return this._makeCallBuilderWithSignature(accountId)
      .appendUrlSegment('references')
      .get()
  }

  /**
   * Get account signers.
   *
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   * @return {HorizonResponse}
   */
  getSigners (accountId) {
    return this._makeCallBuilder(accountId)
      .appendUrlSegment('signers')
      .get()
  }

  /**
   * Get account signers.
   *
   * @param {string} signerId Signer ID.
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
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
   * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
   *
   * @return {HorizonResponse}
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
