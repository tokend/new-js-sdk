import {
  pollHelper
} from '../helpers'

import { logger } from '../logger'

/**
 *
 * @param {string} pollID
 */
export async function cancelPoll (pollID) {
  const log = logger.new('cancelPoll')

  await pollHelper.cancel(pollID)
  log.info(`Poll cancelled, id: ${pollID}`)

  return pollHelper.mustLoadCancelled(pollID)
}
