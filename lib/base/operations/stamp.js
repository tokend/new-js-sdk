"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.StampBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var StampBuilder =
/*#__PURE__*/
function () {
  function StampBuilder() {
    (0, _classCallCheck2.default)(this, StampBuilder);
  }

  (0, _createClass2.default)(StampBuilder, null, [{
    key: "stamp",

    /**
     * Returns an XDR StampOp. A "stamp" operation saves latest ledger and license hashes.
     * @param {object} [opts]
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.SetOptionsOp}
     */
    value: function stamp(opts) {
      var stampOp = new _xdr_generated.default.StampOp({
        ext: new _xdr_generated.default.StampOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.stamp(stampOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "stampToObject",
    value: function stampToObject(result, attrs) {}
  }]);
  return StampBuilder;
}();

exports.StampBuilder = StampBuilder;