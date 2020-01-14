import { CancelAtomicSwapAskBuilder } from './cancel_atomic_swap_ask_builder'
import { Operation } from '../operation'
import xdr from '../generated/xdr_generated'

describe('cancel atomic swap ask ', function () {
  it('Success', function () {
    let askID = '1408'
    let op = CancelAtomicSwapAskBuilder.cancelAtomicSwapAsk({
      askID
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('cancelAtomicSwapAsk')
    expect(obj.askID).to.be.equal(askID)
  })
})
