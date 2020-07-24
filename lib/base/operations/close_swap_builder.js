"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CloseSwapBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var _hasher = require("../util/hasher");

var _validators = require("../../utils/validators");

var CloseSwapBuilder =
/*#__PURE__*/
function () {
  function CloseSwapBuilder() {
    (0, _classCallCheck2.default)(this, CloseSwapBuilder);
  }

  (0, _createClass2.default)(CloseSwapBuilder, null, [{
    key: "prepareAttrs",
    value: function prepareAttrs(opts) {
      var attrs = {};

      if (!(0, _isUndefined.default)(opts.secret)) {
        attrs.secret = _hasher.Hasher.hash(opts.secret);
      }

      attrs.swapId = _jsXdr.UnsignedHyper.fromString(opts.swapId);
      attrs.ext = new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      return attrs;
    }
    /**
     * Creates CloseSwap operation where destination is AccountID or BalanceID
     * @param {object} opts
     * @param {string} opts.secret
     * @param {string} opts.swapId
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CloseSwapOp}
     */

  }, {
    key: "closeSwap",
    value: function closeSwap(opts) {
      (0, _validators.validateUint64)({
        value: opts.swapId,
        fieldName: 'opts.swapId'
      });
      var attrs = CloseSwapBuilder.prepareAttrs(opts);
      var closeSwapOp = new _xdr_generated.default.CloseSwapOp(attrs);
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.closeSwap(closeSwapOp);
      opAttrs.ext = new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion());

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
  }, {
    key: "closeSwapToObject",
    value: function closeSwapToObject(result, attrs) {
      if (!(0, _isUndefined.default)(attrs.secret())) {
        result.secret = attrs.secret().toString('hex');
      }

      result.swapId = attrs.swapId().toString();
      return result;
    }
  }]);
  return CloseSwapBuilder;
}();

exports.CloseSwapBuilder = CloseSwapBuilder;