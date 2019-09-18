import isUndefined from 'lodash/isUndefined'
import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import { Hasher } from '../util/hasher'
import { validateUint64 } from '../../utils/validators'

export class CloseSwapBuilder {
  static prepareAttrs (opts) {
    let attrs = {}
    if (!isUndefined(opts.secret)) {
      attrs.secret = Hasher.hash(opts.secret)
    }
    attrs.swapId = UnsignedHyper.fromString(opts.swapId)

    attrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    return attrs
  }

  /**
   * Creates CloseSwap operation where destination is AccountID or BalanceID
   * @param {object} opts
   * @param {string} opts.secret
   * @param {string} opts.swapId
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.CloseSwapOp}
   */
  static closeSwap (opts) {
    validateUint64({ value: opts.swapId, fieldName: 'opts.swapId' })

    let attrs = CloseSwapBuilder.prepareAttrs(opts)
    let closeSwapOp = new xdr.CloseSwapOp(attrs)
    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.closeSwap(closeSwapOp)
    opAttrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static closeSwapToObject (result, attrs) {
    if (!isUndefined(attrs.secret())) {
      result.secret = attrs.secret().toString('hex')
    }
    result.swapId = attrs.swapId().toString()

    return result
  }
}
