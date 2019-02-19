import { getRequestIdFromResultXdr, Helper } from './_helper'
import { CreateWithdrawRequestBuilder } from '../../src/base/operations/create_withdraw_request_builder'

export class Withdraw extends Helper {
  /**
   * @param opts
   * @param opts.balance
   * @param opts.amount
   * @param opts.allTasks
   *
   * @param signerKp
   * @returns {Promise<*>}
   */
  async createRequest (opts, signerKp) {
    const operation = CreateWithdrawRequestBuilder.createWithdrawWithAutoConversion({
      balance: opts.balance,
      amount: opts.amount,
      fee: {
        fixed: '0.000000',
        percent: '0.000000' // TODO: load fees
      },
      externalDetails: {}
    })

    const response = await this.submit(operation, signerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createWithdrawalRequestResult')
  }
}
