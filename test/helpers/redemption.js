import { Helper } from './_helper'
import { base } from '../../src'

export class Redemption extends Helper {
  async createRequest (opts, ownerKp = this.masterKp) {
    const op = base.RedemptionRequestBuilder.redemptionRequest(opts)
    const response = await this.submit(op, ownerKp)
    return response
  }
}
