import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'

export class CancelAtomicSwapAskBuilder {
  /**
     * Cancel atomic swap ask
     * @param {object} opts
     * @param {string} opts.askID - id of ask which will be canceled.
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     *
     * @returns {xdr.Operation}
     */
  static cancelAtomicSwapAsk (opts) {
    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.cancelAtomicSwapAsk(
      new xdr.CancelAtomicSwapAskOp({
        askId: UnsignedHyper.fromString(opts.askID),
        ext: new xdr.CancelAtomicSwapAskOpExt(
          xdr.LedgerVersion.emptyVersion())
      }))

    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static cancelAtomicSwapAskToObject (result, attrs) {
    result.askID = attrs.askId().toString()
  }
}
