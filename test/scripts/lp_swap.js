import { logger } from '../logger'
import { liquidityPoolHelper } from '../helpers'

/**
 * @param {object} opts
 * @param {number} opts.swapType - Type of the swap
 * @param {string} opts.fromBalance - ID of the balance for providing assets
 * @param {string} opts.toBalance - ID of the balance for receiving assets
 * @param {string} opts.amountIn - Amount of the assets to be provided
 * @param {string} opts.amountOut - Amount of the assets to be received
 * @returns {Promise<string>} - ID of the liquidity pool
 */
export async function lpSwap (opts) {
  const log = logger.new('lpSwap')

  const liquidityPoolId = await liquidityPoolHelper.lpSwap({
    fromBalance: opts.fromBalance,
    toBalance: opts.toBalance,
    swapType: opts.swapType,
    amountIn: opts.amountIn,
    amountOut: opts.amountOut
  })
  log.info(`Swapped with liquidity pool: ${liquidityPoolId}`)

  return liquidityPoolId
}
