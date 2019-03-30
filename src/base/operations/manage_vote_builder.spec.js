import { isEqual } from 'lodash'
import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ManageVoteBuilder } from './manage_vote_builder'

describe('ManageVoteBuilder', () => {
  it('Create', () => {
    let opt = {
      pollType: 0,
      pollID: '4123421',
      choice: 1
    }
    let op = ManageVoteBuilder.createSingleChoiceVote(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageVote().name)
    expect(opt.pollID).to.be.equal(obj.pollID)
    expect(opt.pollType).to.be.equal(obj.pollType)
  })
  it('Remove', () => {
    let opt = {
      pollID: '12'
    }
    let op = ManageVoteBuilder.removeVote(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageVote().name)
    expect(opt.pollID).to.be.equal(obj.pollID)
  })
})
