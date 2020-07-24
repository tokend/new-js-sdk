"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _create_account_builder = require("./create_account_builder");

describe('create Account', function () {
  it('success', function () {
    var destination = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
    var roleID = '1';
    var signersData = [{
      roleID: roleID,
      publicKey: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      weight: '8',
      identity: '2',
      details: {}
    }, {
      roleID: roleID,
      publicKey: 'GDZXNSOUESYZMHRC3TZRN4VXSIOT47MDDUVD6U7CWXHTDLXVVGU64LVV',
      weight: '3',
      identity: '4',
      details: {}
    }];

    var op = _create_account_builder.CreateAccountBuilder.createAccount({
      destination: destination,
      roleID: roleID,
      signersData: signersData
    });

    var opXdr = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('createAccount');
    expect(obj.destination).to.be.equal(destination);
    expect(obj.roleID).to.be.equal(roleID);
  });
  it('fails to create createAccount operation with an invalid destination address', function () {
    var opts = {
      destination: 'GCEZW',
      source: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      roleID: '1'
    };
    expectThrow(function () {
      return _operation.Operation.createAccount(opts);
    });
  });
  it('fails to create createAccount operation with empty signers data', function () {
    var opts = {
      destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      signersData: [],
      roleID: '1'
    };
    expectThrow(function () {
      return _operation.Operation.createAccount(opts);
    });
  });
  it('fails to create createAccount operation with an invalid source address', function () {
    var opts = {
      destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      roleID: '1',
      source: 'GCEZ'
    };
    expectThrow(function () {
      return _operation.Operation.createAccount(opts);
    });
  });
  it('fails to create createAccount with undefined signersData', function () {
    var opts = {
      destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      source: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
      roleID: '1'
    };
    expectThrow(function () {
      return _operation.Operation.createAccount(opts);
    });
  });
});