"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _keypair = require("../keypair");

var _create_kyc_recovery_request_builder = require("./create_kyc_recovery_request_builder");

describe('Create kyc recovery', function () {
  it('Success', function () {
    var account = _keypair.Keypair.random().accountId();

    var signer = _keypair.Keypair.random().accountId();

    var allTasks = 1;

    var op = _create_kyc_recovery_request_builder.CreateKYCRecoveryRequestBuilder.create({
      targetAccount: account,
      creatorDetails: {},
      allTasks: allTasks,
      signers: [{
        publicKey: signer,
        weight: '1000',
        identity: '1',
        roleID: '1',
        details: {}
      }]
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('createKycRecoveryRequest');
    expect('0').to.be.equal(obj.requestID);
    expect(signer).to.be.equal(obj.signers[0].publicKey);
    expect(account).to.be.equal(obj.targetAccount);
    expect(allTasks).to.be.equal(obj.allTasks);
  });
});