import xdr from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { Operation } from '../operation'
import { ManageLimitsBuilder } from './manage_limits_builder'

describe('Manage offer op', () => {
  it('Success create limits for account', () => {
    const opts = {
      accountID: Keypair.random().accountId(),
      accountRole: (1 + Math.floor(Math.random() * 10)).toString(),
      statsOpType: (1 + (Math.floor(Math.random() * 10) % 5)),
      assetCode: 'ETH',
      isConvertNeeded: false,
      dailyOut: '100',
      weeklyOut: '1000',
      monthlyOut: '10000',
      annualOut: '100000',
      source: Keypair.random().accountId()
    }

    let op = ManageLimitsBuilder.createLimits(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)

    expect(obj.account).to.be.equal(opts.accountID)
    expect(obj.accountRole).to.be.equal(opts.accountRole)
    expect(obj.statsOpType).to.be.equal(opts.statsOpType.toString())
    expect(obj.assetCode).to.be.equal(opts.assetCode)
    expect(obj.isConvertNeeded).to.be.equal(opts.isConvertNeeded)
    expect(obj.dailyOut).to.be.equal(opts.dailyOut)
    expect(obj.weeklyOut).to.be.equal(opts.weeklyOut)
    expect(obj.monthlyOut).to.be.equal(opts.monthlyOut)
    expect(obj.annualOut).to.be.equal(opts.annualOut)
  })

  it('Success remove limits from account', () => {
    const opts = {
      id: (1 + Math.floor(Math.random() * 10)).toString()
    }

    let op = ManageLimitsBuilder.removeLimits(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)

    expect(obj.id).to.be.equal(opts.id)
  })
})
