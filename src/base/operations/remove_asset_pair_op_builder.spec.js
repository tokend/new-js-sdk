import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { RemoveAssetPairOpBuilder } from './remove_asset_pair_op_builder'

describe('RemoveAssetPairOpBuilder', () => {
  it('Success', () => {
    let opt = {
      base: 'BTC',
      quote: 'USD'
    }
    let op = RemoveAssetPairOpBuilder.removeAssetPairOp(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.removeAssetPair().name)
    expect(obj.base).to.be.equal(opt.base)
    expect(obj.quote).to.be.equal(opt.quote)
  })
})
