"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ManageLimitsBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _jsXdr = require("js-xdr");

var ManageLimitsBuilder =
/*#__PURE__*/
function () {
  function ManageLimitsBuilder() {
    (0, _classCallCheck2.default)(this, ManageLimitsBuilder);
  }

  (0, _createClass2.default)(ManageLimitsBuilder, null, [{
    key: "createLimits",

    /**
       * Create limits for account or account type
       * @param {object} opts
       * @param {string} opts.accountID - account to create limits for
       * @param {string} opts.accountRole - account role to create limits for
       * @param {string} opts.statsOpType - operation type of stats
       * @param {string} opts.assetCode - asset code of limits
       * @param {boolean} opts.isConvertNeeded - if true - can use another assets for stats
       * @param {string} opts.dailyOut - limit per day
       * @param {string} opts.weeklyOut - limit per week
       * @param {string} opts.monthlyOut - limit per month
       * @param {string} opts.annualOut - limit per year
       * @param {string} [opts.source] - The source account for the limits creation. Defaults to the transaction's source account.
       * @returns {xdr.ManageLimitsOp}
       */
    value: function createLimits(opts) {
      if (!(0, _isUndefined.default)(opts.accountID) && !(0, _isUndefined.default)(opts.accountType)) {
        throw new Error('opts.accountID and opts.accountType cannot be set for same limits');
      }

      var rawLimitsCreateDetails = {};

      if (!(0, _isUndefined.default)(opts.accountID)) {
        if (!_keypair.Keypair.isValidPublicKey(opts.accountID)) {
          throw new Error('opts.accountID is invalid');
        }

        rawLimitsCreateDetails.accountId = _keypair.Keypair.fromAccountId(opts.accountID).xdrAccountId();
      }

      if (!(0, _isUndefined.default)(opts.accountRole)) {
        rawLimitsCreateDetails.accountRole = _jsXdr.UnsignedHyper.fromString(opts.accountRole);
      }

      if ((0, _isUndefined.default)(opts.statsOpType)) {
        throw new Error('opts.statsOpType cannot be empty');
      }

      rawLimitsCreateDetails.statsOpType = _base_operation.BaseOperation._statsOpTypeFromNumber(opts.statsOpType);

      if ((0, _isUndefined.default)(opts.assetCode) || !_base_operation.BaseOperation.isValidAsset(opts.assetCode)) {
        throw new Error('opts.assetCode is invalid');
      }

      rawLimitsCreateDetails.assetCode = opts.assetCode;

      if ((0, _isUndefined.default)(opts.isConvertNeeded)) {
        throw new Error('opts.isConvertNeeded cannot be empty');
      }

      rawLimitsCreateDetails.isConvertNeeded = opts.isConvertNeeded;
      rawLimitsCreateDetails.dailyOut = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.dailyOut);
      rawLimitsCreateDetails.weeklyOut = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.weeklyOut);
      rawLimitsCreateDetails.monthlyOut = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.monthlyOut);
      rawLimitsCreateDetails.annualOut = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.annualOut);
      rawLimitsCreateDetails.ext = new _xdr_generated.default.LimitsCreateDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var limitsCreateDetails = new _xdr_generated.default.LimitsCreateDetails(rawLimitsCreateDetails);
      var manageLimitsOp = new _xdr_generated.default.ManageLimitsOp({
        details: new _xdr_generated.default.ManageLimitsOpDetails.create(limitsCreateDetails),
        ext: new _xdr_generated.default.ManageLimitsOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.manageLimit(manageLimitsOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
    /**
       * Delete limits by given id
       * @param {object} opts
       * @param {number|string} opts.id - limits to remove id
       */

  }, {
    key: "removeLimits",
    value: function removeLimits(opts) {
      if ((0, _isUndefined.default)(opts.id)) {
        throw new Error('opts.id cannot be empty');
      }

      var manageLimitsOp = new _xdr_generated.default.ManageLimitsOp({
        details: new _xdr_generated.default.ManageLimitsOpDetails.remove(_jsXdr.UnsignedHyper.fromString(opts.id)),
        ext: new _xdr_generated.default.ManageLimitsOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.manageLimit(manageLimitsOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
  }, {
    key: "manageLimitsOpToObject",
    value: function manageLimitsOpToObject(result, attrs) {
      switch (attrs.details().switch()) {
        case _xdr_generated.default.ManageLimitsAction.create():
          {
            var details = attrs.details().limitsCreateDetails();

            if (details.accountId()) {
              result.account = _base_operation.BaseOperation.accountIdtoAddress(details.accountId());
            }

            if (details.accountRole()) {
              result.accountRole = details.accountRole().toString();
            }

            result.statsOpType = _base_operation.BaseOperation._numberFromXDR(details.statsOpType().value);
            result.assetCode = details.assetCode().toString();
            result.isConvertNeeded = details.isConvertNeeded();
            result.dailyOut = _base_operation.BaseOperation._fromXDRAmount(details.dailyOut());
            result.weeklyOut = _base_operation.BaseOperation._fromXDRAmount(details.weeklyOut());
            result.monthlyOut = _base_operation.BaseOperation._fromXDRAmount(details.monthlyOut());
            result.annualOut = _base_operation.BaseOperation._fromXDRAmount(details.annualOut());
            break;
          }

        case _xdr_generated.default.ManageLimitsAction.remove():
          {
            result.id = attrs.details().id().toString();
            break;
          }
      }
    }
  }]);
  return ManageLimitsBuilder;
}();

exports.ManageLimitsBuilder = ManageLimitsBuilder;