import { validateAssetCode } from '../../utils/validators'
import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'

export class RemoveAssetOpBuilder {
  /**
   * Creates remove asset operation.
   * In case of invalid params trows error.
   *
   * @param {object} opts
   * @param {string} opts.code - asset code
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   * @returns {xdr.RemoveAssetOp}
   */
  static removeAssetOp (opts) {
    this._validateRemoveAssetOp(opts)

    let removeAssetOp = new xdr.RemoveAssetOp({
      code: opts.code,
      ext: new xdr.RemoveAssetOpExt(xdr.LedgerVersion.emptyVersion())
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.removeAsset(removeAssetOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static removeAssetOpToObject (result, attrs) {
    result.code = attrs.code().toString()
  }

  // Helpers
  /**
   * Validates params for asset pair remove operation throws error in case of invalid param
   *
   * @param {object} opts
   * @param {string} opts.code - asset pair quote asset
   */
  static _validateRemoveAssetOp (opts) {
    validateAssetCode({ value: opts.code, fieldName: 'opts.code' })
  }
}
