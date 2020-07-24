"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _manage_key_value_builder = require("./manage_key_value_builder");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

describe('Manage Key Value', function () {
  describe('Put key int value', function () {
    it('Success', function () {
      var key = '1216';
      var value = '123';

      var action = _xdr_generated.default.ManageKvAction.put().value;

      var opts = {
        key: key,
        value: value
      };

      var op = _manage_key_value_builder.ManageKeyValueBuilder.putKeyValue(opts);

      var xdrOp = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageKeyValue');
      expect(obj.action).to.be.equal(action);
      expect(obj.key).to.be.equal(key);
      expect(obj.value).to.be.equal(value);
    });
  });
  describe('Put key string value', function () {
    it('Success', function () {
      var key = '1216';
      var value = 'Hello';

      var action = _xdr_generated.default.ManageKvAction.put().value;

      var opts = {
        key: key,
        value: value
      };

      var op = _manage_key_value_builder.ManageKeyValueBuilder.putKeyValue(opts);

      var xdrOp = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageKeyValue');
      expect(obj.action).to.be.equal(action);
      expect(obj.key).to.be.equal(key);
      expect(obj.value).to.be.equal(value);
    });
  });
  describe('Delete key value', function () {
    it('Success', function () {
      var key = '1216';

      var action = _xdr_generated.default.ManageKvAction.remove().value;

      var opts = {
        key: key
      };

      var op = _manage_key_value_builder.ManageKeyValueBuilder.deleteKeyValue(opts);

      var xdrOp = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageKeyValue');
      expect(obj.action).to.be.equal(action);
      expect(obj.key).to.be.equal(key);
    });
  });
  describe('Put key uint64 value', function () {
    it('Success', function () {
      var key = '1216';
      var value = '123';

      var action = _xdr_generated.default.ManageKvAction.put().value;

      var opts = {
        key: key,
        value: value,
        entryType: _xdr_generated.default.KeyValueEntryType.uint64().value
      };

      var op = _manage_key_value_builder.ManageKeyValueBuilder.putKeyValue(opts);

      var xdrOp = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageKeyValue');
      expect(obj.action).to.be.equal(action);
      expect(obj.key).to.be.equal(key);
      expect(obj.value).to.be.equal(value);
    });
  });
});