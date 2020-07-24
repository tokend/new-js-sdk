"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.RemoveAssetPairOpBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _validators = require("../../utils/validators");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var RemoveAssetPairOpBuilder =
/*#__PURE__*/
function () {
  function RemoveAssetPairOpBuilder() {
    (0, _classCallCheck2.default)(this, RemoveAssetPairOpBuilder);
  }

  (0, _createClass2.default)(RemoveAssetPairOpBuilder, null, [{
    key: "removeAssetPairOp",

    /**
     * Creates remove asset pair operation.
     * In case of invalid params trows error.
     *
     * @param {object} opts
     * @param {string} opts.base - asset pair base asset
     * @param {string} opts.quote - asset pair quote asset
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.RemoveAssetPairOp}
     */
    value: function removeAssetPairOp(opts) {
      this._validateRemoveAssetPairOp(opts);

      var removeAssetPairOp = new _xdr_generated.default.RemoveAssetPairOp({
        base: opts.base,
        quote: opts.quote,
        ext: new _xdr_generated.default.RemoveAssetPairOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.removeAssetPair(removeAssetPairOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "removeAssetPairOpToObject",
    value: function removeAssetPairOpToObject(result, attrs) {
      result.base = attrs.base().toString();
      result.quote = attrs.quote().toString();
    } // Helpers

    /**
     * Validates params for asset pair remove operation throws error in case of invalid param
     *
     * @param {object} opts
     * @param {string} opts.base - asset pair base asset
     * @param {string} opts.quote - asset pair quote asset
     */

  }, {
    key: "_validateRemoveAssetPairOp",
    value: function _validateRemoveAssetPairOp(opts) {
      (0, _validators.validateAssetCode)({
        value: opts.base,
        fieldName: 'opts.base'
      });
      (0, _validators.validateAssetCode)({
        value: opts.quote,
        fieldName: 'opts.quote'
      });
    }
  }]);
  return RemoveAssetPairOpBuilder;
}();

exports.RemoveAssetPairOpBuilder = RemoveAssetPairOpBuilder;