"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _keypair = require("../keypair");

var _operation = require("../operation");

var _create_issuance_request_builder = require("./create_issuance_request_builder");

describe('CreateIssuanceRequestBuilder', function () {
  it('Success', function () {
    var amount = '200.123';
    var reference = 'test';
    var asset = 'BLC';

    var receiver = _keypair.Keypair.random().balanceId();

    var creatorDetails = {
      'data': 'some details'
    };

    var op = _create_issuance_request_builder.CreateIssuanceRequestBuilder.createIssuanceRequest({
      asset: asset,
      amount: amount,
      reference: reference,
      receiver: receiver,
      creatorDetails: creatorDetails
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('createIssuanceRequest');
    expect(reference).to.be.equal(obj.reference);
    expect(amount).to.be.equal(obj.amount);
    expect(asset).to.be.equal(obj.asset);
    expect(receiver).to.be.equal(obj.receiver);
    expect((0, _stringify.default)(creatorDetails)).to.be.equal((0, _stringify.default)(obj.creatorDetails));
  });
});