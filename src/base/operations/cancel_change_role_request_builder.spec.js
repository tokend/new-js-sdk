import { CancelChangeRoleRequestBuilder } from './cancel_change_role_request_builder'
import { Operation } from '../operation'
import { default as xdr } from '../generated/xdr_generated'

describe('Cancel change role request', () => {
  it('Success', () => {
    let opt = {
      requestID: '120'
    }
    let op = CancelChangeRoleRequestBuilder.cancelChangeRoleRequest(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.cancelChangeRoleRequest().name)
    expect(opt.requestID).to.be.equal(obj.requestID)
  })
})
