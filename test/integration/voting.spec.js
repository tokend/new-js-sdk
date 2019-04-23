import { closePoll } from '../scripts/close_poll'
import { createPoll } from '../scripts/create_poll'
import { createVotes } from '../scripts/close_poll'
import { Keypair } from '../../src/base'
import { accountHelper } from '../helpers'
import { logger } from '../logger'
import { cancelPoll } from '../scripts/cancel_poll'
import moment from '../helpers/poll'
import { updatePollEndTime } from '../scripts/update_poll_end_time'
import { Running } from '../helpers/_running'

describe('Voting', () => {
  it('should create poll and close it', async () => {
    const log = logger.new('voting')

    const ownerKp = Keypair.random()
    const resultProviderKp = Keypair.random()
    accountHelper.createSyndicate(ownerKp.accountId())
    log.info(`Created the poll owner account, id: ${ownerKp.accountId()}`)

    await accountHelper.createSyndicate(resultProviderKp.accountId())
    log.info(`Created the result provider account, id: ${resultProviderKp.accountId()}`)

    let poll = await createPoll(ownerKp, resultProviderKp)

    poll = await closePoll(poll.id, resultProviderKp)
    //2 means poll closed
    expect(poll.pollState.value).to.equal(2)
  })

  it('should create poll and cancel it', async () => {
    const log = logger.new('voting')

    const ownerKp = Keypair.random()
    const resultProviderKp = Keypair.random()
    accountHelper.createSyndicate(ownerKp.accountId())
    log.info(`Created the poll owner account, id: ${ownerKp.accountId()}`)

    await accountHelper.createSyndicate(resultProviderKp.accountId())
    log.info(`Created the result provider account, id: ${resultProviderKp.accountId()}`)

    let poll = await createPoll(ownerKp, resultProviderKp)

    poll = await cancelPoll(poll.id)
  //   4 means poll cancelled
    expect(poll.pollState.value).to.equal(4)
  })

  it('should create poll, update end time and close it', async () => {
    const log = logger.new('voting')

    const ownerKp = Keypair.random()
    const resultProviderKp = Keypair.random()
    accountHelper.createSyndicate(ownerKp.accountId())
    log.info(`Created the poll owner account, id: ${ownerKp.accountId()}`)

    await accountHelper.createSyndicate(resultProviderKp.accountId())
    log.info(`Created the result provider account, id: ${resultProviderKp.accountId()}`)

    let poll = await createPoll(ownerKp, resultProviderKp)

    poll = await updatePollEndTime(poll.id)

    poll = await closePoll(poll.id, resultProviderKp)
    // 2 means poll closed
    expect(poll.pollState.value).to.equal(2)
  })
})
