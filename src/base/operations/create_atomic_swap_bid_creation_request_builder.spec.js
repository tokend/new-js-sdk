import isEqual from 'lodash/isEqual'
import { CreateAtomicSwapBidRequestBuilder } from './create_atomic_swap_bid_request_builder'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { default as xdr } from '../generated/xdr_generated'

describe('Create ASwapBidCreation request', function () {
  it('Success', function () {
    let opts = {
      balanceID: Keypair.random().balanceId(),
      amount: '911',
      creatorDetails: { 'reason': 'Because we can' },
      quoteAssets: [
        {
          price: '12.21',
          asset: 'ETH'
        },
        {
          price: '21.12',
          asset: 'BTC'
        }
      ],
      allTasks: '1'
    }
    let op = CreateAtomicSwapBidRequestBuilder.createAtomicSwapBidRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createAtomicSwapBidRequest().name)
    expect(obj.balanceID).to.be.equal(opts.balanceID)
    expect(obj.amount).to.be.equal(opts.amount)
    expect(obj.allTasks).to.be.equal(opts.allTasks)
    expect(isEqual(obj.creatorDetails, opts.creatorDetails)).to.be.true
    expect(isEqual(obj.quoteAssets, opts.quoteAssets)).to.be.true
  })
})
