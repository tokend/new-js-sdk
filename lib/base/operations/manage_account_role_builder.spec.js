"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _manage_account_role_builder = require("./manage_account_role_builder");

describe('Manage account role', function () {
  it('Create', function () {
    var opt = {
      details: {
        test: 'test'
      },
      ruleIDs: ['1']
    };

    var op = _manage_account_role_builder.ManageAccountRoleBuilder.create(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageAccountRole().name);
    expect(opt.details.test).to.be.equal(obj.details.test);
    expect(opt.ruleIDs[0]).to.be.equal(obj.ruleIDs[0]);
  });
  it('Update', function () {
    var opt = {
      roleId: '1',
      details: {
        test: 'test'
      },
      ruleIDs: ['1']
    };

    var op = _manage_account_role_builder.ManageAccountRoleBuilder.update(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageAccountRole().name);
    expect(opt.details.test).to.be.equal(obj.details.test);
    expect(opt.ruleIDs[0]).to.be.equal(obj.ruleIDs[0]);
    expect(opt.roleId).to.be.equal(obj.roleId);
  });
  it('Remove', function () {
    var opt = {
      roleId: '1'
    };

    var op = _manage_account_role_builder.ManageAccountRoleBuilder.remove(opt);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.manageAccountRole().name);
    expect(opt.roleId).to.be.equal(obj.roleId);
  });
});