import { Memo } from './memo'
import { Keypair } from './keypair'
import { TransactionBuilder } from './transaction_builder'
import { Operation } from './operation'
import { Transaction } from './transaction'

describe('Transaction', () => {
  it('constructs Transaction object from a TransactionEnvelope', (done) => {
    let source = 'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB'
    let amount = '2000'
    let sourceBalanceId = Keypair.random().balanceId()
    let destinationBalanceId = Keypair.random().balanceId()
    let timebounds = {
      minTime: '1455287522',
      maxTime: '1455297545'
    }
    let input = new TransactionBuilder(source, { timebounds })
      .addOperation(Operation.payment({
        amount,
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
      })
      )
      .addMemo(Memo.text('Happy birthday!'))
      .build()
      .toEnvelope()
      .toXDR('base64')

    let transaction = new Transaction(input)
    let operation = transaction.operations[0]

    expect(transaction.source).to.be.equal(source)
    expect(transaction.memo.text()).to.be.equal('Happy birthday!')
    expect(operation.type).to.be.equal('payment')
    expect(operation.amount).to.be.equal(amount)

    done()
  })

  it('signs correctly', () => {
    let source = 'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB'
    let sourceBalanceId = Keypair.random().balanceId()
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '2000'
    let signer = Keypair.master()
    let timebounds = {
      minTime: '1455287522',
      maxTime: '1455297545'
    }
    let tx = new TransactionBuilder(source, { timebounds })
      .addOperation(Operation.payment({
        amount,
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
    tx.sign(signer)

    let env = tx.toEnvelope()

    let rawSig = env.signatures()[0].signature()
    let verified = signer.verify(tx.hash(), rawSig)
    expect(verified).to.equal(true)
  })

  it('accepts 0 as a valid fixed fee', function (done) {
    let source = 'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB'
    let amount = '2000'
    let sourceBalanceId = Keypair.random().balanceId()
    let destinationBalanceId = Keypair.random().balanceId()
    let timebounds = {
      minTime: '1455287522',
      maxTime: '1455297545'
    }

    let input = new TransactionBuilder(source, { fee: 0, timebounds })
      .addOperation(Operation.payment({
        amount,
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
      })
      )
      .addMemo(Memo.text('Happy birthday!'))
      .build()
      .toEnvelope()
      .toXDR('base64')

    let transaction = new Transaction(input)
    let operation = transaction.operations[0]

    expect(operation.amount).to.be.equal(amount)

    done()
  })
})
