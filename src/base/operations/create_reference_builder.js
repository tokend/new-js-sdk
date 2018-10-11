import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import isUndefined from 'lodash/isUndefined'

export class CreateReferenceBuilder {
  /**
   * Creates new reference entry
   * @param {object} opts
   * @param {string} opts.reference - unique reference calculated on client 64 symbols length
   * @param {object} opts.meta - details about document or something else
   * @param {string} opts.meta.file_name - name of file
   * @param {string} opts.meta.document_type - type of document
   * @param {string} opts.meta.creator - information about document creator
   * @param {string} opts.meta.counterparty - participant
   * @param {string} [opts.source] - The source account for the operation.
   * Defaults to the transaction's source account.
   * @returns {xdr.Operation} (CreateReferenceOp)
   */
  static createReference (opts) {
    if (!BaseOperation.isValidString(opts.reference, 1, 64)) {
      throw new Error('opts.reference is invalid')
    }
    if (isUndefined(opts.meta.file_name)) {
      throw new Error('opts.meta.file_name is undefined')
    }
    if (isUndefined(opts.meta.document_type)) {
      throw new Error('opts.meta.document_type is undefined')
    }
    if (isUndefined(opts.meta.creator)) {
      throw new Error('opts.meta.creator is undefined')
    }
    if (isUndefined(opts.meta.counterparty)) {
      throw new Error('opts.meta.counterparty is undefined')
    }

    let attrs = {
      reference: opts.reference,
      meta: JSON.stringify(opts.meta),
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
    result.meta = JSON.parse(attrs.meta())
  }
}
