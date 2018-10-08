import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { CreateReferenceBuilder } from './create_reference_builder'

describe('CreateReferenceBuilder', () => {
  it('Success', () => {
    let opts = {
      reference: 'Some string'
    }
    let op = CreateReferenceBuilder.createReference(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createReference().name)
    expect(obj.reference).to.be.equal(opts.reference)
  })
})
