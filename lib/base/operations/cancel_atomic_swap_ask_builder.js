"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CancelAtomicSwapAskBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var _validators = require("../../utils/validators");

var CancelAtomicSwapAskBuilder =
/*#__PURE__*/
function () {
  function CancelAtomicSwapAskBuilder() {
    (0, _classCallCheck2.default)(this, CancelAtomicSwapAskBuilder);
  }

  (0, _createClass2.default)(CancelAtomicSwapAskBuilder, null, [{
    key: "cancelAtomicSwapAsk",

    /**
       * Cancel atomic swap ask
       * @param {object} opts
       * @param {string} opts.askID - id of ask which will be canceled.
       * @param {string} [opts.source] - The source account for the operation.
       * Defaults to the transaction's source account.
       *
       * @returns {xdr.Operation}
       */
    value: function cancelAtomicSwapAsk(opts) {
      this._validateCancelAtomicSwapAskOp(opts);

      var opAttributes = {};
      opAttributes.body = new _xdr_generated.default.OperationBody.cancelAtomicSwapAsk(new _xdr_generated.default.CancelAtomicSwapAskOp({
        askId: _jsXdr.UnsignedHyper.fromString(opts.askID),
        ext: new _xdr_generated.default.CancelAtomicSwapAskOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "cancelAtomicSwapAskToObject",
    value: function cancelAtomicSwapAskToObject(result, attrs) {
      result.askID = attrs.askId().toString();
    }
  }, {
    key: "_validateCancelAtomicSwapAskOp",
    value: function _validateCancelAtomicSwapAskOp(opts) {
      (0, _validators.validateUint64)({
        value: opts.askID,
        fieldName: 'opts.askID'
      });
    }
  }]);
  return CancelAtomicSwapAskBuilder;
}();

exports.CancelAtomicSwapAskBuilder = CancelAtomicSwapAskBuilder;