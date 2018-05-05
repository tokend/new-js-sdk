import { default as xdr } from '../generated/xdr_generated'
import { isEqual } from 'lodash'
import { Operation } from '../operation'
import { Keypair } from '../keypair'
import { CreateWithdrawRequestBuilder } from './create_withdraw_request_builder'

describe('Withdraw request op', function () {
  it('Success', function () {
    let amount = '1200.12'
    let fee = {
      fixed: '12.11',
      percent: '0.5'
    }
    let balance = Keypair.random().balanceId()
    let externalDetails = { a: 'some details' }
    let destAsset = 'USD'
    let expectedDestAssetAmount = '33333.12'
    let op = CreateWithdrawRequestBuilder.createWithdrawWithAutoConversion({
      balance: balance,
      amount: amount,
      fee: fee,
      externalDetails: externalDetails,
      destAsset: destAsset,
      expectedDestAssetAmount: expectedDestAssetAmount
    })
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal('createWithdrawalRequest')
    expect(balance).to.be.equal(obj.balance)
    expect(amount).to.be.equal(obj.amount)
    expect(fee.fixed).to.be.equal(obj.fee.fixed)
    expect(fee.percent).to.be.equal(obj.fee.percent)
    expect(isEqual(externalDetails, obj.externalDetails)).to.be.true
    expect(xdr.WithdrawalType.autoConversion()).to.be.equal(obj.details.type)
    expect(destAsset).to.be.equal(obj.details.autoConversion.destAsset)
    expect(expectedDestAssetAmount)
      .to.be.equal(obj.details.autoConversion.expectedAmount)
  })
})
