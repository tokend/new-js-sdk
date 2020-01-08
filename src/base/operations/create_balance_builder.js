import { BaseOperation } from './base_operation'
import xdr from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { validateAssetCode, validatePublicKey } from '../../utils/validators'
import isUndefined from 'lodash/isUndefined'

export class CreateBalanceBuilder {
  /**
   * Create and fund a non existent balance.
   * @param {object} opts
   * @param {string} opts.destination - Destination account ID to create an balance for.
   * @param {boolean} opts.additional - boolean flag which indicates whether or not to create extra balances if one in the provided asset exists.
   * @param {string} opts.asset - asset to create balance in
   * @param {string} [opts.source] - The source balance for the payment. Defaults to the transaction's source balance.
   * @returns {xdr.CreateBalanceOp}
   */
  static createBalance (opts) {
    validatePublicKey({
      fieldName: 'opts.destination',
      value: opts.destination
    })
    validateAssetCode({
      fieldName: 'opts.asset',
      value: opts.asset
    })
    if (isUndefined(opts.additional)) {
      opts.additional = false
    }

    let attrs = {
      destination: Keypair.fromAccountId(opts.destination).xdrBalanceId(),
      asset: opts.asset,
      additional: opts.additional,
      ext: new xdr.CreateBalanceOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CreateBalanceOp(attrs)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createBalance(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createBalanceToObject (result, attrs) {
    result.destination = BaseOperation.accountIdtoAddress(attrs.destination())
    result.asset = attrs.asset().toString()
    result.additional = attrs.additional()
  }
}
