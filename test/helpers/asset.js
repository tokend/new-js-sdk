import { Helper, getRequestIdFromResultXdr } from './_helper'
import { base } from '../../src'

export class Asset extends Helper {
  static randomCode (prefix = 'BTC') {
    return prefix + Math.floor(Math.random() * 100000)
  }

  /**
   * @param {object} [opts]
   * @param {string} [opts.code]
   * @param {string} [opts.preissuedAssetSigner]
   * @param {string} [opts.maxIssuanceAmount]
   * @param {number} [opts.policies]
   * @param {string} [opts.initialPreissuedAmount]
   * @param {object} [opts.details]
   * @param {Keypair} ownerKp - the keypair of asset owner
   *
   * @returns {array}[0] - the code of newly created request
   * @returns {array}[1] - the request ID of newly created request
   */
  async create (opts, ownerKp = this.masterKp) {
    const assetCode = opts.code || Asset.randomCode()
    const operation = base
      .ManageAssetBuilder
      .assetCreationRequest({
        requestID: '0',
        code: assetCode,
        policies: opts.policies || 0,
        maxIssuanceAmount: opts.maxIssuanceAmount || "10000.000000",
        initialPreissuedAmount: opts.initialPreissuedAmount || "10000.000000",
        preissuedAssetSigner: opts.preissuedAssetSigner || base.Keypair.random().accountId(),
        details: opts.details || {},
      })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'manageAssetResult')
  }
}
