"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _lodash = require("lodash");

var _operation = require("../operation");

var _create_update_kyc_request_builder = require("./create_update_kyc_request_builder");

describe('KYC request op', function () {
  it('Success', function () {
    var requestID = '0';
    var accountID = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
    var accountRole = '1';
    var kycData = {
      'hash': 'bb36c7c58c4c32d98947c8781c91c7bb797c3647'
    };
    var allTasks = 3;

    var op = _create_update_kyc_request_builder.CreateChangeRoleRequestBuilder.createChangeRoleRequest({
      requestID: requestID,
      destinationAccount: accountID,
      accountRoleToSet: accountRole,
      kycData: kycData,
      allTasks: allTasks
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('createChangeRoleRequest');
    expect(obj.destinationAccount).to.be.equal(accountID);
    expect(obj.accountRoleToSet).to.be.equal(accountRole);
    expect((0, _lodash.isEqual)(obj.kycData, kycData)).to.be.true;
    expect(obj.allTasks).to.be.equal(allTasks);
  });
});