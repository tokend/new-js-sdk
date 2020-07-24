"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _bind_external_system_account_id_builder = require("./bind_external_system_account_id_builder");

var _operation = require("../operation");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

describe('bind external system id', function () {
  it('Success', function () {
    var externalSystemType = 1;

    var op = _bind_external_system_account_id_builder.BindExternalSystemAccountIdBuilder.createBindExternalSystemAccountIdOp({
      externalSystemType: externalSystemType
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(externalSystemType).to.be.equal(obj.externalSystemType);
  });
});