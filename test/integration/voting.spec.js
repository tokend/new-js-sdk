import { closePoll } from '../scripts/close_poll'
import { createPoll } from '../scripts/create_poll'
import { createVotes } from '../scripts/close_poll'
import { Keypair } from '../../src/base'
import { accountHelper } from '../helpers'
import { logger } from '../logger'

describe('Voting', () => {
  it('should create poll and close it', async () => {
    const log = logger.new('voting')

    const ownerKp = Keypair.random()
    const resultProviderKp = Keypair.random()
    accountHelper.createSyndicate(ownerKp.accountId())
    log.info(`Created the poll owner account, id: ${ownerKp.accountId()}`)

    await accountHelper.createSyndicate(resultProviderKp.accountId())
    log.info(`Created the result provider account, id: ${resultProviderKp.accountId()}`)

    let { poll } = await createPoll(ownerKp, resultProviderKp)

    poll = await closePoll(poll.id, resultProviderKp)

    expect(poll.state.value).to.equal(1)
  })
})
