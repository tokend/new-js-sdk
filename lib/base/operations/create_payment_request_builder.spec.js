"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _create_payment_request_builder = require("./create_payment_request_builder");

var _keypair = require("../keypair");

var _lodash = require("lodash");

describe('createPaymentRequest', function () {
  it('Success', function () {
    var sourceBalanceId = _keypair.Keypair.random().balanceId();

    var destination = _keypair.Keypair.random().balanceId();

    var amount = '100';
    var feeData = {
      sourceFee: {
        percent: '120',
        fixed: '110'
      },
      destinationFee: {
        percent: '20',
        fixed: '10'
      },
      sourcePaysForDest: true
    };
    var subject = 'subj';
    var reference = 'ref';

    var op = _create_payment_request_builder.CreatePaymentRequestBuilder.createPaymentRequest({
      sourceBalanceId: sourceBalanceId,
      destination: destination,
      amount: amount,
      feeData: feeData,
      subject: subject,
      reference: reference,
      creatorDetails: {}
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createPaymentRequest().name);
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId);
    expect(obj.destination).to.be.equal(destination);
    expect(obj.amount).to.be.equal(amount);
    expect(obj.feeData.sourcePaysForDest).to.be.equal(feeData.sourcePaysForDest);
    expect(obj.feeData.sourceFee.fixed).to.be.equal(feeData.sourceFee.fixed);
    expect(obj.feeData.sourceFee.percent).to.be.equal(feeData.sourceFee.percent);
    expect(obj.feeData.destinationFee.fixed).to.be.equal(feeData.destinationFee.fixed);
    expect(obj.feeData.destinationFee.percent).to.be.equal(feeData.destinationFee.percent);
    expect(obj.subject).to.be.equal('subj');
    expect(obj.reference).to.be.equal('ref');
    expect((0, _lodash.isEqual)({}, obj.creatorDetails)).to.be.true;
  });
  it('Success with creator details', function () {
    var sourceBalanceId = _keypair.Keypair.random().balanceId();

    var destination = _keypair.Keypair.random().balanceId();

    var amount = '100';
    var feeData = {
      sourceFee: {
        percent: '120',
        fixed: '110'
      },
      destinationFee: {
        percent: '20',
        fixed: '10'
      },
      sourcePaysForDest: true
    };
    var creatorDetails = {
      a: 'test'
    };
    var subject = 'subj';
    var reference = 'ref';

    var op = _create_payment_request_builder.CreatePaymentRequestBuilder.createPaymentRequest({
      sourceBalanceId: sourceBalanceId,
      destination: destination,
      amount: amount,
      feeData: feeData,
      subject: subject,
      reference: reference,
      creatorDetails: creatorDetails
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createPaymentRequest().name);
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId);
    expect(obj.destination).to.be.equal(destination);
    expect(obj.amount).to.be.equal(amount);
    expect(obj.feeData.sourcePaysForDest).to.be.equal(feeData.sourcePaysForDest);
    expect(obj.feeData.sourceFee.fixed).to.be.equal(feeData.sourceFee.fixed);
    expect(obj.feeData.sourceFee.percent).to.be.equal(feeData.sourceFee.percent);
    expect(obj.feeData.destinationFee.fixed).to.be.equal(feeData.destinationFee.fixed);
    expect(obj.feeData.destinationFee.percent).to.be.equal(feeData.destinationFee.percent);
    expect(obj.subject).to.be.equal('subj');
    expect(obj.reference).to.be.equal('ref');
    expect((0, _lodash.isEqual)(creatorDetails, obj.creatorDetails)).to.be.true;
  });
});