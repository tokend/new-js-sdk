"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var _hasher = require("../util/hasher");

var ReviewRequestBuilder =
/*#__PURE__*/
function () {
  function ReviewRequestBuilder() {
    (0, _classCallCheck2.default)(this, ReviewRequestBuilder);
  }

  (0, _createClass2.default)(ReviewRequestBuilder, null, [{
    key: "reviewRequest",

    /**
       * Creates operation to review reviewable request
       * @param {object} opts
       * @param {string} opts.requestID - request ID
       * @param {string} opts.requestHash - Hash of the request to be reviewed
       * @param {number} opts.requestType - Type of the request to be reviewed (xdr.ReviewableRequestType)
       * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
       * @param {string} opts.reason - Reject reason
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.ReviewRequestOp}
       */
    value: function reviewRequest(opts) {
      var attrs = ReviewRequestBuilder._prepareAttrs(opts);

      var validRequestType = !(0, _isUndefined.default)(opts.requestType) && _xdr_generated.default.ReviewableRequestType._byValue.has(opts.requestType);

      if (!validRequestType) {
        throw new Error('opts.requestType is invalid');
      }

      var requestType = _xdr_generated.default.ReviewableRequestType._byValue.get(opts.requestType);

      attrs.requestDetails = new _xdr_generated.default.ReviewRequestOpRequestDetails(requestType);
      return ReviewRequestBuilder._createOp(opts, attrs);
    }
  }, {
    key: "_createOp",
    value: function _createOp(opts, attrs) {
      var reviewRequestOp = new _xdr_generated.default.ReviewRequestOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.reviewRequest(reviewRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "_prepareAttrs",
    value: function _prepareAttrs(opts) {
      var attrs = {};

      if ((0, _isUndefined.default)(opts.requestID) || opts.requestID === '0') {
        throw new Error('opts.requestID is invalid');
      }

      attrs.requestId = _jsXdr.UnsignedHyper.fromString(opts.requestID);
      attrs.requestHash = _hasher.Hasher.hash(opts.requestHash);

      var validAction = opts.action && _xdr_generated.default.ReviewRequestOpAction._byValue.has(opts.action);

      if (!validAction) {
        throw new Error('opts.action is invalid');
      }

      attrs.action = _xdr_generated.default.ReviewRequestOpAction._byValue.get(opts.action);

      if (!_base_operation.BaseOperation.isValidString(opts.reason, 0, 256)) {
        throw new Error('opts.reason is invalid');
      }

      attrs.reason = opts.reason;
      attrs.ext = new _xdr_generated.default.ReviewRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      return attrs;
    }
    /**
       * Creates operation to review withdraw request
       * @param {object} opts
       * @param {string} opts.requestID - request ID
       * @param {string} opts.requestHash - Hash of the request to be reviewed
       * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
       * @param {string} opts.reason - Reject reason
       * @param {string} opts.externalDetails - External System details
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.ReviewRequestOp}
       */

  }, {
    key: "reviewWithdrawRequest",
    value: function reviewWithdrawRequest(opts) {
      if ((0, _isUndefined.default)(opts.externalDetails)) {
        throw new Error('opts.externalDetails is invalid');
      }

      var attrs = ReviewRequestBuilder._prepareAttrs(opts);

      attrs.requestDetails = new _xdr_generated.default.ReviewRequestOpRequestDetails.withdraw(new _xdr_generated.default.WithdrawalDetails({
        ext: new _xdr_generated.default.WithdrawalDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion()),
        externalDetails: (0, _stringify.default)(opts.externalDetails)
      }));
      return ReviewRequestBuilder._createOp(opts, attrs);
    }
    /**
       * Creates operation to review aml alert request
       * @param {object} opts
       * @param {string} opts.requestID - request ID
       * @param {string} opts.requestHash - Hash of the request to be reviewed
       * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
       * @param {string} opts.reason - Reject reason
       * @param {string} opts.comment - Comment to review
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.ReviewRequestOp}
       */

  }, {
    key: "reviewAmlAlertRequest",
    value: function reviewAmlAlertRequest(opts) {
      if ((0, _isUndefined.default)(opts.comment)) {
        throw new Error('opts.comment is invalid');
      }

      var attrs = ReviewRequestBuilder._prepareAttrs(opts);

      attrs.requestDetails = new _xdr_generated.default.ReviewRequestOpRequestDetails.amlAlert(new _xdr_generated.default.AmlAlertDetails({
        ext: new _xdr_generated.default.AmlAlertDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion()),
        comment: opts.comment
      }));
      return ReviewRequestBuilder._createOp(opts, attrs);
    }
    /**
       * Creates operation to review two step withdraw request
       * @param {object} opts
       * @param {string} opts.requestID - request ID
       * @param {string} opts.requestHash - Hash of the request to be reviewed
       * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
       * @param {string} opts.reason - Reject reason
       * @param {string} opts.externalDetails - External System details
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.ReviewRequestOp}
       */

  }, {
    key: "reviewTwoStepWithdrawRequest",
    value: function reviewTwoStepWithdrawRequest(opts) {
      if ((0, _isUndefined.default)(opts.externalDetails)) {
        throw new Error('opts.externalDetails is invalid');
      }

      var attrs = ReviewRequestBuilder._prepareAttrs(opts);

      attrs.requestDetails = new _xdr_generated.default.ReviewRequestOpRequestDetails.twoStepWithdrawal(new _xdr_generated.default.WithdrawalDetails({
        ext: new _xdr_generated.default.WithdrawalDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion()),
        externalDetails: (0, _stringify.default)(opts.externalDetails)
      }));
      return ReviewRequestBuilder._createOp(opts, attrs);
    }
  }, {
    key: "reviewUpdateKYCRequest",
    value: function reviewUpdateKYCRequest(opts) {
      var attrs = ReviewRequestBuilder._prepareAttrs(opts);

      attrs.requestDetails = new _xdr_generated.default.ReviewRequestOpRequestDetails.updateKyc(new _xdr_generated.default.UpdateKycDetails({
        tasksToAdd: opts.tasksToAdd,
        tasksToRemove: opts.tasksToRemove,
        externalDetails: (0, _stringify.default)(opts.externalDetails),
        ext: new _xdr_generated.default.UpdateKycDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));
      return ReviewRequestBuilder._createOp(opts, attrs);
    }
  }, {
    key: "reviewRequestToObject",
    value: function reviewRequestToObject(result, attrs) {
      result.requestID = attrs.requestId().toString();
      result.requestHash = attrs.requestHash().toString('hex');
      result.requestType = attrs.requestDetails().switch().value;

      switch (attrs.requestDetails().switch()) {
        case _xdr_generated.default.ReviewableRequestType.withdraw():
          {
            result.withdrawal = {
              externalDetails: attrs.requestDetails().withdrawal().externalDetails().toString()
            };
            break;
          }

        case _xdr_generated.default.ReviewableRequestType.limitsUpdate():
          {
            result.limitsUpdate = {
              newLimits: {
                dailyOut: _base_operation.BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().dailyOut()),
                weeklyOut: _base_operation.BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().weeklyOut()),
                monthlyOut: _base_operation.BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().monthlyOut()),
                annualOut: _base_operation.BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().annualOut())
              }
            };
            break;
          }

        case _xdr_generated.default.ReviewableRequestType.twoStepWithdrawal():
          {
            result.twoStepWithdrawal = {
              externalDetails: attrs.requestDetails().twoStepWithdrawal().externalDetails().toString()
            };
            break;
          }

        case _xdr_generated.default.ReviewableRequestType.updateKyc():
          {
            result.updateKyc = {
              tasksToAdd: attrs.requestDetails().updateKyc().tasksToAdd(),
              tasksToRemove: attrs.requestDetails().updateKyc().tasksToRemove(),
              externalDetails: attrs.requestDetails().updateKyc().externalDetails().toString()
            };
            break;
          }

        case _xdr_generated.default.ReviewableRequestType.amlAlert():
          {
            result.amlAlert = {
              comment: attrs.requestDetails().amlAlertDetails().comment().toString()
            };
            break;
          }
      }

      result.action = attrs.action().value;
      result.reason = attrs.reason().toString();
    }
  }]);
  return ReviewRequestBuilder;
}();

exports.ReviewRequestBuilder = ReviewRequestBuilder;