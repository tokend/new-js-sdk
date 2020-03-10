import { Asset } from '../helpers/asset'
import { createAndApproveAsset } from './create_asset'
import { logger } from '../logger'
import { createFundedGeneral } from './create_account'
import { getKvEntryWithFallback } from './get_task_from_kv'
import { KEY_VALUE_KEYS } from '../../src/const'
import {accountHelper, balanceHelper, paymentHelper} from '../helpers'
import { Keypair } from '../../src/base'

async function preparePayment () {
  const roleID = '1'
  const accountKp = Keypair.random()
  const accountId = accountKp.accountId()
  await accountHelper.create({
    roleID,
    id: accountId
  })
  let assetCode = Asset.randomCode('USD')
  await createAndApproveAsset({
    code: assetCode,
    policies: 1
  }, accountKp)

  let fromAccFundAmount = '228'
  const fromAccount = await createFundedGeneral({
    [assetCode]: fromAccFundAmount
  }, accountKp, false)
  const fromBalance = await balanceHelper.mustLoad(fromAccount.accountId, assetCode)

  const toAccount = await createFundedGeneral({
    [assetCode]: '1'
  }, accountKp, true)

  const toBalance = await balanceHelper.mustLoad(toAccount.accountId, assetCode)

  await getKvEntryWithFallback(
    KEY_VALUE_KEYS.paymentCreateTasks, 1
  )

  const paymentAmount = '100'
  const randomArray = ['A', 'B', 'C']
  let refString = ''
  for (let i = 0; i < 3; ++i) {
    refString = refString.concat(randomArray[Math.floor(Math.random() * randomArray.length)])
  }
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
    reference: refString,
    fromAccount: fromAccount
  }
}

export async function createPaymentStory () {
  const log = logger.new('createPayment')

  let opts = await preparePayment()

  let response = await paymentHelper.create(opts, opts.fromAccount.accountKp)
  log.info(`Created payment request with reference: ${opts.reference}`)
  return response
}
