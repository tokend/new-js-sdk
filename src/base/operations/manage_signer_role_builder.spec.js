import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ManageSignerRoleBuilder } from './manage_signer_role_builder'

describe('Manage signer role', () => {
  it('Create', () => {
    let opt = {
      details: { test: 'test' },
      isReadOnly: false,
      ruleIDs: ['1']
    }
    let op = ManageSignerRoleBuilder.create(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageSignerRole().name)
    expect(opt.details.test).to.be.equal(obj.details.test)
    expect(opt.ruleIDs[0]).to.be.equal(obj.ruleIDs[0])
  })
  it('Update', () => {
    let opt = {
      roleId: '1',
      details: { test: 'test' },
      ruleIDs: ['1']
    }
    let op = ManageSignerRoleBuilder.update(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageSignerRole().name)
    expect(opt.details.test).to.be.equal(obj.details.test)
    expect(opt.ruleIDs[0]).to.be.equal(obj.ruleIDs[0])
    expect(opt.roleId).to.be.equal(obj.roleId)
  })
  it('Remove', () => {
    let opt = {
      roleId: '1'
    }
    let op = ManageSignerRoleBuilder.remove(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageSignerRole().name)
    expect(opt.roleId).to.be.equal(obj.roleId)
  })
})
