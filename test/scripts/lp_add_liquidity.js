import { logger } from '../logger'
import _times from 'lodash/times'
import { Asset } from '../helpers/asset'
import { createAndApproveAsset } from './create_asset'
import { balanceHelper, issuanceHelper, keyValueHelper, liquidityPoolHelper } from '../helpers'
import { KEY_VALUE_KEYS } from '../../src'

export async function lpAddLiquidity (opts) {
  const log = logger.new('lpAddLiquidity')

  const pairAssetCodes = _times(2, _ => Asset.randomCode())
  await Promise.all(
    pairAssetCodes.map(pairAssetCode => createAndApproveAsset({
      code: pairAssetCode
    }))
  )
  log.info(`Created the LP pair assets, codes: ${pairAssetCodes}`)

  const accountId = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
  const firstBalance = await balanceHelper.mustLoad(accountId, pairAssetCodes[0])
  const secondBalance = await balanceHelper.mustLoad(accountId, pairAssetCodes[1])
  log.info(`Loaded LP provider balances: ${firstBalance.balanceId}, ${secondBalance.balanceId}`)

  await keyValueHelper.putEntries({
    [KEY_VALUE_KEYS.issuanceTasks + ':*']: 0
  })
  const issuanceAmount = '1000'
  await issuanceHelper.fundAccount({
    balanceId: firstBalance.balanceId,
    amount: issuanceAmount,
    asset: pairAssetCodes[0]
  })
  await issuanceHelper.fundAccount({
    balanceId: secondBalance.balanceId,
    amount: issuanceAmount,
    asset: pairAssetCodes[1]
  })
  log.info(`Issued ${issuanceAmount} to provider's balances`)

  const liquidityPoolId = await liquidityPoolHelper.lpAddLiquidity({
    firstBalance: firstBalance.balanceId,
    secondBalance: secondBalance.balanceId,
    firstAssetDesiredAmount: opts.firstAssetDesiredAmount,
    secondAssetDesiredAmount: opts.secondAssetDesiredAmount,
    firstAssetMinAmount: opts.firstAssetMinAmount,
    secondAssetMinAmount: opts.secondAssetMinAmount
  })
  log.info(`Created liquidity pool with ID: ${liquidityPoolId}`)

  const pool = await liquidityPoolHelper.mustLoadByID(liquidityPoolId)
  log.info(`Got liquidity pool:`, pool)

  return {
    liquidityPool: pool,
    firstBalance: firstBalance.balanceId,
    secondBalance: secondBalance.balanceId
  }
}
