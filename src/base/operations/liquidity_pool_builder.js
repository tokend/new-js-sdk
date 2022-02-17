import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class LiquidityPoolBuilder {
  /**
  * Creates operation to provide liquidity
  * @param {object} opts
  * @param {string} opts.firstBalance - ID of the first balance for providing liquidity
  * @param {string} opts.secondBalance - ID of the second balance for providing liquidity
  * @param {string} opts.firstAssetDesiredAmount - Desired amount of the first asset to be provided
  * @param {string} opts.secondAssetDesiredAmount - Desired amount of the second asset to be provided
  * @param {string} opts.firstAssetMinAmount - Min amount of the first asset to be provided
  * @param {string} opts.secondAssetMinAmount - Min amount of the second asset to be provided
  * @returns {xdr.LpAddLiquidityOp}
  */
  static lpAddLiquidity (opts) {
    let op = this.validateLPAddLiquidity(opts)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.lpAddLiquidity(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static validateLPAddLiquidity (opts) {
    let attrs = {}

    if (!Keypair.isValidBalanceKey(opts.firstBalance)) {
      throw new Error('opts.firstBalance is invalid')
    }
    attrs.firstAssetBalanceId = Keypair.fromBalanceId(opts.firstBalance).xdrBalanceId()

    if (!Keypair.isValidBalanceKey(opts.secondBalance)) {
      throw new Error('opts.secondBalance is invalid')
    }
    attrs.secondAssetBalanceId = Keypair.fromBalanceId(opts.secondBalance).xdrBalanceId()

    if (!BaseOperation.isValidAmount(opts.firstAssetDesiredAmount, false)) {
      throw new Error('opts.firstAssetDesiredAmount is invalid')
    }
    attrs.firstAssetDesiredAmount =
      BaseOperation._toUnsignedXDRAmount(opts.firstAssetDesiredAmount)

    if (!BaseOperation.isValidAmount(opts.secondAssetDesiredAmount, false)) {
      throw new Error('opts.secondAssetDesiredAmount is invalid')
    }
    attrs.secondAssetDesiredAmount =
      BaseOperation._toUnsignedXDRAmount(opts.secondAssetDesiredAmount)

    if (!BaseOperation.isValidAmount(opts.firstAssetMinAmount, false)) {
      throw new Error('opts.firstAssetMinAmount is invalid')
    }
    attrs.firstAssetMinAmount = BaseOperation._toUnsignedXDRAmount(opts.firstAssetMinAmount)

    if (!BaseOperation.isValidAmount(opts.secondAssetMinAmount, false)) {
      throw new Error('opts.secondAssetMinAmount is invalid')
    }
    attrs.secondAssetMinAmount = BaseOperation._toUnsignedXDRAmount(opts.secondAssetMinAmount)

    attrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    return new xdr.LpAddLiquidityOp(attrs)
  }

  static lpAddLiquidityToObject (result, attrs) {
    result.firstBalance = BaseOperation.balanceIdtoString(attrs.firstAssetBalanceId())
    result.secondBalance = BaseOperation.balanceIdtoString(attrs.secondAssetBalanceId())
    result.firstAssetDesiredAmount =
        BaseOperation._fromXDRAmount(attrs.firstAssetDesiredAmount())
    result.secondAssetDesiredAmount =
        BaseOperation._fromXDRAmount(attrs.secondAssetDesiredAmount())
    result.firstAssetMinAmount = BaseOperation._fromXDRAmount(attrs.firstAssetMinAmount())
    result.secondAssetMinAmount = BaseOperation._fromXDRAmount(attrs.secondAssetMinAmount())
  }
}
