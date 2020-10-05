import { logger } from '../logger'
import {
  accountHelper,
  dataHelper,
  keyValueHelper,
  requestHelper,
  api,
  masterKP
} from '../helpers'
import { Keypair, CreateDataBuilder, TransactionBuilder } from '../../src/base'
import {KEY_VALUE_KEYS} from "../../src/const";

const actor = Keypair.random()

describe('Mass operations test', () => {
  it('Create, load, update and cancel mass operations request', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    await keyValueHelper.putEntries({
      [`${"create_data_creation_request_tasks"}:${1}`]: 1
    })
    const value = {blobs: ["test"]}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: '1',
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    log.info('try load request by id')

    await dataHelper.mustLoadRequest(requestId)

    log.info('try update request')

    const updatedValue = {blobs: ["test2"]}
    await dataHelper.createCreationRequest({
      value: updatedValue,
      requestID: requestId,
      owner: actor.accountId(),
      type: '1',
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info('try cancel request')

    await dataHelper.cancelCreationRequest({
      requestID: requestId,
    }, actor)
  })

  it('should create mass operation & approve', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    await keyValueHelper.putEntries({
      [`${"create_data_creation_request_tasks"}:${1}`]: 1
    })
    const value = {blobs: ["test2"]}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: '1',
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.approve(requestId, {tasksToRemove: 1})
  })

  it('should create mass operation & reject request', async () => {
      const log = logger.new('data-2')

      const actor = Keypair.random()
      await accountHelper.createSyndicate(actor.accountId())
      log.info(`created actor with id: ${actor.accountId()}`)

      await keyValueHelper.putEntries({
          [`${"create_data_creation_request_tasks"}:${1}`]: 1
      })
      const value = {blobs: ["test2"]}
      const requestId = await dataHelper.createCreationRequest({
          value: value,
          requestID: '0',
          owner: actor.accountId(),
          type: '1',
          creatorDetails: {
              a: "b"
          }
      }, actor)

      log.info(`create data request: #${requestId}`)

      await requestHelper.reject(requestId, {tasksToAdd: 2, reason: "because"})
  })

  it('should create mass operation & permanent reject request', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    await keyValueHelper.putEntries({
      [`${"create_data_creation_request_tasks"}:${1}`]: 1
    })
    const value = {blobs: ["test2"]}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: '1',
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.permanentReject(requestId, {reason: "because"})
  })

  it('receive mass operations requests list', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    await keyValueHelper.putEntries({
      [`${"create_data_creation_request_tasks"}:${1}`]: 1
    })
    const value = {blobs: ["test"]}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: '1',
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info('filter by security type')
    var data = await api.getWithSignature('/v3/data_creation_requests?filter[request_details.security_type]=1')
    expect(data.length >= 1)

    log.info('filter by requestor')
    data = await api.getWithSignature(`/v3/data_creation_requests?filter[requestor]=${actor.accountId()}`)
    expect(data.length >= 1)

    log.info('filter by reviewer')
    data = await api.getWithSignature(`/v3/data_creation_requests?filter[reviewer]=${masterKP.accountId()}`)
    expect(data.length >= 1)

    log.info('filter by state')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[state]=1')
    expect(data.length >= 1)

    log.info('filter by pending_tasks')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks]=1')
    expect(data.length >= 1)

    log.info('filter by pending_tasks')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks]=1')
    expect(data.length >= 1)

    log.info('filter by pending_tasks_not_set')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks_not_set]=1048576')
    expect(data.length >= 1)

    log.info('filter by pending_tasks_any_of')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks_any_of]=1')
    expect(data.length >= 1)
  })
})
