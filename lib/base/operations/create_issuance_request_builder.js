"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CreateIssuanceRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _validators = require("../../utils/validators");

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
     * @param {object} opts.creatorDetails - External details needed for PSIM to process withdraw operation
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CreateIssuanceRequestOp}
     */
    value: function createIssuanceRequest(opts) {
      (0, _validators.validateAssetCode)({
        value: opts.asset,
        fieldName: 'opts.asset'
      });
      (0, _validators.validateAmount)({
        value: opts.amount,
        fieldName: 'opts.amount'
      });
      (0, _validators.validateBalanceKey)({
        value: opts.receiver,
        fieldName: 'opts.receiver'
      });
      (0, _validators.validateString)({
        value: opts.reference,
        fieldName: 'opts.reference',
        minLength: 1,
        maxLength: 64
      });
      (0, _validators.validateCreatorDetails)({
        value: opts.creatorDetails,
        fieldName: 'opts.creatorDetails'
      });
      var attrs = {
        asset: opts.asset,
        amount: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount),
        receiver: _keypair.Keypair.fromBalanceId(opts.receiver).xdrBalanceId(),
        creatorDetails: (0, _stringify.default)(opts.creatorDetails),
        fee: _base_operation.BaseOperation.feeToXdr({
          fixed: '0',
          percent: '0'
        }),
        ext: new _xdr_generated.default.IssuanceRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      var issuanceRequestOp = new _xdr_generated.default.CreateIssuanceRequestOp({
        request: new _xdr_generated.default.IssuanceRequest(attrs),
        reference: opts.reference,
        ext: new _xdr_generated.default.CreateIssuanceRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {
        body: _xdr_generated.default.OperationBody.createIssuanceRequest(issuanceRequestOp)
      };

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
      result.creatorDetails = JSON.parse(request.creatorDetails());
    }
  }]);
  return CreateIssuanceRequestBuilder;
}();

exports.CreateIssuanceRequestBuilder = CreateIssuanceRequestBuilder;