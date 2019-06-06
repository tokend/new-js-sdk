import { Operation } from '../operation'
import { CreateAtomicSwapBidRequestBuilder } from './create_atomic_swap_bid_request_builder'
import xdr from '../generated/xdr_generated'
import { isEqual } from 'lodash'

describe('Create ASwapBid request', function () {
  it('Success', function () {
    let opts = {
      baseAmount: '911',
      askID: '69',
      quoteAsset: 'ETH',
      creatorDetails: { data: 'new atomic swap' }
    }
    let op = CreateAtomicSwapBidRequestBuilder.createAtomicSwapBidRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createAtomicSwapBidRequest().name)
    expect(obj.baseAmount).to.be.equal(opts.baseAmount)
    expect(obj.askID).to.be.equal(opts.askID)
    expect(obj.quoteAsset).to.be.equal(opts.quoteAsset)
    expect(isEqual(opts.creatorDetails, obj.creatorDetails)).to.be.true
  })
})
