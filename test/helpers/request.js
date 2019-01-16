import { Helper } from './_helper'
import { base } from '../../src'
import { Running } from './_running'

export class Request extends Helper {
  async mustLoad (requestId) {
    return Running.untilFound(async () => {
      const { data } = await this.sdk.horizon.request.get(requestId)
      return data
    })
  }

  async mustLoadNotPending (requestId) {
    const request = await this.mustLoad(requestId)

    if (request.requestState !== 'pending') {
      await this.delay(1500)
      return this.mustLoadNotPending(requestId)
    }

    return request
  }

  approve (requestId, opts) {
    const action = base.xdr.ReviewRequestOpAction.approve().value
    return this.review(requestId, { ...opts, action })
  }

  reject (requestId, opts) {
    const action = base.xdr.ReviewRequestOpAction.reject().value
    return this.review(requestId, { ...opts, action })
  }

  /**
   * @param {string|number} requestId
   * @param {object} opts
   * @param {object} opts.action
   * @param {string} [opts.reason]
   * @param {number} [opts.tasksToAdd]
   * @param {number} [opts.tasksToRemove]
   * @param {object} [opts.externalDetails]
   */
  async review (requestId, opts) {
    const request = await this.mustLoad(requestId)
    const operation = base.ReviewRequestBuilder.reviewRequest({
      requestID: requestId,
      requestHash: request.hash,
      requestType: request.details.requestTypeI,
      action: opts.action,
      reason: opts.reason || '',
      tasksToAdd: opts.tasksToAdd || 0,
      tasksToRemove: opts.tasksToRemove || 0,
      externalDetails: opts.externalDetails || {}
    })

    return this.submit(operation)
  }
}
