"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _lodash = require("lodash");

var _operation = require("../operation");

var _keypair = require("../keypair");

var _create_withdraw_request_builder = require("./create_withdraw_request_builder");

describe('Withdraw request op', function () {
  it('Success', function () {
    var amount = '1200.12';
    var fee = {
      fixed: '12.11',
      percent: '0.5'
    };

    var balance = _keypair.Keypair.random().balanceId();

    var externalDetails = {
      a: 'some details'
    };
    var destAsset = 'USD';
    var expectedDestAssetAmount = '33333.12';

    var op = _create_withdraw_request_builder.CreateWithdrawRequestBuilder.createWithdrawWithAutoConversion({
      balance: balance,
      amount: amount,
      fee: fee,
      externalDetails: externalDetails,
      destAsset: destAsset,
      expectedDestAssetAmount: expectedDestAssetAmount
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('createWithdrawalRequest');
    expect(balance).to.be.equal(obj.balance);
    expect(amount).to.be.equal(obj.amount);
    expect(fee.fixed).to.be.equal(obj.fee.fixed);
    expect(fee.percent).to.be.equal(obj.fee.percent);
    expect((0, _lodash.isEqual)(externalDetails, obj.externalDetails)).to.be.true;
    expect(_xdr_generated.default.WithdrawalType.autoConversion()).to.be.equal(obj.details.type);
    expect(destAsset).to.be.equal(obj.details.autoConversion.destAsset);
    expect(expectedDestAssetAmount).to.be.equal(obj.details.autoConversion.expectedAmount);
  });
});