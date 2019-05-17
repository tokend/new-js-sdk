import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

import {
  validateAssetCode,
  validateAmount,
  validateBalanceKey,
  validateString,
  validateCreatorDetails
} from '../../utils/validators'

export class CreateIssuanceRequestBuilder {
  /**
   * Creates operation to create issuance request
   * @param {object} opts
   * @param {string} opts.asset - asset to be issued
   * @param {string} opts.amount - amount to be issued
   * @param {string} opts.receiver - balance ID of the receiver
   * @param {string} opts.reference - Reference of the request
   * @param {object} opts.creatorDetails - External details needed for PSIM to process withdraw operation
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.CreateIssuanceRequestOp}
   */
  static createIssuanceRequest (opts) {
    validateAssetCode({ value: opts.asset, fieldName: 'opts.asset' })
    validateAmount({ value: opts.amount, fieldName: 'opts.amount' })
    validateBalanceKey({ value: opts.receiver, fieldName: 'opts.receiver' })
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
      asset: opts.asset,
      amount: BaseOperation._toUnsignedXDRAmount(opts.amount),
      receiver: Keypair.fromBalanceId(opts.receiver).xdrBalanceId(),
      creatorDetails: JSON.stringify(opts.creatorDetails),
      fee: BaseOperation.feeToXdr({ fixed: '0', percent: '0' }),
      ext: new xdr.IssuanceRequestExt(xdr.LedgerVersion.emptyVersion())
    }

    const issuanceRequestOp = new xdr.CreateIssuanceRequestOp({
      request: new xdr.IssuanceRequest(attrs),
      reference: opts.reference,
      ext: new xdr.CreateIssuanceRequestOpExt(xdr.LedgerVersion.emptyVersion())
    })

    const opAttributes = {
      body: xdr.OperationBody.createIssuanceRequest(issuanceRequestOp)
    }
    BaseOperation.setSourceAccount(opAttributes, opts)

    return new xdr.Operation(opAttributes)
  }

  static createIssuanceRequestOpToObject (result, attrs) {
    result.reference = attrs.reference().toString()
    let request = attrs.request()
    result.asset = request.asset().toString()
    result.amount = BaseOperation._fromXDRAmount(request.amount())
    result.receiver = BaseOperation.balanceIdtoString(request.receiver())
    result.creatorDetails = JSON.parse(request.creatorDetails())
  }
}
