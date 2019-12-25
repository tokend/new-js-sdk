import { PaymentBuilder } from './payment_builder'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { xdr } from '../index'

describe('Payment op', function () {
  let sourceBalanceId = Keypair.random().balanceId()
  let destinationBalanceId = Keypair.random().balanceId()
  let destinationAccountId = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
  let amount = '100'
  let securityType = '2'

  it('Payment for balance success', function () {
    let op = PaymentBuilder.payment({
      sourceBalanceId: sourceBalanceId,
      destination: destinationBalanceId,
      amount: amount,
      securityType: securityType,
      feeData: {
        sourceFee: {
          percent: '120',
          fixed: '110'
        },
        destinationFee: {
          percent: '20',
          fixed: '10'
        },
        sourcePaysForDest: true
      },
      subject: 'subj',
      reference: 'ref'
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('payment')
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId)
    expect(obj.destination).to.be.equal(destinationBalanceId)
    expect(obj.amount).to.be.equal(amount)
    expect(obj.securityType).to.be.equal(securityType)
    expect(obj.feeData.sourcePaysForDest).to.be.equal(true)
    expect(obj.feeData.sourceFee.fixed).to.be.equal('110')
    expect(obj.feeData.sourceFee.percent).to.be.equal('120')
    expect(obj.feeData.destinationFee.fixed).to.be.equal('10')
    expect(obj.feeData.destinationFee.percent).to.be.equal('20')
    expect(obj.subject).to.be.equal('subj')
    expect(obj.reference).to.be.equal('ref')
  })
  it('Payment for account success', function () {
    let op = PaymentBuilder.payment({
      sourceBalanceId: sourceBalanceId,
      destination: destinationAccountId,
      amount: amount,
      securityType: securityType,
      feeData: {
        sourceFee: {
          percent: '120',
          fixed: '110'
        },
        destinationFee: {
          percent: '20',
          fixed: '10'
        },
        sourcePaysForDest: true
      },
      subject: 'subj',
      reference: 'ref'
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('payment')
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId)
    expect(obj.destination).to.be.equal(destinationAccountId)
    expect(obj.amount).to.be.equal(amount)
    expect(obj.feeData.sourcePaysForDest).to.be.equal(true)
    expect(obj.feeData.sourceFee.fixed).to.be.equal('110')
    expect(obj.feeData.sourceFee.percent).to.be.equal('120')
    expect(obj.feeData.destinationFee.fixed).to.be.equal('10')
    expect(obj.feeData.destinationFee.percent).to.be.equal('20')
    expect(obj.securityType).to.be.equal(securityType)
    expect(obj.subject).to.be.equal('subj')
    expect(obj.reference).to.be.equal('ref')
  })

  it('creates a paymentOp', () => {
    let amount = '1000'
    let op = PaymentBuilder.payment({
      securityType: '1',
      amount: amount,
      subject: 'subj',
      sourceBalanceId: sourceBalanceId,
      destination: destinationBalanceId,
      reference: 'ref',
      feeData: {
        sourceFee: {
          percent: '120',
          fixed: '110'
        },
        destinationFee: {
          percent: '20',
          fixed: '10'
        },
        sourcePaysForDest: true
      }
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('payment')
    expect(operation.body().value().amount().toString())
      .to.be.equal('1000000000')
    expect(obj.amount).to.be.equal(amount)
    expect(obj.subject).to.be.equal('subj')
    expect(obj.reference).to.be.equal('ref')
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId)
    expect(obj.destination).to.be.equal(destinationBalanceId)
    expect(obj.feeData.sourcePaysForDest).to.be.equal(true)
    expect(obj.feeData.sourceFee.fixed).to.be.equal('110')
    expect(obj.feeData.sourceFee.percent).to.be.equal('120')
    expect(obj.feeData.destinationFee.fixed).to.be.equal('10')
    expect(obj.feeData.destinationFee.percent).to.be.equal('20')
  })

  it('fails to create payment operation without feeData', () => {
    let opts = {
      amount: '20',
      securityType: '1',
      fixedFee: '0',
      subject: 'subj',
      sourceBalanceId,
      destinationBalanceId
    }
    expectThrow(() => PaymentBuilder.payment(opts))
  })

  it('fails to create payment operation with an invalid amount', () => {
    let opts = {
      amount: 20,
      fixedFee: '0',
      paymentFee: '0',
      subject: 'subj',
      securityType: '1',
      sourceBalanceId: sourceBalanceId,
      destination: destinationBalanceId,
      feeData: {
        sourceFee: {
          paymentFee: '0',
          fixedFee: '10'
        },
        destinationFee: {
          paymentFee: '0',
          fixedFee: '10'
        },
        sourcePaysForDest: true
      }
    }
    expectThrow(() => PaymentBuilder.payment(opts))
  })
  it('fails to create payment operation with an invalid subject', () => {
    let opts = {
      amount: '20',
      fixedFee: '0',
      paymentFee: '0',
      securityType: '1',
      subject: 12123,
      sourceBalanceId: sourceBalanceId,
      destination: destinationBalanceId,
      feeData: {
        sourceFee: {
          paymentFee: '0',
          fixedFee: '10'
        },
        destinationFee: {
          paymentFee: '0',
          fixedFee: '10'
        },
        sourcePaysForDest: true
      }
    }
    expectThrow(() => PaymentBuilder.payment(opts))
  })

  it('fails to create payment operation with an invalid sourceBalanceId', () => {
    let opts = {
      amount: '20',
      fixedFee: '0',
      paymentFee: '0',
      securityType: '1',
      subject: '12123',
      sourceBalanceId: 123,
      destination: destinationBalanceId,
      feeData: {
        sourceFee: {
          paymentFee: '0',
          fixedFee: '10'
        },
        destinationFee: {
          paymentFee: '0',
          fixedFee: '10'
        },
        sourcePaysForDest: true
      }
    }
    expectThrow(() => PaymentBuilder.payment(opts))
  })

  it('fails to create payment operation with an invalid destinationBalanceId', () => {
    let opts = {
      amount: '20',
      fixedFee: '0',
      paymentFee: '0',
      securityType: '1',
      subject: '12123',
      sourceBalanceId,
      destinationBalanceId: 123,
      feeData: {
        sourceFee: {
          paymentFee: '0',
          fixedFee: '10'
        },
        destinationFee: {
          paymentFee: '0',
          fixedFee: '10'
        },
        sourcePaysForDest: true
      }
    }
    expectThrow(() => PaymentBuilder.payment(opts))
  })
})
