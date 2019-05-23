import { validateAssetCode } from '../../utils/validators'
import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'

export class RemoveAssetPairOpBuilder {
  /**
   * Creates remove asset pair operation.
   * In case of invalid params trows error.
   *
   * @param {object} opts
   * @param {string} opts.base - asset pair base asset
   * @param {string} opts.quote - asset pair quote asset
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.RemoveAssetPairOp}
   */
  static createRemoveAssetPairOp (opts) {
    this.validateRemoveAssetPairOp(opts)

    let removeAssetPairOp = new xdr.RemoveAssetPairOp({
      base: opts.base,
      quote: opts.quote,
      ext: new xdr.RemoveAssetPairOpExt(xdr.LedgerVersion.emptyVersion())
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.removeAssetPair(removeAssetPairOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Validates params for asset pair remove operation throws error in case of invalid param
   *
   * @param {object} opts
   * @param {string} opts.base - asset pair base asset
   * @param {string} opts.quote - asset pair quote asset
   */
  static validateRemoveAssetPairOp (opts) {
    validateAssetCode({ value: opts.base, fieldName: 'opts.base' })
    validateAssetCode({ value: opts.quote, fieldName: 'opts.quote' })
  }

  static removeAssetPairOpToObject (result, attrs) {
    result.base = attrs.base().toString()
    result.quote = attrs.quote().toString()
  }
}
