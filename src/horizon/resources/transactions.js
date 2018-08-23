import { ResourceGroupBase } from '../../resource_group_base'
import { TransactionBuilder } from '../../base'

export const SUBMIT_TRANSACTION_TIMEOUT = 60 * 10000

/**
 * Transactions.
 *
 * @class
 */
export class Transactions extends ResourceGroupBase {
  /**
   * Submits a transaction from a group of operations
   *
   * @param {xdr.Operation} operations - list of operations to submit
   * @returns {HorizonResponse}
   */
  submitOperations (...operations) {
    const wallet = this._sdk.wallet

    return this.submit(
      new TransactionBuilder(wallet.accountId)
        .addOperations(operations)
        .addSigner(wallet.keypair)
        .build()
    )
  }

  /**
   * Submit a transaction.
   *
   * @param {Transaction} transaction A transaction to be submitted.
   * @return {HorizonResponse} Response.
   */
  submit (transaction) {
    let tx = transaction.toEnvelope().toXDR().toString('base64')

    return this._makeCallBuilder()
      .withTimeout(SUBMIT_TRANSACTION_TIMEOUT)
      .post({ tx })
  }

  /**
   * Get transaction by ID.
   *
   * @param {number} id - Transaction ID.
   * @return {HorizonResponse}
   */
  get (id) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment(id)
      .get()
  }

  /**
   * Get the page of transactions.
   *
   * @param {object} [query] request query.
   * @param {string} [query.account_id] - If present, the result will contain only transactions that modified specific account
   * @param {number} [query.ledger_id] - If present, the result will contain only transaction from specific ledger
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   *
   * @return {HorizonResponse}
   */
  getPage (query) {
    return this._makeCallBuilderWithSignature()
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('transactions')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
