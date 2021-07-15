import { Asset } from '../helpers/asset'
import { createAndApproveAsset } from './create_asset'
import { logger } from '../logger'
import { createFundedGeneral } from './create_account'
import { getKvEntryWithFallback } from './get_task_from_kv'
import { KEY_VALUE_KEYS } from '../../src/const'
import { balanceHelper, paymentHelper } from '../helpers'

export async function constructPaymentWithSource (fromAccount, toAccount, assetCode, amount) {
  return {
    source: fromAccount.accountId(),
    ...await constructPayment(fromAccount, toAccount, assetCode, amount)
  }
}

export async function constructPayment (fromAccount, toAccount, assetCode, amount) {
  const log = logger.new('constructPayment')

  const fromBalance = await balanceHelper.mustLoad(fromAccount.accountId(), assetCode) // FIXME mustLoad loads balance of master if accountId is undefined
  log.info(`Got from balance with id ${fromBalance.balanceId}`)
  const toBalance = await balanceHelper.mustLoad(toAccount.accountId(), assetCode)
  log.info(`Got to balance with id ${toBalance.balanceId}`)

  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.paymentCreateTasks, 1
  )
  log.info(`tasks to remove for payment_create request defined, value: ${tasksToRemove}`)

  return {
    sourceBalanceId: fromBalance.balanceId,
    destination: toAccount.accountId(),
    amount: amount,
    feeData: {
      sourceFee: {
        percent: '1',
        fixed: '1'
      },
      destinationFee: {
        percent: '1',
        fixed: '1'
      },
      sourcePaysForDest: true
    },
    subject: 'subj',
    reference: Asset.randomCode('ref'),
    fromAccount: fromAccount
  }
}

async function preparePayment () {
  const log = logger.new('prepare payment')

  let assetCode = Asset.randomCode('USD')
  await createAndApproveAsset({
    code: assetCode,
    policies: 1
  })
  log.info(`Created asset for payment, code ${assetCode}`)

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

  const toBalance = await balanceHelper.mustLoad(toAccount.accountId, assetCode)
  log.info(`Got to balance with id ${toBalance.balanceId}`)

  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.paymentCreateTasks, 1
  )
  log.info(`tasks to remove for payment_create request defined, value: ${tasksToRemove}`)

  const paymentAmount = '100'

  return {
    sourceBalanceId: fromBalance.balanceId,
    destination: toBalance.balanceId,
    amount: paymentAmount,
    feeData: {
      sourceFee: {
        percent: '1',
        fixed: '1'
      },
      destinationFee: {
        percent: '1',
        fixed: '1'
      },
      sourcePaysForDest: true
    },
    subject: 'subj',
    reference: 'ref',
    fromAccount: fromAccount
  }
}

export async function createPaymentFromOpts (opts) {
  return paymentHelper.create(opts, opts.fromAccount)
}

export async function createPayment () {
  const log = logger.new('createPayment')

  let response = await createPaymentFromOpts(await preparePayment())
  log.info(`Created payment, response: ${response}`)

  return response
}

export async function createPaymentRequest () {
  const log = logger.new('createPayment')

  let opts = await preparePayment()
  opts.allTasks = 0

  let response = await paymentHelper.createRequest(opts, opts.fromAccount.accountKp)
  log.info(`Created payment request, response: ${response}`)
  return response
}
