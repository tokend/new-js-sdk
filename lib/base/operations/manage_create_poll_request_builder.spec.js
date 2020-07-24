"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _lodash = require("lodash");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _manage_create_poll_request_builder = require("./manage_create_poll_request_builder");

describe('ManageCreatePollRequestBuilder', function () {
  it('Create', function () {
    var opt = {
      resultProviderID: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      permissionType: 1,
      pollType: 0,
      startTime: '4123421',
      endTime: '4123425',
      numberOfChoices: 762354,
      voteConfirmationRequired: true,
      creatorDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: 'logo',
        name: 'sale name'
      }
    };

    var op = _manage_create_poll_request_builder.ManageCreatePollRequestBuilder.createPollRequest(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageCreatePollRequest().name);
    expect(opt.permissionType).to.be.equal(obj.permissionType);
    expect(opt.pollType).to.be.equal(obj.pollType);
    expect(opt.resultProviderID).to.be.equal(obj.resultProviderID);
    expect(opt.startTime).to.be.equal(obj.startTime);
    expect(opt.endTime).to.be.equal(obj.endTime);
    expect(opt.numberOfChoices).to.be.equal(obj.numberOfChoices);
    expect(opt.voteConfirmationRequired).to.be.equal(obj.voteConfirmationRequired);
    expect((0, _lodash.isEqual)(opt.creatorDetails, obj.creatorDetails)).to.be.true;
  });
  it('Cancel', function () {
    var opt = {
      requestID: '12'
    };

    var op = _manage_create_poll_request_builder.ManageCreatePollRequestBuilder.cancelPollRequest(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageCreatePollRequest().name);
    expect(opt.requestID).to.be.equal(obj.requestID);
  });
});