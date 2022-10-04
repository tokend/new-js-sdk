import { lpAddLiquidity } from '../scripts/lp_add_liquidity'
import { lpSwap } from '../scripts/lp_swap'
import { lpRemove } from '../scripts/lp_remove'
import { balanceHelper } from '../helpers'
import xdr from '../../src/base/generated/xdr_generated'
import { BaseOperation } from '../../src/base/operations/base_operation'

describe('Liquidity pool', () => {
  it('Should create liquidity pool and provide liquidity', async () => {
    const firstAssetDesiredAmount = '1'
    const secondAssetDesiredAmount = '2'
    const firstAssetMinAmount = '0.1'
    const secondAssetMinAmount = '0.2'

    await lpAddLiquidity({
      firstAssetDesiredAmount: firstAssetDesiredAmount,
      secondAssetDesiredAmount: secondAssetDesiredAmount,
      firstAssetMinAmount: firstAssetMinAmount,
      secondAssetMinAmount: secondAssetMinAmount
    })
  })

  it('Should swap using liquidity pool', async () => {
    const firstAssetDesiredAmount = '1'
    const secondAssetDesiredAmount = '2'
    const firstAssetMinAmount = '0.1'
    const secondAssetMinAmount = '0.2'

    const poolInfo = await lpAddLiquidity({
      firstAssetDesiredAmount: firstAssetDesiredAmount,
      secondAssetDesiredAmount: secondAssetDesiredAmount,
      firstAssetMinAmount: firstAssetMinAmount,
      secondAssetMinAmount: secondAssetMinAmount
    })

    const accountId = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'

    let firstAsset = poolInfo.liquidityPool.data.attributes.firstAssetCode
    let secondAsset = poolInfo.liquidityPool.data.attributes.secondAssetCode
    let lpAccountId = poolInfo.liquidityPool.data.attributes.accountId

    let sourceFirstBalanceBefore = await balanceHelper.mustLoad(accountId, firstAsset)
    let sourceSecondBalanceBefore = await balanceHelper.mustLoad(accountId, secondAsset)
    let lpFirstBalanceBefore = await balanceHelper.mustLoad(lpAccountId, firstAsset)
    let lpSecondBalanceBefore = await balanceHelper.mustLoad(lpAccountId, secondAsset)

    let swap = function (x) { return x }
    if (sourceFirstBalanceBefore.balance > sourceSecondBalanceBefore.balance) {
      sourceFirstBalanceBefore = swap(sourceSecondBalanceBefore, sourceSecondBalanceBefore=sourceFirstBalanceBefore)
      firstAsset = swap(secondAsset, secondAsset=firstAsset)
      lpFirstBalanceBefore = swap(lpSecondBalanceBefore, lpSecondBalanceBefore=lpFirstBalanceBefore)
    }

    const amountIn = '10000'
    const amountOut = '0.5'
    const expectedAmountIn = '2'

    await lpSwap({
      fromBalance: sourceFirstBalanceBefore.balanceId,
      toBalance: sourceSecondBalanceBefore.balanceId,
      swapType: xdr.LpSwapType.exactOutTokensForInToken().value,
      amountIn: amountIn,
      amountOut: amountOut
    })

    let sourceFirstBalanceAfter = await balanceHelper.mustLoad(accountId, firstAsset)
    let sourceSecondBalanceAfter = await balanceHelper.mustLoad(accountId, secondAsset)
    let lpFirstBalanceAfter = await balanceHelper.mustLoad(lpAccountId, firstAsset)
    let lpSecondBalanceAfter = await balanceHelper.mustLoad(lpAccountId, secondAsset)

    expect(Number(sourceFirstBalanceAfter.balance)).to.be.equal(+sourceFirstBalanceBefore.balance - +expectedAmountIn)
    expect(Number(sourceSecondBalanceAfter.balance)).to.be.equal(+sourceSecondBalanceBefore.balance + +amountOut)
    expect(Number(lpFirstBalanceAfter.balance)).to.be.equal(+lpFirstBalanceBefore.balance + +expectedAmountIn)
    expect(Number(lpSecondBalanceAfter.balance)).to.be.equal(+lpSecondBalanceBefore.balance - +amountOut)
  })

  it ('Should remove liquidity', async () => {
    const firstAssetDesiredAmount = '1'
    const secondAssetDesiredAmount = '2'
    const firstAssetMinAmount = '0.1'
    const secondAssetMinAmount = '0.2'

    const poolInfo = await lpAddLiquidity({
      firstAssetDesiredAmount: firstAssetDesiredAmount,
      secondAssetDesiredAmount: secondAssetDesiredAmount,
      firstAssetMinAmount: firstAssetMinAmount,
      secondAssetMinAmount: secondAssetMinAmount
    })

    const accountId = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    const lpBalance = await balanceHelper.mustLoad(accountId, poolInfo.liquidityPool.data.attributes.lpTokensAsset)

    let firstAsset = poolInfo.liquidityPool.data.attributes.firstAssetCode
    let secondAsset = poolInfo.liquidityPool.data.attributes.secondAssetCode
    let lpAccountId = poolInfo.liquidityPool.data.attributes.accountId

    let sourceFirstBalanceBefore = await balanceHelper.mustLoad(accountId, firstAsset)
    let sourceSecondBalanceBefore = await balanceHelper.mustLoad(accountId, secondAsset)
    let lpFirstBalanceBefore = await balanceHelper.mustLoad(lpAccountId, firstAsset)
    let lpSecondBalanceBefore = await balanceHelper.mustLoad(lpAccountId, secondAsset)

    let swap = function (x) { return x }
    if (sourceFirstBalanceBefore.balance > sourceSecondBalanceBefore.balance) {
      sourceFirstBalanceBefore = swap(sourceSecondBalanceBefore, sourceSecondBalanceBefore=sourceFirstBalanceBefore)
      firstAsset = swap(secondAsset, secondAsset=firstAsset)
      lpFirstBalanceBefore = swap(lpSecondBalanceBefore, lpSecondBalanceBefore=lpFirstBalanceBefore)
    }

    const lpTokensAmount = '0.5'
    const firstAssetAmount = '0.707107'
    const secondAssetAmount = '0.353553'

    await lpRemove({
      lpTokensBalance: lpBalance.balanceId,
      lpTokensAmount: lpTokensAmount
    })

    let sourceFirstBalanceAfter = await balanceHelper.mustLoad(accountId, firstAsset)
    let sourceSecondBalanceAfter = await balanceHelper.mustLoad(accountId, secondAsset)
    let lpFirstBalanceAfter = await balanceHelper.mustLoad(lpAccountId, firstAsset)
    let lpSecondBalanceAfter = await balanceHelper.mustLoad(lpAccountId, secondAsset)

    expect(Number(sourceFirstBalanceAfter.balance)).to.be.equal(+sourceFirstBalanceBefore.balance + +firstAssetAmount)
    expect(parseFloat(sourceSecondBalanceAfter.balance).toFixed(3)).to.be.equal(parseFloat(+sourceSecondBalanceBefore.balance + +secondAssetAmount).toFixed(3))
    expect(parseFloat(lpFirstBalanceAfter.balance).toFixed(3)).to.be.equal(parseFloat(+lpFirstBalanceBefore.balance - +firstAssetAmount).toFixed(3))
    expect(Number(lpSecondBalanceAfter.balance)).to.be.equal(+lpSecondBalanceBefore.balance - +secondAssetAmount)
  })
})
