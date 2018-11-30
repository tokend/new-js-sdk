"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _cancel_atomic_swap_bid_builder = require("./cancel_atomic_swap_bid_builder");

var _operation = require("../operation");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

describe('cancel atomic swap bid ', function () {
  it('Success', function () {
    var bidID = '1408';

    var op = _cancel_atomic_swap_bid_builder.CancelAtomicSwapBidBuilder.cancelASwapBid({
      bidID: bidID
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('cancelAswapBid');
    expect(obj.bidID).to.be.equal(bidID);
  });
});