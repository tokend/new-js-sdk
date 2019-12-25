import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { KYCRecoveryBuilder } from './kyc_recovery_builder'

describe('Create kyc recovery', function () {
  it('Success', function () {
    let account = Keypair.random().accountId()
    let signer = Keypair.random().accountId()
    let op = KYCRecoveryBuilder.kycRecovery({
      targetAccount: account,
      creatorDetails: {},
      signers: [
        {
          publicKey: signer,
          weight: '1000',
          identity: '1',
          roleIDs: ['1'],
          details: {}
        }
      ]
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('kycRecovery')
    expect(signer).to.be.equal(obj.signers[0].publicKey)
    expect(account).to.be.equal(obj.targetAccount)
  })
})
