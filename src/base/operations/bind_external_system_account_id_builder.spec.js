import { BindExternalSystemAccountIdBuilder } from './bind_external_system_account_id_builder'
import { Operation } from '../operation'
import { default as xdr } from '../generated/xdr_generated'

describe('bind external system id', function () {
  it('Success', function () {
    const externalSystemType = 1
    let op = BindExternalSystemAccountIdBuilder.createBindExternalSystemAccountIdOp({
      externalSystemType
    })

    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)

    expect(externalSystemType).to.be.equal(obj.externalSystemType)
  })
})
