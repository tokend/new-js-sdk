"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _manage_account_specific_rule_builder = require("./manage_account_specific_rule_builder");

describe('ManageAccountSpecificRuleBuilder', function () {
  it('Create sale rule without accountID', function () {
    var opt = {
      forbids: true,
      saleID: '4123421'
    };

    var op = _manage_account_specific_rule_builder.ManageAccountSpecificRuleBuilder.createSaleRule(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageAccountSpecificRule().name);
    expect(opt.saleID).to.be.equal(obj.saleID);
    expect(opt.forbids).to.be.equal(obj.forbids);
    expect(obj.ledgerEntryType).to.be.equal(_xdr_generated.default.LedgerEntryType.sale().value);
  });
  it('Create sale rule with accountID', function () {
    var opt = {
      forbids: false,
      saleID: '4123421',
      accountID: 'GDZXNSOUESYZMHRC3TZRN4VXSIOT47MDDUVD6U7CWXHTDLXVVGU64LVV'
    };

    var op = _manage_account_specific_rule_builder.ManageAccountSpecificRuleBuilder.createSaleRule(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageAccountSpecificRule().name);
    expect(opt.saleID).to.be.equal(obj.saleID);
    expect(opt.forbids).to.be.equal(obj.forbids);
    expect(obj.ledgerEntryType).to.be.equal(_xdr_generated.default.LedgerEntryType.sale().value);
    expect(obj.accountID).to.be.equal(opt.accountID);
  });
  it('Remove', function () {
    var opt = {
      ruleID: '12'
    };

    var op = _manage_account_specific_rule_builder.ManageAccountSpecificRuleBuilder.removeRule(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageAccountSpecificRule().name);
    expect(opt.ruleID).to.be.equal(obj.ruleID);
  });
});