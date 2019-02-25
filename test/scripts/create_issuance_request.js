import { base } from '../../src'
import { KEY_VALUE_KEYS } from '../../src/const'
import { issuanceHelper, keyValueHelper, requestHelper } from '../helpers'
import { logger } from '../logger'

const TASKS_TO_REMOVE = 1

export async function createIssuanceRequestWithAutoApproval (account, asset, amount) {
  const log = logger.new('createIssuanceRequestWithAutoApproval')

  await keyValueHelper.putEntries({
    [`${KEY_VALUE_KEYS.issuanceTasks}:${asset}`]: 0
  })
  log.debug('Updated key/value storage with 0 issuance tasks, the request should be auto-approved now')

  await createIssuanceRequest(account, asset, amount)
}

export async function createIssuanceRequestAndApprove (account, asset, amount) {
  return createIssuanceRequestAndReview(
    account,
    asset,
    amount,
    base.xdr.ReviewRequestOpAction.approve().value
  )
}

export async function createIssuanceRequestAndReject (account, asset, amount) {
  return createIssuanceRequestAndReview(
    account,
    asset,
    amount,
    base.xdr.ReviewRequestOpAction.permanentReject().value,
    TASKS_TO_REMOVE,
    'something bad'
  )
}

export async function createIssuanceRequestAndReview (account, asset, amount, action, tasksToRemove = 0, reason = '') {
  const log = logger.new('createIssuanceRequestAndReview')

  const requestId = await createNotReviewedIssuanceRequest(account, asset, amount)

  await requestHelper.review(requestId, {
    action,
    reason,
    externalDetails: JSON.stringify({})
  })
  log.info(`Request #${requestId} reviewed, action - ${action}`)
}

export async function createNotReviewedIssuanceRequest (account, asset, amount) {
  const log = logger.new('createIssuanceRequestAndReview')

  await keyValueHelper.putEntries({
    [`${KEY_VALUE_KEYS.issuanceTasks}:${asset}`]: TASKS_TO_REMOVE
  })
  log.info('Updated key/value storage with issuance tasks, the request should not be auto-approved now')

  const requestId = await createIssuanceRequest(account, asset, amount)
  log.debug(`Got request ID: #${requestId}`)

  return requestId
}

async function createIssuanceRequest (account, asset, amount) {
  const log = logger.new('createIssuanceRequest')

  const balanceId = account
    .balances
    .find(balance => asset === balance.asset)
    .balanceId

  const requestId = await issuanceHelper.fundAccount({
    asset,
    amount,
    balanceId
  })

  log.info(`Request #${requestId} created`)

  return requestId
}
