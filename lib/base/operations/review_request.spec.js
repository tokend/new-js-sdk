"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _review_request_builder = require("./review_request_builder");

describe('ReviewRequest', function () {
  it('Success', function () {
    var opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      requestType: _xdr_generated.default.ReviewableRequestType.createAsset().value,
      action: _xdr_generated.default.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      reviewDetails: {
        tasksToAdd: 0,
        tasksToRemove: 4,
        externalDetails: 'All right'
      }
    };

    var op = _review_request_builder.ReviewRequestBuilder.reviewRequest(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('reviewRequest');
    expect(obj.requestID).to.be.equal(opts.requestID);
    expect(obj.requestHash).to.be.equal(opts.requestHash);
    expect(obj.requestType).to.be.equal(opts.requestType);
    expect(obj.action).to.be.equal(opts.action);
    expect(obj.reason).to.be.equal(opts.reason);
    expect(obj.reviewDetails.tasksToAdd).to.be.equal(opts.reviewDetails.tasksToAdd);
    expect(obj.reviewDetails.tasksToRemove).to.be.equal(opts.reviewDetails.tasksToRemove);
    expect(obj.reviewDetails.externalDetails).to.be.equal(opts.reviewDetails.externalDetails);
  });
  it('Withdraw request success', function () {
    var opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      action: _xdr_generated.default.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      reviewDetails: {
        tasksToAdd: 1,
        tasksToRemove: 1,
        externalDetails: 'All right'
      }
    };

    var op = _review_request_builder.ReviewRequestBuilder.reviewWithdrawRequest(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('reviewRequest');
    expect(obj.requestID).to.be.equal(opts.requestID);
    expect(obj.requestHash).to.be.equal(opts.requestHash);
    expect(obj.action).to.be.equal(opts.action);
    expect(obj.reason).to.be.equal(opts.reason);
    expect((0, _stringify.default)(obj.withdrawal.externalDetails)).to.be.equal((0, _stringify.default)('{}')); // cuz deprecated

    expect(obj.reviewDetails.tasksToAdd).to.be.equal(opts.reviewDetails.tasksToAdd);
    expect(obj.reviewDetails.tasksToRemove).to.be.equal(opts.reviewDetails.tasksToRemove);
    expect(obj.reviewDetails.externalDetails).to.be.equal((0, _stringify.default)(opts.reviewDetails.externalDetails));
  });
  it('Aml alert request success', function () {
    var opts = {
      requestID: '1',
      requestHash: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      comment: 'Testing aml alert',
      action: _xdr_generated.default.ReviewRequestOpAction.reject().value,
      reason: 'Something is invalid',
      reviewDetails: {
        tasksToAdd: 1,
        tasksToRemove: 1,
        externalDetails: 'All right'
      }
    };

    var op = _review_request_builder.ReviewRequestBuilder.reviewAmlAlertRequest(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('reviewRequest');
    expect(obj.requestID).to.be.equal(opts.requestID);
    expect(obj.requestHash).to.be.equal(opts.requestHash);
    expect(obj.action).to.be.equal(opts.action);
    expect(obj.reason).to.be.equal(opts.reason);
    expect(obj.amlAlert.comment).to.be.equal(opts.comment);
    expect(obj.reviewDetails.tasksToAdd).to.be.equal(opts.reviewDetails.tasksToAdd);
    expect(obj.reviewDetails.tasksToRemove).to.be.equal(opts.reviewDetails.tasksToRemove);
    expect(obj.reviewDetails.externalDetails).to.be.equal(opts.reviewDetails.externalDetails);
  });
});