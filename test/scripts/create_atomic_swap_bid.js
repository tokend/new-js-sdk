import { KEY_VALUE_KEYS } from '../../src/const'
import { Asset } from '../helpers/asset'
import _times from 'lodash/times'

import { createAndApproveAsset } from './create_asset'

import { ensureAndGetBalanceId } from './create_sale_offer'

import { fundAccount } from './create_account'

import {
  sdk,
  requestHelper,
  atomicSwapBidHelper,
} from '../helpers'

import { logger } from '../logger'
import { getKvEntryWithFallback } from './get_task_from_kv'

/**
 *
 * @param opts
 * @param {string} opts.baseAsset
 * @param {Keypair} ownerKp
 */
export async function createAtomicSwapBid (opts, ownerKp) {
  const log = logger.new('createAtomicSwapBid')

  await fundAccount(ownerKp.accountId(), { [opts.baseAsset]: '10' }, ownerKp)

  const quoteAssetCodes = _times(3, _ => Asset.randomCode())
  await Promise.all(
    quoteAssetCodes.map(quoteAssetCode => createAndApproveAsset({
      code: quoteAssetCode
    }))
  )
  log.info(`Created the quote assets, codes: ${quoteAssetCodes}`)

  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.atomicSwapBidTasks, 1
  )
  log.info('tasks to remove for atomic swap bid request defined, value: ' + tasksToRemove)

  const balanceID = ensureAndGetBalanceId(ownerKp.accountId(), opts.baseAsset)

  const requestId = await atomicSwapBidHelper.create({
    balanceID: balanceID,
    amount: '10',
    quoteAssets: quoteAssetCodes.map(asset => ({ price: '1', asset }))
  }, ownerKp)
  log.info(`Created the atomic swap bid creation request, id: ${requestId}`)

  await requestHelper.approve(requestId, { tasksToRemove: tasksToRemove })
  log.info('Approved the atomic swap bid creation request')

  const sale = await saleHelper.mustLoadByBaseAsset(opts.baseAsset)
  return {
    sale,
    ownerKp,
    ownerId: ownerKp.accountId()
  }
}
