import { Keypair } from '../keypair'
import { ReviewableRequestBuilder } from './manage_reviewable_request_builder'
import { PaymentBuilder } from './payment_builder'
import { Operation } from '../operation'
import { isEqual } from 'lodash'

describe('ReviewableRequestBuilder', () => {
  it('convert operation', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'
    let securityType = '2'
    let paymentOpts = {
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
    }
    let op = PaymentBuilder.payment(paymentOpts)
    let converted = ReviewableRequestBuilder.convertOperationToReviewableRequestOperation(op)
    let obj = ReviewableRequestBuilder.reviewableRequestOperationToObject(converted)
    expect(converted.switch().name).to.be.equal('payment')
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId)
    expect(obj.destination).to.be.equal(destinationBalanceId)
    expect(obj.securityType).to.be.equal(securityType)
    expect(obj.subject).to.be.equal(paymentOpts.subject)
    expect(obj.reference).to.be.equal(paymentOpts.reference)
  })

  it('create reviewable request', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'
    let securityType = '2'
    let creatorDetails = {
      foo: 'bar'
    }
    let paymentOpts = {
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
    }

    let op = PaymentBuilder.payment(paymentOpts)
    let rr = ReviewableRequestBuilder.createReviewableRequest({
      creatorDetails: creatorDetails,
      operations: [op],
      securityType: securityType
    })

    let obj = Operation.operationToObject(rr)

    expect(obj.type).to.be.equal('createReviewableRequest')
    expect(obj.securityType).to.be.equal(securityType)
    expect(obj.operations.length).to.be.equal(1)

    expect(obj.operations[0].amount).to.be.equal(amount)
    expect(obj.operations[0].subject).to.be.equal(paymentOpts.subject)
    expect(obj.operations[0].reference).to.be.equal(paymentOpts.reference)
    expect(obj.operations[0].securityType).to.be.equal(securityType)
    expect(obj.operations[0].destination).to.be.equal(destinationBalanceId)
    expect(obj.operations[0].sourceBalanceId).to.be.equal(sourceBalanceId)

    expect(isEqual(obj.creatorDetails, creatorDetails)).to.be.true
  })

  it('update reviewable request', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'
    let securityType = '2'
    let requestID = '42'
    let creatorDetails = {
      foo: 'bar'
    }
    let paymentOpts = {
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
    }

    let op = PaymentBuilder.payment(paymentOpts)
    let rr = ReviewableRequestBuilder.updateReviewableRequest({
      creatorDetails: creatorDetails,
      operations: [op],
      requestID: requestID
    })

    let obj = Operation.operationToObject(rr)

    expect(obj.type).to.be.equal('updateReviewableRequest')
    expect(obj.requestID).to.be.equal(requestID)
    expect(obj.operations.length).to.be.equal(1)

    expect(obj.operations[0].amount).to.be.equal(amount)
    expect(obj.operations[0].subject).to.be.equal(paymentOpts.subject)
    expect(obj.operations[0].reference).to.be.equal(paymentOpts.reference)
    expect(obj.operations[0].securityType).to.be.equal(securityType)
    expect(obj.operations[0].destination).to.be.equal(destinationBalanceId)
    expect(obj.operations[0].sourceBalanceId).to.be.equal(sourceBalanceId)

    expect(isEqual(obj.creatorDetails, creatorDetails)).to.be.true
  })

  it('remove reviewable request', () => {
    let requestID = '42'
    let rr = ReviewableRequestBuilder.removeReviewableRequest({
      requestID: requestID
    })

    let obj = Operation.operationToObject(rr)

    expect(obj.type).to.be.equal('removeReviewableRequest')
    expect(obj.requestID).to.be.equal(requestID)
  })
})
