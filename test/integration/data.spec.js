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

describe('Data', () => {
    it('should create, update and remove', async () => {
        const log = logger.new('data-1')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        const actor2 = Keypair.random()
        await accountHelper.createSyndicate(actor2.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)
        log.info(`created actor2 with id: ${actor2.accountId()}`)

        const value = {name: 'some-name', state: 'some-state'}
        const dataId = await dataHelper.create({value}, actor)
        expect(dataId).to.exist
        log.info(`created data entry with ID #${dataId}`)

        let data = await dataHelper.mustLoad(dataId)
        log.info(`fetched data entry with ID #${dataId}: ${JSON.stringify(data)}`)
        expect(data.value).to.eql(value)

        const updatedValue = {name: 'some-name', state: 'some-another-state'}
        await dataHelper.update({dataId, value: updatedValue}, actor)
        log.info(`updated data entry with ID #${dataId}`)

        await dataHelper.delay(3000)

        data = await dataHelper.mustLoad(dataId)
        log.info(`fetched updated data entry with ID #${dataId}: ${JSON.stringify(data)}`)
        expect(data.value).to.eql(updatedValue)

        await dataHelper.updateOwner({dataId: dataId, newOwner: actor2.accountId()}, actor)
        log.info(`updated data owner entry with ID #${dataId}`)

        await dataHelper.delay(3000)

        data = await dataHelper.mustLoad(dataId)
        log.info(`fetched updated data owner entry with ID #${dataId}: ${JSON.stringify(data)}`)
        expect(data.owner.id).to.eql(actor2.accountId())

        await dataHelper.remove(dataId, actor)
        log.info(`removed data entry with ID #${dataId}`)

        await dataHelper.mustNotFound(dataId)
        log.info(`data entry with ID #${dataId} doesn't exist anymore`)
    })


    it('should create data creation request & cancel', async () => {
        const log = logger.new('data-2')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)

        await keyValueHelper.putEntries({
            [`${"create_data_creation_request_tasks"}:${1}`]: 1
        })
        const value = {name: 'some-name', state: 'some-state'}
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

    log.info('try load requests list')

    await dataHelper.mustLoadRequestsList()

    log.info('try cancel request')

    await dataHelper.cancelCreationRequest({
      requestID: requestId,
    }, actor)
  })


    it('should create data creation & approve', async () => {
        const log = logger.new('data-2')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)

    await keyValueHelper.putEntries({
      [`${"create_data_creation_request_tasks"}:${1}`]: 1
    })
    const value = { name: 'some-name', state: 'some-state' }
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


    it('should create data creation & reject request', async () => {
        const log = logger.new('data-2')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)

        await keyValueHelper.putEntries({
            [`${"create_data_creation_request_tasks"}:${1}`]: 1
        })
        const value = {name: 'some-name', state: 'some-state'}
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


    it('should create data update request & cancel', async () => {
        const log = logger.new('data-2')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)


        const dataID = await dataHelper.create({
            value: {
                a: "b",
                c: "d"
            }
        }, actor)

        await keyValueHelper.putEntries({
            [`${"create_data_update_request_tasks"}:${1}`]: 1
        })
        const value = {name: 'some-name', state: 'some-state'}
        const requestId = await dataHelper.createUpdateRequest({
            value: value,
            requestID: '0',
            id: dataID,
            creatorDetails: {
                a: "b"
            }
        }, actor)

        log.info(`update data request: #${requestId}`)

        await dataHelper.cancelUpdateRequest({
            requestID: requestId,
        }, actor)
    })


    it('should create data update & approve', async () => {
        const log = logger.new('data-2')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)

        const dataID = await dataHelper.create({
            value: {
                a: "b",
                c: "d"
            }
        }, actor)


        await keyValueHelper.putEntries({
            [`${"create_data_update_request_tasks"}:${1}`]: 1
        })
        const value = {name: 'some-name', state: 'some-state'}
        const requestId = await dataHelper.createUpdateRequest({
            value: value,
            requestID: '0',
            id: dataID,
            creatorDetails: {
                a: "b"
            }
        }, actor)

        log.info(`update data request: #${requestId}`)

        await requestHelper.approve(requestId, {tasksToRemove: 1})
    })


    it('should create data update & reject request', async () => {
        const log = logger.new('data-2')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)

        const dataID = await dataHelper.create({
            value: {
                a: "b",
                c: "d"
            }
        }, actor)

        await keyValueHelper.putEntries({
            [`${"create_data_update_request_tasks"}:${1}`]: 1
        })
        const value = {name: 'some-name', state: 'some-state'}
        const requestId = await dataHelper.createUpdateRequest({
            value: value,
            requestID: '0',
            id: dataID,
            creatorDetails: {
                a: "b"
            }
        }, actor)

        log.info(`update data request: #${requestId}`)

        await requestHelper.reject(requestId, {tasksToAdd: 2, reason: "because"})
    })

    it('should create data remove request & cancel', async () => {
        const log = logger.new('data-2')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)


        const dataID = await dataHelper.create({
            value: {
                a: "b",
                c: "d"
            }
        }, actor)

        await keyValueHelper.putEntries({
            [`${"create_data_remove_request_tasks"}:${1}`]: 1
        })
        const value = {name: 'some-name', state: 'some-state'}
        const requestId = await dataHelper.createRemoveRequest({
            value: value,
            requestID: '0',
            id: dataID,
            creatorDetails: {
                a: "b"
            }
        }, actor)

        log.info(`remove data request: #${requestId}`)

        await dataHelper.cancelRemoveRequest({
            requestID: requestId,
        }, actor)
    })


    it('should create data remove & approve', async () => {
        const log = logger.new('data-2')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)

        const dataID = await dataHelper.create({
            value: {
                a: "b",
                c: "d"
            }
        }, actor)


        await keyValueHelper.putEntries({
            [`${"create_data_remove_request_tasks"}:${1}`]: 1
        })
        const requestId = await dataHelper.createRemoveRequest({
            requestID: '0',
            id: dataID,
            creatorDetails: {
                a: "b"
            }
        }, actor)

        log.info(`remove data request: #${requestId}`)

        await requestHelper.approve(requestId, {tasksToRemove: 1})
    })


    it('should create data remove & reject request', async () => {
        const log = logger.new('data-2')

        const actor = Keypair.random()
        await accountHelper.createSyndicate(actor.accountId())
        log.info(`created actor with id: ${actor.accountId()}`)

        const dataID = await dataHelper.create({
            value: {
                a: "b",
                c: "d"
            }
        }, actor)

        await keyValueHelper.putEntries({
            [`${"create_data_remove_request_tasks"}:${1}`]: 1
        })
        const value = {name: 'some-name', state: 'some-state'}
        const requestId = await dataHelper.createRemoveRequest({
            requestID: '0',
            id: dataID,
            creatorDetails: {
                a: "b"
            }
        }, actor)

        log.info(`remove data request: #${requestId}`)

        await requestHelper.reject(requestId, {tasksToAdd: 2, reason: "because"})
    })

  it('should create data with a lot of operations', async () => {
    const log = logger.new('data-1')

    const actor = Keypair.random()
    await accountHelper.createSyndicate(actor.accountId())
    log.info(`created actor with id: ${actor.accountId()}`)

    const batchSize = 1000
    const batchesCount = 50

    var blobs = []
    for (var i = 0; i < batchesCount; i++) {
      log.info(`process batch ${i}`)
      var txs = []

      for (var j = 0; j < batchSize; j++) {
        const op = CreateDataBuilder.createData({
          type: '10',
          value: { test: i * batchSize + j + 1 }
        })
        const transaction = new TransactionBuilder(actor.accountId())
          .addOperations(op)
          .build()
        transaction.sign(actor)
        const envelope = transaction.toEnvelope().toXDR().toString('base64')
        txs.push(envelope)
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

    await keyValueHelper.putEntries({
      [`${"create_data_creation_request_tasks"}:${1}`]: 1
    })
    const value = { blobs: blobs }
    const requestId = await dataHelper.createCreationRequest({
      value: value,
      requestID: '0',
      owner: actor.accountId(),
      type: '1',
      creatorDetails: {
        a: "b"
      }
    }, actor)
    log.info(`created request with ID #${requestId}`)
  })

})
