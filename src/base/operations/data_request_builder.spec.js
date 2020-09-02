import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { DataRequestBuilder } from './data_request_builder'

describe.only('Data reviewable requests', () => {
  it('creation', () => {
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

  it('update', () => {
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
})
