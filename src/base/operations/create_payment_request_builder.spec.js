import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { CreatePaymentRequestBuilder } from './create_payment_request_builder'
import { Keypair } from '../keypair'
import { isEqual } from 'lodash'

describe('createPaymentRequest', () => {
  it('Success', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destination = Keypair.random().balanceId()
    let amount = '100'
    let feeData = {
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
    let subject = 'subj'
    let reference = 'ref'
    let op = CreatePaymentRequestBuilder.createPaymentRequest({
      sourceBalanceId: sourceBalanceId,
      destination: destination,
      amount: amount,
      feeData: feeData,
      subject: subject,
      reference: reference,
      creatorDetails: {}
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createPaymentRequest().name)
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId)
    expect(obj.destination).to.be.equal(destination)
    expect(obj.amount).to.be.equal(amount)
    expect(obj.feeData.sourcePaysForDest).to.be.equal(feeData.sourcePaysForDest)
    expect(obj.feeData.sourceFee.fixed).to.be.equal(feeData.sourceFee.fixed)
    expect(obj.feeData.sourceFee.percent).to.be.equal(feeData.sourceFee.percent)
    expect(obj.feeData.destinationFee.fixed).to.be.equal(feeData.destinationFee.fixed)
    expect(obj.feeData.destinationFee.percent).to.be.equal(feeData.destinationFee.percent)
    expect(obj.subject).to.be.equal('subj')
    expect(obj.reference).to.be.equal('ref')
    expect(isEqual({}, obj.creatorDetails)).to.be.true
  })
  it('Success with creator details', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destination = Keypair.random().balanceId()
    let amount = '100'
    let feeData = {
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
    let creatorDetails = {
      a: 'test'
    }
    let subject = 'subj'
    let reference = 'ref'
    let op = CreatePaymentRequestBuilder.createPaymentRequest({
      sourceBalanceId: sourceBalanceId,
      destination: destination,
      amount: amount,
      feeData: feeData,
      subject: subject,
      reference: reference,
      creatorDetails: creatorDetails
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createPaymentRequest().name)
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId)
    expect(obj.destination).to.be.equal(destination)
    expect(obj.amount).to.be.equal(amount)
    expect(obj.feeData.sourcePaysForDest).to.be.equal(feeData.sourcePaysForDest)
    expect(obj.feeData.sourceFee.fixed).to.be.equal(feeData.sourceFee.fixed)
    expect(obj.feeData.sourceFee.percent).to.be.equal(feeData.sourceFee.percent)
    expect(obj.feeData.destinationFee.fixed).to.be.equal(feeData.destinationFee.fixed)
    expect(obj.feeData.destinationFee.percent).to.be.equal(feeData.destinationFee.percent)
    expect(obj.subject).to.be.equal('subj')
    expect(obj.reference).to.be.equal('ref')
    expect(isEqual(creatorDetails, obj.creatorDetails)).to.be.true
  })
})
