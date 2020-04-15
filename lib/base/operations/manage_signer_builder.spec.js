"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _lodash = require("lodash");

var _manage_signer_builder = require("./manage_signer_builder");

describe('manage signer op', function () {
  it('Create', function () {
    var roleID = '1';
    var publicKey = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
    var weight = '999';
    var identity = '1';
    var details = {
      'hash': 'bb36c7c58c4c32d98947c8781c91c7bb797c3647'
    };

    var op = _manage_signer_builder.ManageSignerBuilder.createSigner({
      roleID: roleID,
      publicKey: publicKey,
      weight: weight,
      identity: identity,
      details: details
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('manageSigner');
    expect(obj.roleID).to.be.equal(roleID);
    expect(obj.publicKey).to.be.equal(publicKey);
    expect((0, _lodash.isEqual)(obj.details, details)).to.be.true;
    expect(obj.weight).to.be.equal(weight);
    expect(obj.identity).to.be.equal(identity);
  });
});