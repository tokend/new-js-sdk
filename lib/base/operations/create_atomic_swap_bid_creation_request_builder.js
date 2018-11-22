"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAtomicSwapBidCreationRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var CreateAtomicSwapBidCreationRequestBuilder =
/*#__PURE__*/
function () {
  function CreateAtomicSwapBidCreationRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateAtomicSwapBidCreationRequestBuilder);
  }

  (0, _createClass2.default)(CreateAtomicSwapBidCreationRequestBuilder, null, [{
    key: "createASwapBidCreationRequest",

    /**
       * Creates atomic swap bid creation request
       * @param {object} opts
       *
       * @param {string} opts.balanceID - balance from which specified amount
       * will be used in atomic swap
       * @param {string} opts.amount - amount which will used in swap (will be locked)
       * @param {string} opts.fee - fee for atomic swap bid
       * @param {object} opts.details - details about atomic swap bid
       * @param {array} opts.quoteAssets - accepted assets
       * @param {object} opts.quoteAssets.price - price for 1 baseAsset in terms of quote asset
       * @param {object} opts.quoteAssets.asset - asset code of the quote asset
       * @param {string} [opts.source] - The source account for the operation.
       * Defaults to the transaction's source account.
       *
       * @returns {xdr.CreateASwapBidCreationRequestOp}
       */
    value: function createASwapBidCreationRequest(opts) {
      var rawRequest = {};

      if (!_base_operation.BaseOperation.isValidAmount(opts.amount)) {
        throw new Error('opts.amount is invalid');
      }

      rawRequest.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);

      if (!_keypair.Keypair.isValidBalanceKey(opts.balanceID)) {
        throw new Error('opts.balanceID is invalid');
      }

      rawRequest.baseBalance = _keypair.Keypair.fromBalanceId(opts.balanceID).xdrBalanceId();

      if ((0, _isUndefined.default)(opts.quoteAssets) || opts.quoteAssets.length === 0) {
        throw new Error('opts.quoteAssets is invalid');
      }

      rawRequest.quoteAssets = [];

      for (var i = 0; i < opts.quoteAssets.length; i++) {
        var quoteAsset = opts.quoteAssets[i];

        if (!_base_operation.BaseOperation.isValidAmount(quoteAsset.price)) {
          throw new Error('opts.quoteAssets[' + i + '].price is invalid: ' + quoteAsset.price);
        }

        if (!_base_operation.BaseOperation.isValidAsset(quoteAsset.asset)) {
          throw new Error('opts.quoteAssets[i].asset is invalid');
        }

        rawRequest.quoteAssets.push(new _xdr_generated.default.ASwapBidQuoteAsset({
          price: _base_operation.BaseOperation._toUnsignedXDRAmount(quoteAsset.price),
          quoteAsset: quoteAsset.asset,
          ext: new _xdr_generated.default.ASwapBidQuoteAssetExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        }));
      }

      rawRequest.details = (0, _stringify.default)(opts.details);
      rawRequest.ext = new _xdr_generated.default.ASwapBidCreationRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var opAttributes = {};
      opAttributes.body = new _xdr_generated.default.OperationBody.createAswapBidRequest(new _xdr_generated.default.CreateASwapBidCreationRequestOp({
        request: new _xdr_generated.default.ASwapBidCreationRequest(rawRequest),
        ext: new _xdr_generated.default.CreateASwapBidCreationRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createASwapBidCreationRequestToObject",
    value: function createASwapBidCreationRequestToObject(result, attrs) {
      result.balanceID = _base_operation.BaseOperation.balanceIdtoString(attrs.request().baseBalance());
      result.amount = _base_operation.BaseOperation._fromXDRAmount(attrs.request().amount());
      result.details = JSON.parse(attrs.request().details());
      result.quoteAssets = [];
      var rawQuoteAssets = attrs.request().quoteAssets();

      for (var i = 0; i < rawQuoteAssets.length; i++) {
        result.quoteAssets.push({
          price: _base_operation.BaseOperation._fromXDRAmount(rawQuoteAssets[i].price()),
          asset: rawQuoteAssets[i].quoteAsset().toString()
        });
      }
    }
  }]);
  return CreateAtomicSwapBidCreationRequestBuilder;
}();

exports.CreateAtomicSwapBidCreationRequestBuilder = CreateAtomicSwapBidCreationRequestBuilder;