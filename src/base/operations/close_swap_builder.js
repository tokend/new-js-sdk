import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'

export class CloseSwapBuilder {
  static prepareAttrs (opts) {
    let attrs = {}

    attrs.secret = Buffer.from(opts.secretHash, 'hex')
    attrs.swapId = UnsignedHyper.fromString(opts.swapId)

    attrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    return attrs
  }

  /**
   * Creates CloseSwap operation where destination is AccountID or BalanceID
   * @param {object} opts
   * @param {string} opts.secret
   * @param {string} opts.swapId
   * @returns {xdr.CloseSwapOp}
   */
  static closeSwap (opts) {
    let attrs = CloseSwapBuilder.prepareAttrs(opts)
    let closeSwapOp = new xdr.CloseSwapOp(attrs)
    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.closeSwap(closeSwapOp)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static closeSwapToObject (result, attrs) {
    result.secret = Buffer.from(attrs.secret()).toString('hex')
    result.swapId = attrs.swapId().toString()

    return result
  }
}
