import { KEY_VALUE_KEYS } from '../../src/const'
import {
  pollHelper,
  requestHelper
} from '../helpers'

import { logger } from '../logger'
import { getKvEntryWithFallback } from './get_task_from_kv'

/**
 *
 * @param {Keypair} ownerKp
 * @param {Keypair} resultProviderKp
 */
export async function createPoll (ownerKp, resultProviderKp) {
  const log = logger.new('createPoll')

  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.createPollTasks, 1
  )
  log.info('tasks to remove for create_poll request defined, value: ' + tasksToRemove)

  const requestId = await pollHelper.create({
    resultProviderID: resultProviderKp.accountId(),
    permissionType: '1',
    pollType: 0,
    numberOfChoices: '3'
  }, ownerKp)
  log.info(`Created the create poll request, id: ${requestId}`)

  await requestHelper.approve(requestId, { tasksToRemove: tasksToRemove })
  log.info('Approved the create poll request')

  return pollHelper.mustLoadByOwner(ownerKp.accountId())
}
