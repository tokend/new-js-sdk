import { logger } from '../logger'
import { Keypair } from '../../src/base'
import {
  accountHelper,
  balanceHelper,
  deferredPaymentHelper,
  api,
  masterKP,
  requestHelper
} from '../helpers'
import { Asset } from '../helpers/asset'
import { createAndApproveAsset } from '../scripts/create_asset'
import { createFundedAccount } from '../scripts/create_account'
import { Running } from '../helpers/_running'

describe('Deferred payments', ()  => {
  it('Create deferred payment', async () => {
    const log = logger.new('deferred payments')

    const data = await api.get('integrations/mass-payments/info')

    expect(data.data.accountId).to.exist
  })

  it("create deferred payment request", async () => {
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

    const requestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {}
    })

    expect(requestID).to.exist
  })

  it("create deferred payment request failed", async () => {
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

    await catchPromise(deferredPaymentHelper.create({
      sourceBalanceId: "BBRZIIZLA7W7OYZAS4OE4FR2ZZT74DXGBE3XXWG6GIPK4N37CO7NRRES",
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {}
    }))
  })

  it('update & cancel create deferred payment request', async () => {
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

    const requestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {}
    })

    log.info("trying to update request")

    await deferredPaymentHelper.create({
      requestID: requestID,
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {
        test: 'test'
      }
    })

    log.info('trying cancel request')

    await deferredPaymentHelper.cancelDeferredPayment({
      requestID: requestID
    })

    log.info('trying cancel already canceled request')

    await catchPromise(deferredPaymentHelper.cancelDeferredPayment({
      requestID: requestID
    }))
  })

  it('receive create deferred payment requests', async () => {
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

    const requestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {}
    })

    log.info('trying to get request by id')
    await requestHelper.mustLoad(requestID)
    var resp = await api.getWithSignature(`v3/create_deferred_payments_requests/${requestID}`)
    expect(resp.data.id === requestID)

    log.info('trying to get request list')

    log.info('filter by requestor')
    resp = await api.getWithSignature(`/v3/create_deferred_payments_requests?filter[requestor]=${fromAccount.accountId}`)
    expect(resp.data.length >= 1)

    log.info('filter by reviewer')
    resp = await api.getWithSignature(`/v3/create_deferred_payments_requests?filter[reviewer]=${masterKP.accountId()}`)
    expect(resp.data.length >= 1)

    log.info('filter by state')
    resp = await api.getWithSignature('/v3/create_deferred_payments_requests?filter[state]=2')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks')
    resp = await api.getWithSignature('/v3/create_deferred_payments_requests?filter[pending_tasks]=1')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks_not_set')
    resp = await api.getWithSignature('/v3/create_deferred_payments_requests?filter[pending_tasks_not_set]=1048576')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks_any_of')
    resp = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks_any_of]=1')
    expect(resp.data.length >= 1)
  })

  it('create & approve', async () => {
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

    const requestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {}
    })

    await requestHelper.approve(requestID, {tasksToRemove: 1})
  })

  it('create & reject', async () => {
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

    const requestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {}
    })

    await requestHelper.reject(requestID, {tasksToAdd: 4, reason: "because"})
  })

  it('create & permanent reject', async () => {
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

    const requestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {}
    })

    await requestHelper.permanentReject(requestID, {reason: "because"})
  })

  it('receive deferred payment status', async () => {
    const log = logger.new('deferred payments')

    const info = await api.get('integrations/mass-payments/info')

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

    const fromBalance = await balanceHelper.mustLoad(fromAccount.accountId, assetCode)
    log.info(`Got from balance with id ${fromBalance.balanceId}`)

    const count = 10
    const payments = []
    for (var i = 0; i < count; i++) {
      payments.push({
        "amount": "10.00",
        "destination": info.data.accountId,
        "destination_type": "account_id"
      })
    }

    var resp = await api.postWithSignature("/blobs", {
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

    await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: info.data.accountId,
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {
        blobs: [resp.data.id]
      }
    })

    await Running.delay(60000)

    log.info('filter by reviewer')
    resp = await api.getWithSignature(`/integrations/mass-payments/requests?filter[owner]=${fromAccount.accountId}`)
    expect(resp.data.length >= 1)

    log.info('filter by source balance')
    resp = await api.getWithSignature(`/integrations/mass-payments/requests?filter[source_balance]=${fromBalance.balanceId}`)
    expect(resp.data.length >= 1)

    log.info('filter by source asset')
    resp = await api.getWithSignature(`/integrations/mass-payments/requests?filter[asset]=${assetCode}`)
    expect(resp.data.length >= 1)

    log.info('filter by source state')
    resp = await api.getWithSignature(`/integrations/mass-payments/requests?filter[status]=processing`)
    expect(resp.data.length >= 1)

    log.info('filter by source min_send_time')
    resp = await api.getWithSignature(`/integrations/mass-payments/requests?filter[from_created_at]=2020-07-16T09:04:38.093068Z`)
    expect(resp.data.length >= 1)

    log.info('filter by source max_send_time')
    resp = await api.getWithSignature(`/integrations/mass-payments/requests?filter[source_balance]=2030-07-16T09:04:38.093068Z`)
    expect(resp.data.length >= 1)
  })

  it('create & update & cancel close deferred payment', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1
    })

    log.info('try update close deferred payment request')

    await deferredPaymentHelper.closeDeferredPayment({
      requestID: requestID,
      deferredPaymentID: deferredPaymentID,
      destination: receiver.accountId(),
      amount: '10',
      creatorDetails: {
        test: 'test'
      }
    })

    log.info('trying cancel request')

    await deferredPaymentHelper.cancelCloseDeferredPayment({
      requestID: requestID
    })

    log.info('trying cancel already canceled request')

    await catchPromise(deferredPaymentHelper.cancelCloseDeferredPayment({
      requestID: requestID
    }))
  })

  it('receive close deferred payment request', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1
    })

    log.info('trying to get request by id')
    await requestHelper.mustLoad(requestID)
    var resp = await api.getWithSignature(`v3/create_close_deferred_payments_requests/${requestID}`)
    expect(resp.data.id === requestID)

    log.info('trying to get request list')

    log.info('filter by requestor')
    resp = await api.getWithSignature(`/v3/create_close_deferred_payments_requests?filter[requestor]=${fromAccount.accountId}`)
    expect(resp.data.length >= 1)

    log.info('filter by reviewer')
    resp = await api.getWithSignature(`/v3/create_close_deferred_payments_requests?filter[reviewer]=${masterKP.accountId()}`)
    expect(resp.data.length >= 1)

    log.info('filter by state')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[state]=2')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[pending_tasks]=1')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks_not_set')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[pending_tasks_not_set]=1048576')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks_any_of')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[pending_tasks_any_of]=1')
    expect(resp.data.length >= 1)
  })

  it('create close deferred payment request & approve', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1
    })

    await requestHelper.approve(requestID, {tasksToRemove: 1})
  })

  it('create close deferred payment request & reject', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1
    })

    await requestHelper.reject(requestID, {tasksToAdd: 4, reason: "because"})
  })

  it('create close deferred payment request & permanent reject', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1
    })

    await requestHelper.permanentReject(requestID, {reason: "because"})
  })

  it('create & update & cancel request for unlock unclaimed assets', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1]
      }
    })

    log.info('try update close deferred payment request')

    await deferredPaymentHelper.closeDeferredPayment({
      requestID: requestID,
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      creatorDetails: {
        test: 'test'
      }
    })

    log.info('trying cancel request')

    await deferredPaymentHelper.cancelCloseDeferredPayment({
      requestID: requestID
    })

    log.info('trying cancel already canceled request')

    await catchPromise(deferredPaymentHelper.cancelCloseDeferredPayment({
      requestID: requestID
    }))
  })

  it('receive request for unlock unclaimed assets', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1]
      }
    })

    log.info('trying to get request by id')
    await requestHelper.mustLoad(requestID)
    var resp = await api.getWithSignature(`v3/create_close_deferred_payments_requests/${requestID}`)
    expect(resp.data.id === requestID)

    log.info('trying to get request list')

    log.info('filter by requestor')
    resp = await api.getWithSignature(`/v3/create_close_deferred_payments_requests?filter[requestor]=${fromAccount.accountId}`)
    expect(resp.data.length >= 1)

    log.info('filter by reviewer')
    resp = await api.getWithSignature(`/v3/create_close_deferred_payments_requests?filter[reviewer]=${masterKP.accountId()}`)
    expect(resp.data.length >= 1)

    log.info('filter by state')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[state]=2')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[pending_tasks]=1')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks_not_set')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[pending_tasks_not_set]=1048576')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks_any_of')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[pending_tasks_any_of]=1')
    expect(resp.data.length >= 1)
  })

  it('create request for unlock unclaimed assets & approve', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1]
      }
    })

    await requestHelper.approve(requestID, {tasksToRemove: 1})
  })

  it('create request for unlock unclaimed assets & reject', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1]
      }
    })

    await requestHelper.reject(requestID, {tasksToAdd: 4, reason: "because"})
  })

  it('create request for unlock unclaimed assets & permanent reject', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1]
      }
    })

    await requestHelper.permanentReject(requestID, {reason: "because"})
  })

  it('create & update & cancel request for mass unlock unclaimed assets', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1,2,3,4,5]
      }
    })

    log.info('try update close deferred payment request')

    await deferredPaymentHelper.closeDeferredPayment({
      requestID: requestID,
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      creatorDetails: {
        test: 'test'
      }
    })

    log.info('trying cancel request')

    await deferredPaymentHelper.cancelCloseDeferredPayment({
      requestID: requestID
    })

    log.info('trying cancel already canceled request')

    await catchPromise(deferredPaymentHelper.cancelCloseDeferredPayment({
      requestID: requestID
    }))
  })

  it('receive request for mass unlock unclaimed assets', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1,2,3,4,5]
      }
    })

    log.info('trying to get request by id')
    await requestHelper.mustLoad(requestID)
    var resp = await api.getWithSignature(`v3/create_close_deferred_payments_requests/${requestID}`)
    expect(resp.data.id === requestID)

    log.info('trying to get request list')

    log.info('filter by requestor')
    resp = await api.getWithSignature(`/v3/create_close_deferred_payments_requests?filter[requestor]=${fromAccount.accountId}`)
    expect(resp.data.length >= 1)

    log.info('filter by reviewer')
    resp = await api.getWithSignature(`/v3/create_close_deferred_payments_requests?filter[reviewer]=${masterKP.accountId()}`)
    expect(resp.data.length >= 1)

    log.info('filter by state')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[state]=2')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[pending_tasks]=1')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks_not_set')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[pending_tasks_not_set]=1048576')
    expect(resp.data.length >= 1)

    log.info('filter by pending_tasks_any_of')
    resp = await api.getWithSignature('/v3/create_close_deferred_payments_requests?filter[pending_tasks_any_of]=1')
    expect(resp.data.length >= 1)
  })

  it('create request for mass unlock unclaimed assets & approve', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1,2,3,4,5]
      }
    })

    await requestHelper.approve(requestID, {tasksToRemove: 1})
  })

  it('create request for mass unlock unclaimed assets & reject', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1,2,3,4,5]
      }
    })

    await requestHelper.reject(requestID, {tasksToAdd: 4, reason: "because"})
  })

  it('create request for mass unlock unclaimed assets & permanent reject', async () => {
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

    const creationRequestID = await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 0,
      creatorDetails: {}
    })

    await requestHelper.mustLoad(creationRequestID)
    // request is ingested, deferred_payment must be too
    const payments = await api.getWithSignature('v3/deferred_payments?page[order]=desc')
    const deferredPaymentID = payments.data[0].id

    log.info('try create close deferred payment request')

    const requestID = await deferredPaymentHelper.closeDeferredPayment({
      deferredPaymentID: deferredPaymentID,
      destination: fromBalance.balanceId,
      amount: '10',
      allTasks: 1,
      creatorDetails: {
        payments_to_cancel: [1,2,3,4,5]
      }
    })

    await requestHelper.permanentReject(requestID, {reason: "because"})
  })
})
describe('Deferred payments performance', () => {
  it('deferred payments', async () => {
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

    const info = await api.get('integrations/mass-payments/info')

    const batchSize = 1000
    const batchesCount = 1000

    var blobs = []
    for (var i = 0; i < batchesCount; i++) {
      log.info(`process batch ${i}`)
      var txs = []

      for (var j = 0; j < batchSize; j++) {
        txs.push({
          "amount": "10.00",
          "destination": info.data.accountId,
          "destination_type": "account_id"
        })
      }

      const resp = await api.postWithSignature("/blobs", {
        data: {
          type: "alpha",
          attributes: {
            value: JSON.stringify(txs)
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
      blobs.push(resp.data.id)
    }

    await deferredPaymentHelper.create({
      sourceBalanceId: fromBalance.balanceId,
      destination: receiver.accountId(),
      amount: fromAccFundAmount,
      allTasks: 1,
      creatorDetails: {
        blobs: blobs
      }
    })
  })
})
