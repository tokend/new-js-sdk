import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

import {
  validateAssetCode,
  validateAmount,
  validateString,
  validateCreatorDetails
} from '../../utils/validators'

export class IssuanceBuilder {
  /**
   * Creates operation to create issuance request
   * @param {object} opts
   * @param {string} opts.asset - asset to be issued
   * @param {string} opts.amount - amount to be issued
   * @param {string|number} opts.securityType
   * @param {string} opts.destination
   * @param {string} opts.reference - Reference of the request
   * @param {object} opts.creatorDetails - External details needed for PSIM to process withdraw operation
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.IssuanceOp}
   */
  static issuance (opts) {
    validateAssetCode({ value: opts.asset, fieldName: 'opts.asset' })
    validateAmount({ value: opts.amount, fieldName: 'opts.amount' })
    validateString({
      value: opts.reference,
      fieldName: 'opts.reference',
      minLength: 1,
      maxLength: 64
    })
    validateCreatorDetails({
      value: opts.creatorDetails,
      fieldName: 'opts.creatorDetails'
    })

    const attrs = {
      securityType: Number.parseInt(opts.securityType, 10),
      asset: opts.asset,
      amount: BaseOperation._toUnsignedXDRAmount(opts.amount),
      creatorDetails: JSON.stringify(opts.creatorDetails),
      fee: BaseOperation.feeToXdr({ fixed: '0', percent: '0' }),
      reference: opts.reference,
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    if (Keypair.isValidPublicKey(opts.destination)) {
      attrs.destination = new xdr.MovementDestination.account(
        Keypair.fromAccountId(opts.destination).xdrAccountId()
      )
    } else if (Keypair.isValidBalanceKey(opts.destination)) {
      attrs.destination = new xdr.MovementDestination.balance(
        Keypair.fromBalanceId(opts.destination).xdrBalanceId()
      )
    } else {
      throw new TypeError('opts.destination is invalid')
    }

    const issuanceOp = new xdr.IssuanceOp(attrs)
    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.issuance(issuanceOp)

    BaseOperation.setSourceAccount(opAttrs, opts)

    return new xdr.Operation(opAttrs)
  }

  static issuanceToObject (result, attrs) {
    switch (attrs.destination().switch()) {
      case xdr.DestinationType.account(): {
        result.destination = BaseOperation.accountIdtoAddress(attrs.destination().accountId())
        break
      }
      case xdr.DestinationType.balance(): {
        result.destination = BaseOperation.balanceIdtoString(attrs.destination().balanceId())
        break
      }
    }
    result.securityType = attrs.securityType().toString()
    result.reference = attrs.reference().toString()
    result.asset = attrs.asset().toString()
    result.amount = BaseOperation._fromXDRAmount(attrs.amount())
    result.creatorDetails = JSON.parse(attrs.creatorDetails())
  }
}
