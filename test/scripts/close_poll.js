import {
  voteHelper, accountHelper, pollHelper
} from '../helpers'

import { logger } from '../logger'
import { Keypair } from '../../src/base'

/**
 *
 * @param {string} pollID
 * @param {Keypair} resultProviderKp
 */
export async function closePoll (pollID, resultProviderKp) {
  const log = logger.new('createVotes')

  let poll = await pollHelper.mustLoadById(pollID)

  log.info('number of choices ' + poll.numberOfChoices)

  await Promise.all([ async function () {
    for (let i = 1; i <= poll.numberOfChoices; i++) {
      const voter = Keypair.random()
      accountHelper.createSyndicate(voter.accountId())
      log.info(`Created the account, id: ${voter.accountId()}`)
      voteHelper.create({ pollID: pollID, choice: i }, voter)
    }
  }])

  await pollHelper.close(pollID, resultProviderKp)

  return pollHelper.mustLoadClosed(pollID)
}
