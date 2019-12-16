import { Asset } from '../helpers/asset'
import { logger } from '../logger'
import { createAndApproveAsset } from './create_asset'
import { createFundedGeneral } from './create_account'
import {balanceHelper, redemptionHelper, requestHelper} from '../helpers'
import { getKvEntryWithFallback } from './get_task_from_kv'
import { KEY_VALUE_KEYS } from '../../src/const'
import { getOpResultFromXDR } from '../helpers/_helper'

async function prepareRedemption () {
  const log = logger.new('prepare redemption')
  let assetCode = Asset.randomCode('RDM')
  await createAndApproveAsset({
    code: assetCode,
    policies: 1
  })

  log.info(`Created asset for redemption, code ${assetCode}`)

  let fromAccFundAmount = '228'
  const fromAccount = await createFundedGeneral({
    [assetCode]: fromAccFundAmount
  })
  log.info(`Created account with id ${fromAccount.accountId} and funded it by ${fromAccFundAmount} ${assetCode}`)

  const fromBalance = await balanceHelper.mustLoad(fromAccount.accountId, assetCode)
  log.info(`Got from balance with id ${fromBalance.balanceId}`)

  const toAccount = await createFundedGeneral({
    [assetCode]: '1'
  })
  log.info(`Created account with id ${toAccount.accountId} with 1 ${assetCode} balance`)

  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.redemptionTasks, 1
  )
  log.info(`tasks to remove for redemption request defined, value: ${tasksToRemove}`)

  const redemptionAmount = '100'

  return {
    sourceBalanceId: fromBalance.balanceId,
    destination: toAccount.accountId,
    amount: redemptionAmount,
    reference: 'ref',
    creatorDetails: '{"creator": "details"}',
    fromAccount: fromAccount
  }
}

const redemptionTasks = 1

export async function initRedemption () {
  let opts = await prepareRedemption()
  opts.allTasks = redemptionTasks

  let response = await redemptionHelper.createRequest(opts, opts.fromAccount.accountKp)

  return getOpResultFromXDR(response.resultXdr, 'createRedemptionRequestResult')
    .redemptionResponse()
    .requestId()
    .toString()
}

export async function approveRedemption (requestId) {
  return requestHelper.approve(requestId, { tasksToRemove: redemptionTasks })
}
