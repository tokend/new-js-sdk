import { Asset } from '../helpers/asset'
import { createAndApproveAsset } from './create_asset'
import { assetPairHelper } from '../helpers'
import { ASSET_PAIR_POLICIES } from '../../src/const'
import { logger } from '../logger'
import { createOffer } from './create_sale_offer'
import { createFundedGeneral } from './create_account'

export async function createOfferWithSmallBigQuoteValue () {
  const log = logger.new('populateExchange')
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
  const size = 12
  const balances = {
    [baseAssetCode]: '1000.0000',
    [quoteAssetCode]: '1000.0000'
  }
  const { accountId, accountKp } = await createFundedGeneral(balances)
  log.info(`Actor ${accountId} created, ready to place offer`)
  const actors = accountKp
  const priceToSell = ['0.000001', '0.00001', '0.0001', '0.001', '0.01', '0.1',
    '9000000000000.000000', '9000000000000.000000', '9000000000000.000000',
    '9000000000000.000000', '9000000000000.000000', '9000000000000.000000']
  for (let i = 0; i < size; ++i) {
    const amountToSell = '1'

    await createOffer({
      quoteAsset: quoteAssetCode,
      baseAsset: baseAssetCode,
      amount: amountToSell,
      price: priceToSell[i],
      orderBookID: '0',
      isBuy: false
    }, actors)
    log.info(`actor ${actors.accountId()} made an offer to sell ${amountToSell} ${baseAssetCode} for price ${priceToSell[i]}`)
  }
}
