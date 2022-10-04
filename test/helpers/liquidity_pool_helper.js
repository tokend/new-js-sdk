import { getSuccessResultFromXDR, Helper } from './_helper'
import { base } from '../../src'
import { Running } from './_running'

export class LiquidityPoolHelper extends Helper {
  /**
   * @param {object} opts
   * @param {string} opts.firstBalance - ID of the first balance for providing liquidity
   * @param {string} opts.secondBalance - ID of the second balance for providing liquidity
   * @param {string} opts.firstAssetDesiredAmount - Desired amount of the first asset to be provided
   * @param {string} opts.secondAssetDesiredAmount - Desired amount of the second asset to be provided
   * @param {string} opts.firstAssetMinAmount - Min amount of the first asset to be provided
   * @param {string} opts.secondAssetMinAmount - Min amount of the second asset to be provided
   * @param {Keypair} signerKp
   * @returns {Promise<string>} - ID of the liquidity pool
   */
  async lpAddLiquidity (opts, signerKp = this.masterKp) {
    const op = base.LiquidityPoolBuilder.lpAddLiquidity(opts)
    const response = await this.submit(op, signerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'lpAddLiquidityResult').liquidityPoolId().toString()
  }

  /**
   * @param {object} opts
   * @param {number} opts.swapType - Type of the swap
   * @param {string} opts.amountIn - Amount of the assets to be provided
   * @param {string} opts.amountOut - Amount of the assets to be received
   * @param {string} opts.fromBalance - ID of the balance for providing assets
   * @param {string} opts.toBalance - ID of the balance for receiving assets
   * @returns {Promise<string>} - ID of the liquidity pool
   */
  async lpSwap (opts, signerKp = this.masterKp) {
    const op = base.LiquidityPoolBuilder.lpSwap(opts)
    const response = await this.submit(op, signerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'lpSwapResult').liquidityPoolId().toString()
  }

  async lpRemoveLiquidity (opts, signerKp = this.masterKp) {
    const op = base.LiquidityPoolBuilder.lpRemoveLiquidity(opts)
    const response = await this.submit(op, signerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'lpRemoveLiquidityResult').liquidityPoolId().toString()
  }

  async mustLoadByID (id) {
    return Running.untilFound(async () => {
      const { data } = await this.sdk.horizon.liquidityPools.get(id)
      return data
    })
  }
}
