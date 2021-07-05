import { RemoveDataBuilder } from './remove_data_builder'
import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'

describe('remove data in blockchain', () => {
  it('success', () => {
    let dataId = '235'
    let op = RemoveDataBuilder.removeData({ dataId })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('removeDatum')
  })
})
