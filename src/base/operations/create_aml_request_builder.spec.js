import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { CreateAMLRequestBuilder } from './create_aml_request_builder'

describe('CreateAMLRequestBuilder', () => {
  it('Success', () => {
    let opt = {
      balanceID: Keypair.random().balanceId(),
      amount: '1002',
      reason: 'Because we can',
      reference: 'Some random reference'
    }
    let op = CreateAMLRequestBuilder.createAMLAlert(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createAmlAlert().name)
    expect(obj.balanceID).to.be.equal(opt.balanceID)
    expect(obj.amount).to.be.equal(opt.amount)
    expect(obj.reason).to.be.equal(opt.reason)
    expect(obj.reference).to.be.equal(opt.reference)
  })
})
