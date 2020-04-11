import { CreateDataBuilder } from './create_data_builder'
import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'

describe.only('write data in blockchain', () => {
  it('success', () => {
    let destination = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
    let roleID = '1'
    let signersData = [
      {
        roleID: roleID,
        publicKey: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        weight: '8',
        identity: '2',
        details: {}
      },
      {
        roleID: roleID,
        publicKey: 'GDZXNSOUESYZMHRC3TZRN4VXSIOT47MDDUVD6U7CWXHTDLXVVGU64LVV',
        weight: '3',
        identity: '4',
        details: {}
      }
    ]
    let op = CreateDataBuilder.createData({
      destination,
      roleID,
      signersData
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createData')
  })
})
