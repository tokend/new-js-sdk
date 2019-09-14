import { Helper } from './_helper'
import { base } from '../../src'
import { getSuccessResultFromXDR } from './_helper'

export class Payment extends Helper {
  /**
   * @param opts
   * @param opts.sourceBalanceId
   * @param opts.destination
   * @param opts.amount
   * @param opts.feeData
   * @param opts.feeData.sourceFee
   * @param opts.feeData.sourceFee.percent
   * @param opts.feeData.sourceFee.fixed
   * @param opts.feeData.destinationFee
   * @param opts.feeData.destinationFee.percent
   * @param opts.feeData.destinationFee.fixed
   * @param opts.feeData.sourcePaysForDestination
   * @param opts.subject
   * @param opts.reference
   *
   * @returns {string} the ID of the request
   */

  async create (opts, ownerKp = this.masterKp) {
    const op = base.PaymentBuilder.payment(opts)
    const response = await this.submit(op, ownerKp)
    return response
  }

  async createRequest (opts, ownerKp = this.masterKp) {
    const op = base.CreatePaymentRequestBuilder.createPaymentRequest(opts)
    const response = await this.submit(op, ownerKp)
    return getSuccessResultFromXDR(response.resultXdr, 'createPaymentRequestResult')
  }
}
