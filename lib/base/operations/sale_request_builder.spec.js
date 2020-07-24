"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _lodash = require("lodash");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _sale_request_builder = require("./sale_request_builder");

describe('SaleRequestBuilder', function () {
  it('Success with sale rules', function () {
    var opt = {
      requestID: '12',
      baseAsset: 'XAAU',
      saleType: '1',
      defaultQuoteAsset: 'USD',
      startTime: '4123421',
      endTime: '4123425',
      softCap: '20000.21',
      hardCap: '648251',
      requiredBaseAssetForHardCap: '762354',
      sequenceNumber: 12,
      creatorDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: 'logo',
        name: 'sale name'
      },
      quoteAssets: [{
        price: '12.21',
        asset: 'ETH'
      }, {
        price: '21.12',
        asset: 'BTC'
      }],
      saleRules: [{
        forbids: true
      }, {
        accountID: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        forbids: false
      }]
    };

    var op = _sale_request_builder.SaleRequestBuilder.createSaleCreationRequest(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createSaleRequest().name);
    expect(opt.requestID).to.be.equal(obj.requestID);
    expect(opt.baseAsset).to.be.equal(obj.baseAsset);
    expect(opt.saleType).to.be.equal(obj.saleType);
    expect(opt.defaultQuoteAsset).to.be.equal(obj.defaultQuoteAsset);
    expect(opt.startTime).to.be.equal(obj.startTime);
    expect(opt.endTime).to.be.equal(obj.endTime);
    expect(opt.softCap).to.be.equal(obj.softCap);
    expect(opt.hardCap).to.be.equal(obj.hardCap);
    expect(opt.requiredBaseAssetForHardCap).to.be.equal(obj.requiredBaseAssetForHardCap);
    expect((0, _stringify.default)(opt.quoteAssets)).to.be.equal((0, _stringify.default)(obj.quoteAssets));
    expect((0, _lodash.isEqual)(opt.creatorDetails, obj.creatorDetails)).to.be.true;
    expect((0, _stringify.default)(opt.saleRules)).to.be.equal((0, _stringify.default)(obj.saleRules));
  });
  it('Success Crowdfund', function () {
    var opt = {
      requestID: '12',
      baseAsset: 'XAAU',
      defaultQuoteAsset: 'USD',
      startTime: '4123421',
      endTime: '4123425',
      softCap: '20000.21',
      hardCap: '648251',
      requiredBaseAssetForHardCap: '762354',
      sequenceNumber: 13,
      creatorDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: 'logo',
        name: 'sale name'
      },
      quoteAssets: [{
        price: '1',
        asset: 'ETH'
      }, {
        price: '1',
        asset: 'BTC'
      }],
      saleType: '1',
      saleEnumType: true
    };

    var op = _sale_request_builder.SaleRequestBuilder.createSaleCreationRequest(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createSaleRequest().name);
    expect(opt.requestID).to.be.equal(obj.requestID);
    expect(opt.baseAsset).to.be.equal(obj.baseAsset);
    expect(opt.defaultQuoteAsset).to.be.equal(obj.defaultQuoteAsset);
    expect(opt.startTime).to.be.equal(obj.startTime);
    expect(opt.endTime).to.be.equal(obj.endTime);
    expect(opt.softCap).to.be.equal(obj.softCap);
    expect(opt.hardCap).to.be.equal(obj.hardCap);
    expect(opt.requiredBaseAssetForHardCap).to.be.equal(obj.requiredBaseAssetForHardCap);
    expect(opt.quoteAssets).to.be.jsonEqual(obj.quoteAssets);
    expect((0, _lodash.isEqual)(opt.creatorDetails, obj.creatorDetails)).to.be.true;
  });
  it('Success create basic sale', function () {
    var opt = {
      requestID: '12',
      baseAsset: 'XAAU',
      defaultQuoteAsset: 'USD',
      startTime: '4123421',
      endTime: '4123425',
      softCap: '20000.21',
      hardCap: '648251',
      creatorDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: 'logo',
        name: 'sale name'
      },
      quoteAssets: [{
        price: '1',
        asset: 'ETH'
      }, {
        price: '1',
        asset: 'BTC'
      }],
      saleType: '1',
      saleEnumType: false,
      requiredBaseAssetForHardCap: '648251'
    };

    var op = _sale_request_builder.SaleRequestBuilder.createSaleCreationRequest(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createSaleRequest().name);
    expect(opt.requestID).to.be.equal(obj.requestID);
    expect(opt.baseAsset).to.be.equal(obj.baseAsset);
    expect(opt.defaultQuoteAsset).to.be.equal(obj.defaultQuoteAsset);
    expect(opt.startTime).to.be.equal(obj.startTime);
    expect(opt.endTime).to.be.equal(obj.endTime);
    expect(opt.softCap).to.be.equal(obj.softCap);
    expect(opt.hardCap).to.be.equal(obj.hardCap);
    expect(opt.allTasks).to.be.equal(obj.allTasks);
    expect(opt.requiredBaseAssetForHardCap).to.be.equal(obj.requiredBaseAssetForHardCap);
    expect((0, _stringify.default)(opt.quoteAssets)).to.be.equal((0, _stringify.default)(obj.quoteAssets));
    expect((0, _lodash.isEqual)(opt.creatorDetails, obj.creatorDetails)).to.be.true;
  });
  it('Success cancel sale creation request', function () {
    var opt = {
      requestID: '120'
    };

    var op = _sale_request_builder.SaleRequestBuilder.cancelSaleCreationRequest(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.cancelSaleRequest().name);
    expect(opt.requestID).to.be.equal(obj.requestID);
  });
});