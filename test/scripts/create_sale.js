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
  saleHelper,
  keyValueHelper
} from '../helpers'

import { log } from '../log'

/**
 *
 * @param opts
 * @param {string} opts.baseAsset
 * @param {Keypair} ownerKp
 */
export async function createSale (opts, ownerKp) {
  log.debug('Create sale script execution started')

  log.debug('Creating the list of quote assets')
  const quoteAssetCodes = _times(3, _ => Asset.randomCode())
  await Promise.all(
    quoteAssetCodes.map(quoteAssetCode => createAndApproveAsset({
      policies: ASSET_POLICIES.baseAsset,
      code: quoteAssetCode
    }))
  )
  log.debug('Created list of quote assets')

  log.debug('Created the stats quote asset')
  const statsQuoteAsset = await createStatsQuoteAsset()
  log.debug('Created stats quote asset')

  log.debug('Pairing quote assets with stats quote asset')
  await Promise.all(
    quoteAssetCodes.map(code => assetPairHelper.create({
      base: statsQuoteAsset.code,
      quote: code
    }))
  )
  log.debug('Paired quote assets with stats quote asset')

  log.debug('Creating default quote asset for our sale')
  const defaultQuoteAsset = Asset.randomCode('USD')
  await createAndApproveAsset({
    code: defaultQuoteAsset
  })
  log.debug('Created default quote asset for our sale')

  log.debug('Pairing quote assets with default quote asset')
  await Promise.all(
    quoteAssetCodes.map(code => assetPairHelper.create({
      base: defaultQuoteAsset,
      quote: code
    }))
  )
  log.debug('Paired quote assets with default quote asset')

  log.debug('Lading base asset to define max amount to be sold')
  const { data: baseAssetData } = await sdk.horizon.assets.get(opts.baseAsset)
  const maxAmountToBeSold = baseAssetData.maxIssuanceAmount
  log.debug('Loaded base asset, max amount to be sold: ' + maxAmountToBeSold)

  log.debug('Trying to define tasks to remove')
  let tasksToRemove = await keyValueHelper.getEntryValue(
    KEY_VALUE_KEYS.saleCreateTasks
  )

  if (!tasksToRemove) {
    log.debug('Tasks to remove not set in the k/v storage')
    tasksToRemove = 1
    log.debug('Creating k/v entry for tasks to remove, value: ' + tasksToRemove)
    await keyValueHelper.putEntries({
      [KEY_VALUE_KEYS.saleCreateTasks]: tasksToRemove
    })
  }
  log.debug('tasks to remove value defined, value: ' + tasksToRemove)

  log.debug('Creating the sale itself')
  const requestId = await saleHelper.create({
    defaultQuoteAsset,
    baseAssetForHardCap: maxAmountToBeSold,
    baseAsset: opts.baseAsset,
    quoteAssets: quoteAssetCodes.map(asset => ({ price: '1', asset }))
  }, ownerKp)
  log.debug('Created the sale creation request')

  log.debug('Approving the sale creation request')
  await requestHelper.approve(requestId, { tasksToRemove })
  log.debug('Approved the sale creation request')

  log.debug('Loading newly created sale')
  const sale = await saleHelper.mustLoadByBaseAsset(opts.baseAsset)
  log.debug('Loaded newly created sale, returning')

  return {
    sale,
    ownerKp,
    ownerId: ownerKp.accountId()
  }
}
