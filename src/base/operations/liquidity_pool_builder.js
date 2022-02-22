import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import isUndefined from 'lodash/isUndefined'

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

  /**
   * Creates operation for liquidity pool swap
   * @param {object} opts
   * @param {number} opts.swapType - Type of the swap
   * @param {string} opts.amountIn - Amount of the assets to be provided
   * @param {string} opts.amountOut - Amount of the assets to be received
   * @param {string} opts.fromBalance - ID of the balance for providing assets
   * @param {string} opts.toBalance - ID of the balance for receiving assets
   * @returns {xdr.LpSwapOp}
   */
  static lpSwap (opts) {
    let op = this.validateLPSwap(opts)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.lpSwap(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static validateLPSwap (opts) {
    let attrs = {}

    if (!Keypair.isValidBalanceKey(opts.fromBalance)) {
      throw new Error('opts.fromBalance is invalid')
    }
    attrs.fromBalance = Keypair.fromBalanceId(opts.fromBalance).xdrBalanceId()

    if (!Keypair.isValidBalanceKey(opts.toBalance)) {
      throw new Error('opts.toBalance is invalid')
    }
    attrs.toBalance = Keypair.fromBalanceId(opts.toBalance).xdrBalanceId()

    let validSwapType = !isUndefined(opts.swapType) &&
      xdr.LpSwapType._byValue.has(opts.swapType)
    if (!validSwapType) {
      throw new Error('opts.swapType is invalid')
    }

    if (!BaseOperation.isValidAmount(opts.amountIn, false)) {
      throw new Error('opts.amountIn is invalid')
    }
    if (!BaseOperation.isValidAmount(opts.amountOut, false)) {
      throw new Error('opts.amountOut is invalid')
    }

    switch (opts.swapType) {
      case xdr.LpSwapType.exactInTokensForOutToken().value: {
        attrs.lpSwapRequest = xdr.LpSwapOpLpSwapRequest.exactInTokensForOutToken()
        attrs.lpSwapRequest.set('exactInTokensForOutToken', new xdr.LpSwapOpSwapExactInTokensForOutTokens({
          amountIn: BaseOperation._toUnsignedXDRAmount(opts.amountIn),
          amountOutMin: BaseOperation._toUnsignedXDRAmount(opts.amountOut)
        }))
        break
      }
      case xdr.LpSwapType.exactOutTokensForInToken().value: {
        attrs.lpSwapRequest = xdr.LpSwapOpLpSwapRequest.exactOutTokensForInToken()
        attrs.lpSwapRequest.set('exactOutTokensForInToken', new xdr.LpSwapOpSwapExactOutTokensForInTokens({
          amountInMax: BaseOperation._toUnsignedXDRAmount(opts.amountIn),
          amountOut: BaseOperation._toUnsignedXDRAmount(opts.amountOut)
        }))
        break
      }
      default:
        throw new Error('Non-implemented LpSwapType')
    }

    let sourceFee = new xdr.Fee({
      percent: BaseOperation._toUnsignedXDRAmount('0'),
      fixed: BaseOperation._toUnsignedXDRAmount('0'),
      ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
    })
    let destinationFee = new xdr.Fee({
      percent: BaseOperation._toUnsignedXDRAmount('0'),
      fixed: BaseOperation._toUnsignedXDRAmount('0'),
      ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
    })
    attrs.feeData = new xdr.PaymentFeeData({
      sourceFee,
      destinationFee,
      sourcePaysForDest: false,
      ext: new xdr.PaymentFeeDataExt(xdr.LedgerVersion.emptyVersion())
    })

    attrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    return new xdr.LpSwapOp(attrs)
  }

  static lpSwapToObject (result, attrs) {
    result.fromBalance = BaseOperation.balanceIdtoString(attrs.fromBalance())
    result.toBalance = BaseOperation.balanceIdtoString(attrs.toBalance())
    result.swapType = attrs.lpSwapRequest().switch()
    switch (attrs.lpSwapRequest().switch()) {
      case xdr.LpSwapType.exactInTokensForOutToken(): {
        let request = attrs.lpSwapRequest().swapExactInTokensForOutTokens()
        result.amountIn = BaseOperation._fromXDRAmount(request.amountIn())
        result.amountOut = BaseOperation._fromXDRAmount(request.amountOutMin())
        break
      }
      case xdr.LpSwapType.exactOutTokensForInToken(): {
        let request = attrs.lpSwapRequest().swapExactOutTokensForInTokens()
        result.amountIn = BaseOperation._fromXDRAmount(request.amountInMax())
        result.amountOut = BaseOperation._fromXDRAmount(request.amountOut())
        break
      }
      default:
        throw new Error('Non-implemented LpSwapType')
    }
  }

  /**
   * Creates operation to remove liquidity
   * @param {object} opts
   * @param {number} opts.lpTokenBalance - ID of the LP tokens balance
   * @param {string} opts.lpTokensAmount - Amount of tokens to be exchanged for LP assets
   * @param {string} opts.firstAssetMinAmount - Minimal amount of first asset to be received
   * @param {string} opts.secondAssetMinAmount - Minimal amount of second asset to be received
   * @returns {xdr.LpRemoveLiquidityOp}
   */
  static lpRemoveLiquidity (opts) {
    let op = this.validateLPRemoveLiquidity(opts)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.lpRemoveLiquidity(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static validateLPRemoveLiquidity (opts) {
    let attrs = {}

    if (!Keypair.isValidBalanceKey(opts.lpTokenBalance)) {
      throw new Error('opts.lpTokenBalance is invalid')
    }
    attrs.lpTokenBalance = Keypair.fromBalanceId(opts.lpTokenBalance).xdrBalanceId()

    if (!BaseOperation.isValidAmount(opts.lpTokensAmount, false)) {
      throw new Error('opts.lpTokensAmount is invalid')
    }
    attrs.lpTokensAmount = BaseOperation._toUnsignedXDRAmount(opts.lpTokensAmount)

    if (!BaseOperation.isValidAmount(opts.firstAssetMinAmount, true)) {
      throw new Error('opts.firstAssetMinAmount is invalid')
    }
    attrs.firstAssetMinAmount = BaseOperation._toUnsignedXDRAmount(opts.firstAssetMinAmount)

    if (!BaseOperation.isValidAmount(opts.secondAssetMinAmount, true)) {
      throw new Error('opts.secondAssetMinAmount is invalid')
    }
    attrs.secondAssetMinAmount = BaseOperation._toUnsignedXDRAmount(opts.secondAssetMinAmount)

    attrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    return new xdr.LpRemoveLiquidityOp(attrs)
  }

  static lpRemoveLiquidityToObject (result, attrs) {
    result.lpTokenBalance = BaseOperation.balanceIdtoString(attrs.lpTokenBalance())
    result.lpTokensAmount = BaseOperation._fromXDRAmount(attrs.lpTokensAmount())
    result.firstAssetMinAmount = BaseOperation._fromXDRAmount(attrs.firstAssetMinAmount())
    result.secondAssetMinAmount = BaseOperation._fromXDRAmount(attrs.secondAssetMinAmount())
  }
}
