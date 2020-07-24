"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _open_swap_builder = require("./open_swap_builder");

var _operation = require("../operation");

var _keypair = require("../keypair");

var _index = require("../index");

describe('OpenSwap op', function () {
  var sourceBalance = _keypair.Keypair.random().balanceId();

  var destinationBalanceId = _keypair.Keypair.random().balanceId();

  var destinationAccountId = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
  var amount = '100';
  var secretHash = 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d';
  var details = {
    very: 'important'
  };
  it('OpenSwap for balance success', function () {
    var op = _open_swap_builder.OpenSwapBuilder.openSwap({
      sourceBalance: sourceBalance,
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
      details: details,
      secretHash: 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d',
      lockTime: '4123421'
    });

    var xdrOp = op.toXDR('hex');

    var operation = _index.xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('openSwap');
    expect(obj.sourceBalance).to.be.equal(sourceBalance);
    expect(obj.destination).to.be.equal(destinationBalanceId);
    expect(obj.amount).to.be.equal(amount);
    expect(obj.feeData.sourcePaysForDest).to.be.equal(true);
    expect(obj.feeData.sourceFee.fixed).to.be.equal('110');
    expect(obj.feeData.sourceFee.percent).to.be.equal('120');
    expect(obj.feeData.destinationFee.fixed).to.be.equal('10');
    expect(obj.feeData.destinationFee.percent).to.be.equal('20');
    expect((0, _stringify.default)(obj.details)).to.be.equal((0, _stringify.default)(details));
    expect(obj.secretHash).to.be.equal(secretHash);
  });
  it('OpenSwap for account success', function () {
    var op = _open_swap_builder.OpenSwapBuilder.openSwap({
      sourceBalance: sourceBalance,
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
      details: details,
      secretHash: 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d',
      lockTime: '4123421'
    });

    var xdrOp = op.toXDR('hex');

    var operation = _index.xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('openSwap');
    expect(obj.sourceBalance).to.be.equal(sourceBalance);
    expect(obj.destination).to.be.equal(destinationAccountId);
    expect(obj.amount).to.be.equal(amount);
    expect(obj.feeData.sourcePaysForDest).to.be.equal(true);
    expect(obj.feeData.sourceFee.fixed).to.be.equal('110');
    expect(obj.feeData.sourceFee.percent).to.be.equal('120');
    expect(obj.feeData.destinationFee.fixed).to.be.equal('10');
    expect(obj.feeData.destinationFee.percent).to.be.equal('20');
    expect((0, _stringify.default)(obj.details)).to.be.equal((0, _stringify.default)(details));
    expect(obj.secretHash).to.be.equal(secretHash);
  });
});