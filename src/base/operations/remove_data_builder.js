import xdr from '../generated/xdr_generated'
import { UnsignedHyper } from 'js-xdr'
import * as validators from '../../utils/validators'
import { BaseOperation } from './base_operation'

export class RemoveDataBuilder {
  /**
   * Remove data operation
   * @param {object} opts
   * @param {string} opts.dataId
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.RemoveDataOp}
   */
  static removeData (opts) {
    validators.validateUint64({ value: opts.dataId, fieldName: 'opts.dataId' })

    let attributes = {}
    attributes.dataId = UnsignedHyper.fromString(opts.dataId)
    attributes.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    let op = new xdr.RemoveDataOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.removeDatum(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static removeDataToObject (result, attributes) {
    let request = attributes

    result.dataId = request.dataId().toString()
  }
}
