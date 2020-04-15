"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.RemoveAssetOpBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _validators = require("../../utils/validators");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var RemoveAssetOpBuilder =
/*#__PURE__*/
function () {
  function RemoveAssetOpBuilder() {
    (0, _classCallCheck2.default)(this, RemoveAssetOpBuilder);
  }

  (0, _createClass2.default)(RemoveAssetOpBuilder, null, [{
    key: "removeAssetOp",

    /**
     * Creates remove asset operation.
     * In case of invalid params trows error.
     *
     * @param {object} opts
     * @param {string} opts.code - asset code
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.RemoveAssetOp}
     */
    value: function removeAssetOp(opts) {
      this._validateRemoveAssetOp(opts);

      var removeAssetOp = new _xdr_generated.default.RemoveAssetOp({
        code: opts.code,
        ext: new _xdr_generated.default.RemoveAssetOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.removeAsset(removeAssetOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "removeAssetOpToObject",
    value: function removeAssetOpToObject(result, attrs) {
      result.code = attrs.code().toString();
    } // Helpers

    /**
     * Validates params for asset pair remove operation throws error in case of invalid param
     *
     * @param {object} opts
     * @param {string} opts.code - asset pair quote asset
     */

  }, {
    key: "_validateRemoveAssetOp",
    value: function _validateRemoveAssetOp(opts) {
      (0, _validators.validateAssetCode)({
        value: opts.code,
        fieldName: 'opts.code'
      });
    }
  }]);
  return RemoveAssetOpBuilder;
}();

exports.RemoveAssetOpBuilder = RemoveAssetOpBuilder;