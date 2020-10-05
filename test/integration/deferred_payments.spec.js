import { logger } from '../logger'
import { Keypair } from '../../src/base'
import { accountHelper, balanceHelper, deferredPaymentHelper, api, masterKP } from '../helpers'
import { Asset } from '../helpers/asset'
import { createAndApproveAsset } from '../scripts/create_asset'
import { createFundedAccount, createFundedGeneral } from '../scripts/create_account'

describe('Deferred payments', ()  => {
  it('Create deferred payment', async () => {
    const log = logger.new('deferred payments')

    let assetCode = Asset.randomCode('USD')
    await createAndApproveAsset({
      code: assetCode,
      policies: 1
    })
    log.info(`Created asset for payment, code ${assetCode}`)

    let fromAccFundAmount = '228'
    const fromAccount = await createFundedAccount('1',{
      [assetCode]: fromAccFundAmount
    })
    log.info(`Created account with id ${fromAccount.accountId} and funded it by ${fromAccFundAmount} ${assetCode}`)

    const receiver = Keypair.random()
    await accountHelper.createSyndicate(receiver.accountId())
    log.info(`Created receiver with id ${receiver.accountId()}`)

    const fromBalance = await balanceHelper.mustLoad(fromAccount.accountId, assetCode)
    log.info(`Got from balance with id ${fromBalance.balanceId}`)

    const count = 1000
    const payments = []
    for (var i = 0; i < count; i++) {
      payments.push({
        "amount": "10.00",
        "destination": fromAccount.accountId,
        "destination_type": "account_id"
      })
    }

    const resp = await api.postWithSignature("/blobs", {
      data: {
        type: "alpha",
        attributes: {
          value: JSON.stringify(payments)
        },
        relationships: {
          owner: {
            data: {
              id: masterKP.accountId()
            }
          }
        }
      }
    })

    const requestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {
        blobs: [resp.data.id]
      }
    })
    log.info(`Created request with id ${requestID}`)

    // await deferredPaymentHelper.closeDeferredPayment({
    //   deferredPaymentID: '8',
    //   destination: fromBalance.balanceId,
    //   amount: '100',
    //   allTasks: 0
    // })
  })
})
