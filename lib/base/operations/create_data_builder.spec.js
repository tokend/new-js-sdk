"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _create_data_builder = require("./create_data_builder");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

describe.only('write data in blockchain', function () {
  it('success', function () {
    var type = '20';
    var value = {
      name: 'test'
    };

    var op = _create_data_builder.CreateDataBuilder.createData({
      type: type,
      value: value
    });

    var opXdr = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('createDatum');
    expect(type).to.be.equal(obj.dataType);
    expect((0, _stringify.default)(value)).to.be.equal((0, _stringify.default)(obj.value));
  });
});