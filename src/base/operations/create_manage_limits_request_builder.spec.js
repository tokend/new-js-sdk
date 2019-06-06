import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { CreateManageLimitsRequestBuilder } from './create_manage_limits_request_builder'

describe('createManageLimitsRequest', () => {
  it('Success', () => {
    let requestID = '0'
    let allTasks = 1
    const limits = {
      annualOut: '100',
      dailyOut: '100',
      monthlyOut: '100',
      weeklyOut: '100'
    }
    const creatorDetails = {
      operationType: 'deposit',
      statsOpType: 4,
      asset: 'BTC',
      limits,
      requestType: 'initial',
      note: 'some text'
    }
    let op = CreateManageLimitsRequestBuilder.createManageLimitsRequest({
      requestID,
      allTasks,
      creatorDetails
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createManageLimitsRequest')
    expect(JSON.stringify(creatorDetails)).to.be.equal(JSON.stringify(obj.creatorDetails))
  })
})
