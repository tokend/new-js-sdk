import { ASSET_POLICIES } from '../../src/const'
import { assetHelper } from '../helpers'
import { requestHelper } from '../helpers'
import { saleHelper } from '../helpers'

import { Asset } from '../helpers/asset'

import _times from 'lodash/times'

/**
 *
 * @param opts
 * @param {string} opts.baseAsset
 * @param {Keypair} ownerKp
 */
export async function createSale (opts, ownerKp) {
  const quoteAssetCodes = _times(Asset.randomCode(), 3)
  const defaultQuoteAsset = Asset.randomCode('USD')

  await Promise.all(
    quoteAssetCodes.map(code => assetHelper.create({
      policies: ASSET_POLICIES.baseAsset,
      code
    }))
  )
  await assetHelper.create({ code: defaultQuoteAsset })

  const requestId = await saleHelper.create({
    defaultQuoteAsset,
    baseAsset: opts.baseAsset,
    quoteAssets: quoteAssetCodes.map(asset => ( {price: '1', asset} ))
  }, ownerKp)
  await requestHelper.approve(requestId)

  const { data: sale } = await saleHelper.mustLoadByQuery({
    base_asset: opts.baseAsset
  })

  return {
    sale,
    ownerKp,
    ownerId: ownerKp.accountId()
  }
}
