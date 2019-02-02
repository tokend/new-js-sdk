import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ReviewRequestBuilder } from './review_request_builder'

describe('ReviewRequest', () => {
  it('Success', () => {
    let opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      requestType: xdr.ReviewableRequestType.assetCreate().value,
      action: xdr.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      reviewDetails: {
        tasksToAdd: 0,
        tasksToRemove: 4,
        externalDetails: 'All right'
      }
    }
    let op = ReviewRequestBuilder.reviewRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('reviewRequest')
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.requestHash).to.be.equal(opts.requestHash)
    expect(obj.requestType).to.be.equal(opts.requestType)
    expect(obj.action).to.be.equal(opts.action)
    expect(obj.reason).to.be.equal(opts.reason)
    expect(obj.reviewDetails.tasksToAdd).to.be.equal(opts.reviewDetails.tasksToAdd)
    expect(obj.reviewDetails.tasksToRemove).to.be.equal(opts.reviewDetails.tasksToRemove)
    expect(obj.reviewDetails.externalDetails)
      .to.be.equal(opts.reviewDetails.externalDetails)
  })

  it('Withdraw request success', () => {
    let opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      action: xdr.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      requestDetails: '{}',
      reviewDetails: {
        tasksToAdd: 1,
        tasksToRemove: 1,
        externalDetails: 'All right'
      }
    }
    let op = ReviewRequestBuilder.reviewWithdrawRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('reviewRequest')
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.requestHash).to.be.equal(opts.requestHash)
    expect(obj.action).to.be.equal(opts.action)
    expect(obj.reason).to.be.equal(opts.reason)
    expect(JSON.stringify(obj.withdrawal.externalDetails))
      .to.be.equal(JSON.stringify(opts.requestDetails))
    expect(obj.reviewDetails.tasksToAdd).to.be.equal(opts.reviewDetails.tasksToAdd)
    expect(obj.reviewDetails.tasksToRemove).to.be.equal(opts.reviewDetails.tasksToRemove)
    expect(obj.reviewDetails.externalDetails)
      .to.be.equal(JSON.stringify(opts.reviewDetails.externalDetails))
  })

  it('Aml alert request success', () => {
    let opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      comment: 'Testing aml alert',
      action: xdr.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      reviewDetails: {
        tasksToAdd: 1,
        tasksToRemove: 1,
        externalDetails: 'All right'
      }
    }
    let op = ReviewRequestBuilder.reviewAmlAlertRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('reviewRequest')
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.requestHash).to.be.equal(opts.requestHash)
    expect(obj.action).to.be.equal(opts.action)
    expect(obj.reason).to.be.equal(opts.reason)
    expect(obj.amlAlert.comment).to.be.equal(opts.comment)
    expect(obj.reviewDetails.tasksToAdd).to.be.equal(opts.reviewDetails.tasksToAdd)
    expect(obj.reviewDetails.tasksToRemove).to.be.equal(opts.reviewDetails.tasksToRemove)
    expect(obj.reviewDetails.externalDetails)
      .to.be.equal(opts.reviewDetails.externalDetails)
  })
  it('Update KYC request success', () => {
    let opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      action: xdr.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      requestDetails: '{}',
      reviewDetails: {
        externalDetails: 'Invalid identity',
        tasksToAdd: 3,
        tasksToRemove: 0
      }
    }
    let op = ReviewRequestBuilder.reviewUpdateKYCRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('reviewRequest')
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.requestHash).to.be.equal(opts.requestHash)
    expect(obj.action).to.be.equal(opts.action)
    expect(obj.reason).to.be.equal(opts.reason)
    expect(obj.updateKyc.externalDetails)
      .to.be.equal(JSON.stringify(opts.requestDetails))
    expect(obj.reviewDetails.tasksToAdd).to.be.equal(opts.reviewDetails.tasksToAdd)
    expect(obj.reviewDetails.tasksToRemove).to.be.equal(opts.reviewDetails.tasksToRemove)
    expect(obj.reviewDetails.externalDetails)
      .to.be.equal(opts.reviewDetails.externalDetails)
  })
})
