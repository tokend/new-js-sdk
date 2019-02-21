import { Helper } from './_helper'
import { base } from '../../src'
// import { Asset } from '../helpers/asset'
// import { Keypair } from '../../src/base'
// import { createAndApproveAsset } from '../scripts/create_asset'

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
    const op = base.PaymentV2Builder.payment(opts)
    const response = await this.submit(op, ownerKp)
    return response
  }
}
