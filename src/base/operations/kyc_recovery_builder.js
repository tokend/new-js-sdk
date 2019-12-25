import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { ManageSignerBuilder } from './manage_signer_builder'
import * as validators from '../../utils/validators'

export class KYCRecoveryBuilder {
  /**
   * KYC recovery
   * @param {object} opts
   * @param {string} opts.targetAccount
   * @param {object[]} opts.signers - new signers for the target account
   * @param {string} opts.signers[].publicKey - public key of new signer
   * @param {array} opts.signers[].roleIDs - id of role for signer
   * @param {string} opts.signers[].weight - weight of signer up to 1000
   * @param {string} opts.signers[].identity - identity of signer
   * @param {object} opts.signers[].details - json object with details
   * @param {string} opts.creatorDetails - request details set by creator
   * @returns {xdr.KYCRecoveryOp}
   */
  static kycRecovery (opts) {
    let attrs = {}

    validators.validatePublicKey({
      value: opts.targetAccount,
      fieldName: 'opts.targetAccount'
    })
    validators.validateCreatorDetails({
      value: opts.creatorDetails,
      fieldName: 'opts.creatorDetails'
    })
    validators.validateArray({
      value: opts.signers,
      fieldName: 'opts.signers',
      minLength: 1
    })
    opts.signers.forEach(function (item) {
      validators.validatePublicKey({
        value: item.publicKey,
        fieldName: 'opts.signers[].publicKey'
      })
      validators.validateArray({
        value: item.roleIDs,
        fieldName: 'signers[].roleIDs',
        minLength: 1
      })
      validators.validateUint64({
        value: item.weight,
        fieldName: 'opts.signers[].weight',
        max: 1000
      })
      validators.validateUint64({
        value: item.identity,
        fieldName: 'opts.signers[].identity',
        min: 1
      })
    })
    attrs.targetAccount = Keypair
      .fromAccountId(opts.targetAccount)
      .xdrAccountId()
    attrs.creatorDetails = JSON.stringify(opts.creatorDetails)

    attrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    let signersData = []
    opts.signers.forEach(function (item) {
      signersData.push(ManageSignerBuilder.prepareSignerData(item))
    })
    attrs.signersData = signersData
    let kycRequestOp = new xdr.KycRecoveryOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.kycRecovery(kycRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static kycRecoveryOpToObject (result, attrs) {
    result.targetAccount = BaseOperation.accountIdtoAddress(attrs.targetAccount())
    result.signers = []
    attrs.signersData().forEach(function (item) {
      let data = {}
      ManageSignerBuilder.signerDataToObject(data, item)
      result.signers.push(data)
    })
    result.creatorDetails = JSON.parse(attrs.creatorDetails())
  }
}
