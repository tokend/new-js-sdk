import { ASSET_POLICIES, KEY_VALUE_KEYS } from '../../src/const'
import { Asset } from '../helpers/asset'
import _times from 'lodash/times'

import {
  createAndApproveAsset,
  createStatsQuoteAsset
} from './create_asset'
import {
  sdk, assetPairHelper, requestHelper, saleHelper, keyValueHelper
} from '../helpers'

/**
 *
 * @param opts
 * @param {string} opts.baseAsset
 * @param {Keypair} ownerKp
 */
export async function createSale (opts, ownerKp) {
  console.log('Create sale script execution started')

  console.log('Creating the list of quote assets')
  const quoteAssetCodes = _times(3, _ => Asset.randomCode())
  await Promise.all(
    quoteAssetCodes.map(quoteAssetCode => createAndApproveAsset({
      policies: ASSET_POLICIES.baseAsset,
      code: quoteAssetCode
    }))
  )
  console.log('Created list of quote assets')

  console.log('Created the stats quote asset')
  const statsQuoteAsset = await createStatsQuoteAsset()
  console.log('Created stats quote asset')

  console.log('Pairing quote assets with stats quote asset')
  await Promise.all(
    quoteAssetCodes.map(code => assetPairHelper.create({
      base: statsQuoteAsset.code,
      quote: code
    }))
  )
  console.log('Paired quote assets with stats quote asset')

  console.log('Creating default quote asset for our sale')
  const defaultQuoteAsset = Asset.randomCode('USD')
  await createAndApproveAsset({
    code: defaultQuoteAsset
  })
  console.log('Created default quote asset for our sale')

  console.log('Pairing quote assets with default quote asset')
  await Promise.all(
    quoteAssetCodes.map(code => assetPairHelper.create({
      base: defaultQuoteAsset,
      quote: code
    }))
  )
  console.log('Paired quote assets with default quote asset')

  console.log('Lading base asset to define max amount to be sold')
  const { data: baseAssetData } = await sdk.horizon.assets.get(opts.baseAsset)
  const maxAmountToBeSold = baseAssetData.maxIssuanceAmount
  console.log('Loaded base asset, max amount to be sold: ' + maxAmountToBeSold)

  console.log('Trying to define tasks to remove')
  let tasksToRemove = await keyValueHelper.getEntryValue(
    KEY_VALUE_KEYS.saleCreateTasks
  )

  if (!tasksToRemove) {
    console.log('Tasks to remove not set in the k/v storage')
    tasksToRemove = 1
    console.log('Creating k/v entry for tasks to remove, value: ' + tasksToRemove)
    await keyValueHelper.putEntries({
      [KEY_VALUE_KEYS.saleCreateTasks]: tasksToRemove
    })
  }
  console.log('tasks to remove value defined, value: ' + tasksToRemove)

  console.log('Creating the sale itself')
  const requestId = await saleHelper.create({
    defaultQuoteAsset,
    baseAssetForHardCap: maxAmountToBeSold,
    baseAsset: opts.baseAsset,
    quoteAssets: quoteAssetCodes.map(asset => ({ price: '1', asset }))
  }, ownerKp)
  console.log('Created the sale creation request')

  console.log('Approving the sale creation request')
  await requestHelper.approve(requestId, { tasksToRemove })
  console.log('Approved the sale creation request')

  console.log('Loading newly created sale')
  const sale = await saleHelper.mustLoadByBaseAsset(opts.baseAsset)
  console.log('Loaded newly created sale, returning')

  return {
    sale,
    ownerKp,
    ownerId: ownerKp.accountId()
  }
}
