"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CancelAtomicSwapBidBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var CancelAtomicSwapBidBuilder =
/*#__PURE__*/
function () {
  function CancelAtomicSwapBidBuilder() {
    (0, _classCallCheck2.default)(this, CancelAtomicSwapBidBuilder);
  }

  (0, _createClass2.default)(CancelAtomicSwapBidBuilder, null, [{
    key: "cancelASwapBid",

    /**
       * Cancel atomic swap bid
       * @param {object} opts
       * @param {string} opts.bidID - id of bid which will be canceled.
       * @param {string} [opts.source] - The source account for the operation.
       * Defaults to the transaction's source account.
       *
       * @returns {xdr.CancelASwapBidOp}
       */
    value: function cancelASwapBid(opts) {
      var opAttributes = {};
      opAttributes.body = new _xdr_generated.default.OperationBody.cancelAswapBid(new _xdr_generated.default.CancelASwapBidOp({
        bidId: _jsXdr.UnsignedHyper.fromString(opts.bidID),
        ext: new _xdr_generated.default.CancelASwapBidOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "cancelASwapBidToObject",
    value: function cancelASwapBidToObject(result, attrs) {
      result.bidID = attrs.bidId().toString();
    }
  }]);
  return CancelAtomicSwapBidBuilder;
}();

exports.CancelAtomicSwapBidBuilder = CancelAtomicSwapBidBuilder;