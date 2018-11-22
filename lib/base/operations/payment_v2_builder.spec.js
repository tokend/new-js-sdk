"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _keypair = require("../keypair");

var _operation = require("../operation");

var _payment_v2_builder = require("./payment_v2_builder");

describe('PaymentV2RequestBuilder', function () {
  it('Success', function () {
    var sourceBalanceId = _keypair.Keypair.random().balanceId();

    var destination = _keypair.Keypair.random().accountId();

    var amount = '200.123';
    var sourcePaysForDest = true;
    var feeData = {
      sourceFee: {
        maxPaymentFee: '1.001',
        fixedFee: '0.001',
        feeAsset: 'BLC'
      },
      destinationFee: {
        maxPaymentFee: '2.21',
        fixedFee: '0.15',
        feeAsset: 'BLC'
      },
      sourcePaysForDest: sourcePaysForDest
    };
    var subject = 'Some random text';
    var reference = 'Some another random text';

    var op = _payment_v2_builder.PaymentV2Builder.paymentV2({
      sourceBalanceId: sourceBalanceId,
      destination: destination,
      amount: amount,
      feeData: feeData,
      subject: subject,
      reference: reference
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('paymentV2');
    expect(obj.sourceBalanceId).to.equal(sourceBalanceId);
    expect(obj.destination).to.equal(destination);
    expect(obj.amount).to.equal(amount);
    expect(obj.feeData.sourcePaysForDest).to.equal(sourcePaysForDest);
    expect(obj.subject).to.equal(subject);
    expect(obj.reference).to.equal(reference);
    expect(obj.feeData.sourceFee.maxPaymentFee).to.equal(feeData.sourceFee.maxPaymentFee);
    expect(obj.feeData.sourceFee.fixedFee).to.equal(feeData.sourceFee.fixedFee);
    expect(obj.feeData.sourceFee.feeAsset).to.equal(feeData.sourceFee.feeAsset);
    expect(obj.feeData.destinationFee.maxPaymentFee).to.equal(feeData.destinationFee.maxPaymentFee);
    expect(obj.feeData.destinationFee.fixedFee).to.equal(feeData.destinationFee.fixedFee);
    expect(obj.feeData.destinationFee.feeAsset).to.equal(feeData.destinationFee.feeAsset);
  });
});