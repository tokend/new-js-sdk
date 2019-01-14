import { NotFoundError } from '../../src/errors'
import { Helper } from './_helper'
import { base } from '../../src'

export class Request extends Helper {
  async mustLoad (requestId) {
    try {
      return this.sdk.horizon.request.get(id)
    } catch (err) {
      if (err instanceof NotFoundError) {
        console.log('Request not found, retrying...')
        return this.mustLoad(requestId)
      }

      throw err
    }
  }

  async mustLoadNotPending (requestId) {
    const response = this.mustLoad(requestId)

    if (response.data.requestState !== 'pending') {
      console.log('request is still pending, retrying...')
      await this.delay(1500)
      return this.mustLoadNotPending(requestId)
    }

    return response
  }

  approve (requestId, opts) {
    const action = base.xdr.ReviewRequestOpAction.approve().value
    return this.review(requestId,{ ...opts, action })
  }

  reject (requestId, opts) {
    const action = base.xdr.ReviewRequestOpAction.reject().value
    return this.review(requestId,{ ...opts, action })
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
    const { data: request } = await this.mustLoad(requestId)
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
