"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _lodash = require("lodash");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _manage_poll_builder = require("./manage_poll_builder");

describe('ManagePollBuilder', function () {
  it('close', function () {
    var opt = {
      result: 0,
      pollID: '4123421',
      details: {
        data: 'success'
      }
    };

    var op = _manage_poll_builder.ManagePollBuilder.closePoll(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.managePoll().name);
    expect(opt.pollID).to.be.equal(obj.pollID);
    expect(opt.result).to.be.equal(obj.result);
    expect((0, _lodash.isEqual)(opt.details, obj.details)).to.be.true;
  });
  it('cancel', function () {
    var opt = {
      pollID: '4123421'
    };

    var op = _manage_poll_builder.ManagePollBuilder.cancelPoll(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.managePoll().name);
    expect(opt.pollID).to.be.equal(obj.pollID);
  });
  it('update end time', function () {
    var opt = {
      pollID: '4123421',
      newEndTime: '1231723971'
    };

    var op = _manage_poll_builder.ManagePollBuilder.updatePollEndTime(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.managePoll().name);
    expect(opt.pollID).to.be.equal(obj.pollID);
    expect(opt.newEndTime).to.be.equal(obj.newEndTime);
  });
});