import { UpdateDataOwnerBuilder } from './update_data_owner_builder'
import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'

describe('update data owner in blockchain', () => {
  it('success', () => {
    let dataId = '235'
    let newOwner = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
    let op = UpdateDataOwnerBuilder.updateDataOwner({
      dataId,
      newOwner
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('updateDatumOwner')
    expect(dataId).to.be.equal(obj.dataId)
    expect(newOwner).to.be.equal(obj.newOwner)
  })
})
