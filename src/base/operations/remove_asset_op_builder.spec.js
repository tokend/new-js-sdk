import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { RemoveAssetOpBuilder } from './remove_asset_op_builder'

describe('RemoveAssetOpBuilder', () => {
  it('Success', () => {
    let opt = {
      code: 'USD'
    }
    let op = RemoveAssetOpBuilder.removeAssetOp(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.removeAsset().name)
    expect(obj.code).to.be.equal(opt.code)
  })
})
