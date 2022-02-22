import { logger } from '../logger'
import { liquidityPoolHelper } from '../helpers'

/**
 * @param {object} opts
 * @param {number} opts.swapType - Type of the swap
 * @param {string} opts.fromBalance - ID of the balance for providing assets
 * @param {string} opts.toBalance - ID of the balance for receiving assets
 * @returns {string} - ID of the liquidity pool
 */
export async function lpSwap (opts) {
  const log = logger.new('lpSwap')

  const liquidityPoolId = await liquidityPoolHelper.lpSwap({
    fromBalance: opts.fromBalance,
    toBalance: opts.toBalance,
    swapType: opts.swapType,
    amountIn: '1000',
    amountOut: '0.5'
  })
  log.info(`Swapped with liquidity pool: ${liquidityPoolId}`)

  return liquidityPoolId
}
