import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class InitiateKYCRecoveryBuilder {
  /**
     * Creates operation to create KYC request
     * @param {object} opts
     * @param {string} opts.targetAccount - target account to initiate recovery for
     * @param {string} opts.signer
     * @returns {xdr.initiateKycRecoveryOp}
     */
  static initiateKycRecovery (opts) {
    let attrs = {}

    if (!Keypair.isValidPublicKey(opts.targetAccount)) {
      throw new Error('opts.targetAccount is invalid')
    }

    if (!Keypair.isValidPublicKey(opts.signer)) {
      throw new Error('opts.signer is invalid')
    }

    attrs.account = Keypair
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
    result.account = BaseOperation.accountIdtoAddress(attrs.account())
    result.signer = BaseOperation.accountIdtoAddress(attrs.signer())
  }
}
