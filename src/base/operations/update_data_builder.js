import xdr from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import isUndefined from 'lodash/isUndefined'
import isArray from 'lodash/isArray'
import { ManageSignerBuilder } from './manage_signer_builder'
import { UnsignedHyper } from 'js-xdr'

export class UpdateDataBuilder {
  /**
   * Update data operation
   */
  static updateData (opts) {
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
    attributes.dataId = UnsignedHyper.fromString(opts.dataId)
    attributes.value = JSON.stringify(opts.value)
    attributes.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    let op = new xdr.UpdateDataOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.updateDatum(op)
    return new xdr.Operation(opAttributes)
  }

  static updateDataToObject (result, attrs) {
  }
}
