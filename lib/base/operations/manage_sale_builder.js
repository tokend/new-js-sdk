"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
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
       * @param {object} opts.creatorDetails - new sale specific details
       * @param {object} opts.creatorDetails.name - name of the sale
       * @param {object} opts.creatorDetails.short_description - short description of the sale
       * @param {object} opts.creatorDetails.description - sale description
       * @param {object} opts.creatorDetails.logo - details of the logo
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

      _sale_request_builder.SaleRequestBuilder.validateDetail(opts.creatorDetails);

      var updateSaleDetailsData = new _xdr_generated.default.UpdateSaleDetailsData({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        creatorDetails: (0, _stringify.default)(opts.creatorDetails),
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
  }, {
    key: "manageSaleToObject",
    value: function manageSaleToObject(result, attrs) {
      result.saleID = attrs.saleId().toString();

      switch (attrs.data().switch()) {
        case _xdr_generated.default.ManageSaleAction.createUpdateDetailsRequest():
          {
            var data = attrs.data().updateSaleDetailsData();
            result.requestID = data.requestId().toString();
            result.creatorDetails = JSON.parse(data.creatorDetails());
            break;
          }
      }
    }
  }]);
  return ManageSaleBuilder;
}();

exports.ManageSaleBuilder = ManageSaleBuilder;