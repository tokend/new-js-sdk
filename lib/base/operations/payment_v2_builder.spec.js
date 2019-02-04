"use strict";

var _payment_v2_builder = require("./payment_v2_builder");

var _operation = require("../operation");

var _keypair = require("../keypair");

var _index = require("../index");

describe('PaymentV2 op', function () {
  var sourceBalanceId = _keypair.Keypair.random().balanceId();

  var destinationBalanceId = _keypair.Keypair.random().balanceId();

  var destinationAccountId = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
  var amount = '100';
  it('PaymentV2 for balance success', function () {
    var op = _payment_v2_builder.PaymentV2Builder.paymentV2({
      sourceBalanceId: sourceBalanceId,
      destination: destinationBalanceId,
      amount: amount,
      feeData: {
        sourceFee: {
          percent: '120',
          fixed: '110'
        },
        destinationFee: {
          percent: '20',
          fixed: '10'
        },
        sourcePaysForDest: true
      },
      subject: 'subj',
      reference: 'ref'
    });

    var xdrOp = op.toXDR('hex');

    var operation = _index.xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('paymentV2');
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId);
    expect(obj.destination).to.be.equal(destinationBalanceId);
    expect(obj.amount).to.be.equal(amount);
    expect(obj.feeData.sourcePaysForDest).to.be.equal(true);
    expect(obj.feeData.sourceFee.fixed).to.be.equal('110');
    expect(obj.feeData.sourceFee.percent).to.be.equal('120');
    expect(obj.feeData.destinationFee.fixed).to.be.equal('10');
    expect(obj.feeData.destinationFee.percent).to.be.equal('20');
    expect(obj.subject).to.be.equal('subj');
    expect(obj.reference).to.be.equal('ref');
  });
  it('PaymentV2 for account success', function () {
    var op = _payment_v2_builder.PaymentV2Builder.paymentV2({
      sourceBalanceId: sourceBalanceId,
      destination: destinationAccountId,
      amount: amount,
      feeData: {
        sourceFee: {
          percent: '120',
          fixed: '110'
        },
        destinationFee: {
          percent: '20',
          fixed: '10'
        },
        sourcePaysForDest: true
      },
      subject: 'subj',
      reference: 'ref'
    });

    var xdrOp = op.toXDR('hex');

    var operation = _index.xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('paymentV2');
    expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId);
    expect(obj.destination).to.be.equal(destinationAccountId);
    expect(obj.amount).to.be.equal(amount);
    expect(obj.feeData.sourcePaysForDest).to.be.equal(true);
    expect(obj.feeData.sourceFee.fixed).to.be.equal('110');
    expect(obj.feeData.sourceFee.percent).to.be.equal('120');
    expect(obj.feeData.destinationFee.fixed).to.be.equal('10');
    expect(obj.feeData.destinationFee.percent).to.be.equal('20');
    expect(obj.subject).to.be.equal('subj');
    expect(obj.reference).to.be.equal('ref');
  });
});