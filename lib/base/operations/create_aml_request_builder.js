"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAMLRequestBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var CreateAMLRequestBuilder =
/*#__PURE__*/
function () {
  function CreateAMLRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateAMLRequestBuilder);
  }

  (0, _createClass2.default)(CreateAMLRequestBuilder, null, [{
    key: "createAMLAlert",

    /**
       * Creates operation to create aml alert
       * @param {object} opts
       *
       * @param {string} opts.balanceID - balance for which specified amount will be locked
       * @param {string} opts.amount - amount to be locked
       * @param {string} opts.reason - reason due to which alert was raised
       * @param {string} opts.reference - Unique reference of the alert
       * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
       *
       * @returns {xdr.CreateAMLAlertRequestOp}
       */
    value: function createAMLAlert(opts) {
      var rawRequest = {};

      if (!_base_operation.BaseOperation.isValidAmount(opts.amount)) {
        throw new Error('opts.amount is invalid');
      }

      rawRequest.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);

      if (!_keypair.Keypair.isValidBalanceKey(opts.balanceID)) {
        throw new Error('opts.balanceID is invalid');
      }

      rawRequest.balanceId = _keypair.Keypair.fromBalanceId(opts.balanceID).xdrBalanceId();
      rawRequest.reason = opts.reason;
      rawRequest.ext = new _xdr_generated.default.AmlAlertRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var request = new _xdr_generated.default.AmlAlertRequest(rawRequest);

      if ((0, _isUndefined.default)(opts.reference)) {
        throw new Error('opts.reference is invalid');
      }

      var opAttributes = {};
      opAttributes.body = new _xdr_generated.default.OperationBody.createAmlAlert(new _xdr_generated.default.CreateAmlAlertRequestOp({
        amlAlertRequest: request,
        reference: opts.reference,
        ext: new _xdr_generated.default.CreateAmlAlertRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createAmlAlertToObject",
    value: function createAmlAlertToObject(result, attrs) {
      result.balanceID = _base_operation.BaseOperation.balanceIdtoString(attrs.amlAlertRequest().balanceId());
      result.amount = _base_operation.BaseOperation._fromXDRAmount(attrs.amlAlertRequest().amount());
      result.reason = attrs.amlAlertRequest().reason().toString();
      result.reference = attrs.reference().toString();
    }
  }]);
  return CreateAMLRequestBuilder;
}();

exports.CreateAMLRequestBuilder = CreateAMLRequestBuilder;