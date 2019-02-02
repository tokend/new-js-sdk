import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ReviewRequestBuilder } from './review_request_builder'
import { Keypair } from '../keypair'

describe('ReviewRequest', () => {
  it('Success', () => {
    let opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      requestType: xdr.ReviewableRequestType.createAsset().value,
      action: xdr.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      tasksToAdd: 0,
      tasksToRemove: 4,
      externalDetails: { details: 'All right' }
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
    expect(obj.tasksToAdd).to.be.equal(opts.tasksToAdd)
    expect(obj.tasksToRemove).to.be.equal(opts.tasksToRemove)
    expect(obj.externalDetails).to.be.equal(JSON.stringify(opts.externalDetails))
  })
  it('Withdraw request success', () => {
    let opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      action: xdr.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      tasksToAdd: 0,
      tasksToRemove: 4,
      externalDetails: { details: 'All right' }
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
    expect(obj.withdrawal.externalDetails)
      .to.be.equal(JSON.stringify(opts.externalDetails))
    expect(obj.tasksToAdd).to.be.equal(opts.tasksToAdd)
    expect(obj.tasksToRemove).to.be.equal(opts.tasksToRemove)
    expect(obj.externalDetails).to.be.equal(JSON.stringify(opts.externalDetails))
  })
  it('LimitsUpdate request success', () => {
    let account = Keypair.random()
    let opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      newLimits: {
        id: '1',
        accountID: account.accountId(),
        statsOpType: 3,
        assetCode: 'USD',
        isConvertNeeded: false,
        dailyOut: '100',
        weeklyOut: '200',
        monthlyOut: '300',
        annualOut: '500'
      },
      action: xdr.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      tasksToAdd: 0,
      tasksToRemove: 4,
      externalDetails: { details: 'All right' }
    }
    let op = ReviewRequestBuilder.reviewLimitsUpdateRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('reviewRequest')
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.requestHash).to.be.equal(opts.requestHash)
    expect(obj.action).to.be.equal(opts.action)
    expect(obj.reason).to.be.equal(opts.reason)
    expect(obj.limitsUpdate.newLimits.id).to.be.equal('1')
    expect(obj.limitsUpdate.newLimits.accountID).to.be.equal(account.accountId())
    expect(obj.limitsUpdate.newLimits.assetCode).to.be.equal('USD')
    expect(obj.limitsUpdate.newLimits.isConvertNeeded).to.be.equal(false)
    expect(obj.limitsUpdate.newLimits.dailyOut).to.be.equal(opts.newLimits.dailyOut)
    expect(obj.limitsUpdate.newLimits.weeklyOut).to.be.equal(opts.newLimits.weeklyOut)
    expect(obj.limitsUpdate.newLimits.monthlyOut).to.be.equal(opts.newLimits.monthlyOut)
    expect(obj.limitsUpdate.newLimits.annualOut).to.be.equal(opts.newLimits.annualOut)
    expect(obj.tasksToAdd).to.be.equal(opts.tasksToAdd)
    expect(obj.tasksToRemove).to.be.equal(opts.tasksToRemove)
    expect(obj.externalDetails).to.be.equal(JSON.stringify(opts.externalDetails))
  })

  it('Aml alert request success', () => {
    let opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      comment: 'Testing aml alert',
      action: xdr.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      tasksToAdd: 0,
      tasksToRemove: 4,
      externalDetails: { details: 'All right' }
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
    expect(obj.tasksToAdd).to.be.equal(opts.tasksToAdd)
    expect(obj.tasksToRemove).to.be.equal(opts.tasksToRemove)
    expect(obj.externalDetails).to.be.equal(JSON.stringify(opts.externalDetails))
  })
})
