"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _create_manage_offer_request_builder = require("./create_manage_offer_request_builder");

var _keypair = require("../keypair");

describe('createManageOfferRequest', function () {
  it('Success', function () {
    var allTasks = 1;

    var baseBalance = _keypair.Keypair.random().balanceId();

    var quoteBalance = _keypair.Keypair.random().balanceId();

    var amount = '1000';
    var price = '12.5';
    var fee = '0.01';
    var isBuy = true;
    var offerID = '0';
    var orderBookID = '123';

    var op = _create_manage_offer_request_builder.CreateManageOfferRequestBuilder.createManageOfferRequest({
      baseBalance: baseBalance,
      quoteBalance: quoteBalance,
      amount: amount,
      price: price,
      isBuy: isBuy,
      offerID: offerID,
      fee: fee,
      orderBookID: orderBookID,
      allTasks: allTasks,
      creatorDetails: {}
    });

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createManageOfferRequest().name);
    expect(obj.baseBalance).to.be.equal(baseBalance);
    expect(obj.quoteBalance).to.be.equal(quoteBalance);
    expect(obj.amount).to.be.equal(amount);
    expect(obj.price).to.be.equal(price);
    expect(obj.fee).to.be.equal(fee);
    expect(obj.offerID).to.be.equal(offerID);
    expect(obj.isBuy).to.be.equal(isBuy);
    expect(obj.orderBookID).to.be.equal(orderBookID);
  });
});