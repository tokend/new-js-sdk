import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { CreateReferenceBuilder } from './create_reference_builder'
import isEqual from 'lodash/isEqual'

describe('CreateReferenceBuilder', () => {
  it('Success', () => {
    let opts = {
      meta: {
        filename: 'Large Tokenization FAQ',
        docType: 'pdf',
        creator: 'Researcher',
        counterparty: 'Team'
      }
    }
    let op = CreateReferenceBuilder.createReference(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createReference().name)
    expect(isEqual(opts.meta, obj.meta)).to.be.true
  })
})
