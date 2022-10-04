import { LiquidityPoolBuilder } from './liquidity_pool_builder'
import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'

describe('Liquidity pool', () => {
  it('Add liquidity', () => {
    let opt = {
      firstBalance: 'BBRZIIZLA7W7OYZAS4OE4FR2ZZT74DXGBE3XXWG6GIPK4N37CO7NRRES',
      secondBalance: 'BAHSXUMBQA6DXOERXIRLETQAUAT7YPDEGF7SV4MIIM75LBQ7CUHBDLWB',
      firstAssetDesiredAmount: '2.2',
      secondAssetDesiredAmount: '1.1',
      firstAssetMinAmount: '2.2',
      secondAssetMinAmount: '1.1'
    }

    let op = LiquidityPoolBuilder.lpAddLiquidity(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.lpAddLiquidity().name)
    expect(opt.firstBalance).to.be.equal(obj.firstBalance)
    expect(opt.secondBalance).to.be.equal(obj.secondBalance)
    expect(opt.firstAssetDesiredAmount).to.be.equal(obj.firstAssetDesiredAmount)
    expect(opt.secondAssetDesiredAmount).to.be.equal(obj.secondAssetDesiredAmount)
    expect(opt.firstAssetMinAmount).to.be.equal(obj.firstAssetMinAmount)
    expect(opt.secondAssetMinAmount).to.be.equal(obj.secondAssetMinAmount)
  })

  it('Swap exact in', () => {
    let opt = {
      swapType: xdr.LpSwapType.exactInTokensForOutToken().value,
      amountIn: '1',
      amountOut: '2',
      fromBalance: 'BAHSXUMBQA6DXOERXIRLETQAUAT7YPDEGF7SV4MIIM75LBQ7CUHBDLWB',
      toBalance: 'BBRZIIZLA7W7OYZAS4OE4FR2ZZT74DXGBE3XXWG6GIPK4N37CO7NRRES'
    }

    let op = LiquidityPoolBuilder.lpSwap(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.lpSwap().name)
    expect(opt.swapType).to.be.equal(obj.swapType.value)
    expect(opt.amountIn).to.be.equal(obj.amountIn)
    expect(opt.amountOut).to.be.equal(obj.amountOut)
    expect(opt.fromBalance).to.be.equal(obj.fromBalance)
    expect(opt.toBalance).to.be.equal(obj.toBalance)
  })

  it('Swap exact out', () => {
    let opt = {
      swapType: xdr.LpSwapType.exactOutTokensForInToken().value,
      amountIn: '1',
      amountOut: '2',
      fromBalance: 'BAHSXUMBQA6DXOERXIRLETQAUAT7YPDEGF7SV4MIIM75LBQ7CUHBDLWB',
      toBalance: 'BBRZIIZLA7W7OYZAS4OE4FR2ZZT74DXGBE3XXWG6GIPK4N37CO7NRRES'
    }

    let op = LiquidityPoolBuilder.lpSwap(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.lpSwap().name)
    expect(opt.swapType).to.be.equal(obj.swapType.value)
    expect(opt.amountIn).to.be.equal(obj.amountIn)
    expect(opt.amountOut).to.be.equal(obj.amountOut)
    expect(opt.fromBalance).to.be.equal(obj.fromBalance)
    expect(opt.toBalance).to.be.equal(obj.toBalance)
  })

  it('Remove liquidity', () => {
    let opt = {
      lpTokenBalance: 'BAHSXUMBQA6DXOERXIRLETQAUAT7YPDEGF7SV4MIIM75LBQ7CUHBDLWB',
      lpTokensAmount: '1',
      firstAssetMinAmount: '1',
      secondAssetMinAmount: '2'
    }

    let op = LiquidityPoolBuilder.lpRemoveLiquidity(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.lpRemoveLiquidity().name)
    expect(opt.lpBalanceId).to.be.equal(obj.lpBalanceId)
    expect(opt.lpTokensAmount).to.be.equal(obj.lpTokensAmount)
    expect(opt.firstAssetMinAmount).to.be.equal(obj.firstAssetMinAmount)
    expect(opt.secondAssetMinAmount).to.be.equal(obj.secondAssetMinAmount)
  })
})
