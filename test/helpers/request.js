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

  async mustLoadNotPending (requestId, delayMs = 1500) {
    const request = await this.mustLoad(requestId)

    if (request.requestState !== 'pending') {
      await this.delay(delayMs)
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
   * @param {object} [opts.reviewDetails]
   * @param {number} [opts.reviewDetails.tasksToAdd]
   * @param {number} [opts.reviewDetails.tasksToRemove]
   * @param {object} [opts.reviewDetails.externalDetails]
   */
  async review (requestId, opts) {
    const request = await this.mustLoad(requestId)
    const operation = base.ReviewRequestBuilder.reviewRequest({
      requestID: requestId,
      requestHash: request.hash,
      requestType: request.details.requestTypeI,
      action: opts.action,
      reason: opts.reason || '',
      reviewDetails: {
        tasksToAdd: opts.tasksToAdd || 0,
        tasksToRemove: opts.tasksToRemove || 0,
        externalDetails: opts.externalDetails || {}
      }
    })
    return this.submit(operation)
  }

  /**
   * @param {string} requestId
   * @param opts
   * @param opts.action
   * @param [opts.reason]
   * @param [opts.externalDetails]
   * @param [opts.tasksToAdd]
   * @param [opts.tasksToRemove]
   */
  async reviewWithdraw (requestId, opts) {
    const request = await this.mustLoad(requestId)
    const operation = base.ReviewRequestBuilder.reviewWithdrawRequest({
      requestID: requestId,
      requestHash: request.hash,
      action: opts.action,
      reason: opts.reason || '',
      reviewDetails: {
        tasksToAdd: opts.tasksToAdd || 0,
        tasksToRemove: opts.tasksToRemove || 0,
        externalDetails: {}
      },
      externalDetails: JSON.stringify({})
    })

    return this.submit(operation)
  }

  async reviewAmlAlert (requestId, opts) {
    const request = await this.mustLoad(requestId)
    const operation = base.ReviewRequestBuilder.reviewAmlAlertRequest({
      requestID: requestId,
      requestHash: request.hash,
      action: opts.action,
      comment: 'Some comment',
      reason: 'It\'s okay, sorry broh'
    })

    return this.submit(operation)
  }

  approveAmlAlert (requestId) {
    const action = base.xdr.ReviewRequestOpAction.approve().value
    return this.reviewAmlAlert(requestId, { ...opts, action })
  }

  rejectAmlAlert (requestId) {
    const action = base.xdr.ReviewRequestOpAction.permanentReject().value
    return this.reviewAmlAlert(requestId, { ...opts, action })
  }

  approveWithdraw (requestId, opts) {
    const action = base.xdr.ReviewRequestOpAction.approve().value
    return this.reviewWithdraw(requestId, { ...opts, action })
  }

  rejectWithdraw (requestId, opts) {
    const action = base.xdr.ReviewRequestOpAction.permanentReject().value
    return this.reviewWithdraw(requestId, { ...opts, action })
  }
}
