import { OpenSwapBuilder } from './open_swap_builder'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { xdr } from '../index'

describe('OpenSwap op', function () {
  let sourceBalance = Keypair.random().balanceId()
  let destinationBalanceId = Keypair.random().balanceId()
  let destinationAccountId = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
  let amount = '100'
  let secretHash = 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d'
  let details = {
    very: 'important'
  }
  it('OpenSwap for balance success', function () {
    let op = OpenSwapBuilder.openSwap({
      sourceBalance: sourceBalance,
      destination: destinationBalanceId,
      amount: amount,
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
      details: details,
      secretHash: 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d',
      lockTime: '4123421'
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('openSwap')
    expect(obj.sourceBalance).to.be.equal(sourceBalance)
    expect(obj.destination).to.be.equal(destinationBalanceId)
    expect(obj.amount).to.be.equal(amount)
    expect(obj.feeData.sourcePaysForDest).to.be.equal(true)
    expect(obj.feeData.sourceFee.fixed).to.be.equal('110')
    expect(obj.feeData.sourceFee.percent).to.be.equal('120')
    expect(obj.feeData.destinationFee.fixed).to.be.equal('10')
    expect(obj.feeData.destinationFee.percent).to.be.equal('20')
    expect(JSON.stringify(obj.details)).to.be.equal(JSON.stringify(details))
    expect(obj.secretHash).to.be.equal(secretHash)
  })
  it('OpenSwap for account success', function () {
    let op = OpenSwapBuilder.openSwap({
      sourceBalance: sourceBalance,
      destination: destinationAccountId,
      amount: amount,
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
      details: details,
      secretHash: 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d',
      lockTime: '4123421'
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('openSwap')
    expect(obj.sourceBalance).to.be.equal(sourceBalance)
    expect(obj.destination).to.be.equal(destinationAccountId)
    expect(obj.amount).to.be.equal(amount)
    expect(obj.feeData.sourcePaysForDest).to.be.equal(true)
    expect(obj.feeData.sourceFee.fixed).to.be.equal('110')
    expect(obj.feeData.sourceFee.percent).to.be.equal('120')
    expect(obj.feeData.destinationFee.fixed).to.be.equal('10')
    expect(obj.feeData.destinationFee.percent).to.be.equal('20')
    expect(JSON.stringify(obj.details)).to.be.equal(JSON.stringify(details))
    expect(obj.secretHash).to.be.equal(secretHash)
  })
})
