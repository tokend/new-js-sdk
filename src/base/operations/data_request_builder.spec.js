import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { DataRequestBuilder } from './data_request_builder'

describe.only('Data reviewable requests', () => {
  it('Create data valid', () => {
    let type = '20'
    let value = {
      name: 'test'
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    let op = DataRequestBuilder.createDataCreationRequest({
      requestID: '0',
      type: type,
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createDataCreationRequest')
    expect(type).to.be.equal(obj.dataCreationRequest.type)
    expect(owner.toString()).to.be.equal(obj.dataCreationRequest.owner)
    expect(JSON.stringify(value)).to.be.equal(JSON.stringify(obj.dataCreationRequest.value))
  })

  it('Create invalid data', () => {
    let value = {
      name: 'test'
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectThrow(() =>
      DataRequestBuilder.createDataCreationRequest({
        requestID: '0',
        value: value,
        owner: owner,
        creatorDetails: {
          a: 'b'
        }
      }))
  })

  it('cancel creation', () => {
    let requestID = '20'

    let op = DataRequestBuilder.cancelDataCreationRequest({
      requestID: requestID
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('cancelDataCreationRequest')
    expect(requestID).to.be.equal(obj.requestID)
  })

  it('Cancel creation invalid', () => {
    expectThrow(() =>
      DataRequestBuilder.cancelDataCreationRequest({}))
  })

  it('update valid', () => {
    let value = {
      name: 'test'
    }
    let id = '1'
    let op = DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createDataUpdateRequest')
    expect(id).to.be.equal(obj.dataUpdateRequest.id)
    expect(JSON.stringify(value)).to.be.equal(JSON.stringify(obj.dataUpdateRequest.value))
  })

  it('Update invalid data', () => {
    let value = {
      name: 'test'
    }
    expectThrow(() =>
      DataRequestBuilder.createDataUpdateRequest({
        requestID: '0',
        value: value,
        creatorDetails: {
          a: 'b'
        }
      }))
  })

  it('cancel update', () => {
    let requestID = '20'

    let op = DataRequestBuilder.cancelDataUpdateRequest({
      requestID: requestID
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('cancelDataUpdateRequest')
    expect(requestID).to.be.equal(obj.requestID)
  })

  it('remove', () => {
    let id = '1'
    let op = DataRequestBuilder.createDataRemoveRequest({
      requestID: '0',
      id: '1',
      creatorDetails: {
        a: 'b'
      }
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createDataRemoveRequest')
    expect(id).to.be.equal(obj.dataRemoveRequest.id)
  })

  it('cancel remove', () => {
    let requestID = '20'

    let op = DataRequestBuilder.cancelDataRemoveRequest({
      requestID: requestID
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('cancelDataRemoveRequest')
    expect(requestID).to.be.equal(obj.requestID)
  })

  it('create valid mass operations request', () => {
    let type = '20'
    let value = {
      blobs: ['test']
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectNoThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '0',
      type: type,
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid mass operations request', () => {
    let type = '20'
    let value = {
      blobs: []
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '0',
      type: type,
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create valid mass operations request', () => {
    let type = '20'
    let value = {
      blobs: ['test']
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectNoThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '1',
      type: type,
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid mass operations request', () => {
    let type = '20'
    let value = {
      blobs: []
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '1',
      type: type,
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('Cancel mass operation creation valid', () => {
    let requestID = '20'

    let op = DataRequestBuilder.cancelDataCreationRequest({
      requestID: requestID
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('cancelDataCreationRequest')
    expect(requestID).to.be.equal(obj.requestID)
  })

  it('Cancel mass operation creation invalid', () => {
    expectThrow(() =>
      DataRequestBuilder.cancelDataCreationRequest({}))
  })

  it('create valid identity type request', () => {
    let type = '20'
    let value = {
      key: 'test'
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectNoThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '0',
      type: type,
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request for identity type creation', () => {
    let type = '20'
    let value = {
      key: 'test'
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectNoThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '1',
      type: type,
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request for identity type creation', () => {
    let value = {
      key: 'test'
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '1',
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create valid request for identity type update', () => {
    let value = {
      key: 'test',
      details: {
        test: 'test'
      }
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid request for identity type update', () => {
    let value = {
      key: 'test',
      details: {
        test: 'test'
      }
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request for identity type update', () => {
    let value = {
      key: 'test',
      details: {
        test: 'test'
      }
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request for identity type update', () => {
    let value = {
      key: 'test',
      details: {
        test: 'test'
      }
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('cancel valid request for identity type update', () => {
    let requestID = '20'

    expectNoThrow(() => DataRequestBuilder.cancelDataUpdateRequest({
      requestID: requestID
    }))
  })

  it('cancel invalid request for identity type update', () => {
    expectThrow(() =>
      DataRequestBuilder.cancelDataUpdateRequest({}))
  })

  it('create valid request to block identity type', () => {
    let value = {
      key: 'test',
      status: 'blocked'
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid request to block type update', () => {
    let value = {
      key: 'test',
      status: 'blocked'
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request to block identity type', () => {
    let value = {
      key: 'test',
      status: 'blocked'
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request to block type update', () => {
    let value = {
      key: 'test',
      status: 'blocked'
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create valid request to unblock identity type', () => {
    let value = {
      key: 'test',
      status: 'active'
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid request to unblock type update', () => {
    let value = {
      key: 'test',
      status: 'active'
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request to unblock identity type', () => {
    let value = {
      key: 'test',
      status: 'active'
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request to unblock type update', () => {
    let value = {
      key: 'test',
      status: 'active'
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('cancel valid request for identity type block/unblock', () => {
    let requestID = '20'

    expectNoThrow(() => DataRequestBuilder.cancelDataUpdateRequest({
      requestID: requestID
    }))
  })

  it('cancel invalid request for identity type block/unblock', () => {
    expectThrow(() =>
      DataRequestBuilder.cancelDataUpdateRequest({}))
  })

  it('create valid request to remove identity type', () => {
    expectNoThrow(() => DataRequestBuilder.createDataRemoveRequest({
      requestID: '0',
      id: '1',
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid request to remove type update', () => {
    expectThrow(() => DataRequestBuilder.createDataRemoveRequest({
      requestID: '0',
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request to remove identity type', () => {
    expectNoThrow(() => DataRequestBuilder.createDataRemoveRequest({
      requestID: '1',
      id: '1',
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request to remove type update', () => {
    expectThrow(() => DataRequestBuilder.createDataRemoveRequest({
      requestID: '1',
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('cancel valid request to remove identity type', () => {
    let requestID = '20'

    expectNoThrow(() => DataRequestBuilder.cancelDataRemoveRequest({
      requestID: requestID
    }))
  })

  it('cancel invalid request to remove identity type', () => {
    expectThrow(() =>
      DataRequestBuilder.cancelDataRemoveRequest({}))
  })

  it('create valid identity request', () => {
    let type = '20'
    let value = {
      hash: 'test'
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectNoThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '0',
      type: type,
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request for identity creation', () => {
    let type = '20'
    let value = {
      hash: 'test'
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectNoThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '1',
      type: type,
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request for identity creation', () => {
    let value = {
      hash: 'test'
    }
    let owner = 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB'
    expectThrow(() => DataRequestBuilder.createDataCreationRequest({
      requestID: '1',
      value: value,
      owner: owner,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create valid request for identity update', () => {
    let value = {
      hash: 'test',
      details: {
        test: 'test'
      }
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid request for identity update', () => {
    let value = {
      hash: 'test',
      details: {
        test: 'test'
      }
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request for identity update', () => {
    let value = {
      hash: 'test',
      details: {
        test: 'test'
      }
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request for identity update', () => {
    let value = {
      hash: 'test',
      details: {
        test: 'test'
      }
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('cancel valid request for identity update', () => {
    let requestID = '20'

    expectNoThrow(() => DataRequestBuilder.cancelDataUpdateRequest({
      requestID: requestID
    }))
  })

  it('cancel invalid request for identity update', () => {
    expectThrow(() =>
      DataRequestBuilder.cancelDataUpdateRequest({}))
  })

  it('create valid request to block identity', () => {
    let value = {
      hash: 'test',
      status: 'blocked'
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid request to block identity update', () => {
    let value = {
      hash: 'test',
      status: 'blocked'
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request to block identity', () => {
    let value = {
      hash: 'test',
      status: 'blocked'
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request to block update', () => {
    let value = {
      hash: 'test',
      status: 'blocked'
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create valid request to unblock identity', () => {
    let value = {
      hash: 'test',
      status: 'active'
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid request to unblock identity update', () => {
    let value = {
      hash: 'test',
      status: 'active'
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '0',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request to unblock identity', () => {
    let value = {
      hash: 'test',
      status: 'active'
    }
    expectNoThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      id: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request to unblock identity update', () => {
    let value = {
      hash: 'test',
      status: 'active'
    }
    expectThrow(() => DataRequestBuilder.createDataUpdateRequest({
      requestID: '1',
      value: value,
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('cancel valid request for identity block/unblock', () => {
    let requestID = '20'

    expectNoThrow(() => DataRequestBuilder.cancelDataUpdateRequest({
      requestID: requestID
    }))
  })

  it('cancel invalid request for identity block/unblock', () => {
    expectThrow(() =>
      DataRequestBuilder.cancelDataUpdateRequest({}))
  })

  it('create valid request to remove identity', () => {
    expectNoThrow(() => DataRequestBuilder.createDataRemoveRequest({
      requestID: '0',
      id: '1',
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('create invalid request to remove idnetity', () => {
    expectThrow(() => DataRequestBuilder.createDataRemoveRequest({
      requestID: '0',
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update valid request to remove identity type', () => {
    expectNoThrow(() => DataRequestBuilder.createDataRemoveRequest({
      requestID: '1',
      id: '1',
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('update invalid request to remove idnetity update', () => {
    expectThrow(() => DataRequestBuilder.createDataRemoveRequest({
      requestID: '1',
      creatorDetails: {
        a: 'b'
      }
    }))
  })

  it('cancel valid request to remove identity', () => {
    let requestID = '20'

    expectNoThrow(() => DataRequestBuilder.cancelDataRemoveRequest({
      requestID: requestID
    }))
  })

  it('cancel invalid request to remove identity', () => {
    expectThrow(() =>
      DataRequestBuilder.cancelDataRemoveRequest({}))
  })
})
