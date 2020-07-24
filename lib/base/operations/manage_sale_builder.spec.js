"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _lodash = require("lodash");

var _operation = require("../operation");

var _manage_sale_builder = require("./manage_sale_builder");

describe('Manage sale', function () {
  it('Update sale details request op', function () {
    var opts = {
      saleID: '1',
      requestID: '0',
      creatorDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: {
          url: 'logo_url',
          type: 'logo_type'
        },
        name: 'sale name'
      }
    };

    var op = _manage_sale_builder.ManageSaleBuilder.createUpdateSaleDetailsRequest(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.saleID).to.be.equal(opts.saleID);
    expect(obj.requestID).to.be.equal(opts.requestID);
    expect((0, _lodash.isEqual)(obj.creatorDetails, opts.creatorDetails)).to.be.true;
  });
  it('Cancel sale', function () {
    var opts = {
      saleID: '1'
    };

    var op = _manage_sale_builder.ManageSaleBuilder.cancelSale(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.saleID).to.be.equal(opts.saleID);
  });
});