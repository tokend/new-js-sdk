import { KEY_VALUE_KEYS } from '../../src/const'
import { Asset } from '../helpers/asset'
import _times from 'lodash/times'

import { createAndApproveAsset } from './create_asset'

import { ensureAndGetBalanceId } from './create_sale_offer'

import { fundAccount } from './create_account'

import {
  sdk,
  requestHelper,
  atomicSwapBidHelper, balanceHelper,
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

  const quoteAssetCodes = _times(2, _ => Asset.randomCode())
  await Promise.all(
    quoteAssetCodes.map(quoteAssetCode => createAndApproveAsset({
      code: quoteAssetCode,
      policies: 64
    }))
  )
  log.info(`Created the quote assets, codes: ${quoteAssetCodes}`)

  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.atomicSwapBidTasks, 1
  )
  log.info('tasks to remove for atomic swap bid request defined, value: ' + tasksToRemove)

  const balanceID = await balanceHelper.mustLoad(ownerKp.accountId(), opts.baseAsset)
  log.info(`Got to balance with id ${balanceID.balanceId}`)

  const requestId = await atomicSwapBidHelper.create({
    balanceID: balanceID.balanceId,
    amount: '10',
    quoteAssets: quoteAssetCodes.map(asset => ({ price: '1', asset }))
  }, ownerKp)
  log.info(`Created the atomic swap bid creation request, id: ${requestId}`)

  await requestHelper.approve(requestId, { tasksToRemove: tasksToRemove })
  log.info('Approved the atomic swap bid creation request')

  const bid = await atomicSwapBidHelper.mustLoadByBaseAsset(opts.baseAsset)
  return {
    bid,
    ownerKp,
    ownerId: ownerKp.accountId()
  }
}
