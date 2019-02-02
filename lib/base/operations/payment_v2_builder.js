"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentV2Builder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var PaymentV2Builder =
/*#__PURE__*/
function () {
  function PaymentV2Builder() {
    (0, _classCallCheck2.default)(this, PaymentV2Builder);
  }

  (0, _createClass2.default)(PaymentV2Builder, null, [{
    key: "prepareAttrs",
    value: function prepareAttrs(opts) {
      var attrs = {};

      if (!_keypair.Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
        throw new TypeError('sourceBalanceId is invalid');
      }

      if (_keypair.Keypair.isValidPublicKey(opts.destination)) {
        attrs.destination = new _xdr_generated.default.PaymentOpV2Destination.account(_keypair.Keypair.fromAccountId(opts.destination).xdrAccountId());
      } else if (_keypair.Keypair.isValidBalanceKey(opts.destination)) {
        attrs.destination = new _xdr_generated.default.PaymentOpV2Destination.balance(_keypair.Keypair.fromBalanceId(opts.destination).xdrBalanceId());
      } else {
        throw new TypeError('opts.destination is invalid');
      }

      if (!_base_operation.BaseOperation.isValidAmount(opts.amount)) {
        throw new TypeError('amount argument must be of type String and represent a positive number');
      }

      if ((0, _isUndefined.default)(opts.feeData)) {
        throw new Error('feeData argument must be defined');
      }

      if (!_base_operation.BaseOperation.isValidAsset(opts.feeData.sourceFee.feeAsset)) {
        throw new TypeError('Source fee asset is invalid');
      }

      if (!_base_operation.BaseOperation.isValidAsset(opts.feeData.destinationFee.feeAsset)) {
        throw new TypeError('Destination fee asset is invalid');
      }

      var sourceFee = new _xdr_generated.default.FeeDataV2({
        maxPaymentFee: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.maxPaymentFee),
        fixedFee: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.fixedFee),
        feeAsset: opts.feeData.sourceFee.feeAsset,
        ext: new _xdr_generated.default.FeeDataV2Ext(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var destinationFee = new _xdr_generated.default.FeeDataV2({
        maxPaymentFee: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.maxPaymentFee),
        fixedFee: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.fixedFee),
        feeAsset: opts.feeData.destinationFee.feeAsset,
        ext: new _xdr_generated.default.FeeDataV2Ext(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      attrs.feeData = new _xdr_generated.default.PaymentFeeDataV2({
        sourceFee: sourceFee,
        destinationFee: destinationFee,
        sourcePaysForDest: opts.feeData.sourcePaysForDest,
        ext: new _xdr_generated.default.PaymentFeeDataV2Ext(_xdr_generated.default.LedgerVersion.emptyVersion())
      });

      if (!_base_operation.BaseOperation.isValidSubject(opts.subject)) {
        throw new Error('subject argument must be of type String 0-256 long');
      }

      if ((0, _isUndefined.default)(opts.reference)) {
        opts.reference = '';
      }

      attrs.sourceBalanceId = _keypair.Keypair.fromBalanceId(opts.sourceBalanceId).xdrBalanceId();
      attrs.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);
      attrs.subject = opts.subject;
      attrs.reference = opts.reference;
      attrs.ext = new _xdr_generated.default.PaymentOpV2Ext(_xdr_generated.default.LedgerVersion.emptyVersion());
      return attrs;
    }
    /**
     * Creates PaymentV2 operation where destination is AccountID or BalanceID
     * @param {object} opts
     * @param {string} opts.sourceBalanceId
     * @param {string} opts.destination
     * @param {number|string} opts.amount
     * @param {object} opts.feeData
     * * @param {object} opts.feeData.sourceFee
     * * * @param {number|string} opts.feeData.sourceFee.maxPaymentFee
     * * * @param {number|string} opts.feeData.sourceFee.fixedFee
     * * * @param {string} opts.feeData.sourceFee.feeAsset
     * * @param {object} opts.feeData.destinationFee
     * * * @param {number|string} opts.feeData.destinationFee.maxPaymentFee
     * * * @param {number|string} opts.feeData.destinationFee.fixedFee
     * * * @param {string} opts.feeData.destinationFee.feeAsset
     * * @param {bool} opts.feeData.sourcePaysForDest
     * @param {string} opts.subject
     * @param {string} opts.reference
     * @returns {xdr.PaymentOpV2}
     */

  }, {
    key: "paymentV2",
    value: function paymentV2(opts) {
      var attrs = PaymentV2Builder.prepareAttrs(opts);
      var paymentV2 = new _xdr_generated.default.PaymentOpV2(attrs);
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.paymentV2(paymentV2);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
  }, {
    key: "paymentV2ToObject",
    value: function paymentV2ToObject(result, attrs) {
      result.sourceBalanceId = _base_operation.BaseOperation.balanceIdtoString(attrs.sourceBalanceId());

      switch (attrs.destination().switch()) {
        case _xdr_generated.default.PaymentDestinationType.account():
          {
            result.destination = _base_operation.BaseOperation.accountIdtoAddress(attrs.destination().accountId());
            break;
          }

        case _xdr_generated.default.PaymentDestinationType.balance():
          {
            result.destination = _base_operation.BaseOperation.balanceIdtoString(attrs.destination().balanceId());
            break;
          }
      }

      result.amount = _base_operation.BaseOperation._fromXDRAmount(attrs.amount());
      result.feeData = {
        sourceFee: {
          maxPaymentFee: _base_operation.BaseOperation._fromXDRAmount(attrs.feeData().sourceFee().maxPaymentFee()),
          fixedFee: _base_operation.BaseOperation._fromXDRAmount(attrs.feeData().sourceFee().fixedFee()),
          feeAsset: attrs.feeData().sourceFee().feeAsset().toString()
        },
        destinationFee: {
          maxPaymentFee: _base_operation.BaseOperation._fromXDRAmount(attrs.feeData().destinationFee().maxPaymentFee()),
          fixedFee: _base_operation.BaseOperation._fromXDRAmount(attrs.feeData().destinationFee().fixedFee()),
          feeAsset: attrs.feeData().destinationFee().feeAsset().toString()
        },
        sourcePaysForDest: attrs.feeData().sourcePaysForDest()
      };
      result.subject = attrs.subject().toString();
      result.reference = attrs.reference().toString();
    }
  }]);
  return PaymentV2Builder;
}();

exports.PaymentV2Builder = PaymentV2Builder;