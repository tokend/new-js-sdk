import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'

export class CreateReferenceBuilder {
  /**
   * Creates new reference entry
   * @param {object} opts
   * @param {string} opts.reference - unique reference with 64 symbols length
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   *
   * @returns {xdr.CreateReferenceOp}
   */
  static createReference (opts) {
    if (!BaseOperation.isValidString(opts.reference, 1, 64)) {
      throw new Error('opts.reference is invalid')
    }

    let attrs = {
      reference: opts.reference,
      ext: new xdr.CreateReferenceOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.createReference(
      new xdr.CreateReferenceOp(attrs))

    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createReferenceToObject (result, attrs) {
    result.reference = attrs.reference().toString()
  }
}
