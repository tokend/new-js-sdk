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

  async cancelDeferredPayment (opts, ownerKp = this.masterKp) {
    const operation = base.CreateDeferredPaymentCreationRequestBuilder
      .cancelDeferredPaymentCreationRequest(opts)

    const response = await this.submit(operation, ownerKp)
    return response
  }

  async closeDeferredPayment (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      requestID: '0',
      creatorDetails: {}
    }

    const operation = base.CreateCloseDeferredPaymentRequestBuilder
      .createCloseDeferredPaymentRequest({ ...DEFAULTS, ...opts })

    const response = await this.submit(operation, ownerKp)
    return getRequestIdFromResultXdr(response.resultXdr, 'createCloseDeferredPaymentRequestResult')
  }

  async cancelCloseDeferredPayment (opts, ownerKp = this.masterKp) {
    const operation = base.CreateCloseDeferredPaymentRequestBuilder
      .cancelCloseDeferredPaymentRequest(opts)

    const response = await this.submit(operation, ownerKp)
    return response
  }
}
