import xdr from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { Operation } from '../operation'
import { IssuanceBuilder } from './issuance_builder'

describe('IssuanceBuilder', () => {
  it('Success', () => {
    let amount = '200.123'
    let reference = 'test'
    let asset = 'BLC'
    let securityType = '2'
    let destination = Keypair.random().balanceId()
    let creatorDetails = { 'data': 'some details' }
    let op = IssuanceBuilder.issuance({
      amount: amount,
      asset: asset,
      destination: destination,
      securityType: securityType,
      reference: reference,
      creatorDetails: creatorDetails
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('issuance')
    expect(reference).to.be.equal(obj.reference)
    expect(amount).to.be.equal(obj.amount)
    expect(asset).to.be.equal(obj.asset)
    expect(destination).to.be.equal(obj.destination)
    expect(obj.securityType).to.be.equal(securityType)
    expect(JSON.stringify(creatorDetails)).to.be.equal(JSON.stringify(obj.creatorDetails))
  })
})
