import { Helper, getRequestIdFromResultXdr } from './_helper'
import { RemoveAssetOpBuilder } from '../../src/base/operations/remove_asset_op_builder'
import { ASSET_POLICIES, base } from '../../src'
import { Running } from './_running'

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
   * @returns {string} - the request ID of newly created request
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      policies: 0,
      code: Asset.randomCode(),
      assetType: '1',
      maxIssuanceAmount: '1000000000.000000',
      initialPreissuedAmount: '1000000000.000000',
      preissuedAssetSigner: base.Keypair.random().accountId(),
      trailingDigitsCount: 6,
      details: {}
    }

    const operation = base
      .ManageAssetBuilder
      .assetCreationRequest({
        ...DEFAULTS,
        ...opts,
        requestID: '0',
        allTasks: 1
      })

    const { resultXdr } = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(resultXdr, 'manageAssetResult')
  }

  async mustLoad (code) {
    return Running.untilFound(async () => {
      const { data } = await this.sdk.horizon.assets.get(code)
      return data
    })
  }

  async loadStatsQuoteAsset () {
    const { data: assets } = await this.sdk.horizon.assets.getAll()

    return assets.find(
      asset => !!(asset.policy & ASSET_POLICIES.statsQuoteAsset)
    )
  }

  /**
   * @param opts
   * @param opts.code
   */
  remove (opts) {
    let op = RemoveAssetOpBuilder.removeAssetOp(opts)
    return this.submit(op)
  }
}
