import { Keypair } from './keypair'
import { Operation } from './operation'
import { Memo } from './memo'
import { TransactionBuilder } from './transaction_builder'

describe('TransactionBuilder', () => {
  describe('constructs a native payment transaction with one operation', () => {
    let source
    let amount
    let transaction
    let memo
    let sourceBalanceId
    let destinationBalanceId
    beforeEach(() => {
      source = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
      amount = '1000'
      memo = Memo.id('100')
      sourceBalanceId = Keypair.random().balanceId()
      destinationBalanceId = Keypair.random().balanceId()
      let sourceBalance = sourceBalanceId
      let timebounds = {
        minTime: '1455287522',
        maxTime: '1455297545'
      }
      let transactionOptions = { sourceBalance, timebounds }
      transaction = new TransactionBuilder(source, transactionOptions)
        .addOperation(Operation.payment({
          amount: amount,
          fixedFee: '0',
          paymentFee: '0',
          subject: 'test',
          sourceBalanceId,
          destinationBalanceId,
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
        }))
        .addMemo(memo)
        .build()
    })

    it('should have the same source account', function (done) {
      expect(transaction.source)
        .to.be.equal(source)
      done()
    })

    it('should have one payment operation', function (done) {
      expect(transaction.operations.length).to.be.equal(1)
      expect(transaction.operations[0].type).to.be.equal('payment')
      done()
    })
  })

  describe('constructs a native payment transaction with two operations', () => {
    let source
    let sourceBalanceId
    let destinationBalanceId1
    let amount1
    let destinationBalanceId2
    let amount2
    let transaction
    beforeEach(() => {
      source = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
      amount1 = '1000'
      amount2 = '2000'

      sourceBalanceId = Keypair.random().balanceId()
      destinationBalanceId1 = Keypair.random().balanceId()
      destinationBalanceId2 = Keypair.random().balanceId()

      let timebounds = {
        minTime: '1455287522',
        maxTime: '1455297545'
      }

      let sourceBalance = sourceBalanceId
      let transactionOptions = { sourceBalance, timebounds }
      transaction = new TransactionBuilder(source, transactionOptions)
        .addOperation(Operation.payment({
          amount: amount1,
          fixedFee: '0',
          paymentFee: '0',
          subject: 'test',
          sourceBalanceId,
          destinationBalanceId: destinationBalanceId1,
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
        }))
        .addOperation(Operation.payment({
          amount: amount2,
          fixedFee: '0',
          paymentFee: '0',
          subject: 'test',
          sourceBalanceId,
          destinationBalanceId: destinationBalanceId2,
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
        }))
        .build()
    })

    it('should have the same source account', function (done) {
      expect(transaction.source)
        .to.be.equal(source)
      done()
    })

    it('should have two payment operation', function (done) {
      expect(transaction.operations.length).to.be.equal(2)
      expect(transaction.operations[0].type).to.be.equal('payment')
      expect(transaction.operations[1].type).to.be.equal('payment')
      done()
    })
  })

  describe('constructs a native payment transaction with timebounds', () => {
    it('should have have timebounds', function (done) {
      let source = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
      let timebounds = {
        minTime: '1455287522',
        maxTime: '1455297545'
      }
      let sourceBalanceId = Keypair.random().balanceId()
      let destinationBalanceId = Keypair.random().balanceId()
      let transaction = new TransactionBuilder(source, { timebounds })
        .addOperation(Operation.payment({
          amount: '1000',
          fixedFee: '0',
          paymentFee: '0',
          subject: 'test',
          sourceBalanceId,
          destinationBalanceId,
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
        }))
        .build()

      expect(transaction.timeBounds.minTime).to.be.equal(timebounds.minTime)
      expect(transaction.timeBounds.maxTime).to.be.equal(timebounds.maxTime)
      done()
    })
  })
})
