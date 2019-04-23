import { ManageCreatePollRequestBuilder, ManagePollBuilder, Keypair } from '../../src/base'
import { Running } from './_running'
import { getSuccessResultFromXDR, Helper } from './_helper'
import { ApiCaller } from '../../src/api2/api-caller'
import { Wallet } from '../../src/wallet'
import * as config from '../config'
import moment, { now } from 'moment'

export class Poll extends Helper {
  /**
   * @param opts
   * @param {number} opts.permissionType - is used to restrict using of poll through rules (uint64)
   * @param {string} opts.resultProviderID - AccountID of keypair which will sign create vote operation to send vote to poll, also on;y resultProvider can perform close poll operation
   * @param {number} opts.numberOfChoices - Number of possible choices (uint64)
   * @param {number} opts.pollType - functional type of poll
   * @param [opts.startTime]
   * @param [opts.endTime]
   * @param [opts.details]
   * @param {boolean} [opts.voteConfirmationRequired] - True means that signature of `resultProvider` is required to participate in poll voting
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the request
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      startTime: '' + moment().add(5, 's').format('X'),
      endTime: '' + moment().add(30, 's').format('X'),
      allTasks: 1,
      creatorDetails: {
        name: 'poll',
        short_description: 'Short description',
        description: 'Not so short description',
        logo: {
          key: 'gjrhtbejwkrkwqq',
          type: 'image/png'
        }
      },
      pollType: 0,
      permissionType: 1,
      voteConfirmationRequired: false
    }

    const operation = ManageCreatePollRequestBuilder.createPollRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'manageCreatePollRequestResult')
      .details().response().requestId().toString()
  }

  close (id, resultProviderKp) {
    const DEFAULTS = {
      details: {
        name: 'close poll',
        short_description: 'Short description',
        description: 'Not so short description',
        logo: {
          key: 'gjrhtbejwkrkwqq',
          type: 'image/png'
        }
      },
      result: 0
    }

    const opts = { pollID: id }

    return this.submit(ManagePollBuilder.closePoll({
      ...DEFAULTS,
      ...opts
    }), resultProviderKp)
  }

  cancel (id) {
    const opts = { pollID: id }

    return this.submit(ManagePollBuilder.cancelPoll({
      ...opts
    }))
  }

  updateEndTime (id, newEndTime) {
    const opts = {
      pollID: id,
      newEndTime: newEndTime
    }

    return this.submit(ManagePollBuilder.updatePollEndTime({
      ...opts
    }))
  }

  mustLoadById (id) {
    return Running.untilFound(async () => {
      let api = ApiCaller.getInstance(config.api_url)
      api._wallet = new Wallet(
        'qqq123@mail.com',
        Keypair.random(),
        Keypair.random().accountId(),
        'anyRandomStringWeDoNotCareNow'
      )

      const { data } = await api.get('/v3/polls/' + id)
      return data
    })
  }

  mustLoadClosed (id) {
    return Running.untilGotReturnValue(async () => {
      let api = ApiCaller.getInstance(config.api_url)
      api._wallet = new Wallet(
        'qqq123@mail.com',
        Keypair.random(),
        Keypair.random().accountId(),
        'anyRandomStringWeDoNotCareNow'
      )

      const { data } = await api.get('/v3/polls/' + id)
      // 2 means poll closed
      if (data.pollState.value !== 2) {
        return undefined
      }

      return data
    })
  }

  mustLoadEnded (id) {
    return Running.untilGotReturnValue(async () => {
      let api = ApiCaller.getInstance(config.api_url)
      api._wallet = new Wallet(
        'qqq123@mail.com',
        Keypair.random(),
        Keypair.random().accountId(),
        'anyRandomStringWeDoNotCareNow'
      )

      const { data } = await api.get('/v3/polls/' + id)
      let date = new Date(data.endTime)
      if (date.getTime() > new Date().getTime()) {
        return undefined
      }

      return data
    })
  }

  mustLoadCancelled (id) {
    return Running.untilGotReturnValue(async () => {
      let api = ApiCaller.getInstance(config.api_url)
      api._wallet = new Wallet(
        'qqq123@mail.com',
        Keypair.random(),
        Keypair.random().accountId(),
        'anyRandomStringWeDoNotCareNow'
      )

      const { data } = await api.get('/v3/polls/' + id)
      // 4 means poll cancelled
      if (data.pollState.value !== 4) {
        return undefined
      }

      return data
    })
  }

  async mustLoadByOwner (ownerID) {
    return Running.untilGotReturnValue(async () => {
      let api = ApiCaller.getInstance(config.api_url)
      api._wallet = new Wallet(
        'qqq123@mail.com',
        Keypair.random(),
        Keypair.random().accountId(),
        'anyRandomStringWeDoNotCareNow'
      )

      const { data } = await api.get('/v3/polls', { filter: { owner: ownerID } })
      return data[0]
    })
  }
}
