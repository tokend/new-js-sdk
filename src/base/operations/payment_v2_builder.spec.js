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
        percent: '1.001',
        fixed: '0.001'
      },
      destinationFee: {
        percent: '2.21',
        fixed: '0.15'
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
    expect(obj.feeData.sourceFee.percent).to.equal(feeData.sourceFee.percent)
    expect(obj.feeData.sourceFee.fixed).to.equal(feeData.sourceFee.fixed)
    expect(obj.feeData.destinationFee.percent).to.equal(
      feeData.destinationFee.percent
    )
    expect(obj.feeData.destinationFee.fixed).to.equal(feeData.destinationFee.fixed)
  })
})
