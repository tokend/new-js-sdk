import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { CreateKYCRecoveryRequestBuilder } from './create_kyc_recovery_request_builder'

describe('Create kyc recovery', function () {
  it('Success', function () {
    let account = Keypair.random().accountId()
    let signer = Keypair.random().accountId()
    let allTasks = 1
    let op = CreateKYCRecoveryRequestBuilder.create({
      targetAccount: account,
      creatorDetails: {},
      allTasks: allTasks,
      signersData: [
        {
          publicKey: signer,
          weight: '1000',
          identity: '1',
          roleID: '1',
          details: {}
        }
      ]
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createKycRecoveryRequest')
    expect('0').to.be.equal(obj.requestID)
    expect(signer).to.be.equal(obj.signersData[0].publicKey)
    expect(account).to.be.equal(obj.targetAccount)
    expect(allTasks).to.be.equal(obj.allTasks)
  })
})
