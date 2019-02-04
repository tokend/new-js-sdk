"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageKeyValueBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _base_operation = require("./base_operation");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _jsXdr = require("js-xdr");

var ManageKeyValueBuilder =
/*#__PURE__*/
function () {
  function ManageKeyValueBuilder() {
    (0, _classCallCheck2.default)(this, ManageKeyValueBuilder);
  }

  (0, _createClass2.default)(ManageKeyValueBuilder, null, [{
    key: "putKeyValue",

    /**
     * Creates put key value operation
     * @param {object} opts
     *
     * @param {string} opts.key
     * @param {number|string} opts.value
     *
     * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
     *
     * @returns {xdr.ManageKeyValueOp}
     */
    value: function putKeyValue(opts) {
      var attributes = {};
      var value;

      if (isNaN(opts.value) || opts.entryType === _xdr_generated.default.KeyValueEntryType.string().value) {
        value = new _xdr_generated.default.KeyValueEntryValue.string(opts.value);
      } else if ((0, _isUndefined.default)(opts.entryType) || opts.entryType === _xdr_generated.default.KeyValueEntryType.uint32().value) {
        value = new _xdr_generated.default.KeyValueEntryValue.uint32(Number(opts.value));
      } else if (opts.entryType === _xdr_generated.default.KeyValueEntryType.uint64().value) {
        value = new _xdr_generated.default.KeyValueEntryValue.uint64(_jsXdr.UnsignedHyper.fromString(opts.value));
      } else {
        throw new Error('Cannot figure out value type');
      }

      attributes.action = new _xdr_generated.default.ManageKeyValueOpAction(_xdr_generated.default.ManageKvAction.put(), value);
      return ManageKeyValueBuilder.createManageKeyValueOp(attributes, opts);
    }
    /**
     * Creates delete key value operation
     * @param {object} opts
     *
     * @param {string} opts.key
     *
     * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
     *
     * @returns {xdr.ManageKeyValueOp}
     */

  }, {
    key: "deleteKeyValue",
    value: function deleteKeyValue(opts) {
      var attributes = {};
      attributes.action = new _xdr_generated.default.ManageKeyValueOpAction(_base_operation.BaseOperation._keyValueActionFromNumber(_xdr_generated.default.ManageKvAction.remove().value));
      return ManageKeyValueBuilder.createManageKeyValueOp(attributes, opts);
    }
  }, {
    key: "createManageKeyValueOp",
    value: function createManageKeyValueOp(attributes, opts) {
      if ((0, _isUndefined.default)(opts.key)) {
        throw new Error('key_value key must be defined');
      }

      if (!(0, _isString.default)(opts.key)) {
        throw new Error('key_value key must be string');
      }

      attributes.key = opts.key;
      attributes.ext = new _xdr_generated.default.ManageKeyValueOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var manageKV = new _xdr_generated.default.ManageKeyValueOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageKeyValue(manageKV);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "manageKeyValueOpToObject",
    value: function manageKeyValueOpToObject(result, attrs) {
      result.key = attrs.key().toString();
      var action = attrs.action().value();

      switch (attrs.action().switch()) {
        case _xdr_generated.default.ManageKvAction.put():
          result.action = new _xdr_generated.default.ManageKvAction.put().value;

          switch (action.switch()) {
            case _xdr_generated.default.KeyValueEntryType.string():
              result.value = action.stringValue().toString();
              break;

            case _xdr_generated.default.KeyValueEntryType.uint32():
              result.value = action.ui32Value().toString();
              break;

            case _xdr_generated.default.KeyValueEntryType.uint64():
              result.value = action.ui64Value().toString();
              break;
          }

          break;

        case _xdr_generated.default.ManageKvAction.remove():
          result.action = new _xdr_generated.default.ManageKvAction.remove().value;
          break;

        default:
          throw new Error('invalid KV action type');
      }
    }
  }]);
  return ManageKeyValueBuilder;
}();

exports.ManageKeyValueBuilder = ManageKeyValueBuilder;