import { createFundedGeneral } from './create_account'
import { createAndApproveAsset } from './create_asset'
import { assetPairHelper } from '../helpers'
import { logger } from '../logger'
import { Asset } from '../helpers/asset'

import { createOffer } from './create_sale_offer'
import { ASSET_PAIR_POLICIES } from '../../src/const'

export async function createAndPopulateOrderBook () {
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

  const actors = []
  for (let i = 0; i < 5; i++) {
    const balances = {
      [baseAssetCode]: '1000.0000',
      [quoteAssetCode]: '1000.0000'
    }

    const { accountId, accountKp } = await createFundedGeneral(balances)
    log.info(`Actor ${accountId} created, ready to place offer`)

    actors.push(accountKp)
  }

  for (const actorKp of actors) {
    const amountToBuy = getRandomArbitrary('2.000000', '5.000000')
    const priceToBuy = '44.55' // getRandomArbitrary('1.000000', '3.000000')

    await createOffer({
      quoteAsset: quoteAssetCode,
      baseAsset: baseAssetCode,
      amount: amountToBuy,
      price: priceToBuy,
      orderBookID: '0',
      isBuy: true
    }, actorKp)
    log.info(`actor ${actorKp.accountId()} made an offer to buy ${amountToBuy} ${baseAssetCode}`)

    const amountToSell = getRandomArbitrary('5.100000', '8.000000') // we don't want offers to match here
    const priceToSell = '66.11' // getRandomArbitrary('4.000000', '5.000000')
    await createOffer({
      quoteAsset: quoteAssetCode,
      baseAsset: baseAssetCode,
      amount: amountToSell,
      price: priceToSell,
      orderBookID: '0',
      isBuy: false
    }, actorKp)
    log.info(`actor ${actorKp.accountId()} made an offer to sell ${amountToSell} ${baseAssetCode}`)
  }
}

export function getRandomArbitrary (min, max) {
  const n = Math.random() * (Number(max) - Number(min)) + Number(min)
  return n.toFixed(6)
}
