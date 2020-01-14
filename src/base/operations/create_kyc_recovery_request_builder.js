import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'
import { ManageSignerBuilder } from './manage_signer_builder'
import * as validators from '../../utils/validators'

export class CreateKYCRecoveryRequestBuilder {
  /**
   * Creates operation to create KYC request
   * @param {object} opts
   * @param {string} opts.requestID - set to zero to create new request
   * @param {string} opts.targetAccount
   * @param {object[]} opts.signers - new signers for the target account
   * @param {string} opts.signers[].publicKey - public key of new signer
   * @param {string} opts.signers[].roleID - id of role for signer
   * @param {string} opts.signers[].weight - weight of signer up to 1000
   * @param {string} opts.signers[].identity - identity of signer
   * @param {object} opts.signers[].details - json object with details
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} opts.creatorDetails - request details set by creator
   * @returns {xdr.CreateKYCRecoveryRequestOp}
   */
  static _createKYCRecoveryRequest (opts) {
    let attrs = {}

    validators.validatePublicKey({
      value: opts.targetAccount,
      fieldName: 'opts.targetAccount'
    })
    validators.validateCreatorDetails({
      value: opts.creatorDetails,
      fieldName: 'opts.creatorDetails'
    })
    validators.validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })
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
      validators.validateUint64({ value: item.roleID, fieldName: 'signers[].roleID' })
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

    attrs.requestId = UnsignedHyper.fromString(opts.requestID)
    attrs.allTasks = BaseOperation._checkUnsignedIntValue('allTasks', opts.allTasks)
    attrs.ext = new xdr.CreateKycRecoveryRequestOpExt(xdr.LedgerVersion.emptyVersion())
    let signersData = []
    opts.signers.forEach(function (item) {
      signersData.push(ManageSignerBuilder.prepareUpdateSignerData(item))
    })
    attrs.signersData = signersData
    let kycRequestOp = new xdr.CreateKycRecoveryRequestOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createKycRecoveryRequest(kycRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * @param {object} opts
   * @param {string} opts.targetAccount
   * @param {object[]} opts.signers - new signers for the target account
   * @param {string} opts.signers[].publicKey - public key of new signer
   * @param {string} opts.signers[].roleID - id of role for signer
   * @param {string} opts.signers[].weight - weight of signer up to 1000
   * @param {string} opts.signers[].identity - identity of signer
   * @param {object} opts.signers[].details - json object with details
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} [opts.source] - The source account for the operation.
   * Defaults to the transaction's source account.
   * @return {xdr.CreateKYCRecoveryRequestOp}
   */
  static create (opts) {
    return this._createKYCRecoveryRequest({
      ...opts,
      requestID: '0'
    })
  }

  /**
   * @param {object} opts
   * @param {string} opts.targetAccount
   * @param {object[]} opts.signers - new signers for the target account
   * @param {string} opts.signers[].publicKey - public key of new signer
   * @param {string} opts.signers[].roleID - id of role for signer
   * @param {string} opts.signers[].weight - weight of signer up to 1000
   * @param {string} opts.signers[].identity - identity of signer
   * @param {object} opts.signers[].details - json object with details
   * @param {object} opts.creatorDetails
   * @param {string} [opts.source] - The source account for the operation.
   * Defaults to the transaction's source account.
   * @return {xdr.CreateKYCRecoveryRequestOp}
   */
  static update (opts, requestID) {
    return this._createKYCRecoveryRequest({
      ...opts,
      requestID: requestID
    })
  }

  static createKYCRecoveryRequestOpToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    result.targetAccount = BaseOperation.accountIdtoAddress(attrs.targetAccount())
    result.signers = []
    attrs.signersData().forEach(function (item) {
      let data = {}
      ManageSignerBuilder.signerDataToObject(data, item)
      result.signers.push(data)
    })
    result.creatorDetails = JSON.parse(attrs.creatorDetails())
    result.allTasks = attrs.allTasks()
  }
}
