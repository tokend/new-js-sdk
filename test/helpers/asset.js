import { Helper, getRequestIdFromResultXdr } from './_helper'
import { base } from '../../src'

export class Asset extends Helper {
  /**
   * @param {object} opts
   * @param {string} opts.code
   * @param {string} [opts.preissuedAssetSigner]
   * @param {string} [opts.maxIssuanceAmount]
   * @param {number} [opts.policies]
   * @param {string} [opts.initialPreissuedAmount]
   * @param {object} [opts.details]
   * @param {Keypair} ownerKp - the keypair of asset owner
   *
   * @returns {string} - the request ID of newly created request
   */
  async create (opts, ownerKp = this.masterKp) {
    const operation = base
      .ManageAssetBuilder
      .assetCreationRequest({
        code: opts.code,
        policies: opts.policies || 0,
        maxIssuanceAmount: opts.maxIssuanceAmount || "10000.0000",
        initialPreissuedAmount: opts.initialPreissuedAmount || "10000.0000",
        preissuedAssetSigner: opts.preissuedAssetSigner || base.Keypair.random().accountId(),
      })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'manageAssetResult')
  }
}
