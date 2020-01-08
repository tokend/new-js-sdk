import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { CreateBalanceBuilder } from './create_balance_builder'

describe('create Balance', () => {
  let destination = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
  let asset = 'USD'
  it('create unique success', () => {
    let additional = false
    let op = CreateBalanceBuilder.createBalance({
      destination: destination,
      additional: additional,
      asset: asset
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createBalance')
    expect(obj.destination).to.be.equal(destination)
    expect(obj.asset).to.be.equal(asset)
    expect(obj.additional).to.be.equal(additional)
  })

  it('additional success', () => {
    let opts = {
      destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      asset: asset,
      additional: true
    }

    let op = CreateBalanceBuilder.createBalance(opts)
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createBalance')
    expect(obj.destination).to.be.equal(destination)
    expect(obj.asset).to.be.equal(asset)
    expect(obj.additional).to.be.equal(true)
  })

  it('fails to create createBalance operation with an invalid destination address', () => {
    let opts = {
      destination: 'GCEZW'
    }
    expectThrow(() => Operation.createBalance(opts))
  })

  it('fails to create createBalance operation with no asset', () => {
    let opts = {
      destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
    }
    expectThrow(() => Operation.createBalance(opts))
  })
})
