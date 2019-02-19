import { getRequestIdFromResultXdr, Helper } from './_helper'
import { CreateAMLRequestBuilder } from '../../src/base'

export class AmlAlert extends Helper {
  /**
   *
   * @param opts
   * @param opts.balanceID
   * @param opts.amount
   * @param opts.reason
   * @param opts.reference
   */
  async createRequest (opts) {
    const operation = CreateAMLRequestBuilder.createAMLAlert(opts)
    const response = await this.submit(operation)

    return getRequestIdFromResultXdr(response.resultXdr, 'createAmlAlertRequestResult')
  }
}
