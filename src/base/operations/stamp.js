import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'

export class StampBuilder {
  /**
   * Returns an XDR StampOp. A "stamp" operation saves latest ledger and license hashes.
   * @param {object} [opts]
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.SetOptionsOp}
   */
  static stamp (opts) {
    let stampOp = new xdr.StampOp({
      ext: new xdr.StampOpExt(xdr.LedgerVersion.emptyVersion())
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.stamp(stampOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static stampToObject (result, attrs) {
  }
}
