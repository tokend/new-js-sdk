import xdr from '../generated/xdr_generated'
import { ManageSignerBuilder } from './manage_signer_builder'
import isUndefined from 'lodash/isUndefined'
import { UnsignedHyper } from 'js-xdr'
import isArray from 'lodash/isArray'
import { Keypair } from '../keypair'

export class CreateDataBuilder {
  /**
   * Create data operation
   */
  static createData (opts) {
    if (!Keypair.isValidPublicKey(opts.source)) {
      throw new Error('source is invalid')
    }
    let attributes = {
      source: Keypair.fromAccountId(opts.source).xdrAccountId()
    }

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
    attributes.type = UnsignedHyper.fromString(opts.type)
    attributes.value = JSON.stringify(opts.value)
    attributes.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    let op = new xdr.CreateDataOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createDatum(op)
    return new xdr.Operation(opAttributes)
  }

  static createDataToObject (result, attributes) {
  }
}
