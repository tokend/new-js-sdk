import { KEY_VALUE_KEYS } from '../../src/const'
import { Asset } from '../helpers/asset'
import _times from 'lodash/times'

import { createAndApproveAsset } from './create_asset'

import { ensureAndGetBalanceId } from './create_sale_offer'

import { fundAccount } from './create_account'

import {
  sdk,
  requestHelper,
  atomicSwapAskHelper, balanceHelper,
} from '../helpers'

import { logger } from '../logger'
import { getKvEntryWithFallback } from './get_task_from_kv'

/**
 *
 * @param opts
 * @param {string} opts.baseAsset
 * @param {Keypair} ownerKp
 */
export async function createAtomicSwapAsk (opts, ownerKp) {
  const log = logger.new('createAtomicSwapAsk')

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
    KEY_VALUE_KEYS.atomicSwapAskTasks, 1
  )
  log.info('tasks to remove for atomic swap ask request defined, value: ' + tasksToRemove)

  const balanceID = await balanceHelper.mustLoad(ownerKp.accountId(), opts.baseAsset)
  log.info(`Got to balance with id ${balanceID.balanceId}`)

  const requestId = await atomicSwapAskHelper.create({
    balanceID: balanceID.balanceId,
    amount: '10',
    quoteAssets: quoteAssetCodes.map(asset => ({ price: '1', asset }))
  }, ownerKp)
  log.info(`Created the atomic swap ask creation request, id: ${requestId}`)

  await requestHelper.approve(requestId, { tasksToRemove: tasksToRemove })
  log.info('Approved the atomic swap ask creation request')

  const ask = await atomicSwapAskHelper.mustLoadByBaseAsset(opts.baseAsset)
  return {
    ask,
    ownerKp,
    ownerId: ownerKp.accountId()
  }
}
