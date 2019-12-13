import { RedemptionRequestOpBuilder } from './redemption_request_op_builder'
import { Operation, xdr } from '../index'
import { jsonStringify } from 'jsona/lib/cache';

describe.only('RedemptionRequestBuilder', function () {
  it('should create redemption request', function () {
    let opts = {
      sourceBalanceId: 'BA7WOL2UJL57LOAGXM4TDTZEA7YTVRSKSH5EHOEFTWYX77C672KZQID4',
      destination: 'GAD4Y24LB73N5S7Z2XTPBA7UGLBSKYHFTPDKX7YZAT323WD5AXZGX3VS',
      amount: '100500',
      reference: 'random ref',
      allTasks: 1,
      creatorDetails: '{"creator":"details"}'
    }

    let op = RedemptionRequestOpBuilder.redemptionRequest(opts)
    let xdrOp = op.toXDR('hex')

    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))

    let obj = Operation.operationToObject(operation)

    expect(obj.type).to.be.equal(xdr.OperationType.createRedemptionRequest().name)
    expect(obj.sourceBalanceId).to.be.equal(opts.sourceBalanceId)
    expect(obj.destination).to.be.equal(opts.destination)
    expect(obj.amount).to.be.equal(opts.amount)
    expect(jsonStringify(obj.creatorDetails)).to.be.equal(opts.creatorDetails)
    expect(obj.allTasks).to.be.equal(opts.allTasks)
  })
})
