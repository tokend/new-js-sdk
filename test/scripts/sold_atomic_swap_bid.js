import {
  atomicSwapHelper,
  atomicSwapBidHelper, requestHelper,
} from '../helpers'
import { logger } from '../logger'
import { createFundedGeneral } from './create_account'
import { getKvEntryWithFallback } from './get_task_from_kv'
import { KEY_VALUE_KEYS } from '../../src/const'

/**
 * @param {object} opts
 * @param {object} opts.bidID
 * @param {Keypair} signerKp
 * @returns {Promise<void>}
 */
export async function soldAtomicSwapBid (opts, signerKp) {
  const log = logger.new('soldAtomicSwapBid')

  const bid = await atomicSwapBidHelper.mustLoadById(opts.bidID)

  let baseAmount = '5'

  const [account1, account2] = await Promise.all([
    createFundedGeneral({ [bid.quoteAssets[0].id]: baseAmount }),
    createFundedGeneral({ [bid.quoteAssets[1].id]: baseAmount })
  ])
  log.info('New accounts created and funded')

  await Promise.all([
    createAndApproveAtomicSwapRequest(
      { baseAmount: baseAmount, bidID: bid.id, quoteAsset: bid.quoteAssets[0].id },
      account1.accountKp),
    createAndApproveAtomicSwapRequest(
      { baseAmount: baseAmount, bidID: bid.id, quoteAsset: bid.quoteAssets[1].id },
      account2.accountKp)
  ])
}

/**
 * @param opts
 * @param opts.baseAmount
 * @param opts.bidID
 * @param opts.quoteAsset
 * @param {Keypair} signerKp
 */
export async function createAndApproveAtomicSwapRequest (opts, signerKp) {
  const log = logger.new('createAtomicSwap')

  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.atomicSwapTasks, 1
  )
  log.info('tasks to remove for atomic swap request defined, value: ' + tasksToRemove)

  const requestId = await atomicSwapHelper.create(opts, signerKp)
  log.info('atomic swap request created' + requestId)

  await requestHelper.approve(requestId, { tasksToRemove: tasksToRemove })
  log.info('Approved the atomic swap request')
}
