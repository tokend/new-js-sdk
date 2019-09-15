import { CloseSwapBuilder } from './close_swap_builder'
import { Operation } from '../operation'
import { xdr } from '../index'

describe('CloseSwap op', function () {
  let secret = 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d'

  it('Close swap', function () {
    let op = CloseSwapBuilder.closeSwap({
      secretHash: 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d',
      swapId: '4123421'
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('closeSwap')
    expect(obj.secret).to.be.equal(secret)
    expect(obj.swapId).to.be.equal('4123421')
  })
})
