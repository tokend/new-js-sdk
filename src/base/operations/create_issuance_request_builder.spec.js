import { default as xdr } from '../generated/xdr_generated'
import { isEqual } from 'lodash'
import { Keypair } from '../keypair'
import { Operation } from '../operation'
import { CreateIssuanceRequestBuilder } from './create_issuance_request_builder'

describe('CreateIssuanceRequestBuilder', () => {
  it('Success', () => {
    let amount = '200.123'
    let reference = 'test'
    let asset = 'BLC'
    let receiver = Keypair.random().balanceId()
    let externalDetails = JSON.stringify({ 'data': 'some details' })
    let op = CreateIssuanceRequestBuilder.createIssuanceRequest({
      asset,
      amount,
      reference,
      receiver,
      externalDetails
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createIssuanceRequest')
    expect(reference).to.be.equal(obj.reference)
    expect(amount).to.be.equal(obj.amount)
    expect(asset).to.be.equal(obj.asset)
    expect(receiver).to.be.equal(obj.receiver)
    expect(externalDetails).to.be.equal(JSON.stringify(obj.externalDetails))
  })
})
