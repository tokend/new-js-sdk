import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { isEqual } from 'lodash'
import { ManageSignerBuilder } from './manage_signer_builder'

describe('manage signer op', () => {
  it('Create', () => {
    let roleID = '1'
    let publicKey = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
    let weight = '999'
    let identity = '1'
    let details = { 'hash': 'bb36c7c58c4c32d98947c8781c91c7bb797c3647' }
    let op = ManageSignerBuilder.createSigner({
      roleID: roleID,
      publicKey: publicKey,
      weight: weight,
      identity: identity,
      details: details
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('manageSigner')
    expect(obj.roleID).to.be.equal(roleID)
    expect(obj.publicKey).to.be.equal(publicKey)
    expect(isEqual(obj.details, details)).to.be.true
    expect(obj.weight).to.be.equal(weight)
    expect(obj.identity).to.be.equal(identity)
  })
})
