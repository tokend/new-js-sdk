import { BaseOperation } from './operations/base_operation'
import { default as xdr } from './generated/xdr_generated'
import { hash } from './hashing'
import isUndefined from 'lodash/isUndefined'

export class PreIssuanceRequest {
  /**
     * Creates pre issuance request
     * @param {object} opts
     * @param {string} opts.amount - amount to be preissued
     * @param {string} opts.reference - reference of the request
     * @param {string} opts.asset - asset to be pre issued
     * @param {KeyPair} opts.keyPair - signer of the pre issued asset request
     * @returns {xdr.PreIssuanceRequest}
     */
  static build (opts) {
    if (!BaseOperation.isValidAmount(opts.amount, false)) {
      throw new TypeError('amount must be of type String and represent a positive number')
    }
    if (!BaseOperation.isValidString(opts.reference, 4, 64)) {
      throw new TypeError('reference must be 4-64 string')
    }

    if (!BaseOperation.isValidAsset(opts.asset)) {
      throw new TypeError('asset is invalid')
    }

    if (isUndefined(opts.keyPair)) {
      throw new TypeError('opts.keyPair is invalid')
    }

    opts.amount = BaseOperation._toUnsignedXDRAmount(opts.amount)
    let signature = opts.keyPair.signDecorated(this._getSignatureData(opts))
    return new xdr.PreIssuanceRequest({
      reference: opts.reference,
      amount: opts.amount,
      asset: opts.asset,
      signature: signature,
      ext: new xdr.PreIssuanceRequestExt(xdr.LedgerVersion.emptyVersion())
    })
  }

  static xdrFromData (data) {
    return new xdr.PreIssuanceRequest({
      reference: data.reference,
      amount: BaseOperation._toUnsignedXDRAmount(data.amount),
      asset: data.asset,
      signature: data.signature
    })
  }

  static dataFromXdr (xdr) {
    let attributes = {}
    attributes.amount = BaseOperation._fromXDRAmount(xdr.amount())
    attributes.reference = xdr.reference()
    attributes.asset = xdr.asset()
    attributes.signature = xdr.signature()
    return attributes
  }

  static isXdrPreIssuanceRequestSigned (attributes, keyPair) {
    let signature = attributes.signature()
    let signatureData = this._getSignatureData({
      reference: attributes.reference(),
      asset: attributes.asset(),
      amount: attributes.amount()
    })
    return keyPair.verify(signatureData, signature.signature())
  }

  static _getSignatureData (opts) {
    if (isUndefined(opts.reference)) {
      throw new Error('opts.reference is invalid')
    }

    if (isUndefined(opts.asset)) {
      throw new Error('opts.asset is invalid')
    }

    let rawSignatureData = `${opts.reference}:${opts.amount.toString()}:${opts.asset}`
    return hash(rawSignatureData)
  }
}
