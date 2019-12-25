import xdr from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import isString from 'lodash/isString'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import { Hasher } from '../util/hasher'

export class ReviewRequestBuilder {
  /**
   * Creates operation to review reviewable request
   * @param {object} opts
   * @param {string} opts.requestID - request ID
   * @param {string} opts.requestHash - Hash of the request to be reviewed
   * @param {number} opts.requestType - Type of the request to be reviewed (xdr.ReviewableRequestType)
   * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
   * @param {string} opts.reason - Reject reason
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @param {number|string} opts.tasksToAdd - new tasks for reviewable request to be accomplished before fulfill
   * @param {number|string} opts.tasksToRemove - tasks, which were done by the reviewer and should be removed
   * @param {string} opts.externalDetails - the reviewer's commentary
   * @returns {xdr.ReviewRequestOp}
   */
  static reviewRequest (opts) {
    let attrs = ReviewRequestBuilder._prepareAttrs(opts)

    attrs.ext = new xdr.ReviewRequestOpExt(xdr.LedgerVersion.emptyVersion())

    return ReviewRequestBuilder._createOp(opts, attrs)
  }

  static _createOp (opts, attrs) {
    let reviewRequestOp = new xdr.ReviewRequestOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.reviewRequest(reviewRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static _prepareAttrs (opts) {
    let attrs = {}
    if (isUndefined(opts.requestID) || opts.requestID === '0') {
      throw new Error('opts.requestID is invalid')
    }

    attrs.requestId = UnsignedHyper.fromString(opts.requestID)
    attrs.requestHash = Hasher.hash(opts.requestHash)

    let validAction = opts.action &&
      xdr.ReviewRequestOpAction._byValue.has(opts.action)
    if (!validAction) {
      throw new Error('opts.action is invalid')
    }

    attrs.action = xdr.ReviewRequestOpAction._byValue.get(opts.action)

    if (!BaseOperation.isValidString(opts.reason, 0, 256)) {
      throw new Error('opts.reason is invalid')
    }

    attrs.reason = opts.reason

    if (isUndefined(opts.tasksToAdd)) {
      opts.tasksToAdd = '0'
    }

    if (isUndefined(opts.tasksToRemove)) {
      opts.tasksToRemove = '0'
    }

    if (isUndefined(opts.externalDetails)) {
      opts.externalDetails = ''
    }

    attrs.tasksToAdd = UnsignedHyper.fromString(opts.tasksToAdd)
    attrs.tasksToRemove = UnsignedHyper.fromString(opts.tasksToRemove)
    attrs.externalDetails = isString(opts.externalDetails)
      ? opts.externalDetails
      : JSON.stringify(opts.externalDetails)

    attrs.ext = new xdr.ReviewRequestOpExt(xdr.LedgerVersion.emptyVersion())

    return attrs
  }

  static reviewRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    result.requestHash = attrs.requestHash().toString('hex')
    result.tasksToAdd = attrs.tasksToAdd().toString()
    result.tasksToRemove = attrs.tasksToRemove().toString()
    result.externalDetails = attrs.externalDetails().toString('utf8')
    result.action = attrs.action().value
    result.reason = attrs.reason().toString()
  }
}
