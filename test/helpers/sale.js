import { SaleRequestBuilder } from '../../src/base'
import { Running } from './_running'
import { getRequestIdFromResultXdr, getSuccessResultFromXDR, Helper } from './_helper'
import { base } from '../../src'
import { SALE_TYPES } from '../../src/const/enums.const'
import { SALE_STATES } from '../../src/const'
import moment from 'moment'

export class Sale extends Helper {
  /**
   * @param opts
   * @param opts.baseAsset
   * @param opts.quoteAssets
   * @param opts.defaultQuoteAsset
   * @param opts.quoteAssets
   * @param [opts.requiredBaseAssetForHardCap]
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
      saleType: '1',
      saleEnumType: SALE_TYPES.fixedPrice,
      saleRules: []
    }

    const operation = base.SaleRequestBuilder.createSaleCreationRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createSaleCreationRequestResult')
  }

  /**
   * @param opts
   * @param opts.saleID
   * @param [opts.accountID]
   * @param [opts.forbids]
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the rule
   */
  async createSaleRule (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      forbids: false
    }

    const op = base.ManageAccountSpecificRuleBuilder.createSaleRule({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(op, ownerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'manageAccountSpecificRuleResult')
      .ruleId().toString()
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
