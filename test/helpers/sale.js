import { SaleRequestBuilder } from '../../src/base'
import { Running } from './_running'
import { getRequestIdFromResultXdr, Helper } from './_helper'
import { base } from '../../src'
import { SALE_TYPES } from '../../src/const/enums.const'

import moment from 'moment'

export class Sale extends Helper {
  /**
   * @param opts
   * @param opts.baseAsset
   * @param opts.quoteAssets
   * @param opts.defaultQuoteAsset
   * @param opts.quoteAssets
   * @param [opts.baseAssetForHardCap]
   * @param [opts.startTime]
   * @param [opts.endTime]
   * @param [opts.softCap]
   * @param [opts.hardCap]
   * @param [opts.details]
   * @param [opts.saleType]
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the request
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      startTime: '' + moment().format('X'),
      endTime: '' + moment().add(1, 'day').format('X'),
      softCap: '10000.000000',
      hardCap: '50000.000000',
      creatorDetails: {
        name: opts.baseAsset + 'sale',
        short_description: 'Short description',
        description: 'Not so short description',
        logo: {
          key: 'gjrhtbejwkrkwqq',
          type: 'image/png'
        }
      },
      saleType: '1',
      saleEnumType: SALE_TYPES.fixedPrice
    }

    const operation = base.SaleRequestBuilder.createSaleCreationRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createSaleCreationRequestResult')
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

  async mustLoadByBaseAsset (baseAsset) {
    return Running.untilGotReturnValue(async () => {
      const { data } = await this.sdk.horizon.sales.getPage({
        base_asset: baseAsset
      })
      return data[0]
    })
  }
}
