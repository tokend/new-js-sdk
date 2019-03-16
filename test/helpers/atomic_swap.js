import { Running } from './_running'
import { getRequestIdFromResultXdr, Helper } from './_helper'
import { base } from '../../src'

export class AtomicSwap extends Helper {
  /**
   * @param opts
   * @param {string} opts.bidID - id of bid for which request will be created.
   * @param {string} opts.baseAmount - amount which will be bought
   * @param {string} opts.quoteAsset - accepted assets
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the request
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      creatorDetails: {
        name: opts.bidID + ' bid id',
        short_description: 'Short description',
        description: 'Not so short description',
        logo: {
          key: 'gjrhtbejwkrkwqq',
          type: 'image/png'
        }
      }
    }

    const operation = base.CreateAtomicSwapRequestBuilder.createASwapRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createASwapRequestResult')
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
