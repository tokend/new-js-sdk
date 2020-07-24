"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _remove_asset_pair_op_builder = require("./remove_asset_pair_op_builder");

describe('RemoveAssetPairOpBuilder', function () {
  it('Success', function () {
    var opt = {
      base: 'BTC',
      quote: 'USD'
    };

    var op = _remove_asset_pair_op_builder.RemoveAssetPairOpBuilder.removeAssetPairOp(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.removeAssetPair().name);
    expect(obj.base).to.be.equal(opt.base);
    expect(obj.quote).to.be.equal(opt.quote);
  });
});