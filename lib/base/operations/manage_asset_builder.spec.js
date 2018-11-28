"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _manage_asset_builder = require("./manage_asset_builder");

describe('ManageAssetBuilder', function () {
  describe('assetCreationRequest', function () {
    it('Success', function () {
      var opts = {
        code: 'USD',
        preissuedAssetSigner: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        maxIssuanceAmount: '1000.1211',
        policies: 12,
        requestID: '0',
        initialPreissuedAmount: '12.14',
        details: {
          name: 'USD Name'
        }
      };

      var op = _manage_asset_builder.ManageAssetBuilder.assetCreationRequest(opts);

      var xdrOp = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageAsset');
      expect(obj.requestID).to.be.equal(opts.requestID);
      expect(obj.requestType).to.be.equal('createAssetCreationRequest');
      expect(obj.code).to.be.equal(opts.code);
      expect(obj.details.name).to.be.equal(opts.details.name);
      expect(obj.preissuedAssetSigner).to.be.equal(opts.preissuedAssetSigner);
      expect(obj.maxIssuanceAmount).to.be.equal(opts.maxIssuanceAmount);
      expect(obj.policies).to.be.equal(opts.policies);
      expect(obj.initialPreissuedAmount).to.be.equal(opts.initialPreissuedAmount);
    });
  });
  describe('assetUpdateRequest', function () {
    it('Success', function () {
      var opts = {
        code: 'USD',
        policies: 12,
        requestID: '0'
      };

      var op = _manage_asset_builder.ManageAssetBuilder.assetUpdateRequest(opts);

      var xdrOp = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageAsset');
      expect(obj.requestID).to.be.equal(opts.requestID);
      expect(obj.requestType).to.be.equal('createAssetUpdateRequest');
      expect(obj.code).to.be.equal(opts.code);
      expect(obj.policies).to.be.equal(opts.policies);
    });
  });
  describe('cancelAssetRequest', function () {
    it('Success', function () {
      var opts = {
        requestID: '0'
      };

      var op = _manage_asset_builder.ManageAssetBuilder.cancelAssetRequest(opts);

      var xdrOp = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageAsset');
      expect(obj.requestID).to.be.equal(opts.requestID);
      expect(obj.requestType).to.be.equal('cancelAssetRequest');
    });
  });
  describe('changePreIssuedAssetSigner', function () {
    it('Success', function () {
      var opts = {
        code: 'USD',
        accountID: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
      };

      var op = _manage_asset_builder.ManageAssetBuilder.changeAssetPreIssuer(opts);

      var xdrOp = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageAsset');
      expect(obj.requestID).to.be.equal(opts.requestID);
      expect(obj.requestType).to.be.equal('changePreissuedAssetSigner');
      expect(obj.code).to.be.equal(opts.code);
      expect(obj.accountID).to.be.equal(opts.accountID);
    });
  });
});