import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { hash } from '../hashing'
import { UnsignedHyper } from 'js-xdr'

export class LicenseBuilder {
  /**
   * Returns an XDR LicenseOp. A "license" operations are used for license prolongation/setting
   * @param {object} opts
   * @param {number|string} [opts.adminCount] - maximum number of admins to be set
   *                                            to be set in the system.
   * @param {number|string} [opts.dueDate] - Unix timestamp tiil which license is valid.
   * @param {string} [opts.prevLicenseHash] - full hash of previous license,
   *                                                  saved in the recent Stamp.
   * @param {string} [opts.ledgerHash] - ledger hash, saved in the recent Stamp.
   * @param {array} [opts.signatures] - Decorated signatures, by default 2 required.
   * @param {string} [opts.source] - The source account (defaults to transaction source).
   * @returns {xdr.LicenseOp}
   */
  static licenseOp (opts) {
    let attributes = {
      ext: new xdr.LicenseOpExt(xdr.LedgerVersion.emptyVersion())
    }

    attributes.adminCount = UnsignedHyper.fromString(opts.adminCount)
    attributes.dueDate = UnsignedHyper.fromString(opts.dueDate)
    attributes.prevLicenseHash = opts.prevLicenseHash
    attributes.ledgerHash = opts.ledgerHash
    attributes.signatures = []
    for (let i = 0; i < opts.signatures.length; i++) {
      attributes.signatures.push(opts.signatures[i])
    }

    let licenseOp = new xdr.LicenseOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.license(licenseOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static licenseToObject (result, attrs) {
    result.adminCount = attrs.adminCount()
    result.dueDate = attrs.dueDate()
    result.ledgerHash = attrs.ledgerHash()
    result.prevLicenseHash = attrs.prevLicenseHash()
    result.signatures = []
    for (let i = 0; i < attrs.signatures().length; i++) {
      result.signatures.push(attrs.signatures[i])
    }
  }

  /**
   *
   * @param {object} opts
   * @param {number|string} [opts.adminCount] - maximum number of admins to be set
   *                                            to be set in the system.
   * @param {number|string} [opts.dueDate] - Unix timestamp tiil which license is valid.
   * @param {string} [opts.prevLicenseHash] - full hash of previous license,
   *                                                  saved in the recent Stamp.
   * @param {string} [opts.ledgerHash] - ledger hash, saved in the recent Stamp.
   */
  static _getSignatureData (opts) {
    if (isUndefined(opts.adminCount)) {
      throw new Error('opts.adminCount is invalid')
    }

    if (isUndefined(opts.dueDate)) {
      throw new Error('opts.dueDate is invalid')
    }
    if (isUndefined(opts.prevLicenseHash)) {
      throw new Error('opts.prevLicenseHash is invalid')
    }
    if (isUndefined(opts.ledgerHash)) {
      throw new Error('opts.ledgerHash is invalid')
    }

    let rawSignatureData = `${opts.adminCount}:${opts.dueDate}:${opts.ledgerHash.toString('hex')}:${opts.prevLicenseHash.toString('hex')}`
    return hash(rawSignatureData)
  }

  /**

   * @param {array} [keys] - keys to sign license with
   */
  /**
   * @param opts
   * @param keys
   */
  static signLicense (opts, keys) {
    let contentHash = this._getSignatureData(opts)
    let signatures = []
    for (let i = 0; i < keys.length; i++) {
      let signature = keys[i].signDecorated(contentHash)
      signatures.push(signature)
    }

    return signatures
  }

  static buildAndSign (opts, keys) {
    let signatures = this.signLicense(opts, keys)
    let licenseOpts = {
      adminCount: opts.adminCount,
      dueDate: opts.dueDate,
      ledgerHash: opts.ledgerHash,
      prevLicenseHash: opts.prevLicenseHash,
      signatures: signatures
    }

    return this.licenseOp(licenseOpts)
  }
}
