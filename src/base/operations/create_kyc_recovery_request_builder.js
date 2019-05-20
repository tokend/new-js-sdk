import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'
import { ManageSignerBuilder } from './manage_signer_builder'

export class CreateKYCRecoveryRequestBuilder {
  /**
     * Creates operation to create KYC request
     * @param {object} opts
     * @param {string} opts.requestID - set to zero to create new request
     * @param {string} opts.targetAccount
     * @param {object[]} opts.signersData - new signers for the target account
     * @param {string} opts.signersData.publicKey - public key of new signer
     * @param {string} opts.signersData.roleID - id of role for signer
     * @param {string} opts.signersData.weight - weight of signer up to 1000
     * @param {string} opts.signersData.identity - identity of signer
     * @param {object} opts.signersData.details - json object with details
     * @param {object} opts.creatorDetails
     * @param {number|string} opts.allTasks
     * @param {string} opts.creatorDetails - request details set by creator
     * @returns {xdr.CreateKYCRecoveryRequestOp}
     */
  static _createKYCRecoveryRequest (opts) {
    let attrs = {}

    if (isUndefined(opts.requestID)) {
      throw new Error('opts.requestID is invalid')
    }

    if (!Keypair.isValidPublicKey(opts.targetAccount)) {
      throw new Error('opts.targetAccount is invalid')
    }

    attrs.targetAccount = Keypair
      .fromAccountId(opts.targetAccount)
      .xdrAccountId()
    attrs.creatorDetails = JSON.stringify(opts.creatorDetails)

    attrs.requestId = UnsignedHyper.fromString(opts.requestID)
    attrs.allTasks = BaseOperation._checkUnsignedIntValue('allTasks', opts.allTasks)
    attrs.ext = new xdr.CreateKycRecoveryRequestOpExt(xdr.LedgerVersion.emptyVersion())
    let signersData = []
    opts.signersData.forEach(function (item) {
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
   *  @param {string} opts.targetAccount
   * @param {object[]} opts.signersData - new signers for the target account
   * @param {string} opts.signersData.publicKey - public key of new signer
   * @param {string} opts.signersData.roleID - id of role for signer
   * @param {string} opts.signersData.weight - weight of signer up to 1000
   * @param {string} opts.signersData.identity - identity of signer
   * @param {object} opts.signersData.details - json object with details
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param opts
   * @return {xdr.CreateKYCRecoveryRequestOp}
   */
  static create (opts) {
    return this._createKYCRecoveryRequest({
      ...opts,
      requestID: '0'
    })
  }
  /**
   *  @param {string} opts.targetAccount
   * @param {object[]} opts.signersData - new signers for the target account
   * @param {string} opts.signersData.publicKey - public key of new signer
   * @param {string} opts.signersData.roleID - id of role for signer
   * @param {string} opts.signersData.weight - weight of signer up to 1000
   * @param {string} opts.signersData.identity - identity of signer
   * @param {object} opts.signersData.details - json object with details
   * @param {object} opts.creatorDetails
   * @param opts
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
    result.signersData = []
    attrs.signersData().forEach(function (item) {
      let data = {}
      ManageSignerBuilder.signerDataToObject(data, item)
      result.signersData.push(data)
    })
    result.creatorDetails = JSON.parse(attrs.creatorDetails())
    result.allTasks = attrs.allTasks()
  }
}
