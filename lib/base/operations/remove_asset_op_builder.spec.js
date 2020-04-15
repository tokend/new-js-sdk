"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _remove_asset_op_builder = require("./remove_asset_op_builder");

describe('RemoveAssetOpBuilder', function () {
  it('Success', function () {
    var opt = {
      code: 'USD'
    };

    var op = _remove_asset_op_builder.RemoveAssetOpBuilder.removeAssetOp(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.removeAsset().name);
    expect(obj.code).to.be.equal(opt.code);
  });
});