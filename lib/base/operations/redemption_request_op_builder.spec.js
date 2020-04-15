"use strict";

var _redemption_request_op_builder = require("./redemption_request_op_builder");

var _index = require("../index");

var _cache = require("jsona/lib/cache");

describe('RedemptionRequestBuilder', function () {
  it('should create redemption request', function () {
    var opts = {
      sourceBalanceId: 'BA7WOL2UJL57LOAGXM4TDTZEA7YTVRSKSH5EHOEFTWYX77C672KZQID4',
      destination: 'GAD4Y24LB73N5S7Z2XTPBA7UGLBSKYHFTPDKX7YZAT323WD5AXZGX3VS',
      amount: '100500',
      reference: 'random ref',
      allTasks: 1,
      creatorDetails: '{"creator":"details"}'
    };

    var op = _redemption_request_op_builder.RedemptionRequestBuilder.redemptionRequest(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _index.xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _index.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_index.xdr.OperationType.createRedemptionRequest().name);
    expect(obj.sourceBalanceId).to.be.equal(opts.sourceBalanceId);
    expect(obj.destination).to.be.equal(opts.destination);
    expect(obj.amount).to.be.equal(opts.amount);
    expect((0, _cache.jsonStringify)(obj.creatorDetails)).to.be.equal(opts.creatorDetails);
    expect(obj.allTasks).to.be.equal(opts.allTasks);
  });
});