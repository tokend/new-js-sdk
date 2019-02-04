"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _keypair = require("../keypair");

var _create_aml_request_builder = require("./create_aml_request_builder");

describe('CreateAMLRequestBuilder', function () {
  it('Success', function () {
    var opt = {
      balanceID: _keypair.Keypair.random().balanceId(),
      amount: '1002',
      reason: 'Because we can',
      reference: 'Some random reference'
    };

    var op = _create_aml_request_builder.CreateAMLRequestBuilder.createAMLAlert(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createAmlAlert().name);
    expect(obj.balanceID).to.be.equal(opt.balanceID);
    expect(obj.amount).to.be.equal(opt.amount);
    expect(obj.reason).to.be.equal(opt.reason);
    expect(obj.reference).to.be.equal(opt.reference);
  });
});