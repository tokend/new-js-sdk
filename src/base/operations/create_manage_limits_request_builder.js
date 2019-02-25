import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'

export class CreateManageLimitsRequestBuilder {
  /**
   * Creates limits update request
   * @param {object} opts
   * @param {object} opts.creatorDetails - details to review
   * @param {number} opts.allTasks - Bitmask of all tasks which must be completed for the request approval
   * @param {string|number} opts.requestID - if 0 - create request, else - update existing request
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   * @returns {xdr.CreateManageLimitsRequestOp}
   */
  static createManageLimitsRequest (opts) {
    if (isUndefined(opts.creatorDetails)) {
      throw new Error('opts.creatorDetails is not defined')
    }

    if (isUndefined(opts.requestID)) {
      throw new Error('opts.requestID is not defined')
    }

    let limitsUpdateRequest = new xdr.LimitsUpdateRequest({
      creatorDetails: JSON.stringify(opts.creatorDetails),
      ext: new xdr.LimitsUpdateRequestExt(xdr.LedgerVersion.emptyVersion())
    })

    let createManageLimitsRequestOp = new xdr.CreateManageLimitsRequestOp({
      manageLimitsRequest: limitsUpdateRequest,
      allTasks: opts.allTasks,
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CreateManageLimitsRequestOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody
      .createManageLimitsRequest(createManageLimitsRequestOp)

    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static createManageLimitsRequestToObject (result, attrs) {
    result.creatorDetails = JSON.parse(attrs.manageLimitsRequest().creatorDetails())
    result.requestId = attrs.requestId().toString()
  }
}
