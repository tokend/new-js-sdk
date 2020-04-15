"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.UpdateDataBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _jsXdr = require("js-xdr");

var validators = _interopRequireWildcard(require("../../utils/validators"));

var _base_operation = require("./base_operation");

var UpdateDataBuilder =
/*#__PURE__*/
function () {
  function UpdateDataBuilder() {
    (0, _classCallCheck2.default)(this, UpdateDataBuilder);
  }

  (0, _createClass2.default)(UpdateDataBuilder, null, [{
    key: "updateData",

    /**
     * Update data operation
     * @param {object} opts
     * @param {string} opts.dataId
     * @param {object} opts.value
     * @param {string} [opts.source] - The source account for the operation.
     * @returns {xdr.UpdateDataOp}
     */
    value: function updateData(opts) {
      validators.validateUint64({
        value: opts.dataId,
        fieldName: 'opts.dataId'
      });
      validators.validateCreatorDetails({
        value: opts.value,
        fieldName: 'opts.value'
      });
      var attributes = {
        dataId: _jsXdr.UnsignedHyper.fromString(opts.dataId),
        value: (0, _stringify.default)(opts.value),
        ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      var op = new _xdr_generated.default.UpdateDataOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.updateDatum(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "updateDataToObject",
    value: function updateDataToObject(result, attributes) {
      var request = attributes;
      result.dataId = request.dataId().toString();
      result.value = JSON.parse(request.value());
    }
  }]);
  return UpdateDataBuilder;
}();

exports.UpdateDataBuilder = UpdateDataBuilder;