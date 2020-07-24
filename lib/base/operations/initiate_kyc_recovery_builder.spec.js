"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _keypair = require("../keypair");

var _initiate_kyc_recovery_builder = require("./initiate_kyc_recovery_builder");

describe('Initiate kyc recovery', function () {
  it('Success', function () {
    var account = _keypair.Keypair.random().accountId();

    var signer = _keypair.Keypair.random().accountId();

    var op = _initiate_kyc_recovery_builder.InitiateKYCRecoveryBuilder.initiateKycRecovery({
      targetAccount: account,
      signer: signer
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('initiateKycRecovery');
    expect(signer).to.be.equal(obj.signer);
    expect(account).to.be.equal(obj.account);
  });
});