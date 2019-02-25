import { Operation } from '../operation'
import { CreateAtomicSwapRequestBuilder } from './create_atomic_swap_request_builder'
import { default as xdr } from '../generated/xdr_generated'

describe('Create ASwapBidCreation request', function () {
  it('Success', function () {
    let opts = {
      baseAmount: '911',
      bidID: '69',
      quoteAsset: 'ETH',
      creatorDetails: ''
    }
    let op = CreateAtomicSwapRequestBuilder.createASwapRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createAswapRequest().name)
    expect(obj.baseAmount).to.be.equal(opts.baseAmount)
    expect(obj.bidID).to.be.equal(opts.bidID)
    expect(obj.quoteAsset).to.be.equal(opts.quoteAsset)
  })
})
