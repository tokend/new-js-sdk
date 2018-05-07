import { ResourceGroupBase } from '../../resource_group_base'

export const SUBMIT_TRANSACTION_TIMEOUT = 60 * 10000

/**
 * Transactions.
 *
 * @class
 */
export class Transactions extends ResourceGroupBase {
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

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('transactions')
  }
}
