import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { CreateAccountBuilder } from './create_account_builder'

describe('create Account', () => {
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
    let op = CreateAccountBuilder.createAccount({
      destination,
      roleID,
      signersData
    })
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createAccount')
    expect(obj.destination).to.be.equal(destination)
    expect(obj.roleID).to.be.equal(roleID)
  })

  it('fails to create createAccount operation with an invalid destination address', () => {
    let opts = {
      destination: 'GCEZW',
      source: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      roleID: '1'
    }
    expectThrow(() => Operation.createAccount(opts))
  })

  it('fails to create createAccount operation with empty signers data', () => {
    let opts = {
      destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      signersData: [],
      roleID: '1'
    }
    expectThrow(() => Operation.createAccount(opts))
  })

  it('fails to create createAccount operation with an invalid source address', () => {
    let opts = {
      destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      roleID: '1',
      source: 'GCEZ'
    }
    expectThrow(() => Operation.createAccount(opts))
  })
  it('fails to create createAccount with undefined signersData', () => {
    let opts = {
      destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      source: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      roleID: '1',
    }
    expectThrow(() => Operation.createAccount(opts))
  })
})
