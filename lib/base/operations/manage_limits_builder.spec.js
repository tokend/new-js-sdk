"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _keypair = require("../keypair");

var _operation = require("../operation");

var _manage_limits_builder = require("./manage_limits_builder");

describe('Manage offer op', function () {
  it('Success create limits for account', function () {
    var opts = {
      accountID: _keypair.Keypair.random().accountId(),
      accountRole: (1 + Math.floor(Math.random() * 10)).toString(),
      statsOpType: 1 + Math.floor(Math.random() * 10) % 5,
      assetCode: 'ETH',
      isConvertNeeded: false,
      dailyOut: '100',
      weeklyOut: '1000',
      monthlyOut: '10000',
      annualOut: '100000',
      source: _keypair.Keypair.random().accountId()
    };

    var op = _manage_limits_builder.ManageLimitsBuilder.createLimits(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.account).to.be.equal(opts.accountID);
    expect(obj.accountRole).to.be.equal(opts.accountRole);
    expect(obj.statsOpType).to.be.equal(opts.statsOpType.toString());
    expect(obj.assetCode).to.be.equal(opts.assetCode);
    expect(obj.isConvertNeeded).to.be.equal(opts.isConvertNeeded);
    expect(obj.dailyOut).to.be.equal(opts.dailyOut);
    expect(obj.weeklyOut).to.be.equal(opts.weeklyOut);
    expect(obj.monthlyOut).to.be.equal(opts.monthlyOut);
    expect(obj.annualOut).to.be.equal(opts.annualOut);
  });
  it('Success remove limits from account', function () {
    var opts = {
      id: (1 + Math.floor(Math.random() * 10)).toString()
    };

    var op = _manage_limits_builder.ManageLimitsBuilder.removeLimits(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.id).to.be.equal(opts.id);
  });
});