"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _create_manage_limits_request_builder = require("./create_manage_limits_request_builder");

describe('createManageLimitsRequest', function () {
  it('Success', function () {
    var requestID = '0';
    var allTasks = 1;
    var limits = {
      annualOut: '100',
      dailyOut: '100',
      monthlyOut: '100',
      weeklyOut: '100'
    };
    var creatorDetails = {
      operationType: 'deposit',
      statsOpType: 4,
      asset: 'BTC',
      limits: limits,
      requestType: 'initial',
      note: 'some text'
    };

    var op = _create_manage_limits_request_builder.CreateManageLimitsRequestBuilder.createManageLimitsRequest({
      requestID: requestID,
      allTasks: allTasks,
      creatorDetails: creatorDetails
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('createManageLimitsRequest');
    expect((0, _stringify.default)(creatorDetails)).to.be.equal((0, _stringify.default)(obj.creatorDetails));
  });
});