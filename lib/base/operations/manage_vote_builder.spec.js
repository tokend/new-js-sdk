"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _manage_vote_builder = require("./manage_vote_builder");

describe('ManageVoteBuilder', function () {
  it('Create', function () {
    var opt = {
      pollType: 0,
      pollID: '4123421',
      choice: 1
    };

    var op = _manage_vote_builder.ManageVoteBuilder.createSingleChoiceVote(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageVote().name);
    expect(opt.pollID).to.be.equal(obj.pollID);
    expect(opt.pollType).to.be.equal(obj.pollType);
  });
  it('Remove', function () {
    var opt = {
      pollID: '12'
    };

    var op = _manage_vote_builder.ManageVoteBuilder.removeVote(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageVote().name);
    expect(opt.pollID).to.be.equal(obj.pollID);
  });
});