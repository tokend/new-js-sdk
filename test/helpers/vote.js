import { ManageVoteBuilder, Keypair } from '../../src/base'
import { Running } from './_running'
import { getSuccessResultFromXDR, Helper } from './_helper'
import { ApiCaller } from '../../src/api2/api-caller'
import { Wallet } from '../../src/wallet'
import * as config from '../config'
import moment from 'moment'

export class Vote extends Helper {
  /**
   * @param opts
   * @param {string} opts.pollID - is used to restrict using of poll through rules (uint64)
   * @param {string} opts.choice - functional type of poll
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the request
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      pollType: 0,
      choice: '1'
    }

    const operation = ManageVoteBuilder.createVote({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'manageVoteResult')
  }

  close (id) {
    return this.submit(ManagePollBuilder.closePoll({ pollID: id }))
  }

  mustLoadById (id) {
    return Running.untilFound(async () => {
      const { data } = await this.sdk.horizon.sales.get(id)
      return data
    })
  }

  mustLoadClosed (id) {
    return Running.untilGotReturnValue(async () => {
      const { data: sale } = await this.sdk.horizon.sales.get(id)
      if (sale.state.value !== SALE_STATES.closed) {
        return undefined
      }
      return sale
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
