import { CancelAtomicSwapBidBuilder } from './cancel_atomic_swap_bid_builder'
import { Operation } from '../operation'
import { default as xdr } from '../generated/xdr_generated'

describe('cancel atomic swap bid ', function () {
  it('Success', function () {
    let bidID = '1408'
    let op = CancelAtomicSwapBidBuilder.cancelASwapBid({
      bidID
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('cancelAswapBid')
    expect(obj.bidID).to.be.equal(bidID)
  })
})
