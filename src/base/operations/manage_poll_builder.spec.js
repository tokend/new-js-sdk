import { isEqual } from 'lodash'
import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ManagePollBuilder } from './manage_poll_builder'

describe('ManagePollBuilder', () => {
  it('close', () => {
    let opt = {
      result: 0,
      pollID: '4123421',
      details: { data: 'success' }
    }
    let op = ManagePollBuilder.closePoll(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.managePoll().name)
    expect(opt.pollID).to.be.equal(obj.pollID)
    expect(opt.result).to.be.equal(obj.result)
    expect(isEqual(opt.details, obj.details)).to.be.true
  })
})
