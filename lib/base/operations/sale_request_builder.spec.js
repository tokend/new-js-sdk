"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _lodash = require("lodash");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _sale_request_builder = require("./sale_request_builder");

describe('SaleRequestBuilder', function () {
  it('Success', function () {
    var opt = {
      requestID: '12',
      baseAsset: 'XAAU',
      defaultQuoteAsset: 'USD',
      startTime: '4123421',
      endTime: '4123425',
      softCap: '20000.21',
      hardCap: '648251',
      details: {
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
      }]
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
    expect(opt.quoteAssets).to.be.jsonEqual(obj.quoteAssets);
    expect((0, _lodash.isEqual)(opt.details, obj.details)).to.be.true;
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
      details: {
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
      isCrowdfunding: true
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
    expect(opt.quoteAssets).to.be.jsonEqual(obj.quoteAssets);
    expect((0, _lodash.isEqual)(opt.details, obj.details)).to.be.true;
  });
});