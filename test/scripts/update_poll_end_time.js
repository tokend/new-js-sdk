import {
  pollHelper
} from '../helpers'
import isUndefined from 'lodash/isUndefined'
import { logger } from '../logger'
import moment from 'moment'
/**
 *
 * @param {string} pollID
 * @param {string} newEndTime
 */
export async function updatePollEndTime (pollID, newEndTime) {
  const log = logger.new('updatePollEndTime')
  if (isUndefined(newEndTime)) {
    newEndTime = '' + moment().add(30, 's').format('X')
  }

  await pollHelper.mustLoadById(pollID)

  await pollHelper.updateEndTime(pollID, newEndTime)

  log.info(`Poll updated, id: ${pollID}`)

  return pollHelper.mustLoadById(pollID)
}
