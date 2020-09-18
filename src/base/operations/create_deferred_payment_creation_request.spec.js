import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { CreateDeferredPaymentCreationRequestBuilder } from './create_deferred_payment_creation_request'

describe.only('deferred payment creation request', () => {
  it('create', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destination = Keypair.random().accountId()
    let amount = '100'

    let opts = {
      requestID: '0',
      sourceBalanceId: sourceBalanceId,
      destination: destination,
      amount: amount,
      creatorDetails: {}
    }
    let op = CreateDeferredPaymentCreationRequestBuilder
      .createDeferredPaymentCreationRequest(opts)
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.sourceBalanceId).to.be.equal(opts.sourceBalanceId)
    expect(obj.destination).to.be.equal(opts.destination)
    expect(obj.amount).to.be.equal(opts.amount)
    expect(JSON.stringify(obj.creatorDetails)).to.be.equal(JSON.stringify(opts.creatorDetails))
  })
  it('cancel', () => {
    let opts = {
      requestID: '1'
    }
    let op = CreateDeferredPaymentCreationRequestBuilder
      .cancelDeferredPaymentCreationRequest(opts)
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.requestID).to.be.equal(opts.requestID)
  })
})
