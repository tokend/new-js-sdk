"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaleRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var SaleRequestBuilder =
/*#__PURE__*/
function () {
  function SaleRequestBuilder() {
    (0, _classCallCheck2.default)(this, SaleRequestBuilder);
  }

  (0, _createClass2.default)(SaleRequestBuilder, null, [{
    key: "createSaleCreationRequest",

    /**
       * Creates operation to create withdraw request with autoconversion
       * @param {object} opts
       * @param {string} opts.requestID - ID of the request. 0 - to create new;
       * @param {string} opts.baseAsset - asset for which sale will be performed
       * @param {string} opts.defaultQuoteAsset - asset in which hardcap/soft cap will be calculated
       * @param {string} opts.startTime - start time of the sale
       * @param {string} opts.endTime - close time of the sale
       * @param {string} opts.softCap - minimum amount of quote asset to be received at which sale will be considered a successful
       * @param {string} opts.hardCap - max amount of quote asset to be received
       * @param {object} opts.details - sale specific details
       * @param {object} opts.details.name - name of the sale
       * @param {object} opts.details.short_description - short description of the sale
       * @param {object} opts.details.desciption - sale specific details
       * @param {object} opts.details.logo - details of the logo
       * @param {array} opts.quoteAssets - accepted assets
       * @param {object} opts.quoteAssets.price - price for 1 baseAsset in terms of quote asset
       * @param {object} opts.quoteAssets.asset - asset code of the quote asset
       * @param {object} opts.isCrowdfunding - states if sale type is crowd funding
       * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
       * @returns {xdr.CreateSaleCreationRequestOp}
       */
    value: function createSaleCreationRequest(opts) {
      var attrs = {};

      if (!_base_operation.BaseOperation.isValidAsset(opts.baseAsset)) {
        throw new Error('opts.baseAsset is invalid');
      }

      attrs.baseAsset = opts.baseAsset;

      if (!_base_operation.BaseOperation.isValidAsset(opts.defaultQuoteAsset)) {
        throw new Error('opts.defaultQuoteAsset is invalid');
      }

      attrs.defaultQuoteAsset = opts.defaultQuoteAsset;

      if ((0, _isUndefined.default)(opts.startTime)) {
        throw new Error('opts.startTime is invalid');
      }

      attrs.startTime = _jsXdr.UnsignedHyper.fromString(opts.startTime);

      if ((0, _isUndefined.default)(opts.endTime)) {
        throw new Error('opts.endTime is invalid');
      }

      attrs.endTime = _jsXdr.UnsignedHyper.fromString(opts.endTime);

      if (!_base_operation.BaseOperation.isValidAmount(opts.softCap, true)) {
        throw new Error('opts.softCap is invalid');
      }

      attrs.softCap = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.softCap);

      if (!_base_operation.BaseOperation.isValidAmount(opts.hardCap, true)) {
        throw new Error('opts.hardCap is invalid');
      }

      attrs.hardCap = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.hardCap);
      SaleRequestBuilder.validateDetail(opts.details);
      attrs.details = (0, _stringify.default)(opts.details);
      attrs.ext = new _xdr_generated.default.SaleCreationRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var isCrowdfunding = !(0, _isUndefined.default)(opts.isCrowdfunding) && opts.isCrowdfunding;

      if (isCrowdfunding) {
        var crowdFundingSale = new _xdr_generated.default.CrowdFundingSale({
          ext: new _xdr_generated.default.CrowdFundingSaleExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        });

        var saleTypeExtTypedSale = _xdr_generated.default.SaleTypeExtTypedSale.crowdFunding(crowdFundingSale);

        var saleTypeExt = new _xdr_generated.default.SaleTypeExt({
          typedSale: saleTypeExtTypedSale
        });
        attrs.ext = _xdr_generated.default.SaleCreationRequestExt.typedSale(saleTypeExt);
      }

      var request = new _xdr_generated.default.SaleCreationRequest(attrs);

      if ((0, _isUndefined.default)(opts.requestID)) {
        opts.requestID = '0';
      }

      if ((0, _isUndefined.default)(opts.quoteAssets) || opts.quoteAssets.length === 0) {
        throw new Error('opts.quoteAssets is invalid');
      }

      attrs.quoteAssets = [];

      for (var i = 0; i < opts.quoteAssets.length; i++) {
        var quoteAsset = opts.quoteAssets[i];
        var minAmount = void 0;
        var maxAmount = void 0;

        if (isCrowdfunding) {
          minAmount = 1;
          maxAmount = 1;
        }

        var validAmount = _base_operation.BaseOperation.isValidAmount(quoteAsset.price, false, minAmount, maxAmount);

        if (!validAmount) {
          throw new Error("opts.quoteAssets[i].price is invalid: ".concat(quoteAsset.price));
        }

        if ((0, _isUndefined.default)(quoteAsset.asset)) {
          throw new Error('opts.quoteAssets[i].asset is invalid');
        }

        attrs.quoteAssets.push(new _xdr_generated.default.SaleCreationRequestQuoteAsset({
          price: _base_operation.BaseOperation._toUnsignedXDRAmount(quoteAsset.price),
          quoteAsset: quoteAsset.asset,
          ext: new _xdr_generated.default.SaleCreationRequestQuoteAssetExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        }));
      }

      var withdrawRequestOp = new _xdr_generated.default.CreateSaleCreationRequestOp({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        request: request,
        ext: new _xdr_generated.default.CreateSaleCreationRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createSaleRequest(withdrawRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "validateDetail",
    value: function validateDetail(details) {
      if ((0, _isUndefined.default)(details)) {
        throw new Error('details is invalid');
      }

      if ((0, _isUndefined.default)(details.short_description)) {
        throw new Error('details.short_description is invalid');
      }

      if ((0, _isUndefined.default)(details.description)) {
        throw new Error('details.description is invalid');
      }

      if ((0, _isUndefined.default)(details.logo)) {
        throw new Error('details.logo is invalid');
      }

      if ((0, _isUndefined.default)(details.name)) {
        throw new Error('details.name is invalid');
      }
    }
  }, {
    key: "crateSaleCreationRequestToObject",
    value: function crateSaleCreationRequestToObject(result, attrs) {
      result.requestID = attrs.requestId().toString();
      var request = attrs.request();
      result.baseAsset = request.baseAsset().toString();
      result.defaultQuoteAsset = request.defaultQuoteAsset().toString();
      result.startTime = request.startTime().toString();
      result.endTime = request.endTime().toString();
      result.softCap = _base_operation.BaseOperation._fromXDRAmount(request.softCap());
      result.hardCap = _base_operation.BaseOperation._fromXDRAmount(request.hardCap());
      result.details = JSON.parse(request.details());
      result.quoteAssets = [];

      for (var i = 0; i < request.quoteAssets().length; i++) {
        result.quoteAssets.push({
          price: _base_operation.BaseOperation._fromXDRAmount(request.quoteAssets()[i].price()),
          asset: request.quoteAssets()[i].quoteAsset().toString()
        });
      }
    }
    /**
       * Creates operation to check sale state
       * @param {object} opts
       * @param {string} saleID - id of the sale to check
       * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
       * @returns {xdr.CheckSaleStateOp}
       */

  }, {
    key: "checkSaleState",
    value: function checkSaleState(opts) {
      if ((0, _isUndefined.default)(opts.saleID)) {
        throw new Error('Invalid opts.saleID');
      }

      var checkSaleStateOp = new _xdr_generated.default.CheckSaleStateOp({
        saleId: _jsXdr.UnsignedHyper.fromString(opts.saleID),
        ext: new _xdr_generated.default.CheckSaleStateOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.checkSaleState(checkSaleStateOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "checkSaleStateToObject",
    value: function checkSaleStateToObject(result, attrs) {
      result.saleID = attrs.saleId().toString();
    }
  }]);
  return SaleRequestBuilder;
}();

exports.SaleRequestBuilder = SaleRequestBuilder;