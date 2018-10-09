import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import isUndefined from 'lodash/isUndefined'

export class CreateReferenceBuilder {
  /**
   * Creates new reference entry
   * @param {object} opts
   * @param {object} opts.meta - details about document or something else
   * @param {string} opts.meta.fileName - name of file
   * @param {string} opts.meta.documentType - type of document
   * @param {string} opts.meta.creator - information about document creator
   * @param {string} opts.meta.counterparty - participant
   * @param {string} [opts.source] - The source account for the operation.
   * Defaults to the transaction's source account.
   * @returns {xdr.CreateReferenceOp}
   */
  static createReference (opts) {
    if (isUndefined(opts.meta.fileName)) {
      throw new Error('opts.meta.fileName is undefined')
    }
    if (isUndefined(opts.meta.documentType)) {
      throw new Error('opts.meta.documentType is undefined')
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
