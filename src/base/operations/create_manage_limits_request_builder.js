import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'

export class CreateManageLimitsRequestBuilder {
  /**
   * Creates limits update request
   * @param {object} opts
   * @param {object} opts.details - details to review
   * @param {string|number} opts.requestID - if 0 - create request, else - update existing request
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   * @returns {xdr.CreateManageLimitsRequestOp}
   */
  static createManageLimitsRequest (opts) {
    if (isUndefined(opts.details)) {
      throw new Error('opts.details is not defined')
    }

    if (isUndefined(opts.requestID)) {
      throw new Error('opts.requestID is not defined')
    }

    let limitsUpdateRequest = new xdr.LimitsUpdateRequest({
      deprecatedDocumentHash: Buffer.alloc(32),
      ext: new xdr
        .LimitsUpdateRequestExt
        .limitsUpdateRequestDeprecatedDocumentHash(JSON.stringify(opts.details))
    })

    let createManageLimitsRequestOp = new xdr.CreateManageLimitsRequestOp({
      manageLimitsRequest: limitsUpdateRequest,
      ext: new xdr.CreateManageLimitsRequestOpExt
        .allowToUpdateAndRejectLimitsUpdateRequest(
          UnsignedHyper.fromString(opts.requestID)
        )
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody
      .createManageLimitsRequest(createManageLimitsRequestOp)

    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static createManageLimitsRequestToObject (result, attrs) {
    result.details = JSON.parse(attrs.manageLimitsRequest().ext().details())
    result.requestID = attrs.ext().requestId().toString()
  }
}
