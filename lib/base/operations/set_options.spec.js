"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _keypair = require("../keypair");

var _operation = require("../operation");

var _hashing = require("../hashing");

var _set_options_builder = require("./set_options_builder");

describe('SetOptionsBuilder', function () {
  describe('.setOptions()', function () {
    it('creates a setOptionsOp', function () {
      var opts = {};
      opts.masterWeight = 0;
      opts.lowThreshold = 1;
      opts.medThreshold = 2;
      opts.highThreshold = 3;
      opts.signer = {
        pubKey: 'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7',
        weight: 1,
        signerType: 2,
        identity: 3,
        name: 'Test Signer'
      };

      var allowedAccount = _keypair.Keypair.random().accountId();

      var balanceToUse = _keypair.Keypair.random().balanceId();

      opts.trustData = {
        action: _xdr_generated.default.ManageTrustAction.trustAdd(),
        allowedAccount: allowedAccount,
        balanceToUse: balanceToUse
      };
      var documentData = 'Some data in document';
      var documentHash = (0, _hashing.hash)(documentData);
      opts.limitsUpdateRequestData = {
        documentHash: documentHash
      };

      var op = _set_options_builder.SetOptionsBuilder.setOptions(opts);

      var xdrOp = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('setOption');
      expect(obj.masterWeight).to.be.equal(opts.masterWeight);
      expect(obj.lowThreshold).to.be.equal(opts.lowThreshold);
      expect(obj.medThreshold).to.be.equal(opts.medThreshold);
      expect(obj.highThreshold).to.be.equal(opts.highThreshold);
      expect(obj.signer.pubKey).to.be.equal(opts.signer.pubKey);
      expect(obj.signer.weight).to.be.equal(opts.signer.weight);
      expect(obj.signer.signerType).to.be.equal(opts.signer.signerType);
      expect(obj.signer.identity).to.be.equal(opts.signer.identity);
      expect(obj.signer.name).to.be.equal(opts.signer.name);
      expect(obj.trustData.allowedAccount).to.be.equal(allowedAccount);
      expect(obj.trustData.balanceToUse).to.be.equal(balanceToUse);
      expect(obj.trustData.action).to.be.equal(_xdr_generated.default.ManageTrustAction.trustAdd());
      expect(obj.limitsUpdateRequestData.documentHash.toString()).to.be.equal(documentHash.toString());
    });
    it('fails to create setOptions operation with an invalid signer address', function () {
      var opts = {
        signer: {
          pubKey: 'GDGU5OAPHNPU5UCL',
          weight: 1
        }
      };
      expectThrow(function () {
        return _set_options_builder.SetOptionsBuilder.setOptions(opts);
      });
    });
    it('fails to create setOptions operation with an invalid masterWeight', function () {
      var opts = {
        masterWeight: 400
      };
      expectThrow(function () {
        return _set_options_builder.SetOptionsBuilder.setOptions(opts);
      });
    });
    it('fails to create setOptions operation with an invalid lowThreshold', function () {
      var opts = {
        lowThreshold: 400
      };
      expectThrow(function () {
        return _set_options_builder.SetOptionsBuilder.setOptions(opts);
      });
    });
    it('fails to create setOptions operation with an invalid medThreshold', function () {
      var opts = {
        medThreshold: 400
      };
      expectThrow(function () {
        return _set_options_builder.SetOptionsBuilder.setOptions(opts);
      });
    });
    it('fails to create setOptions operation with an invalid highThreshold', function () {
      var opts = {
        highThreshold: 400
      };
      expectThrow(function () {
        return _set_options_builder.SetOptionsBuilder.setOptions(opts);
      });
    });
  });
});