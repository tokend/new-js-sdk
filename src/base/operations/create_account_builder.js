import { BaseOperation } from './base_operation'
import { default as xdr } from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import isUndefined from 'lodash/isUndefined'
import isArray from 'lodash/isArray'
import { UnsignedHyper } from 'js-xdr'
import { ManageSignerBuilder } from './manage_signer_builder'

export class CreateAccountBuilder {
  /**
   * Create and fund a non existent account.
   * @param {object} opts
   * @param {string} opts.destination - Destination account ID to create an account for.
   * @param {string} opts.roleID - id of the role for new account.
   * @param {array} opts.signersData - array of signers data
   * * @param {string} opts.signersData.publicKey - public key of new signer
   * * @param {string} opts.signersData.roleID - id of role for signer
   * * @param {string} opts.signersData.weight - weight of signer up to 1000
   * * @param {string} opts.signersData.identity - identity of signer
   * * @param {object} opts.signersData.details - json object with details
   * @param {string} [opts.referrer] - referrer of new account.
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.CreateAccountOp}
   */
  static createAccount (opts) {
    if (!Keypair.isValidPublicKey(opts.destination)) {
      throw new Error('destination is invalid')
    }
    let attrs = {
      destination: Keypair.fromAccountId(opts.destination).xdrAccountId(),
      ext: new xdr.CreateAccountOpExt(xdr.LedgerVersion.emptyVersion())
    }

    if (!isUndefined(opts.referrer) && !(opts.referrer === '')) {
      console.log(opts.referrer)
      if (!Keypair.isValidPublicKey(opts.referrer)) {
        throw new TypeError('referrer is invalid')
      }
      attrs.referrer = Keypair.fromAccountId(opts.referrer).xdrAccountId()
    }

    if (isUndefined(opts.roleID)) {
      throw new Error('roleID is undefined')
    }

    attrs.roleId = UnsignedHyper.fromString(opts.roleID)

    if (isUndefined(opts.signersData)) {
      throw new Error('signersData is undefined')
    }

    if (!isArray(opts.signersData)) {
      throw new Error('signersData is not array')
    }

    if (opts.signersData.length === 0) {
      throw new Error('signersData is empty')
    }

    attrs.signersData = []
    for (let signerData of opts.signersData) {
      attrs.signersData.push(ManageSignerBuilder.prepareUpdateSignerData(signerData))
    }

    let op = new xdr.CreateAccountOp(attrs)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createAccount(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static createAccountToObject (result, attrs) {
    result.destination = BaseOperation.accountIdtoAddress(attrs.destination())
    result.roleID = attrs.roleId().toString()

    if (attrs.referrer()) {
      result.referrer = BaseOperation.accountIdtoAddress(attrs.referrer())
    }

    result.signersData = []
    for (let signerData of attrs.signersData()) {
      result.signersData.push(ManageSignerBuilder.signerDataToObject(result, signerData))
    }
  }

}
