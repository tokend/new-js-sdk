"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageSaleBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var _sale_request_builder = require("./sale_request_builder");

var ManageSaleBuilder =
/*#__PURE__*/
function () {
  function ManageSaleBuilder() {
    (0, _classCallCheck2.default)(this, ManageSaleBuilder);
  }

  (0, _createClass2.default)(ManageSaleBuilder, null, [{
    key: "createUpdateSaleDetailsRequest",

    /**
       * Creates request to update manage sale details
       * @param {object} opts
       * @param {number|string} opts.requestID - set to zero to create new request
       * @param {string} opts.saleID - ID of the sale to create new update details request
       * @param {object} opts.newDetails - new sale specific details
       * @param {object} opts.newDetails.name - name of the sale
       * @param {object} opts.newDetails.short_description - short description of the sale
       * @param {object} opts.newDetails.description - sale description
       * @param {object} opts.newDetails.logo - details of the logo
       * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
       * @returns {xdr.ManageSaleOp}
       */
    value: function createUpdateSaleDetailsRequest(opts) {
      if ((0, _isUndefined.default)(opts.requestID)) {
        throw new Error('opts.requestID is invalid');
      }

      if ((0, _isUndefined.default)(opts.saleID)) {
        throw new Error('opts.saleID is invalid');
      }

      _sale_request_builder.SaleRequestBuilder.validateDetail(opts.newDetails);

      var updateSaleDetailsData = new _xdr_generated.default.UpdateSaleDetailsData({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        newDetails: (0, _stringify.default)(opts.newDetails),
        ext: new _xdr_generated.default.UpdateSaleDetailsDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var manageSaleOp = new _xdr_generated.default.ManageSaleOp({
        saleId: _jsXdr.UnsignedHyper.fromString(opts.saleID),
        data: new _xdr_generated.default.ManageSaleOpData.createUpdateDetailsRequest(updateSaleDetailsData),
        ext: new _xdr_generated.default.ManageSaleOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.manageSale(manageSaleOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
    /**
     * Creates request to update manage sale end time
     * @param {object} opts
     * @param {number|string} opts.requestID - set to zero to create new request
     * @param {string} opts.saleID - ID of the sale to create new update end time request
     * @param {number|string} opts.newEndTime - new sale end time
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.ManageSaleOp}
     */

  }, {
    key: "createUpdateSaleEndTimeRequest",
    value: function createUpdateSaleEndTimeRequest(opts) {
      if ((0, _isUndefined.default)(opts.requestID)) {
        throw new Error('opts.requestID is invalid');
      }

      if ((0, _isUndefined.default)(opts.saleID)) {
        throw new Error('opts.saleID is invalid');
      }

      if ((0, _isUndefined.default)(opts.newEndTime)) {
        throw new Error('opts.newEndTime is invalid');
      }

      var updateSaleEndTimeData = new _xdr_generated.default.UpdateSaleEndTimeData({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        newEndTime: _jsXdr.UnsignedHyper.fromString(opts.newEndTime),
        ext: new _xdr_generated.default.UpdateSaleEndTimeDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var manageSaleOp = new _xdr_generated.default.ManageSaleOp({
        saleId: _jsXdr.UnsignedHyper.fromString(opts.saleID),
        data: new _xdr_generated.default.ManageSaleOpData.createUpdateEndTimeRequest(updateSaleEndTimeData),
        ext: new _xdr_generated.default.ManageSaleOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.manageSale(manageSaleOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
    /**
     * Creates request to update details of the sale in state "PROMOTION"
     * @param {object} opts
     * @param {string} opts.saleID - ID of the sale to create new promotion update request
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
     * @param {object} opts.saleType - states sale type
     * @param {string} opts.baseAssetForHardCap - specifies the amount of base asset required for hard cap
     * @param {SaleState} opts.saleState - specifies the initial state of the sale
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.ManageSaleOp}
     */

  }, {
    key: "createPromotionUpdateRequest",
    value: function createPromotionUpdateRequest(opts) {
      if ((0, _isUndefined.default)(opts.saleID)) {
        throw new Error('opts.saleID is invalid');
      }

      var request = _sale_request_builder.SaleRequestBuilder.validateSaleCreationRequest(opts);

      var promotionUpdateData = new _xdr_generated.default.PromotionUpdateData({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        newPromotionData: request,
        ext: new _xdr_generated.default.PromotionUpdateDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var manageSaleOp = new _xdr_generated.default.ManageSaleOp({
        saleId: _jsXdr.UnsignedHyper.fromString(opts.saleID),
        data: new _xdr_generated.default.ManageSaleOpData.createPromotionUpdateRequest(promotionUpdateData),
        ext: new _xdr_generated.default.ManageSaleOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.manageSale(manageSaleOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
    /**
       * Creates manage sale operation for cancel sale
       * @param {object} opts
       * @param {string} opts.saleID - ID of the sale to cancel
       * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
       * @returns {xdr.ManageSaleOp}
       */

  }, {
    key: "cancelSale",
    value: function cancelSale(opts) {
      if ((0, _isUndefined.default)(opts.saleID)) {
        throw new Error('opts.saleID is invalid');
      }

      var manageSaleOp = new _xdr_generated.default.ManageSaleOp({
        saleId: _jsXdr.UnsignedHyper.fromString(opts.saleID),
        data: new _xdr_generated.default.ManageSaleOpData.cancel(),
        ext: new _xdr_generated.default.ManageSaleOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.manageSale(manageSaleOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
    /**
     * Sets sale state (only allowed for admins)
     * @param {object} opts
     * @param {string} opts.saleID - ID of the sale to cancel
     * @param {string} opts.saleState - state to set
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.ManageSaleOp}
     */

  }, {
    key: "setSaleState",
    value: function setSaleState(opts) {
      if ((0, _isUndefined.default)(opts.saleID)) {
        throw new Error('opts.saleID is invalid');
      }

      if ((0, _isUndefined.default)(opts.saleState)) {
        throw new Error('opts.saleState is invalid');
      }

      var manageSaleOp = new _xdr_generated.default.ManageSaleOp({
        saleId: _jsXdr.UnsignedHyper.fromString(opts.saleID),
        data: new _xdr_generated.default.ManageSaleOpData.setState(opts.saleState),
        ext: new _xdr_generated.default.ManageSaleOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.manageSale(manageSaleOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
  }, {
    key: "manageSaleToObject",
    value: function manageSaleToObject(result, attrs) {
      result.saleID = attrs.saleId().toString();

      switch (attrs.data().switch()) {
        case _xdr_generated.default.ManageSaleAction.createUpdateDetailsRequest():
          {
            var data = attrs.data().updateSaleDetailsData();
            result.requestID = data.requestId().toString();
            result.newDetails = JSON.parse(data.newDetails());
            break;
          }

        case _xdr_generated.default.ManageSaleAction.setState():
          {
            result.saleState = attrs.data().saleState();
            break;
          }

        case _xdr_generated.default.ManageSaleAction.createUpdateEndTimeRequest():
          {
            var _data = attrs.data().updateSaleEndTimeData();

            result.requestID = _data.requestId().toString();
            result.newEndTime = _data.newEndTime().toString();
            break;
          }

        case _xdr_generated.default.ManageSaleAction.createPromotionUpdateRequest():
          {
            var _data2 = attrs.data().promotionUpdateData();

            result.requestID = _data2.requestId().toString();

            var saleCreationRequest = _data2.newPromotionData();

            result.baseAsset = saleCreationRequest.baseAsset();
            result.defaultQuoteAsset = saleCreationRequest.defaultQuoteAsset();
            result.startTime = saleCreationRequest.startTime().toString();
            result.endTime = saleCreationRequest.endTime().toString();
            result.softCap = _base_operation.BaseOperation._fromXDRAmount(saleCreationRequest.softCap());
            result.hardCap = _base_operation.BaseOperation._fromXDRAmount(saleCreationRequest.hardCap());
            result.details = JSON.parse(saleCreationRequest.details());
            result.quoteAssets = [];

            for (var i = 0; i < saleCreationRequest.quoteAssets().length; i++) {
              result.quoteAssets.push({
                price: _base_operation.BaseOperation._fromXDRAmount(saleCreationRequest.quoteAssets()[i].price()),
                asset: saleCreationRequest.quoteAssets()[i].quoteAsset()
              });
            }

            switch (saleCreationRequest.ext().switch()) {
              case _xdr_generated.default.LedgerVersion.allowToSpecifyRequiredBaseAssetAmountForHardCap():
                {
                  result.baseAssetForHardCap = _base_operation.BaseOperation._fromXDRAmount(saleCreationRequest.ext().extV2().requiredBaseAssetForHardCap());
                  break;
                }

              case _xdr_generated.default.LedgerVersion.statableSale():
                {
                  result.baseAssetForHardCap = _base_operation.BaseOperation._fromXDRAmount(saleCreationRequest.ext().extV3().requiredBaseAssetForHardCap());
                  result.saleState = saleCreationRequest.ext().extV3().state();
                  break;
                }
            }

            break;
          }
      }
    }
  }]);
  return ManageSaleBuilder;
}();

exports.ManageSaleBuilder = ManageSaleBuilder;