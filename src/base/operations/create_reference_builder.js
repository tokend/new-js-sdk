import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import isUndefined from 'lodash/isUndefined'

export class CreateReferenceBuilder {
  /**
   * Creates new reference entry
   * @param {object} opts
   * @param {object} opts.meta - details about document or something else
   * @param {string} opts.meta.filename - name of file
   * @param {string} opts.meta.docType - type of document
   * @param {string} opts.meta.creator - information about document creator
   * @param {string} opts.meta.counterparty - participant
   * @param {string} [opts.source] - The source account for the operation.
   * Defaults to the transaction's source account.
   * @returns {xdr.CreateReferenceOp}
   */
  static createReference (opts) {
    if (isUndefined(opts.meta.filename)) {
      throw new Error('opts.meta.filename is undefined')
    }
    if (isUndefined(opts.meta.docType)) {
      throw new Error('opts.meta.docType is undefined')
    }
    if (isUndefined(opts.meta.creator)) {
      throw new Error('opts.meta.creator is undefined')
    }
    if (isUndefined(opts.meta.counterparty)) {
      throw new Error('opts.meta.counterparty is undefined')
    }

    let attrs = {
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
    result.meta = JSON.parse(attrs.meta())
  }
}
