"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.OpenSwapBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _jsXdr = require("js-xdr");

var _hasher = require("../util/hasher");

var _validators = require("../../utils/validators");

var OpenSwapBuilder =
/*#__PURE__*/
function () {
  function OpenSwapBuilder() {
    (0, _classCallCheck2.default)(this, OpenSwapBuilder);
  }

  (0, _createClass2.default)(OpenSwapBuilder, null, [{
    key: "prepareAttrs",
    value: function prepareAttrs(opts) {
      var attrs = {};

      if (!_keypair.Keypair.isValidBalanceKey(opts.sourceBalance)) {
        throw new TypeError('sourceBalance is invalid');
      }

      if (_keypair.Keypair.isValidPublicKey(opts.destination)) {
        attrs.destination = new _xdr_generated.default.OpenSwapOpDestination.account(_keypair.Keypair.fromAccountId(opts.destination).xdrAccountId());
      } else if (_keypair.Keypair.isValidBalanceKey(opts.destination)) {
        attrs.destination = new _xdr_generated.default.OpenSwapOpDestination.balance(_keypair.Keypair.fromBalanceId(opts.destination).xdrBalanceId());
      } else {
        throw new TypeError('opts.destination is invalid');
      }

      if ((0, _isUndefined.default)(opts.feeData)) {
        throw new Error('feeData argument must be defined');
      }

      try {
        OpenSwapBuilder.ensureFeeValid(opts.feeData.sourceFee);
      } catch (e) {
        throw new TypeError('sourceFee.' + e.message);
      }

      try {
        OpenSwapBuilder.ensureFeeValid(opts.feeData.destinationFee);
      } catch (e) {
        throw new TypeError('destination.' + e.message);
      }

      var sourceFee = new _xdr_generated.default.Fee({
        percent: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.percent),
        fixed: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.fixed),
        ext: new _xdr_generated.default.FeeExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var destinationFee = new _xdr_generated.default.Fee({
        percent: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.percent),
        fixed: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.fixed),
        ext: new _xdr_generated.default.FeeExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      attrs.feeData = new _xdr_generated.default.PaymentFeeData({
        sourceFee: sourceFee,
        destinationFee: destinationFee,
        sourcePaysForDest: opts.feeData.sourcePaysForDest,
        ext: new _xdr_generated.default.PaymentFeeDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      attrs.details = (0, _stringify.default)(opts.details);
      attrs.sourceBalance = _keypair.Keypair.fromBalanceId(opts.sourceBalance).xdrBalanceId();
      attrs.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);
      attrs.secretHash = _hasher.Hasher.hash(opts.secretHash);
      attrs.lockTime = _jsXdr.Hyper.fromString(opts.lockTime);
      attrs.ext = new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      return attrs;
    }
  }, {
    key: "ensureFeeValid",
    value: function ensureFeeValid(fee) {
      if (!_base_operation.BaseOperation.isValidAmount(fee.fixed, true)) {
        throw new TypeError('fixed fee must be of type String and represent a positive number');
      }

      if (!_base_operation.BaseOperation.isValidAmount(fee.percent, true)) {
        throw new TypeError('fixed fee must be of type String and represent a positive number');
      }
    }
    /**
     * Creates OpenSwap operation where destination is AccountID or BalanceID
     * @param {object} opts
     * @param {string} opts.sourceBalance
     * @param {string} opts.destination
     * @param {number|string} opts.amount
     * @param {object} opts.feeData
     * * @param {object} opts.feeData.sourceFee
     * * * @param {number|string} opts.feeData.sourceFee.percent
     * * * @param {number|string} opts.feeData.sourceFee.fixed
     * * @param {object} opts.feeData.destinationFee
     * * * @param {number|string} opts.feeData.destinationFee.percent
     * * * @param {number|string} opts.feeData.destinationFee.fixed
     * * @param {bool} opts.feeData.sourcePaysForDest
     * @param {string} opts.secretHash
     * @param {string} opts.lockTime
     * @param {object} opts.details
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.OpenSwapOp}
     */

  }, {
    key: "openSwap",
    value: function openSwap(opts) {
      (0, _validators.validateBalanceKey)({
        value: opts.sourceBalance,
        fieldName: 'opts.sourceBalance'
      });
      (0, _validators.validateCreatorDetails)({
        value: opts.details,
        fieldName: 'opts.details'
      });
      (0, _validators.validateUint64)({
        value: opts.lockTime,
        fieldName: 'opts.lockTime'
      });
      (0, _validators.validateAmount)({
        value: opts.amount,
        fieldName: 'opts.amount'
      });
      var attrs = OpenSwapBuilder.prepareAttrs(opts);
      var openSwapOp = new _xdr_generated.default.OpenSwapOp(attrs);
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.openSwap(openSwapOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
  }, {
    key: "openSwapToObject",
    value: function openSwapToObject(result, attrs) {
      result.sourceBalance = _base_operation.BaseOperation.balanceIdtoString(attrs.sourceBalance());

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
          fixed: _base_operation.BaseOperation._fromXDRAmount(attrs.feeData().sourceFee().fixed()),
          percent: _base_operation.BaseOperation._fromXDRAmount(attrs.feeData().sourceFee().percent())
        },
        destinationFee: {
          fixed: _base_operation.BaseOperation._fromXDRAmount(attrs.feeData().destinationFee().fixed()),
          percent: _base_operation.BaseOperation._fromXDRAmount(attrs.feeData().destinationFee().percent())
        },
        sourcePaysForDest: attrs.feeData().sourcePaysForDest()
      };
      result.details = JSON.parse(attrs.details());
      result.secretHash = attrs.secretHash().toString('hex');
      result.lockTime = attrs.lockTime().toString();
      return result;
    }
  }]);
  return OpenSwapBuilder;
}();

exports.OpenSwapBuilder = OpenSwapBuilder;