import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { InitiateKYCRecoveryBuilder } from './initiate_kyc_recovery_builder'

describe('Initiate kyc recovery', function () {
  it('Success', function () {
    let account = Keypair.random().accountId()
    let signer = Keypair.random().accountId()
    let op = InitiateKYCRecoveryBuilder.initiateKycRecovery({
      targetAccount: account,
      signer: signer
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('initiateKycRecovery')
    expect(signer).to.be.equal(obj.signer)
    expect(account).to.be.equal(obj.account)
  })
})
