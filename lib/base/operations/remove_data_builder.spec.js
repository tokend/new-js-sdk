"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _remove_data_builder = require("./remove_data_builder");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

describe.only('remove data in blockchain', function () {
  it('success', function () {
    var dataId = '235';

    var op = _remove_data_builder.RemoveDataBuilder.removeData({
      dataId: dataId
    });

    var opXdr = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('removeDatum');
  });
});