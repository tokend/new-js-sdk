"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CreatePaymentRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _payment_builder = require("./payment_builder");

var _validators = require("../../utils/validators");

var _lodash = require("lodash");

var CreatePaymentRequestBuilder =
/*#__PURE__*/
function () {
  function CreatePaymentRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreatePaymentRequestBuilder);
  }

  (0, _createClass2.default)(CreatePaymentRequestBuilder, null, [{
    key: "createPaymentRequest",

    /**
     * Creates create payment request
     * @param {object} opts
     * @param {string} opts.sourceBalanceId
     * @param {string} opts.destination
     * @param {number|string} opts.amount
     * @param {object} opts.creatorDetails - details of the operation provided by creator
     * @param {object} opts.feeData
     * * @param {object} opts.feeData.sourceFee
     * * * @param {number|string} opts.feeData.sourceFee.percent
     * * * @param {number|string} opts.feeData.sourceFee.fixed
     * * @param {object} opts.feeData.destinationFee
     * * * @param {number|string} opts.feeData.destinationFee.percent
     * * * @param {number|string} opts.feeData.destinationFee.fixed
     * * @param {bool} opts.feeData.sourcePaysForDest
     * @param {string} opts.subject
     * @param {string} opts.reference
     * @param {number} [opts.allTasks] - Bitmask of all tasks which must be completed for the request approval
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CreatePaymentRequestOp}
     */
    value: function createPaymentRequest(opts) {
      var paymentAttrs = _payment_builder.PaymentBuilder.prepareAttrs(opts);

      if ((0, _lodash.isUndefined)(opts.creatorDetails)) {
        opts.creatorDetails = {};
      }

      (0, _validators.validateCreatorDetails)({
        value: opts.creatorDetails,
        fieldName: 'opts.creatorDetails'
      });
      var request = new _xdr_generated.default.CreatePaymentRequest({
        paymentOp: new _xdr_generated.default.PaymentOp(paymentAttrs),
        ext: new _xdr_generated.default.CreatePaymentRequestExt.movementRequestsDetail((0, _stringify.default)(opts.creatorDetails))
      });
      var createPaymentRequestOp = new _xdr_generated.default.CreatePaymentRequestOp({
        request: request,
        allTasks: opts.allTasks,
        ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.createPaymentRequest(createPaymentRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
  }, {
    key: "createPaymentRequestToObject",
    value: function createPaymentRequestToObject(result, attrs) {
      _payment_builder.PaymentBuilder.paymentToObject(result, attrs.request().paymentOp());

      result.allTasks = attrs.allTasks();

      switch (attrs.request().ext().switch()) {
        case _xdr_generated.default.LedgerVersion.emptyVersion():
          {
            break;
          }

        case _xdr_generated.default.LedgerVersion.movementRequestsDetail():
          {
            result.creatorDetails = JSON.parse(attrs.request().ext().creatorDetails());
            break;
          }

        default:
          throw new Error('Unexpected version of create payment request');
      }
    }
  }]);
  return CreatePaymentRequestBuilder;
}();

exports.CreatePaymentRequestBuilder = CreatePaymentRequestBuilder;