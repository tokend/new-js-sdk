import { default as xdr } from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { Operation } from '../operation'
import { PreIssuanceRequest } from '../pre_issuance_request'
import { PreIssuanceRequestOpBuilder } from './pre_issuance_request_op_builder'

describe('PreIssuanceRequestOpBuilder', () => {
  it('Success', () => {
    let amount = '200.123'
    let reference = 'test'
    let asset = 'BLC'
    let keyPair = Keypair.random()
    let preIssuanceRequest = PreIssuanceRequest.build({
      amount,
      reference,
      asset,
      keyPair
    })
    let op = PreIssuanceRequestOpBuilder.createPreIssuanceRequestOp({
      request: preIssuanceRequest
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createPreissuanceRequest')
    expect(reference).to.be.equal(obj.request.reference)
    expect(amount).to.be.equal(obj.request.amount)
    expect(asset).to.be.equal(obj.request.asset)
    expect(preIssuanceRequest.signature().toXDR('hex'))
      .to.be.equal(obj.request.signature.toXDR('hex'))
  })
})
