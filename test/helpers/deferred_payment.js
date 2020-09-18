import { getRequestIdFromResultXdr, Helper } from './_helper'
import { base } from '../../src'

export class DeferredPayment extends Helper {
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      requestID: '0',
      creatorDetails: {}
    }

    const operation = base.CreateDeferredPaymentCreationRequestBuilder
      .createDeferredPaymentCreationRequest({ ...DEFAULTS, ...opts })

    const response = await this.submit(operation, ownerKp)
    return getRequestIdFromResultXdr(response.resultXdr, 'createDeferredPaymentCreationRequestResult')
  }
}
