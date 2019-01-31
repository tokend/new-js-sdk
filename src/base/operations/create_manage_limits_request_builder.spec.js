import { default as xdr } from '../generated/xdr_generated'
import { isEqual } from 'lodash'
import { Operation } from '../operation'
import { CreateManageLimitsRequestBuilder } from './create_manage_limits_request_builder'

describe('createManageLimitsRequest', () => {
  it('Success', () => {
    let requestID = '0'
    const limits = {
      annualOut: '100',
      dailyOut: '100',
      monthlyOut: '100',
      weeklyOut: '100'
    }
    const details = {
      operationType: 'deposit',
      statsOpType: 4,
      asset: 'BTC',
      limits,
      requestType: 'initial',
      note: 'some text'
    }
    let op = CreateManageLimitsRequestBuilder.createManageLimitsRequest({
      requestID,
      details
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createManageLimitsRequest')
    expect(isEqual(details, obj.details)).to.be.true
  })
})
