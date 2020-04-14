import xdr from '../generated/xdr_generated'
import { UnsignedHyper } from 'js-xdr'
import * as validators from '../../utils/validators'
import { BaseOperation } from './base_operation'

export class CreateDataBuilder {
  /**
   * Create data operation
   * @param {object} opts
   * @param {string} opts.type
   * @param {object} opts.value
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.CreateDataOp}
   */
  static createData (opts) {
    validators.validateUint64({ value: opts.type, fieldName: 'opts.type' })
    validators.validateCreatorDetails({ value: opts.value, fieldName: 'opts.value' })

    let attributes = {}
    attributes.type = UnsignedHyper.fromString(opts.type)
    attributes.value = JSON.stringify(opts.value)
    attributes.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    let op = new xdr.CreateDataOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createDatum(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createDataToObject (result, attributes) {
    let request = attributes

    result.dataType = request.type().toString()
    result.value = JSON.parse(request.value())
  }
}
