import { Keypair } from '../../src/base'
import { accountHelper, assetPairHelper } from '../helpers'
import { Asset } from '../helpers/asset'
import { createAndApproveAsset } from '../scripts/create_asset'
import { logger } from '../logger'
import { ASSET_PAIR_POLICIES } from '../../src/const'

describe('Asset pair', () => {
  it('Create asset pair and remove it', async () => {
    const log = logger.new('asset pair')

    const ownerKp = Keypair.random()
    await accountHelper.createSyndicate(ownerKp.accountId())
    log.info('Created new user')

    const baseAssetCode = Asset.randomCode('BASE')
    const quoteAssetCode = Asset.randomCode('QUOTE')
    await Promise.all([
      createAndApproveAsset({ code: baseAssetCode }),
      createAndApproveAsset({ code: quoteAssetCode })
    ])
    log.info(`Created assets for order book, base: ${baseAssetCode}, quote: ${quoteAssetCode}`)

    await assetPairHelper.create({
      base: baseAssetCode,
      quote: quoteAssetCode,
      policies: ASSET_PAIR_POLICIES.tradeableSecondaryMarket
    })
    log.info(`Created tradeable asset pair, base: ${baseAssetCode}, quote: ${quoteAssetCode}`)

    await expectPromiseNoThrow(assetPairHelper.remove({
      base: baseAssetCode,
      quote: quoteAssetCode
    }))
    log.info(`Removed asset pair, base: ${baseAssetCode}, quote: ${quoteAssetCode}`)
  })
})
