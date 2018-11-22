"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _operation = require("../operation");

var _create_atomic_swap_request_builder = require("./create_atomic_swap_request_builder");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

describe('Create ASwapBidCreation request', function () {
  it('Success', function () {
    var opts = {
      baseAmount: '911',
      bidID: '69',
      quoteAsset: 'ETH'
    };

    var op = _create_atomic_swap_request_builder.CreateAtomicSwapRequestBuilder.createASwapRequest(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createAswapRequest().name);
    expect(obj.baseAmount).to.be.equal(opts.baseAmount);
    expect(obj.bidID).to.be.equal(opts.bidID);
    expect(obj.quoteAsset).to.be.equal(opts.quoteAsset);
  });
});