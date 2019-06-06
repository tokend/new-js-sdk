import xdr from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import isUndefined from 'lodash/isUndefined'
import { UnsignedHyper } from 'js-xdr'
import { BaseOperation } from './base_operation'

export class ManageSignerBuilder {
  /**
   * Create new signer for source account.
   * @param {object} opts
   * @param {string} opts.publicKey - public key of new signer
   * @param {string} opts.roleID - id of role for signer
   * @param {string} opts.weight - weight of signer up to 1000
   * @param {string} opts.identity - identity of signer
   * @param {object} opts.details - json object with details
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.ManageSignerOp}
   */
  static createSigner (opts) {
    let attrs = {
      data: new xdr.ManageSignerOpData.create(ManageSignerBuilder
        .prepareUpdateSignerData(opts)),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.ManageSignerOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageSigner(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Update existing signer for source account.
   * @param {object} opts
   * @param {string} opts.publicKey - public key of existing signer
   * @param {string} opts.roleID - id of role for signer
   * @param {string} opts.weight - weight of signer up to 1000
   * @param {string} opts.identity - identity of signer
   * @param {object} opts.details - json object with details
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.ManageSignerOp}
   */
  static updateSigner (opts) {
    let attrs = {
      data: new xdr.ManageSignerOpData.update(ManageSignerBuilder
        .prepareUpdateSignerData(opts)),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.ManageSignerOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageSigner(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Delete existing signer for source account.
   * @param {object} opts
   * @param {string} opts.publicKey - public key of existing signer
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.ManageSignerOp}
   */
  static deleteSigner (opts) {
    if (!Keypair.isValidPublicKey(opts.publicKey)) {
      throw new TypeError('invalid public key of signer')
    }

    let removeData = new xdr.RemoveSignerData({
      publicKey: Keypair.fromAccountId(opts.publicKey).xdrPublicKey(),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    })

    let attrs = {
      data: new xdr.ManageSignerOpData.remove(removeData),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.ManageSignerOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageSigner(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Validate data for UpdateSignerData, return xdr.UpdateSignerData if all ok
   * @param {object} opts
   * @param {string} opts.publicKey
   * @param {string} opts.roleID
   * @param {string} opts.weight
   * @param {string} opts.identity
   * @param {object} opts.details
   * @returns {xdr.UpdateSignerData}
   */
  static prepareUpdateSignerData (opts) {
    if (!Keypair.isValidPublicKey(opts.publicKey)) {
      throw new TypeError('invalid public key of signer')
    }

    if (isUndefined(opts.roleID)) {
      throw new Error('roleID of signer is undefined')
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
      roleId: UnsignedHyper.fromString(opts.roleID),
      weight: weight,
      identity: Number.parseInt(opts.identity, 10),
      details: JSON.stringify(opts.details),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    return new xdr.UpdateSignerData(attrs)
  }

  static manageSignerToObject (result, attrs) {
    switch (attrs.data().switch()) {
      case xdr.ManageSignerAction.create():
        return this.signerDataToObject(result, attrs.data().createData())
      case xdr.ManageSignerAction.update():
        return this.signerDataToObject(result, attrs.data().updateData())
      case xdr.ManageSignerAction.remove():
        result.publicKey = BaseOperation.accountIdtoAddress(
          attrs.data().removeData().publicKey())
        return
      default:
        throw new Error('Unexpected manage signer action')
    }
  }

  static signerDataToObject (result, signerData) {
    result.publicKey = BaseOperation.accountIdtoAddress(signerData.publicKey())
    result.roleID = signerData.roleId().toString()
    result.weight = signerData.weight().toString()
    result.identity = signerData.identity().toString()
    result.details = JSON.parse(signerData.details())
  }
}
