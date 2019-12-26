import { Keypair } from '../keypair'
import { ReviewableRequestBuilder } from './manage_reviewable_request_builder'
import { PaymentBuilder } from './payment_builder'

describe('ReviewableRequestBuilder', () => {
  it('convert operation', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'
    let securityType = '2'
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
    let converted = ReviewableRequestBuilder.convertOperationToReviewableRequestOperation(op)
    let obj = ReviewableRequestBuilder.reviewableRequestOperationToObject(converted)
    expect(converted.switch().name).to.be.equal('payment')
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId)
  })
  it('create reviewable request', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'
    let securityType = '2'
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
    let rr = ReviewableRequestBuilder.createReviewableRequest({
      creatorDetails: {},
      operations: [op],
      securityType: '1'
    })

    console.log(rr)
  })
})
