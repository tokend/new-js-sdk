import xdr from '../generated/xdr_generated'
import { ManageSignerBuilder } from './manage_signer_builder'
import isUndefined from 'lodash/isUndefined'
import { UnsignedHyper } from 'js-xdr'
import isArray from 'lodash/isArray'
import { Keypair } from '../keypair'

export class CreateDataBuilder {
  /**
   * Create data //todo describe
   */
  static createData (opts) {
    let attributes = {
      source: Keypair.fromAccountId(opts.destination).xdrAccountId()
    }
    if (!isUndefined(opts.referrer) && !(opts.referrer === '')) {
      console.log(opts.referrer)
      if (!Keypair.isValidPublicKey(opts.referrer)) {
        throw new TypeError('referrer is invalid')
      }
      attributes.referrer = Keypair.fromAccountId(opts.referrer).xdrAccountId()
    }

    if (isUndefined(opts.roleID)) {
      throw new Error('roleID is undefined')
    }
    attributes.roleId = UnsignedHyper.fromString(opts.roleID)

    if (isUndefined(opts.signersData)) {
      throw new Error('signersData is undefined')
    }

    if (!isArray(opts.signersData)) {
      throw new Error('signersData is not array')
    }

    if (opts.signersData.length === 0) {
      throw new Error('signersData is empty')
    }
    attributes.signersData = []
    for (let signerData of opts.signersData) {
      attributes.signersData.push(ManageSignerBuilder.prepareUpdateSignerData(signerData))
    }
    attributes.type = UnsignedHyper.fromString('20')
    attributes.value = JSON.stringify('23')
    attributes.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    let op = new xdr.CreateDataOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createDatum(op)
    return new xdr.Operation(opAttributes)
  }
}
