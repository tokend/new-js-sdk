import { Operation, xdr } from '../../src/base'
import { Helper } from './_helper'

export class AssetPair extends Helper {
  /**
   * @param opts
   * @param opts.base
   * @param opts.quote
   * @param [opts.physicalPrice]
   * @param [opts.policies]
   */
  create (opts) {
    const DEFAULTS = {
      physicalPrice: '1',
      policies: 0
    }

    const operation = Operation.manageAssetPair({
      ...DEFAULTS,
      ...opts,
      action: xdr.ManageAssetPairAction.create(),
      physicalPriceCorrection: '0',
      maxPriceStep: '0'
    })

    return this.submit(operation)
  }
}
