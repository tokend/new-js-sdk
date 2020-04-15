"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _cancel_change_role_request_builder = require("./cancel_change_role_request_builder");

var _operation = require("../operation");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

describe('Cancel change role request', function () {
  it('Success', function () {
    var opt = {
      requestID: '120'
    };

    var op = _cancel_change_role_request_builder.CancelChangeRoleRequestBuilder.cancelChangeRoleRequest(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.cancelChangeRoleRequest().name);
    expect(opt.requestID).to.be.equal(obj.requestID);
  });
});