import { Keypair } from '../../src/base'
import { Running } from './_running'
import { getRequestIdFromResultXdr, Helper } from './_helper'
import { base } from '../../src'
import { Wallet } from '../../src/wallet'
import { ApiCaller } from '../../src/api2/api-caller'
import * as config from '../config'
import { logger } from '../logger'

export class AtomicSwapAsk extends Helper {
  /**
   * @param opts
   * @param opts.balanceID
   * @param opts.amount
   * @param opts.quoteAssets
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the request
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      amount: '10.000000',
      allTasks: 1,
      creatorDetails: {
        name: opts.baseAsset + 'sale',
        short_description: 'Short description',
        description: 'Not so short description',
        logo: {
          key: 'gjrhtbejwkrkwqq',
          type: 'image/png'
        }
      },
    }

    const operation = base.CreateAtomicSwapAskRequestBuilder.createAtomicSwapAskRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createAtomicSwapAskRequestResult')
  }
  mustLoadById (id) {
    return Running.untilFound(async () => {
      let api = ApiCaller.getInstance('http://localhost:8000')
      api._wallet = new Wallet(
        'qqq123@mail.com',
        Keypair.random(),
        Keypair.random().accountId(),
        'anyRandomStringWeDoNotCareNow'
      )

      const { data } = await api.get('/v3/atomic_swap_asks/' + id)
      return data
    })
  }

  async tryLoadById (id) {
    const log = logger.new('tryLoadById')

    let api = ApiCaller.getInstance(config.api_url)
    api._wallet = new Wallet(
      'qqq123@mail.com',
      Keypair.random(),
      Keypair.random().accountId(),
      'anyRandomStringWeDoNotCareNow'
    )

    const { response } = await api.get('/v3/atomic_swap_asks/' + id)
    if (!response) {
      log.info('/v3/atomic_swap_asks/' + id + ' returned empty response.')
    }

    return response
  }

  async mustLoadByBaseAsset (baseAsset) {
    return Running.untilGotReturnValue(async () => {
      let api = ApiCaller.getInstance('http://localhost:8000')
      api._wallet = new Wallet(
        'qqq123@mail.com',
        Keypair.random(),
        Keypair.random().accountId(),
        'anyRandomStringWeDoNotCareNow'
      )

      const { data } = await api.get('/v3/atomic_swap_asks', { filter: { base_asset: baseAsset } })
      return data[0]
    })
  }
}
