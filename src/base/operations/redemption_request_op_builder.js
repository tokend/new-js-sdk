import isUndefined from 'lodash/isUndefined'
import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class RedemptionRequestOpBuilder {
  static prepareAttrs (opts) {
    let attrs = {
      ext: new xdr.CreateRedemptionRequestOpExt(xdr.LedgerVersion.emptyVersion())
    }

    if (!Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
      throw new TypeError('sourceBalanceId is invalid')
    }

    if (!Keypair.isValidPublicKey(opts.destination)) {
      throw new TypeError('destination accountID is invalid')
    }

    if (!BaseOperation.isValidAmount(opts.amount)) {
      throw new TypeError('amount argument must be of type String and represent a positive number')
    }

    if (isUndefined(opts.reference)) {
      opts.reference = ''
    }
    attrs = {
      ...attrs,
      reference: opts.reference,
      allTasks: opts.allTasks,
      redemptionRequest: new xdr.RedemptionRequest({
        sourceBalanceId: Keypair.fromBalanceId(opts.sourceBalanceId).balanceId(),
        destination: Keypair.fromAccountId(opts.destination).accountId(),
        amount: BaseOperation._toUnsignedXDRAmount(opts.amount),
        creatorDetails: opts.creatorDetails,
        reference: opts.reference
      })
    }

    let createRedemptionRequestOp = new xdr.CreateRedemptionRequestOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody
      .createRedemptionRequest(createRedemptionRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }
}
