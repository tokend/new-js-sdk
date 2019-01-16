import { Operation, xdr } from '../../src/base'
import { Helper } from './_helper'

export class AssetPair extends Helper {
  /**
   * @param opts
   * @param opts.base
   * @param opts.quote
   * @param [opts.price]
   * @param [opts.policies]
   */
  create (opts) {
    const operation = Operation.manageAssetPair({
      base: opts.base,
      quote: opts.quote,
      physicalPrice: opts.price || '1',
      policies: opts.policies || 0,
      physicalPriceCorrection: '0',
      maxPriceStep: '0',
      action: xdr.ManageAssetPairAction.create()
    })

    return this.submit(operation)
  }
}
