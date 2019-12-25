import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ReviewRequestBuilder } from './review_request_builder'

describe('ReviewRequest', () => {
  it('Success', () => {
    let opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      action: xdr.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      tasksToAdd: '0',
      tasksToRemove: '4',
      externalDetails: 'All right'
    }
    let op = ReviewRequestBuilder.reviewRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('reviewRequest')
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.requestHash).to.be.equal(opts.requestHash)
    expect(obj.action).to.be.equal(opts.action)
    expect(obj.reason).to.be.equal(opts.reason)
    expect(obj.tasksToAdd).to.be.equal(opts.tasksToAdd)
    expect(obj.tasksToRemove).to.be.equal(opts.tasksToRemove)
    expect(obj.externalDetails)
      .to.be.equal(opts.externalDetails)
  })
})
