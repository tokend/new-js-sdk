import { NotFoundError } from '../../src/errors'
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
   * @param opts.baseAssetForHardCap
   * @param [opts.startTime]
   * @param [opts.endTime]
   * @param [opts.softCap]
   * @param [opts.hardCap]
   * @param [opts.details]
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the request
   */
  async create (opts, ownerKp = this.masterKp) {
    const operation = base.SaleRequestBuilder.createSaleCreationRequest({
      requestID: '0',
      baseAsset: opts.baseAsset,
      quoteAssets: opts.quoteAssets,
      defaultQuoteAsset: opts.defaultQuoteAsset,
      baseAssetForHardCap: opts.baseAssetForHardCap,
      startTime: opts.startTime || +moment.now().format('X'),
      endTime: opts.endTime || +moment.now().add(1, 'day').format('X'),
      softCap: opts.softCap || '10000.000000',
      hardCap: opts.hardCap || '50000.000000',
      details: opts.details || {},
      saleType: opts.saleType || SALE_TYPES.fixedPrice
    })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createSaleCreationRequestResult')
  }

  mustLoadById (id) {
    try {
      return this.sdk.horizon.sales.get(id)
    } catch (e) {
      if (e instanceof NotFoundError) {
        return this.mustLoadById(id)
      }

      throw e
    }
  }

  mustLoadByQuery (query) {
    try {
      return this.sdk.horizon.sales.getPage(query)
    } catch (e) {
      if (e instanceof NotFoundError) {
        return this.mustLoadByQuery(query)
      }

      throw e
    }
  }
}
