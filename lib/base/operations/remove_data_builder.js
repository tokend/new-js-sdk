"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.RemoveDataBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _jsXdr = require("js-xdr");

var validators = _interopRequireWildcard(require("../../utils/validators"));

var _base_operation = require("./base_operation");

var RemoveDataBuilder =
/*#__PURE__*/
function () {
  function RemoveDataBuilder() {
    (0, _classCallCheck2.default)(this, RemoveDataBuilder);
  }

  (0, _createClass2.default)(RemoveDataBuilder, null, [{
    key: "removeData",

    /**
     * Remove data operation
     * @param {object} opts
     * @param {string} opts.dataId
     * @param {string} [opts.source] - The source account for the operation.
     * @returns {xdr.RemoveDataOp}
     */
    value: function removeData(opts) {
      validators.validateUint64({
        value: opts.dataId,
        fieldName: 'opts.dataId'
      });
      var attributes = {};
      attributes.dataId = _jsXdr.UnsignedHyper.fromString(opts.dataId);
      attributes.ext = new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var op = new _xdr_generated.default.RemoveDataOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.removeDatum(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "removeDataToObject",
    value: function removeDataToObject(result, attributes) {
      var request = attributes;
      result.dataId = request.dataId().toString();
    }
  }]);
  return RemoveDataBuilder;
}();

exports.RemoveDataBuilder = RemoveDataBuilder;