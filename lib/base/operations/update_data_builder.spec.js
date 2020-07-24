"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _update_data_builder = require("./update_data_builder");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

describe.only('update data in blockchain', function () {
  it('success', function () {
    var dataId = '235';
    var value = {
      name: 'test'
    };

    var op = _update_data_builder.UpdateDataBuilder.updateData({
      dataId: dataId,
      value: value
    });

    var opXdr = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('updateDatum');
    expect(dataId).to.be.equal(obj.dataId);
    expect((0, _stringify.default)(value)).to.be.equal((0, _stringify.default)(obj.value));
  });
});