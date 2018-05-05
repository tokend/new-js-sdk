import { default as xdr } from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { Operation } from '../operation'
import { ManageOfferBuilder } from './manage_offer_builder'

describe('Manage offer op', () => {
  it('Success', () => {
    let baseBalance = Keypair.random().balanceId()
    let quoteBalance = Keypair.random().balanceId()
    let amount = '1000'
    let price = '12.5'
    let fee = '0.01'
    let isBuy = true
    let offerID = '0'
    let orderBookID = '123'
    let op = ManageOfferBuilder.manageOffer({
      baseBalance,
      quoteBalance,
      amount,
      price,
      isBuy,
      offerID,
      fee,
      orderBookID
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageOffer().name)
    expect(obj.baseBalance).to.be.equal(baseBalance)
    expect(obj.quoteBalance).to.be.equal(quoteBalance)
    expect(obj.amount).to.be.equal(amount)
    expect(obj.price).to.be.equal(price)
    expect(obj.fee).to.be.equal(fee)
    expect(obj.offerID).to.be.equal(offerID)
    expect(obj.isBuy).to.be.equal(isBuy)
    expect(obj.orderBookID).to.be.equal(orderBookID)
  })
  it('Cancel offer', () => {
    let baseBalance = Keypair.random().balanceId()
    let quoteBalance = Keypair.random().balanceId()
    let offerID = '321'
    let orderBookID = '123'
    let op = ManageOfferBuilder.cancelOffer({
      baseBalance,
      quoteBalance,
      offerID,
      orderBookID
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageOffer().name)
    expect(obj.baseBalance).to.be.equal(baseBalance)
    expect(obj.quoteBalance).to.be.equal(quoteBalance)
    expect(obj.offerID).to.be.equal(offerID)
    expect(obj.orderBookID).to.be.equal(orderBookID)
  })
})
