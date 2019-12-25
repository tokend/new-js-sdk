import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import * as validators from '../../utils/validators'

export class InitiateKYCRecoveryBuilder {
  /**
   * Creates operation to create KYC request
   * @param {object} opts
   * @param {string} opts.targetAccount - target account to initiate recovery for
   * @param {string} opts.signer - signer is to be added instead of existing ones
   * @param {string} [opts.source] - The source account for the operation.
   * Defaults to the transaction's source account.
   * @returns {xdr.initiateKycRecoveryOp}
   */
  static initiateKycRecovery (opts) {
    let attrs = {}

    validators.validatePublicKey({
      value: opts.targetAccount,
      fieldName: 'opts.targetAccount'
    })

    validators.validatePublicKey({
      value: opts.signer,
      fieldName: 'opts.signer'
    })

    attrs.targetAccount = Keypair
      .fromAccountId(opts.targetAccount)
      .xdrAccountId()
    attrs.signer = Keypair
      .fromAccountId(opts.signer)
      .xdrPublicKey()

    attrs.ext = new xdr.InitiateKycRecoveryOpExt(xdr.LedgerVersion.emptyVersion())

    let kycRequestOp = new xdr.InitiateKycRecoveryOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.initiateKycRecovery(kycRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static initiateKYCRecoveryToObject (result, attrs) {
    result.targetAccount = BaseOperation.accountIdtoAddress(attrs.targetAccount())
    result.signer = BaseOperation.accountIdtoAddress(attrs.signer())
  }
}
