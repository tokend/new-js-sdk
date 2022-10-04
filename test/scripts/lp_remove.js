import { logger } from '../logger'
import { liquidityPoolHelper } from '../helpers'

/**
 * @param {object} opts
 * @param {number} opts.lpTokensBalance - ID of the LP tokens balance
 * @param {number} opts.lpTokensAmount
 * @returns {Promise<string>} - ID of the liquidity pool
 */
export async function lpRemove (opts) {
  const log = logger.new('lpRemove')

  const liquidityPoolId = await liquidityPoolHelper.lpRemoveLiquidity({
    lpTokenBalance: opts.lpTokensBalance,
    lpTokensAmount: opts.lpTokensAmount,
    firstAssetMinAmount: '0',
    secondAssetMinAmount: '0'
  })
  log.info(`Removed liquidity from liquidity pool: ${liquidityPoolId}`)

  return liquidityPoolId
}
