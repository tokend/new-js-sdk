import {
  voteHelper, accountHelper, pollHelper
} from '../helpers'

import { logger } from '../logger'
import { Keypair } from '../../src/base'

/**
 *
 * @param {string} pollID
 * @param {Keypair} resultProviderKp
 * @param {number} type
 */
export async function closePoll (pollID, resultProviderKp, type) {
  const log = logger.new('createVotes')

  let poll = await pollHelper.mustLoadById(pollID)

  log.info('number of choices ' + poll.numberOfChoices)

  for (let i = 1; i <= poll.numberOfChoices - 1; i++) {
    const voter = Keypair.random()
    await accountHelper.createSyndicate(voter.accountId())
    log.info(`Created the account, id: ${voter.accountId()}`)
    switch (type) {
      case 0:
        await voteHelper.createSingle({ pollID: pollID, choice: poll.numberOfChoices }, voter)
        break
      case 1:
        await voteHelper.createCustom({ pollID: pollID, choice: 'custom' }, voter)
        break
    }
  }

  const voter = Keypair.random()
  await accountHelper.createSyndicate(voter.accountId())
  log.info(`Created the account, id: ${voter.accountId()}`)
  switch (type) {
    case 0:
      await voteHelper.createSingle({ pollID: pollID, choice: poll.numberOfChoices }, voter)
      break
    case 1:
      await voteHelper.createCustom({ pollID: pollID, choice: 'custom' }, voter)
      break
  }

  await pollHelper.mustLoadEnded(pollID)
  log.info(`Poll ended, id: ${pollID}`)

  await pollHelper.close(pollID, resultProviderKp)
  log.info(`Poll closed, id: ${pollID}`)

  return pollHelper.mustLoadClosed(pollID)
}
