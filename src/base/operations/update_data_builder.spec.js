import { UpdateDataBuilder } from './update_data_builder'
import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'

describe('update data in blockchain', () => {
  it('success', () => {
    let dataId = '235'
    let value = {
      name: 'test'
    }
    let op = UpdateDataBuilder.updateData({
      dataId,
      value
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('updateDatum')
    expect(dataId).to.be.equal(obj.dataId)
    expect(JSON.stringify(value)).to.be.equal(JSON.stringify(obj.value))
  })
})
