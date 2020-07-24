"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _keypair = require("../keypair");

var _operation = require("../operation");

var _pre_issuance_request = require("../pre_issuance_request");

var _pre_issuance_request_op_builder = require("./pre_issuance_request_op_builder");

describe('PreIssuanceRequestOpBuilder', function () {
  it('Success', function () {
    var amount = '200.123';
    var reference = 'test';
    var asset = 'BLC';

    var keyPair = _keypair.Keypair.random();

    var creatorDetails = {
      'data': 'some details'
    };

    var preIssuanceRequest = _pre_issuance_request.PreIssuanceRequest.build({
      amount: amount,
      reference: reference,
      asset: asset,
      keyPair: keyPair,
      creatorDetails: creatorDetails
    });

    var op = _pre_issuance_request_op_builder.PreIssuanceRequestOpBuilder.createPreIssuanceRequestOp({
      request: preIssuanceRequest
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('createPreissuanceRequest');
    expect(reference).to.be.equal(obj.request.reference);
    expect(amount).to.be.equal(obj.request.amount);
    expect(asset).to.be.equal(obj.request.asset);
    expect((0, _stringify.default)(creatorDetails)).to.be.equal((0, _stringify.default)(obj.request.creatorDetails));
    expect(preIssuanceRequest.signature().toXDR('hex')).to.be.equal(obj.request.signature.toXDR('hex'));
  });
});