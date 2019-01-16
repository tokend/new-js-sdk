import { ASSET_POLICIES, KEY_VALUE_KEYS } from '../../src/const'
import { Asset } from '../helpers/asset'
import _times from 'lodash/times'

import {
  createAndApproveAsset,
  createStatsQuoteAsset
} from './create_asset'
import {
  sdk,
  assetPairHelper,
  requestHelper,
  saleHelper
} from '../helpers'

import { logger } from '../logger'
import { getKvEntryWithFallback } from './get_task_from_kv'

/**
 *
 * @param opts
 * @param {string} opts.baseAsset
 * @param {Keypair} ownerKp
 */
export async function createSale (opts, ownerKp) {
  const log = logger.new('createSale')

  const quoteAssetCodes = _times(3, _ => Asset.randomCode())
  await Promise.all(
    quoteAssetCodes.map(quoteAssetCode => createAndApproveAsset({
      policies: ASSET_POLICIES.baseAsset,
      code: quoteAssetCode
    }))
  )
  log.info(`Created the quote assets, codes: ${quoteAssetCodes}`)

  const statsQuoteAsset = await createStatsQuoteAsset()
  await Promise.all(
    quoteAssetCodes.map(code => assetPairHelper.create({
      base: statsQuoteAsset.code,
      quote: code
    }))
  )
  log.info('Paired quote assets with stats quote asset')

  const defaultQuoteAsset = Asset.randomCode('USD')
  await createAndApproveAsset({
    code: defaultQuoteAsset
  })
  log.info('Created sale\'s default quote asset')

  await Promise.all(
    quoteAssetCodes.map(code => assetPairHelper.create({
      base: defaultQuoteAsset,
      quote: code
    }))
  )
  log.info('Paired quote assets with default quote asset')

  const { data: baseAssetData } = await sdk.horizon.assets.get(opts.baseAsset)
  const maxAmountToBeSold = baseAssetData.maxIssuanceAmount
  log.info('Defined max amount to be sold: ' + maxAmountToBeSold)

  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.saleCreateTasks, 1
  )
  log.info('tasks to remove for sale_create requesr defined, value: ' + tasksToRemove)

  const requestId = await saleHelper.create({
    defaultQuoteAsset,
    baseAssetForHardCap: maxAmountToBeSold,
    baseAsset: opts.baseAsset,
    quoteAssets: quoteAssetCodes.map(asset => ({ price: '1', asset }))
  }, ownerKp)
  log.info(`Created the sale creation request, id: ${requestId}`)

  await requestHelper.approve(requestId, { tasksToRemove })
  log.info('Approved the sale creation request')

  const sale = await saleHelper.mustLoadByBaseAsset(opts.baseAsset)
  return {
    sale,
    ownerKp,
    ownerId: ownerKp.accountId()
  }
}
