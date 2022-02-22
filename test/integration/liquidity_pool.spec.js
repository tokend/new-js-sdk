import { lpAddLiquidity } from '../scripts/lp_add_liquidity'
import { lpSwap } from '../scripts/lp_swap'
import xdr from '../../src/base/generated/xdr_generated'
import { lpRemove } from '../scripts/lp_remove'
import { balanceHelper } from '../helpers'

describe('Liquidity pool', () => {
  it('Should create liquidity pool and provide liquidity', async () => {
    await lpAddLiquidity()
  })

  it('Should swap using liquidity pool', async () => {
    const poolInfo = await lpAddLiquidity()

    await lpSwap({
      fromBalance: poolInfo.firstBalance,
      toBalance: poolInfo.secondBalance,
      swapType: xdr.LpSwapType.exactOutTokensForInToken().value
    })
  })

  it ('Should remove liquidity', async () => {
    const poolInfo = await lpAddLiquidity()

    const accountId = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    const lpBalance = await balanceHelper.mustLoad(accountId, poolInfo.liquidityPool.data.attributes.lpTokensAsset)

    await lpRemove({
      lpTokensBalance: lpBalance.balanceId,
      lpTokensAmount: '0.7'
    })
  })
})