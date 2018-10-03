import { default as xdr } from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { Operation } from '../operation'
import { PaymentV2Builder } from './payment_v2_builder'

describe('PaymentV2RequestBuilder', () => {
  it('Success', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destination = Keypair.random().accountId()
    let amount = '200.123'
    let sourcePaysForDest = true

    let feeData = {
      sourceFee: {
        maxPaymentFee: '1.001',
        fixedFee: '0.001',
        feeAsset: 'BLC'
      },
      destinationFee: {
        maxPaymentFee: '2.21',
        fixedFee: '0.15',
        feeAsset: 'BLC'
      },
      sourcePaysForDest
    }

    let subject = 'Some random text'
    let reference = 'Some another random text'

    let op = PaymentV2Builder.paymentV2({
      sourceBalanceId,
      destination,
      amount,
      feeData,
      subject,
      reference
    })

    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)

    expect(obj.type).to.be.equal('paymentV2')

    expect(obj.sourceBalanceId).to.equal(sourceBalanceId)
    expect(obj.destination).to.equal(destination)
    expect(obj.amount).to.equal(amount)
    expect(obj.feeData.sourcePaysForDest).to.equal(sourcePaysForDest)
    expect(obj.subject).to.equal(subject)
    expect(obj.reference).to.equal(reference)
    expect(obj.feeData.sourceFee.maxPaymentFee).to.equal(feeData.sourceFee.maxPaymentFee)
    expect(obj.feeData.sourceFee.fixedFee).to.equal(feeData.sourceFee.fixedFee)
    expect(obj.feeData.sourceFee.feeAsset).to.equal(feeData.sourceFee.feeAsset)
    expect(obj.feeData.destinationFee.maxPaymentFee).to.equal(
      feeData.destinationFee.maxPaymentFee
    )
    expect(obj.feeData.destinationFee.fixedFee).to.equal(feeData.destinationFee.fixedFee)
    expect(obj.feeData.destinationFee.feeAsset).to.equal(feeData.destinationFee.feeAsset)
  })
})
