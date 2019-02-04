"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _create_atomic_swap_bid_creation_request_builder = require("./create_atomic_swap_bid_creation_request_builder");

var _operation = require("../operation");

var _keypair = require("../keypair");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

describe('Create ASwapBidCreation request', function () {
  it('Success', function () {
    var opts = {
      balanceID: _keypair.Keypair.random().balanceId(),
      amount: '911',
      details: {
        'reason': 'Because we can'
      },
      quoteAssets: [{
        price: '12.21',
        asset: 'ETH'
      }, {
        price: '21.12',
        asset: 'BTC'
      }]
    };

    var op = _create_atomic_swap_bid_creation_request_builder.CreateAtomicSwapBidCreationRequestBuilder.createASwapBidCreationRequest(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createAswapBidRequest().name);
    expect(obj.balanceID).to.be.equal(opts.balanceID);
    expect(obj.amount).to.be.equal(opts.amount);
    expect((0, _isEqual.default)(obj.details, opts.details)).to.be.true;
    expect((0, _isEqual.default)(obj.quoteAssets, opts.quoteAssets)).to.be.true;
  });
});