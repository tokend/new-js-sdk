"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateIssuanceRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var CreateIssuanceRequestBuilder =
/*#__PURE__*/
function () {
  function CreateIssuanceRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateIssuanceRequestBuilder);
  }

  (0, _createClass2.default)(CreateIssuanceRequestBuilder, null, [{
    key: "createIssuanceRequest",

    /**
       * Creates operation to create issuance request
       * @param {object} opts
       * @param {string} opts.asset - asset to be issued
       * @param {string} opts.amount - amount to be issued
       * @param {string} opts.receiver - balance ID of the receiver
       * @param {string} opts.reference - Reference of the request
       * @param {object} opts.externalDetails - External details needed for PSIM to process withdraw operation
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.CreateIssuanceRequestOp}
       */
    value: function createIssuanceRequest(opts) {
      var attrs = {};

      if (!_base_operation.BaseOperation.isValidAsset(opts.asset)) {
        throw new Error('opts.asset is invalid');
      }

      attrs.asset = opts.asset;

      if (!_base_operation.BaseOperation.isValidAmount(opts.amount)) {
        throw new Error('opts.amount is invalid');
      }

      attrs.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);

      if (!_keypair.Keypair.isValidBalanceKey(opts.receiver)) {
        throw new Error('receiver is invalid');
      }

      attrs.receiver = _keypair.Keypair.fromBalanceId(opts.receiver).xdrBalanceId();

      if (!_base_operation.BaseOperation.isValidString(opts.reference, 1, 64)) {
        throw new Error('opts.reference is invalid');
      }

      if ((0, _isUndefined.default)(opts.externalDetails)) {
        throw new Error('externalDetails is invalid');
      }

      attrs.externalDetails = (0, _stringify.default)(opts.externalDetails);
      var fee = {
        fixed: '0',
        percent: '0'
      };
      attrs.fee = _base_operation.BaseOperation.feeToXdr(fee);
      attrs.ext = new _xdr_generated.default.IssuanceRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var request = new _xdr_generated.default.IssuanceRequest(attrs);
      var issuanceRequestOp = new _xdr_generated.default.CreateIssuanceRequestOp({
        request: request,
        reference: opts.reference,
        externalDetails: request.externalDetails(),
        ext: new _xdr_generated.default.CreateIssuanceRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createIssuanceRequest(issuanceRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createIssuanceRequestOpToObject",
    value: function createIssuanceRequestOpToObject(result, attrs) {
      result.reference = attrs.reference().toString();
      var request = attrs.request();
      result.asset = request.asset().toString();
      result.amount = _base_operation.BaseOperation._fromXDRAmount(request.amount());
      result.receiver = _base_operation.BaseOperation.balanceIdtoString(request.receiver());
      result.externalDetails = JSON.parse(request.externalDetails());
    }
  }]);
  return CreateIssuanceRequestBuilder;
}();

exports.CreateIssuanceRequestBuilder = CreateIssuanceRequestBuilder;