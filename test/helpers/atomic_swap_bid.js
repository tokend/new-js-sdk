import { CancelAtomicSwapBidBuilder, CreateAtomicSwapBidCreationRequestBuilder } from '../../src/base'
import { Running } from './_running'
import { getRequestIdFromResultXdr, Helper } from './_helper'
import { base } from '../../src'

export class AtomicSwapBid extends Helper {
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

    const operation = base.CreateAtomicSwapBidCreationRequestBuilder
      .createASwapBidCreationRequest({
        ...DEFAULTS,
        ...opts
      })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createASwapBidCreationRequestResult')
  }

  checkSaleState (id) {
    return this.submit(SaleRequestBuilder.checkSaleState({ saleID: id }))
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

  async mustLoadByBaseAsset (baseAsset) {
    return Running.untilGotReturnValue(async () => {
      const { data } = await this.sdk.horizon.sales.getPage({
        base_asset: baseAsset
      })
      return data[0]
    })
  }
}
