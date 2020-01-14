import { Operation, xdr } from '../../src/base'
import { Helper } from './_helper'
import { RemoveAssetPairOpBuilder } from '../../src/base/operations/remove_asset_pair_op_builder'
import { Running } from './_running'

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

  /**
   * @param opts
   * @param opts.base
   * @param opts.quote
   */
  remove (opts) {
    let op = RemoveAssetPairOpBuilder.removeAssetPairOp(opts)
    return this.submit(op)
  }
}
