import { KEY_VALUE_KEYS } from '../../src/const'
import { logger } from '../logger'
import { withdrawHelper, requestHelper, keyValueHelper } from '../helpers'

const TASKS_TO_REMOVE = 1

export async function createPendingWithdrawalRequest (account, asset, amount, signerKp) {
  const log = logger.new('createNotReviewWithdrawalRequest')

  await keyValueHelper.putEntries({
    [`${KEY_VALUE_KEYS.withdrawalTasks}:${asset}`]: TASKS_TO_REMOVE
  })
  log.info(`Updated key/value storage with withdrawal tasks = ${TASKS_TO_REMOVE}`)

  const balance = account.balances
    .find(balance => asset === balance.asset)
    .balanceId

  const requestId = await withdrawHelper.createRequest({
    balance,
    amount
  }, signerKp)
  log.info(`Withdraw request #${requestId} created`)

  return requestId
}

export async function createApprovedWithdrawalRequest (account, asset, amount, signerKp) {
  const log = logger.new('createApprovedWithdrawalRequest')

  const requestId = await createPendingWithdrawalRequest(account, asset, amount, signerKp)
  log.info(`Ready to approve #${requestId} withdraw request`)

  await requestHelper.approveWithdraw(requestId, {
    tasksToRemove: TASKS_TO_REMOVE
  }, signerKp)
  log.info(`#${requestId} withdraw request approved`)
}

export async function createRejectedWithdrawalRequest (account, asset, amount, signerKp) {
  const log = logger.new('createApprovedWithdrawalRequest')

  const requestId = await createPendingWithdrawalRequest(account, asset, amount, signerKp)
  log.info(`Ready to approve #${requestId} withdraw request`)

  await requestHelper.rejectWithdraw(requestId, {
    reason: 'Sorry, you did something bad'
  }, signerKp)
  log.info(`#${requestId} withdraw request rejected`)
}
