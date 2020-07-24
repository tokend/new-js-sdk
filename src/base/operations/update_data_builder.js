import xdr from '../generated/xdr_generated'
import { UnsignedHyper } from 'js-xdr'
import * as validators from '../../utils/validators'
import { BaseOperation } from './base_operation'

export class UpdateDataBuilder {
  /**
   * Update data operation
   * @param {object} opts
   * @param {string} opts.dataId
   * @param {object} opts.value
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.UpdateDataOp}
   */
  static updateData (opts) {
    validators.validateUint64({ value: opts.dataId, fieldName: 'opts.dataId' })
    validators.validateCreatorDetails({ value: opts.value, fieldName: 'opts.value' })

    let attributes = {
      dataId: UnsignedHyper.fromString(opts.dataId),
      value: JSON.stringify(opts.value),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.UpdateDataOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.updateDatum(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static updateDataToObject (result, attributes) {
    let request = attributes

    result.dataId = request.dataId().toString()
    result.value = JSON.parse(request.value())
  }
}
