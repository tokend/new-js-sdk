import { OpenSwapBuilder, CloseSwapBuilder, Keypair } from '../../src/base'
import { Running } from './_running'
import { getSuccessResultFromXDR, Helper } from './_helper'
import { ApiCaller } from '../../src/api2/api-caller'
import { Wallet } from '../../src/wallet'
import * as config from '../config'

export class Swap extends Helper {
  /**
   /**
   * Creates OpenSwap operation where destination is AccountID or BalanceID
   * @param {object} opts
   * @param {string} opts.sourceBalance
   * @param {string} opts.destination
   * @param {number|string} opts.amount
   * @param {object} opts.feeData
   * * @param {object} opts.feeData.sourceFee
   * * * @param {number|string} opts.feeData.sourceFee.percent
   * * * @param {number|string} opts.feeData.sourceFee.fixed
   * * @param {object} opts.feeData.destinationFee
   * * * @param {number|string} opts.feeData.destinationFee.percent
   * * * @param {number|string} opts.feeData.destinationFee.fixed
   * * @param {bool} opts.feeData.sourcePaysForDest
   * @param {string} opts.secretHash
   * @param {string} opts.lockTime
   * @param {object} opts.details
   * @param {string} [opts.source]
   * @returns {string} the ID of the swap
   * @param {Keypair} source
   */
  async create (opts, source = this.masterKp) {
    const operation = OpenSwapBuilder.openSwap(opts)
    const response = await this.submit(operation, source)

    return getSuccessResultFromXDR(response.resultXdr, 'openSwapResult').swapId().toString()
  }

  close (id, secret, source = this.masterKp) {
    let opts = {
      swapId: id,
      secret: secret,
      source: source.accountId()
    }

    return this.submit(CloseSwapBuilder.closeSwap(opts), source)
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

      const { data } = await api.get('/v3/swaps/' + id)
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

      const { data } = await api.get('/v3/swaps/' + id)
      // 2 means swap closed
      if (data.state.value !== 2) {
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

      const data = await this.mustLoadById(id)
      let date = new Date(data.lockTime)
      let currDate = new Date()
      if (date.getTime() > currDate.getTime()) {
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

      const { data } = await api.get('/v3/swaps/' + id)
      if (data.state.value !== 3) {
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

      const { data } = await api.get('/v3/swaps', { filter: { source: ownerID } })
      return data[0]
    })
  }
}
