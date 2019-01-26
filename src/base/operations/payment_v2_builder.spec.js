import { PaymentV2Builder } from './payment_v2_builder'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { xdr } from '../index'

describe('PaymentV2 op', function () {
  let sourceBalanceId = Keypair.random().balanceId()
  let destinationBalanceId = Keypair.random().balanceId()
  let destinationAccountId = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
  let amount = '100'

    let feeData = {
      sourceFee: {
        percent: '1.001',
        fixed: '0.001'
      },
      destinationFee: {
        percent: '2.21',
        fixed: '0.15'
      },
      subject: 'subj',
      reference: 'ref'
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
