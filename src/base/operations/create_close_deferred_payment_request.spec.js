import { Keypair } from '../keypair'
import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { CreateCloseDeferredPaymentRequestBuilder } from './create_close_deferred_payment_request'

describe('create close deferred payment request', () => {
  it('create', () => {
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'

    let opts = {
      requestID: '0',
      deferredPaymentID: '1',
      destination: destinationBalanceId,
      amount: amount,
      creatorDetails: {}
    }
    let op = CreateCloseDeferredPaymentRequestBuilder
      .createCloseDeferredPaymentRequest(opts)
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.deferredPaymentID).to.be.equal(opts.deferredPaymentID)
    expect(obj.destination).to.be.equal(opts.destination)
    expect(obj.amount).to.be.equal(opts.amount)
    expect(JSON.stringify(obj.creatorDetails)).to.be.equal(JSON.stringify(opts.creatorDetails))
  })
  it('create failed', () => {
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'

    let opts = {
      requestID: '0',
      destination: destinationBalanceId,
      amount: amount,
      creatorDetails: {}
    }
    expectThrow(() => CreateCloseDeferredPaymentRequestBuilder
      .createCloseDeferredPaymentRequest(opts))
  })
  it('update', () => {
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'

    let opts = {
      requestID: '0',
      deferredPaymentID: '1',
      destination: destinationBalanceId,
      amount: amount,
      creatorDetails: {}
    }
    let op = CreateCloseDeferredPaymentRequestBuilder
      .createCloseDeferredPaymentRequest(opts)
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.deferredPaymentID).to.be.equal(opts.deferredPaymentID)
    expect(obj.destination).to.be.equal(opts.destination)
    expect(obj.amount).to.be.equal(opts.amount)
    expect(JSON.stringify(obj.creatorDetails)).to.be.equal(JSON.stringify(opts.creatorDetails))
  })
  it('update failed', () => {
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'

    let opts = {
      requestID: '0',
      destination: destinationBalanceId,
      amount: amount,
      creatorDetails: {}
    }
    expectThrow(() => CreateCloseDeferredPaymentRequestBuilder
      .createCloseDeferredPaymentRequest(opts))
  })
  it('cancel', () => {
    let opts = {
      requestID: '1'
    }
    let op = CreateCloseDeferredPaymentRequestBuilder
      .cancelCloseDeferredPaymentRequest(opts)
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.requestID).to.be.equal(opts.requestID)
  })
  it('cancel failed', () => {
    let opts = {}
    expectThrow(() => CreateCloseDeferredPaymentRequestBuilder
      .cancelCloseDeferredPaymentRequest(opts))
  })
  it('create request for unlock of unclaimed assets', () => {
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'

    let opts = {
      requestID: '0',
      deferredPaymentID: '1',
      destination: destinationBalanceId,
      amount: amount,
      creatorDetails: {
        payments_ids: [1]
      }
    }
    let op = CreateCloseDeferredPaymentRequestBuilder
      .createCloseDeferredPaymentRequest(opts)
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.deferredPaymentID).to.be.equal(opts.deferredPaymentID)
    expect(obj.destination).to.be.equal(opts.destination)
    expect(obj.amount).to.be.equal(opts.amount)
    expect(JSON.stringify(obj.creatorDetails)).to.be.equal(JSON.stringify(opts.creatorDetails))
  })
  it('create request for unlock of unclaimed assets failed', () => {
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'

    let opts = {
      requestID: '0',
      destination: destinationBalanceId,
      amount: amount,
      creatorDetails: {
        payments_ids: [1]
      }
    }
    expectThrow(() => CreateCloseDeferredPaymentRequestBuilder
      .createCloseDeferredPaymentRequest(opts))
  })
  it('update request for unlock of unclaimed assets', () => {
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'

    let opts = {
      requestID: '0',
      deferredPaymentID: '1',
      destination: destinationBalanceId,
      amount: amount,
      creatorDetails: {
        payments_ids: [1]
      }
    }
    let op = CreateCloseDeferredPaymentRequestBuilder
      .createCloseDeferredPaymentRequest(opts)
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(obj.deferredPaymentID).to.be.equal(opts.deferredPaymentID)
    expect(obj.destination).to.be.equal(opts.destination)
    expect(obj.amount).to.be.equal(opts.amount)
    expect(JSON.stringify(obj.creatorDetails)).to.be.equal(JSON.stringify(opts.creatorDetails))
  })
  it('update request for unlock of unclaimed assets failed', () => {
    let destinationBalanceId = Keypair.random().balanceId()
    let amount = '100'

    let opts = {
      requestID: '0',
      destination: destinationBalanceId,
      amount: amount,
      creatorDetails: {
        payments_ids: [1]
      }
    }
    expectThrow(() => CreateCloseDeferredPaymentRequestBuilder
      .createCloseDeferredPaymentRequest(opts))
  })
  it('cancel request for unlock of unclaimed assets', () => {
    let opts = {
      requestID: '1'
    }
    let op = CreateCloseDeferredPaymentRequestBuilder
      .cancelCloseDeferredPaymentRequest(opts)
    let opXdr = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.requestID).to.be.equal(opts.requestID)
  })
  it('cancel request for unlock of unclaimed assets failed', () => {
    let opts = {}
    expectThrow(() => CreateCloseDeferredPaymentRequestBuilder
      .cancelCloseDeferredPaymentRequest(opts))
  })
})
