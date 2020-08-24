import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { DataRequestBuilder } from './data_request_builder'

describe.only('write data in blockchain', () => {
  it('create', () => {
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

  it('cancel', () => {
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
})
