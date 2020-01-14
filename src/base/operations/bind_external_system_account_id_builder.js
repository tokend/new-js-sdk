import xdr from '../generated/xdr_generated'
import { UnsignedHyper } from 'js-xdr'
import { BaseOperation } from './base_operation'

export class BindExternalSystemAccountIdBuilder {
  /**
     * Creates operation for binding external system account id
     * @param {object} opts
     *
     * @param {string|number} opts.externalSystemType - type of external system
     *
     * @param {string} [opts.source] - The source account for binding. Defaults to the transaction's source account.
     *
     * @returns {xdr.BindExternalSystemAccountIdOp}
     */
  static createBindExternalSystemAccountIdOp (opts) {
    let attrs = {}

    attrs.externalSystemType = typeof opts.externalSystemType === 'number'
      ? opts.externalSystemType
      : UnsignedHyper.fromString(opts.externalSystemType)

    attrs.ext = new xdr.BindExternalSystemAccountIdOpExt(xdr.LedgerVersion.emptyVersion())

    let bindExternalSystemAccountIdOp = new xdr.BindExternalSystemAccountIdOp(attrs)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody
      .bindExternalSystemAccountId(bindExternalSystemAccountIdOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static bindExternalSystemAccountIdToObject (result, attrs) {
    result.externalSystemType = attrs.externalSystemType()
  }
}
