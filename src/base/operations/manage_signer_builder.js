import xdr from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import isUndefined from 'lodash/isUndefined'
import isArray from 'lodash/isArray'
import { UnsignedHyper } from 'js-xdr'
import { BaseOperation } from './base_operation'

export class ManageSignerBuilder {
  /**
   * Create new signer for source account.
   * @param {object} opts
   * @param {string} opts.publicKey - public key of new signer
   * @param {array} opts.roleIDs - id of role for signer
   * @param {string} opts.weight - weight of signer up to 1000
   * @param {string} opts.identity - identity of signer
   * @param {object} opts.details - json object with details
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.CreateSignerOp}
   */
  static createSigner (opts) {
    let attrs = {
      data: ManageSignerBuilder
        .prepareSignerData(opts),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CreateSignerOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createSigner(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Update existing signer for source account.
   * @param {object} opts
   * @param {string} opts.publicKey - public key of existing signer
   * @param {array} opts.roleIDs - ids of roles for signer
   * @param {string} opts.weight - weight of signer up to 1000
   * @param {string} opts.identity - identity of signer
   * @param {object} opts.details - json object with details
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.UpdateSignerOp}
   */
  static updateSigner (opts) {
    let attrs = {
      data: ManageSignerBuilder
        .prepareSignerData(opts),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.UpdateSignerOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.updateSigner(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Delete existing signer for source account.
   * @param {object} opts
   * @param {string} opts.publicKey - public key of existing signer
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.RemoveSignerOp}
   */
  static removeSigner (opts) {
    if (!Keypair.isValidPublicKey(opts.publicKey)) {
      throw new TypeError('invalid public key of signer')
    }

    let attrs = {
      publicKey: Keypair.fromAccountId(opts.publicKey).xdrPublicKey(),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.RemoveSignerOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.removeSigner(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Validate data for SignerData, return xdr.SignerData if all ok
   * @param {object} opts
   * @param {string} opts.publicKey
   * @param {array} opts.roleIDs
   * @param {string} opts.weight
   * @param {string} opts.identity
   * @param {object} opts.details
   * @returns {xdr.SignerData}
   */
  static prepareSignerData (opts) {
    if (!Keypair.isValidPublicKey(opts.publicKey)) {
      throw new TypeError('invalid public key of signer')
    }

    if (isUndefined(opts.roleIDs)) {
      throw new Error('roleIDs of signer is undefined')
    }

    if (!isArray(opts.roleIDs)) {
      throw new Error('roleIDs is not array')
    }

    if (opts.roleIDs.length === 0) {
      throw new Error('roleIDs is empty')
    }

    let roles = []

    for (let roleID of opts.roleIDs) {
      roles.push(UnsignedHyper.fromString(roleID))
    }

    if (isUndefined(opts.identity)) {
      throw new Error('identity of signer is undefined')
    }

    if (isUndefined(opts.weight)) {
      throw new Error('weight of signer is undefined')
    }

    let weight = Number.parseInt(opts.weight, 10)
    if (weight > 1000) {
      throw new Error('weight must not be greater than 1000')
    }

    let attrs = {
      publicKey: Keypair.fromAccountId(opts.publicKey).xdrPublicKey(),
      roleIDs: roles,
      weight: weight,
      identity: Number.parseInt(opts.identity, 10),
      details: JSON.stringify(opts.details),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    return new xdr.SignerData(attrs)
  }

  static createSignerToObject (result, attrs) {
    return this.signerDataToObject(result, attrs.data())
  }

  static updateSignerToObject (result, attrs) {
    return this.signerDataToObject(result, attrs.data())
  }

  static removeSignerToObject (result, attrs) {
    result.publicKey = BaseOperation.accountIdtoAddress(
      attrs.publicKey())
  }

  static signerDataToObject (result, signerData) {
    let roles = []
    for (let roleID of signerData.roleIDs()) {
      roles.push(roleID.toString())
    }

    result.publicKey = BaseOperation.accountIdtoAddress(signerData.publicKey())
    result.roleIDs = roles
    result.weight = signerData.weight().toString()
    result.identity = signerData.identity().toString()
    result.details = JSON.parse(signerData.details())
  }
}
