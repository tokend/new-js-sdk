import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import { validateUint64 } from '../../utils/validators'

export class CancelChangeRoleRequestBuilder {
  /**
   * Creates operation to cancel change role request
   *
   * @param {object} opts
   * @param {string} opts.requestID - ID of the request
   * @param {string} [opts.source] - The source account for the operation.
   * Defaults to the transaction's source account.
   * @returns {xdr.CancelChangeRoleRequestOp}
   */
  static cancelChangeRoleRequest (opts) {
    this._validateChangeRoleRequest(opts)

    let cancelChangeRoleRequestOp = new xdr.CancelChangeRoleRequestOp({
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CancelChangeRoleRequestOpExt(
        xdr.LedgerVersion.emptyVersion())
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.cancelChangeRoleRequest(cancelChangeRoleRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static cancelChangeRoleRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
  }

  // Helpers
  /**
   * Validates cancel change role params,
   * trows error in case of invalid params
   *
   * @param {object} opts
   * @param {string} opts.requestID - ID of the request
   * @param {string} [opts.source] - The source account for the operation.
   */
  static _validateChangeRoleRequest (opts) {
    validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })
  }
}
