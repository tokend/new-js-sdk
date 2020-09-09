import { logger } from '../logger'
import {
  accountHelper,
  dataHelper,
  keyValueHelper,
  requestHelper,
  api,
  masterKP,
} from '../helpers'
import { Asset } from '../helpers/asset'
import { Keypair, CreateDataBuilder, TransactionBuilder } from '../../src/base'
import {KEY_VALUE_KEYS} from "../../src/const";
import { Running } from '../helpers/_running'

const actor = Keypair.random()
const identityTypeDataType = '1'
const identityDataType = '2'
const dataTaskIdentity = 1

describe("Identity storage", () => {
  it("create, update and cancel valid identity type", async () => {
    const log = logger.new('data-2')

    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    await keyValueHelper.putUint64Entries( {
      ['data_type:identity_type']: identityTypeDataType,
      ['data_type:identity']: identityDataType
    })
    await keyValueHelper.putEntries({
      [`${"create_data_creation_request_tasks"}:${1}`]: 2,
      [`${"create_data_creation_request_tasks"}:${2}`]: 2,
      [`${"create_data_update_request_tasks"}:${1}`]: 2,
      [`${"create_data_update_request_tasks"}:${2}`]: 2,
      [`${"create_data_remove_request_tasks"}:${1}`]: 2,
      [`${"create_data_remove_request_tasks"}:${2}`]: 2,
      ['data_task:identity']: dataTaskIdentity
    })

    const value = {key: 'test_type', details: {test: 'test'}}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    log.info('try load request by id')

    await dataHelper.mustLoadRequest(requestId)

    log.info('try update request')

    const updatedValue = {key: 'test_type', details: {test: 'test2'}}
    await dataHelper.createCreationRequest({
      value: updatedValue,
      requestID: requestId,
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info('try cancel request')

    await dataHelper.cancelCreationRequest({
      requestID: requestId,
    }, actor)
  })

  it("create and update duplicated type request", async () => {
    const log = logger.new('data-2')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    const value = {key: randomType, details: {test: 'test'}}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    log.info('try load request by id')

    await dataHelper.mustLoadRequest(requestId)

    log.info('try update request')

    const updatedValue = {key: randomType, details: {test: 'test2'}}
    await dataHelper.createCreationRequest({
      value: updatedValue,
      requestID: requestId,
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity })

    log.info('check that request rejected')

    var state = ''
    while (state !== 'rejected') {
      log.info('waiting until request will be rejected')
      await Running.delay(30000)
      const data = await dataHelper.mustLoadRequest(requestId)
      state = data.state
    }
  })

  it("create, update and cancel valid update request for identity type", async () => {
    const log = logger.new('data-2')

    const type = Asset.randomCode('Type')
    const value = {key: type, details: {test: 'test'}}
    const dataID = await dataHelper.create({
      value: value
    }, actor)

    const requestId = await dataHelper.createUpdateRequest({
      value: {key: type, details: {test: 'test2'}},
      requestID: '0',
      id: dataID,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    log.info('try update request')

    await dataHelper.createUpdateRequest({
      value: {key: type, details: {test: 'test2'}},
      requestID: requestId,
      id: dataID,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info('try cancel request')

    await dataHelper.cancelUpdateRequest({
      requestID: requestId,
    }, actor)
  })

  it("create, update and cancel update request for not existing identity type", async () => {
    const log = logger.new('data-2')

    log.info('try create request')

    const type = Asset.randomCode('Type')
    await catchPromise(dataHelper.createUpdateRequest({
      value: {key: type, details: {test: 'test2'}},
      requestID: '0',
      id: 132413,
      creatorDetails: {
        a: "b"
      }
    }, actor))

    log.info('try update request')

    await catchPromise(dataHelper.createUpdateRequest({
      value: {key: type, details: {test: 'test2'}},
      requestID: 132413,
      id: 132413,
      creatorDetails: {
        a: "b"
      }
    }, actor))

    log.info('try cancel request')

    await catchPromise(dataHelper.cancelUpdateRequest({
      requestID: 132413,
    }, actor))
  })

  it('receive create identity type requests list', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const type = Asset.randomCode('Type')
    const value = {key: type, details: {test: 'test'}}
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
    data = await api.getWithSignature('/v3/data_creation_requests?filter[state]=2')
    expect(data.length >= 1)

    log.info('filter by pending_tasks')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks]=2')
    expect(data.length >= 1)

    log.info('filter by pending_tasks')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks]=2')
    expect(data.length >= 1)

    log.info('filter by pending_tasks_not_set')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks_not_set]=1048576')
    expect(data.length >= 1)

    log.info('filter by pending_tasks_any_of')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks_any_of]=2')
    expect(data.length >= 1)
  })

  it('should create identity type & approve', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const type = Asset.randomCode('Type')
    const value = {key: type, details: {test: 'test'}}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.approve(requestId, {tasksToRemove: 2})
  })

  it('should create identity type & reject request', async () => {
      const log = logger.new('data-2')

      const actor = Keypair.random()
      await accountHelper.createSyndicate(actor.accountId())
      log.info(`created actor with id: ${actor.accountId()}`)

      const type = Asset.randomCode('Type')
      const value = {key: type, details: {test: 'test'}}
      const requestId = await dataHelper.createCreationRequest({
          value: value,
          requestID: '0',
          owner: actor.accountId(),
          type: identityTypeDataType,
          creatorDetails: {
              a: "b"
          }
      }, actor)

      log.info(`create data request: #${requestId}`)

      await requestHelper.reject(requestId, {tasksToAdd: 4, reason: "because"})
  })

  it('should create identity type & permanent reject request', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const type = Asset.randomCode('Type')
    const value = {key: type, details: {test: 'test'}}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.permanentReject(requestId, {reason: "because"})
  })

  it('should update identity type & approve', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const type = Asset.randomCode('Type')
    const value = {key: type, details: {test: 'test'}}
    const dataID = await dataHelper.create({
      value: value
    }, actor)

    const requestId = await dataHelper.createUpdateRequest({
      value: {key: type, details: {test: 'test2'}},
      requestID: '0',
      id: dataID,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`update data request: #${requestId}`)

    await requestHelper.approve(requestId, {tasksToRemove: 2})
  })

  it('should update identity type & reject request', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const type = Asset.randomCode('Type')
    const value = {key: type, details: {test: 'test'}}
    const dataID = await dataHelper.create({
      value: value
    }, actor)

    const requestId = await dataHelper.createUpdateRequest({
      value: {key: type, details: {test: 'test2'}},
      requestID: '0',
      id: dataID,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`update data request: #${requestId}`)

    await requestHelper.reject(requestId, {tasksToAdd: 4, reason: "because"})
  })

  it('should update identity type & permanent reject request', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const type = Asset.randomCode('Type')
    const value = {key: type, details: {test: 'test'}}
    const dataID = await dataHelper.create({
      value: value
    }, actor)

    const requestId = await dataHelper.createUpdateRequest({
      value: {key: type, details: {test: 'test2'}},
      requestID: '0',
      id: dataID,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`update data request: #${requestId}`)

    await requestHelper.permanentReject(requestId, {reason: "because"})
  })

  it("get identity type", async () => {
    const log = logger.new('data-2')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    log.info('try get type by id')

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)

    log.info('try get types list by status')

    var typeList = await api.getWithSignature(`/integrations/identity-storage/types?filter[status]=active`)
    expect(typeList.length >= 1)

    log.info('try get types list by account')

    typeList = await api.getWithSignature(`/integrations/identity-storage/types?filter[account]=${actor.accountId()}`)
    expect(typeList.length >= 1)
  })

  it("block/unblock identity type", async () => {
    const log = logger.new('data-2')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    log.info('try get type by id')

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)
    const dataId = type.data.data.id

    log.info('try to block request')

    var requestId = await dataHelper.createUpdateRequest({
      value: {key: randomType, status: 'blocked'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    await dataHelper.createUpdateRequest({
      value: {key: randomType, status: 'blocked'},
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        test: "data"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    var state = ''
    while (state !== 'blocked') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
      state = data.data.status
    }

    log.info('try block already blocked request')

    requestId = await dataHelper.createUpdateRequest({
      value: {key: randomType, status: 'blocked'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    await dataHelper.createUpdateRequest({
      value: {key: randomType, status: 'blocked'},
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        test: "data"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    log.info('try to check if request is rejected')

    state = ''
    while (state !== 'rejected') {
      log.info('waiting until request will be rejected')
      await Running.delay(30000)
      const data = await dataHelper.mustLoadUpdateRequest(requestId)
      state = data.state
    }

    log.info('try to unblock request')

    requestId = await dataHelper.createUpdateRequest({
      value: {key: randomType, status: 'active'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    await dataHelper.createUpdateRequest({
      value: {key: randomType, status: 'active'},
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        test: "data"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    state = ''
    while (state !== 'active') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
      state = data.data.status
    }

    log.info('try to unblock request already active request')

    requestId = await dataHelper.createUpdateRequest({
      value: {key: randomType, status: 'active'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    await dataHelper.createUpdateRequest({
      value: {key: randomType, status: 'active'},
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        test: "data"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    state = ''
    while (state !== 'rejected') {
      log.info('waiting until request will be rejected')
      await Running.delay(30000)
      const data = await dataHelper.mustLoadUpdateRequest(requestId)
      state = data.state
    }
  })

  it("cancel request to block/unblock identity type", async () => {
    const log = logger.new('data-2')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    log.info('try get type by id')

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)
    const dataId = type.data.data.id

    log.info('try to block request')

    const requestId = await dataHelper.createUpdateRequest({
      value: {key: randomType, status: 'blocked'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    log.info('try to cancel request')

    await dataHelper.cancelUpdateRequest({
      requestID: requestId
    }, actor)
  })

  it("create & update request to remove identity type", async () => {
    const log = logger.new('data-2')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    log.info('try get type by id')

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)
    const dataId = type.data.data.id

    log.info('try to remove identity type')
    var requestId = await dataHelper.createRemoveRequest({
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      },
    }, actor)

    log.info(`created remove identity type request ${requestId}`)

    await dataHelper.createRemoveRequest({
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        new: 'test'
      },
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    var state = ''
    while (state !== 'removed') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
      state = data.data.status
    }

    log.info('try remove already removed data type')

    await catchPromise(dataHelper.createRemoveRequest({
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      },
    }, actor))
  })

  it("receive salted hash", async () => {
    const log = logger.new('data-2')

    log.info('create identity type')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)

    log.info("try create identity")

    const value =  Asset.randomCode("Identity")
    const identity = await api.postWithSignature('/integrations/identity-storage/identities', {
      data: {
        attributes: {
          value: value,
          type: randomType,
          account_id: actor.accountId()
        }
      }
    })

    expect(identity.data.hash).to.exist
    expect(identity.data.value).to.equal(value)
    expect(identity.data.status).to.equal('not_verified')

    log.info("try create duplicate identity")
    await catchPromise(api.postWithSignature('/integrations/identity-storage/identities', {
      data: {
        attributes: {
          value: value,
          type: randomType,
          account_id: actor.accountId()
        }
      }
    }))
  })

  it("create, update identity", async () => {
    const log = logger.new('data-2')

    log.info('create identity type')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)

    log.info("try create identity")

    const value = Asset.randomCode("Identity")
    const identity = await api.postWithSignature('/integrations/identity-storage/identities', {
      data: {
        attributes: {
          value: value,
          type: randomType,
          account_id: actor.accountId()
        }
      }
    })

    var requestId = await dataHelper.createCreationRequest({
      value: {hash: identity.data.hash},
      requestID: '0',
      owner: actor.accountId(),
      type: identityDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    log.info('try load request by id')

    await dataHelper.mustLoadRequest(requestId)

    log.info('try update request')

    await dataHelper.createCreationRequest({
      value: {hash: identity.data.hash},
      requestID: requestId,
      owner: actor.accountId(),
      type: identityDataType,
      creatorDetails: {
        new: "test"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    var state = ''
    var dataId = ''
    while (state !== 'active') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/identities/${identity.data.id}`)
      state = data.data.status
      dataId = data.data.data.id
    }

    log.info("try update identifier")

    requestId = await dataHelper.createUpdateRequest({
      value: {hash: identity.data.hash, details: {test: "test"}},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    log.info('try update request')

    await dataHelper.createUpdateRequest({
      value: {hash: identity.data.hash, details: {test: "test"}},
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        new: "test"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    log.info("try update identifier and cancel request")

    requestId = await dataHelper.createUpdateRequest({
      value: {hash: identity.data.hash, details: {test: "test"}},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    await dataHelper.cancelUpdateRequest({
      requestID: requestId
    }, actor)
  })

  it("create, cancel identity", async () => {
    const log = logger.new('data-2')

    log.info('create identity type')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)

    log.info("try create identity")

    const value = Asset.randomCode("Identity")
    const identity = await api.postWithSignature('/integrations/identity-storage/identities', {
      data: {
        attributes: {
          value: value,
          type: randomType,
          account_id: actor.accountId()
        }
      }
    })

    const requestId = await dataHelper.createCreationRequest({
      value: {hash: identity.data.hash},
      requestID: '0',
      owner: actor.accountId(),
      type: identityDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    log.info('try load request by id')

    await dataHelper.mustLoadRequest(requestId)

    log.info('try cancel request')

    await dataHelper.cancelCreationRequest({
      requestID: requestId
    }, actor)
  })

  it("create update invalid identifier request", async () => {
    await catchPromise(dataHelper.createRemoveRequest({
      requestID: '0',
      id: '1234123421',
      creatorDetails: {
        a: "b"
      }
    }, actor))
  })

  it('receive create identity requests list', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const value = {hash: 'test', details: {test: 'test'}}
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
    data = await api.getWithSignature('/v3/data_creation_requests?filter[state]=2')
    expect(data.length >= 1)

    log.info('filter by pending_tasks')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks]=2')
    expect(data.length >= 1)

    log.info('filter by pending_tasks')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks]=2')
    expect(data.length >= 1)

    log.info('filter by pending_tasks_not_set')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks_not_set]=1048576')
    expect(data.length >= 1)

    log.info('filter by pending_tasks_any_of')
    data = await api.getWithSignature('/v3/data_creation_requests?filter[pending_tasks_any_of]=2')
    expect(data.length >= 1)
  })

  it('should create identity & approve', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const value = {hash: 'test', details: {test: 'test'}}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: identityDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.approve(requestId, {tasksToRemove: 2})
  })

  it('should create identity type & reject request', async () => {
      const log = logger.new('data-2')

      const actor = Keypair.random()
      await accountHelper.createSyndicate(actor.accountId())
      log.info(`created actor with id: ${actor.accountId()}`)

      const value = {hash: 'test', details: {test: 'test'}}
      const requestId = await dataHelper.createCreationRequest({
          value: value,
          requestID: '0',
          owner: actor.accountId(),
          type: identityDataType,
          creatorDetails: {
              a: "b"
          }
      }, actor)

      log.info(`create data request: #${requestId}`)

      await requestHelper.reject(requestId, {tasksToAdd: 4, reason: "because"})
  })

  it('should create identity type & permanent reject request', async () => {
    const log = logger.new('data-2')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const value = {hash: 'test', details: {test: 'test'}}
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: identityDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.permanentReject(requestId, {reason: "because"})
  })

  it("receive identity", async () => {
    const log = logger.new('data-2')

    log.info('create identity type')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)

    log.info("try create identity")

    const value = Asset.randomCode("Identity")
    const identity = await api.postWithSignature('/integrations/identity-storage/identities', {
      data: {
        attributes: {
          value: value,
          type: randomType,
          account_id: actor.accountId()
        }
      }
    })

    var requestId = await dataHelper.createCreationRequest({
      value: {hash: identity.data.hash},
      requestID: '0',
      owner: actor.accountId(),
      type: identityDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    var state = ''
    var dataId = ''
    while (state !== 'active') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/identities/${identity.data.id}`)
      state = data.data.status
      dataId = data.data.data.id
    }

    log.info('try get identity by account id')
    var data = await api.getWithSignature(`/integrations/identity-storage/identities?filter[account]=${actor.accountId()}`)
    expect(data.length >= 1)

    log.info('try get identity by account id')
    data = await api.getWithSignature(`/integrations/identity-storage/identities?filter[value]=${value}`)
    expect(data.length >= 1)
  })

  it("block/unblock identity", async () => {
    const log = logger.new('data-2')

    log.info('create identity type')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)

    log.info("try create identity")

    const value = Asset.randomCode("Identity")
    const identity = await api.postWithSignature('/integrations/identity-storage/identities', {
      data: {
        attributes: {
          value: value,
          type: randomType,
          account_id: actor.accountId()
        }
      }
    })
    const hash = identity.data.hash
    const identityId = identity.data.id

    var requestId = await dataHelper.createCreationRequest({
      value: {hash: hash},
      requestID: '0',
      owner: actor.accountId(),
      type: identityDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    var state = ''
    var dataId = ''
    while (state !== 'active') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/identities/${identityId}`)
      state = data.data.status
      dataId = data.data.data.id
    }

    log.info('try to block request')

    var requestId = await dataHelper.createUpdateRequest({
      value: {hash: hash, status: 'blocked'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    await dataHelper.createUpdateRequest({
      value: {hash: hash, status: 'blocked'},
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        test: "data"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    var state = ''
    while (state !== 'blocked') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/identities/${identityId}`)
      state = data.data.status
    }

    log.info('try block already blocked request')

    requestId = await dataHelper.createUpdateRequest({
      value: {hash: hash, status: 'blocked'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    await dataHelper.createUpdateRequest({
      value: {hash: hash, status: 'blocked'},
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        test: "data"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    log.info('try to check if request is rejected')

    state = ''
    while (state !== 'rejected') {
      log.info('waiting until request will be rejected')
      await Running.delay(30000)
      const data = await dataHelper.mustLoadUpdateRequest(requestId)
      state = data.state
    }

    log.info('try to unblock request')

    requestId = await dataHelper.createUpdateRequest({
      value: {hash: hash, status: 'active'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    await dataHelper.createUpdateRequest({
      value: {hash: hash, status: 'active'},
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        test: "data"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    state = ''
    while (state !== 'active') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/identities/${identityId}`)
      state = data.data.status
    }

    log.info('try to unblock request already active request')

    requestId = await dataHelper.createUpdateRequest({
      value: {hash: hash, status: 'active'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    await dataHelper.createUpdateRequest({
      value: {hash: hash, status: 'active'},
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        test: "data"
      }
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    state = ''
    while (state !== 'rejected') {
      log.info('waiting until request will be rejected')
      await Running.delay(30000)
      const data = await dataHelper.mustLoadUpdateRequest(requestId)
      state = data.state
    }
  })

  it("cancel request to block/unblock identity", async () => {
    const log = logger.new('data-2')

    log.info('create identity type')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)

    log.info("try create identity")

    const value = Asset.randomCode("Identity")
    const identity = await api.postWithSignature('/integrations/identity-storage/identities', {
      data: {
        attributes: {
          value: value,
          type: randomType,
          account_id: actor.accountId()
        }
      }
    })
    const hash = identity.data.hash
    const identityId = identity.data.id

    var requestId = await dataHelper.createCreationRequest({
      value: {hash: hash},
      requestID: '0',
      owner: actor.accountId(),
      type: identityDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    var state = ''
    var dataId = ''
    while (state !== 'active') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/identities/${identityId}`)
      state = data.data.status
      dataId = data.data.data.id
    }

    log.info('try to block request')

    requestId = await dataHelper.createUpdateRequest({
      value: {hash: hash, status: 'blocked'},
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`created update type request ${requestId}`)

    log.info('try to cancel request')

    await dataHelper.cancelUpdateRequest({
      requestID: requestId
    }, actor)
  })

  it("create & update request to remove identity", async () => {
    const log = logger.new('data-2')

    log.info('create identity type')

    const randomType = Asset.randomCode("Type")
    const originalValue = {key: randomType}
    await dataHelper.createCreationRequest({
      value: originalValue,
      requestID: '0',
      owner: actor.accountId(),
      type: identityTypeDataType,
      creatorDetails: {
        a: "b"
      },
      allTasks: dataTaskIdentity
    }, actor)

    const type = await Running.untilFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/types/${randomType}`)
    }, 30000)
    expect(type.id === randomType)

    log.info("try create identity")

    const value = Asset.randomCode("Identity")
    const identity = await api.postWithSignature('/integrations/identity-storage/identities', {
      data: {
        attributes: {
          value: value,
          type: randomType,
          account_id: actor.accountId()
        }
      }
    })
    const hash = identity.data.hash
    const identityId = identity.data.id

    var requestId = await dataHelper.createCreationRequest({
      value: {hash: hash},
      requestID: '0',
      owner: actor.accountId(),
      type: identityDataType,
      creatorDetails: {
        a: "b"
      }
    }, actor)

    log.info(`create data request: #${requestId}`)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    var state = ''
    var dataId = ''
    while (state !== 'active') {
      log.info('waiting until request will be proceeded')
      await Running.delay(30000)
      const data = await api.getWithSignature(`/integrations/identity-storage/identities/${identityId}`)
      state = data.data.status
      dataId = data.data.data.id
    }

    log.info('try to remove identity type')
    var requestId = await dataHelper.createRemoveRequest({
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      },
    }, actor)

    log.info(`created remove identity type request ${requestId}`)

    await dataHelper.createRemoveRequest({
      requestID: requestId,
      id: dataId,
      creatorDetails: {
        new: 'test'
      },
    }, actor)

    await requestHelper.approve(requestId, {tasksToRemove: 2, tasksToAdd: dataTaskIdentity})

    await Running.untilNotFound(async () => {
      return await api.getWithSignature(`/integrations/identity-storage/identities/${identityId}`)
    })

    log.info('try remove already removed data type')

    await catchPromise(dataHelper.createRemoveRequest({
      requestID: '0',
      id: dataId,
      creatorDetails: {
        a: "b"
      },
    }, actor))
  })
})
