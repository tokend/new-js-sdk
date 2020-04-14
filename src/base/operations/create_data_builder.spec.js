import { CreateDataBuilder } from './create_data_builder'
import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'

describe.only('write data in blockchain', () => {
  it('success', () => {
    let type = '20'
    let value = {
      name: 'test'
    }
    let op = CreateDataBuilder.createData({
      type,
      value
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createDatum')
    expect(type).to.be.equal(obj.dataType)
    expect(JSON.stringify(value)).to.be.equal(JSON.stringify(obj.value))
  })
})
