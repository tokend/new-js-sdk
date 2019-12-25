import xdr from '../generated/xdr_generated'
import { isEqual } from 'lodash'
import { Operation } from '../operation'
import { ChangeAccountRolesBuilder } from './change_account_roles_builder'

describe('Change account roles', () => {
  it('Success', () => {
    let accountID = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
    let accountRoles = ['1']
    let kycData = { 'hash': 'bb36c7c58c4c32d98947c8781c91c7bb797c3647' }
    let op = ChangeAccountRolesBuilder.changeRoles({
      destinationAccount: accountID,
      accountRolesToSet: accountRoles,
      details: kycData
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('changeAccountRole')
    expect(obj.destinationAccount).to.be.equal(accountID)
    expect(isEqual(obj.details, kycData)).to.be.true
  })
})
