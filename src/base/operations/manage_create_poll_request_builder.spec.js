import { isEqual } from 'lodash'
import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ManageCreatePollRequestBuilder } from './manage_create_poll_request_builder'

describe('ManageCreatePollRequestBuilder', () => {
  it('Create', () => {
    let opt = {
      resultProviderID: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      permissionType: 1,
      pollType: 0,
      startTime: '4123421',
      endTime: '4123425',
      numberOfChoices: 762354,
      voteConfirmationRequired: true,
      creatorDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: 'logo',
        name: 'sale name'
      }
    }
    let op = ManageCreatePollRequestBuilder.createPollRequest(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageCreatePollRequest().name)
    expect(opt.permissionType).to.be.equal(obj.permissionType)
    expect(opt.pollType).to.be.equal(obj.pollType)
    expect(opt.resultProviderID).to.be.equal(obj.resultProviderID)
    expect(opt.startTime).to.be.equal(obj.startTime)
    expect(opt.endTime).to.be.equal(obj.endTime)
    expect(opt.numberOfChoices).to.be.equal(obj.numberOfChoices)
    expect(opt.voteConfirmationRequired).to.be.equal(obj.voteConfirmationRequired)
    expect(isEqual(opt.creatorDetails, obj.creatorDetails)).to.be.true
  })
  it('Cancel', () => {
    let opt = {
      requestID: '12'
    }
    let op = ManageCreatePollRequestBuilder.cancelPollRequest(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageCreatePollRequest().name)
    expect(opt.requestID).to.be.equal(obj.requestID)
  })
})
