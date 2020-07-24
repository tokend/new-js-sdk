"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.SaleRequestBuilder = void 0;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var _keypair = require("../keypair");

var SaleRequestBuilder =
/*#__PURE__*/
function () {
  function SaleRequestBuilder() {
    (0, _classCallCheck2.default)(this, SaleRequestBuilder);
  }

  (0, _createClass2.default)(SaleRequestBuilder, null, [{
    key: "createSaleCreationRequest",

    /**
       * Creates operation to create sale request
       * @param {object} opts
       * @param {string} opts.requestID - ID of the request. 0 - to create new;
       * @param {string} opts.baseAsset - asset for which sale will be performed
       * @param {string} opts.saleType - Sale type
       * @param {string} opts.defaultQuoteAsset - asset in which hardcap/soft cap will be calculated
       * @param {string} opts.startTime - start time of the sale
       * @param {string} opts.endTime - close time of the sale
       * @param {string} opts.softCap - minimum amount of quote asset to be received at which sale will be considered a successful
       * @param {string} opts.hardCap - max amount of quote asset to be received
       * @param {string} opts.requiredBaseAssetForHardCap - max amount to be sold in base asset
       * @param {object} opts.creatorDetails - sale specific details
       * @param {object} opts.creatorDetails.name - name of the sale
       * @param {object} opts.creatorDetails.short_description - short description of the sale
       * @param {object} opts.creatorDetails.desciption - sale specific details
       * @param {object} opts.creatorDetails.logo - details of the logo
       * @param {array} opts.quoteAssets - accepted assets
       * @param {object} opts.quoteAssets.price - price for 1 baseAsset in terms of quote asset
       * @param {object} opts.quoteAssets.asset - asset code of the quote asset
       * @param {number} opts.saleEnumType - Sale type
       * @param {object[]} [opts.saleRules] - rules for sale participation
       * @param {string} [opts.saleRules[].accountID] - ID of account for which rule will be applied
       * @param {boolean} opts.saleRules[].forbids - Means rule is restrictive or not
       * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
       * @returns {xdr.CreateSaleCreationRequestOp}
       */
    value: function createSaleCreationRequest(opts) {
      var request = this.validateSaleCreationRequest(opts);
      var createSaleCreationRequestOp = new _xdr_generated.default.CreateSaleCreationRequestOp({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        request: request,
        ext: new _xdr_generated.default.CreateSaleCreationRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createSaleRequest(createSaleCreationRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
     * Creates operation to cancel sale request
     * @param {object} opts
     * @param {string} opts.requestID - ID of the request
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     * @returns {xdr.CancelSaleCreationRequestOp}
     */

  }, {
    key: "cancelSaleCreationRequest",
    value: function cancelSaleCreationRequest(opts) {
      var cancelSaleCreationRequestOp = new _xdr_generated.default.CancelSaleCreationRequestOp({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        ext: new _xdr_generated.default.CancelSaleCreationRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.cancelSaleRequest(cancelSaleCreationRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "validateSaleCreationRequest",
    value: function validateSaleCreationRequest(opts) {
      var attrs = {};

      if (!_base_operation.BaseOperation.isValidAsset(opts.baseAsset)) {
        throw new Error('opts.baseAsset is invalid');
      }

      attrs.baseAsset = opts.baseAsset;

      if ((0, _isUndefined.default)(opts.saleType)) {
        throw new Error('opts.saleType is undefined');
      }

      attrs.saleType = _jsXdr.UnsignedHyper.fromString(opts.saleType);

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
      SaleRequestBuilder.validateDetail(opts.creatorDetails);
      attrs.creatorDetails = (0, _stringify.default)(opts.creatorDetails);
      attrs.ext = new _xdr_generated.default.SaleCreationRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());

      if ((0, _isUndefined.default)(opts.saleEnumType) || !opts.saleEnumType) {
        attrs.saleEnumType = _xdr_generated.default.SaleType.basicSale().value;
      } else if (opts.saleEnumType === true) {
        attrs.saleEnumType = _xdr_generated.default.SaleType.crowdFunding().value;
      } else {
        attrs.saleEnumType = opts.saleEnumType;
      }

      var saleTypeExt;

      switch (attrs.saleEnumType) {
        case _xdr_generated.default.SaleType.basicSale().value:
          {
            var basicSale = new _xdr_generated.default.BasicSale({
              ext: new _xdr_generated.default.BasicSaleExt(_xdr_generated.default.LedgerVersion.emptyVersion())
            });
            saleTypeExt = _xdr_generated.default.SaleTypeExt.basicSale(basicSale);
            break;
          }

        case _xdr_generated.default.SaleType.crowdFunding().value:
          {
            var crowdFundingSale = new _xdr_generated.default.CrowdFundingSale({
              ext: new _xdr_generated.default.CrowdFundingSaleExt(_xdr_generated.default.LedgerVersion.emptyVersion())
            });
            saleTypeExt = _xdr_generated.default.SaleTypeExt.crowdFunding(crowdFundingSale);
            break;
          }

        case _xdr_generated.default.SaleType.fixedPrice().value:
          {
            var fixedPriceSale = new _xdr_generated.default.FixedPriceSale({
              ext: new _xdr_generated.default.FixedPriceSaleExt(_xdr_generated.default.LedgerVersion.emptyVersion())
            });
            saleTypeExt = _xdr_generated.default.SaleTypeExt.fixedPrice(fixedPriceSale);
            break;
          }

        case _xdr_generated.default.SaleType.immediate().value:
          {
            var immediateSale = new _xdr_generated.default.ImmediateSale({
              ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
            });
            saleTypeExt = _xdr_generated.default.SaleTypeExt.immediate(immediateSale);
          }
      }

      if (!_base_operation.BaseOperation.isValidAmount(opts.requiredBaseAssetForHardCap, true)) {
        throw new Error('opts.requiredBaseAssetForHardCap is invalid');
      }

      attrs.requiredBaseAssetForHardCap = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.requiredBaseAssetForHardCap);

      if ((0, _isUndefined.default)(opts.sequenceNumber) || opts.sequenceNumber < 0) {
        opts.sequenceNumber = 0;
      }

      attrs.sequenceNumber = opts.sequenceNumber;
      attrs.saleTypeExt = saleTypeExt;
      attrs.ext = new _xdr_generated.default.SaleCreationRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());

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

        if (attrs.saleType === _xdr_generated.default.SaleType.crowdFunding().value) {
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

      if (!(0, _isUndefined.default)(opts.saleRules)) {
        this._addSaleRule(attrs, opts);
      }

      return new _xdr_generated.default.SaleCreationRequest(attrs);
    }
  }, {
    key: "_addSaleRule",
    value: function _addSaleRule(attrs, opts) {
      var saleRules = [];
      var saleRulesSet = new _set.default();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)(opts.saleRules), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var rule = _step.value;

          if (saleRulesSet.has(rule.accountID)) {
            throw new Error('opts.saleRules has duplicated rules');
          }

          saleRulesSet.add(rule.accountID);
          var accountID = void 0;

          if (!(0, _isUndefined.default)(rule.accountID)) {
            accountID = _keypair.Keypair.fromAccountId(rule.accountID).xdrPublicKey();
          }

          saleRules.push(new _xdr_generated.default.CreateAccountSaleRuleData({
            accountId: accountID,
            forbids: rule.forbids,
            ext: new _xdr_generated.default.CreateAccountSaleRuleDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
          }));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      attrs.ext = new _xdr_generated.default.SaleCreationRequestExt.addSaleWhitelist(saleRules);
    }
  }, {
    key: "validateDetail",
    value: function validateDetail(creatorDetails) {
      if ((0, _isUndefined.default)(creatorDetails)) {
        throw new Error('details is invalid');
      }

      if ((0, _isUndefined.default)(creatorDetails.short_description)) {
        throw new Error('details.short_description is invalid');
      }

      if ((0, _isUndefined.default)(creatorDetails.description)) {
        throw new Error('details.description is invalid');
      }

      if ((0, _isUndefined.default)(creatorDetails.logo)) {
        throw new Error('details.logo is invalid');
      }

      if ((0, _isUndefined.default)(creatorDetails.name)) {
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
      result.requiredBaseAssetForHardCap = _base_operation.BaseOperation._fromXDRAmount(request.requiredBaseAssetForHardCap());
      result.creatorDetails = JSON.parse(request.creatorDetails());
      result.saleType = request.saleType().toString();
      result.saleEnumType = request.saleTypeExt().switch().value;
      result.quoteAssets = [];

      for (var i = 0; i < request.quoteAssets().length; i++) {
        result.quoteAssets.push({
          price: _base_operation.BaseOperation._fromXDRAmount(request.quoteAssets()[i].price()),
          asset: request.quoteAssets()[i].quoteAsset().toString()
        });
      }

      switch (request.ext().switch()) {
        case _xdr_generated.default.LedgerVersion.emptyVersion():
          break;

        case _xdr_generated.default.LedgerVersion.addSaleWhitelist():
          result.saleRules = [];
          var rules = request.ext().saleRules();
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator2.default)(rules), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var rule = _step2.value;
              var accountID = void 0;

              if (!(0, _isUndefined.default)(rule.accountId())) {
                accountID = _base_operation.BaseOperation.accountIdtoAddress(rule.accountId());
              }

              result.saleRules.push({
                accountID: accountID,
                forbids: rule.forbids()
              });
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          break;

        default:
          throw new Error('Unexpected create sale request ext type');
      }
    }
  }, {
    key: "cancelSaleCreationRequestToObject",
    value: function cancelSaleCreationRequestToObject(result, attrs) {
      result.requestID = attrs.requestId().toString();
    }
    /**
       * Creates operation to check sale state
       * @param {object} opts
       * @param {string} opts.saleID - id of the sale to check
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