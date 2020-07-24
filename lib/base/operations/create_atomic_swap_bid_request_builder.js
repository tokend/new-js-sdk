"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CreateAtomicSwapBidRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var _validators = require("../../utils/validators");

var CreateAtomicSwapBidRequestBuilder =
/*#__PURE__*/
function () {
  function CreateAtomicSwapBidRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateAtomicSwapBidRequestBuilder);
  }

  (0, _createClass2.default)(CreateAtomicSwapBidRequestBuilder, null, [{
    key: "createAtomicSwapBidRequest",

    /**
       * Creates atomic swap request
       * @param {object} opts
       *
       * @param {string} opts.askID - id of bid for which request will be created.
       * @param {string} opts.baseAmount - amount which will be bought
       * @param {string} opts.quoteAsset - accepted assets
       * @param {object} opts.creatorDetails - request details set by creator
       * @param {string} [opts.source] - The source account for the operation.
       * Defaults to the transaction's source account.
       *
       * @returns {xdr.Operation}
       */
    value: function createAtomicSwapBidRequest(opts) {
      this._validateCreateAtomicSwapBidOp(opts);

      var rawRequest = {};
      rawRequest.baseAmount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.baseAmount);
      rawRequest.quoteAsset = opts.quoteAsset;
      rawRequest.creatorDetails = (0, _stringify.default)(opts.creatorDetails);
      rawRequest.askId = _jsXdr.UnsignedHyper.fromString(opts.askID);
      rawRequest.ext = new _xdr_generated.default.CreateAtomicSwapBidRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var opAttributes = {};
      opAttributes.body = new _xdr_generated.default.OperationBody.createAtomicSwapBidRequest(new _xdr_generated.default.CreateAtomicSwapBidRequestOp({
        request: new _xdr_generated.default.CreateAtomicSwapBidRequest(rawRequest),
        ext: new _xdr_generated.default.CreateAtomicSwapBidRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createAtomicSwapBidRequestToObject",
    value: function createAtomicSwapBidRequestToObject(result, attrs) {
      result.askID = attrs.request().askId().toString();
      result.baseAmount = _base_operation.BaseOperation._fromXDRAmount(attrs.request().baseAmount());
      result.quoteAsset = attrs.request().quoteAsset().toString();
      result.creatorDetails = JSON.parse(attrs.request().creatorDetails().toString());
    }
  }, {
    key: "_validateCreateAtomicSwapBidOp",
    value: function _validateCreateAtomicSwapBidOp(opts) {
      (0, _validators.validateUint64)({
        value: opts.askID,
        fieldName: 'opts.askID'
      });
      (0, _validators.validateAmount)({
        value: opts.baseAmount,
        fieldName: 'opts.baseAmount'
      });
      (0, _validators.validateCreatorDetails)({
        value: opts.creatorDetails,
        fieldName: 'opts.creatorDetails'
      });
      (0, _validators.validateAssetCode)({
        value: opts.quoteAsset,
        fieldName: 'opts.quoteAsset'
      });
    }
  }]);
  return CreateAtomicSwapBidRequestBuilder;
}();

exports.CreateAtomicSwapBidRequestBuilder = CreateAtomicSwapBidRequestBuilder;