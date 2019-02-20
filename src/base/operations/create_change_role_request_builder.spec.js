import { default as xdr } from '../generated/xdr_generated'
import { isEqual } from 'lodash'
import { Operation } from '../operation'
import { CreateChangeRoleRequestBuilder } from './create_change_role_request_builder'

describe('KYC request op', () => {
  it('Success', () => {
    let requestID = '0'
    let accountID = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
    let accountRole = '1'
    let kycData = { 'hash': 'bb36c7c58c4c32d98947c8781c91c7bb797c3647' }
    let allTasks = 3
    let op = CreateChangeRoleRequestBuilder.createChangeRoleRequest({
      requestID: requestID,
      destinationAccount: accountID,
      accountRoleToSet: accountRole,
      kycData: kycData,
      allTasks: allTasks
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createChangeRoleRequest')
    expect(obj.destinationAccount).to.be.equal(accountID)
    expect(obj.accountRoleToSet).to.be.equal(accountRole)
    expect(isEqual(obj.kycData, kycData)).to.be.true
    expect(obj.allTasks).to.be.equal(allTasks)
  })
})
