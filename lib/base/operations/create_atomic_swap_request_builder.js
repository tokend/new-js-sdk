"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAtomicSwapRequestBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var CreateAtomicSwapRequestBuilder =
/*#__PURE__*/
function () {
  function CreateAtomicSwapRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateAtomicSwapRequestBuilder);
  }

  (0, _createClass2.default)(CreateAtomicSwapRequestBuilder, null, [{
    key: "createASwapRequest",

    /**
       * Creates atomic swap request
       * @param {object} opts
       *
       * @param {string} opts.bidID - id of bid for which request will be created.
       * @param {string} opts.baseAmount - amount which will be bought
       * @param {string} opts.quoteAsset - accepted assets
       * @param {string} [opts.source] - The source account for the operation.
       * Defaults to the transaction's source account.
       *
       * @returns {xdr.CreateASwapRequestOp}
       */
    value: function createASwapRequest(opts) {
      var rawRequest = {};

      if (!_base_operation.BaseOperation.isValidAmount(opts.baseAmount)) {
        throw new Error('opts.amount is invalid');
      }

      rawRequest.baseAmount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.baseAmount);

      if (!_base_operation.BaseOperation.isValidAsset(opts.quoteAsset)) {
        throw new Error('opts.quoteAssets is invalid');
      }

      rawRequest.quoteAsset = opts.quoteAsset;
      rawRequest.bidId = _jsXdr.UnsignedHyper.fromString(opts.bidID);
      rawRequest.ext = new _xdr_generated.default.ASwapRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var opAttributes = {};
      opAttributes.body = new _xdr_generated.default.OperationBody.createAswapRequest(new _xdr_generated.default.CreateASwapRequestOp({
        request: new _xdr_generated.default.ASwapRequest(rawRequest),
        ext: new _xdr_generated.default.CreateASwapRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createASwapRequestToObject",
    value: function createASwapRequestToObject(result, attrs) {
      result.bidID = attrs.request().bidId().toString();
      result.baseAmount = _base_operation.BaseOperation._fromXDRAmount(attrs.request().baseAmount());
      result.quoteAsset = attrs.request().quoteAsset().toString();
    }
  }]);
  return CreateAtomicSwapRequestBuilder;
}();

exports.CreateAtomicSwapRequestBuilder = CreateAtomicSwapRequestBuilder;