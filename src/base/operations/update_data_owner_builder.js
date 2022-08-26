import xdr from '../generated/xdr_generated'
import { UnsignedHyper } from 'js-xdr'
import * as validators from '../../utils/validators'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class UpdateDataOwnerBuilder {
  /**
   * Update data owner operation
   * @param {object} opts
   * @param {string} opts.dataId
   * @param {string} opts.newOwner
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.UpdateDataOwnerOp}
   */
  static updateDataOwner (opts) {
    validators.validateUint64({ value: opts.dataId, fieldName: 'opts.dataId' })
    validators.validatePublicKey({ value: opts.newOwner, fieldName: 'opts.newOwner'})

    let attributes = {
      dataId: UnsignedHyper.fromString(opts.dataId),
      newOwner: Keypair.fromAccountId(opts.newOwner).xdrAccountId(),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }
    let op = new xdr.UpdateDataOwnerOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.updateDataOwner(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static updateDataOwnerToObject (result, attributes) {
    let request = attributes
    result.dataId = request.dataId().toString()
    result.newOwner = request.newOwner().toString()
  }
}
