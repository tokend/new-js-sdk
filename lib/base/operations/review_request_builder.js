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

var _payment_v2_builder = require("./payment_v2_builder");

var _keypair = require("../keypair");

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
     * @param {object} opts.reviewDetails - Review details for reviewable request (xdr.ReviewDetails)
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @param {number|string} opts.tasksToAdd - new tasks for reviewable request to be accomplished before fulfill
     * @param {number|string} opts.tasksToRemove - tasks, which were done by the reviewer and should be removed
     * @param {string} opts.externalDetails - the reviewer's commentary
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
      attrs.ext = new _xdr_generated.default.ReviewRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
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

      if ((0, _isUndefined.default)(opts.reviewDetails)) {
        opts.reviewDetails = {};
      }

      if ((0, _isUndefined.default)(opts.reviewDetails.tasksToAdd)) {
        opts.reviewDetails.tasksToAdd = 0;
      }

      if ((0, _isUndefined.default)(opts.reviewDetails.tasksToRemove)) {
        opts.reviewDetails.tasksToRemove = 0;
      }

      if ((0, _isUndefined.default)(opts.reviewDetails.externalDetails)) {
        opts.reviewDetails.externalDetails = '';
      }

      attrs.reviewDetails = new _xdr_generated.default.ReviewDetails({
        tasksToAdd: opts.reviewDetails.tasksToAdd,
        tasksToRemove: opts.reviewDetails.tasksToRemove,
        externalDetails: opts.reviewDetails.externalDetails,
        ext: new _xdr_generated.default.ReviewDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
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
     * @param {number|string} opts.tasksToAdd - new tasks for reviewable request to be accomplished before fulfill
     * @param {number|string} opts.tasksToRemove - tasks, which were done by the reviewer and should be removed
     * @returns {xdr.ReviewRequestOp}
     */

  }, {
    key: "reviewWithdrawRequest",
    value: function reviewWithdrawRequest(opts) {
      if ((0, _isUndefined.default)(opts.reviewDetails.externalDetails)) {
        throw new Error('opts.reviewDetails.externalDetails is invalid');
      }

      var attrs = ReviewRequestBuilder._prepareAttrs(opts);

      var d = _xdr_generated.default.ReviewRequestOpRequestDetails.withdraw();

      d.set('withdraw', new _xdr_generated.default.WithdrawalDetails({
        externalDetails: opts.requestDetails,
        ext: new _xdr_generated.default.WithdrawalDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));
      attrs.requestDetails = d;
      attrs.reviewDetails = new _xdr_generated.default.ReviewDetails({
        tasksToAdd: opts.reviewDetails.tasksToAdd,
        tasksToRemove: opts.reviewDetails.tasksToRemove,
        externalDetails: (0, _stringify.default)(opts.reviewDetails.externalDetails),
        ext: new _xdr_generated.default.ReviewDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      attrs.ext = new _xdr_generated.default.ReviewRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
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
      attrs.ext = new _xdr_generated.default.ReviewRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      return ReviewRequestBuilder._createOp(opts, attrs);
    }
  }, {
    key: "reviewLimitsUpdateRequest",
    value: function reviewLimitsUpdateRequest(opts) {
      if ((0, _isUndefined.default)(opts.newLimits)) {
        throw new Error('opts.newLimits is invalid');
      }

      var attrs = ReviewRequestBuilder._prepareAttrs(opts);

      var rawLimitsV2Entry = {};

      if ((0, _isUndefined.default)(opts.newLimits.id)) {
        throw new Error('opts.newLimits.id is not defined');
      }

      rawLimitsV2Entry.id = _jsXdr.UnsignedHyper.fromString(opts.newLimits.id);

      if (!(0, _isUndefined.default)(opts.newLimits.accountID) && !(0, _isUndefined.default)(opts.newLimits.accountType)) {
        throw new Error('opts.newLimits.accountID and opts.newLimits.accountType cannot be set for same limits');
      }

      if (!(0, _isUndefined.default)(opts.newLimits.accountID)) {
        if (!_keypair.Keypair.isValidPublicKey(opts.newLimits.accountID)) {
          throw new Error('opts.newLimits.accountID is invalid');
        }

        rawLimitsV2Entry.accountId = _keypair.Keypair.fromAccountId(opts.newLimits.accountID).xdrAccountId();
      }

      if (!(0, _isUndefined.default)(opts.newLimits.accountType)) {
        rawLimitsV2Entry.accountType = _base_operation.BaseOperation._accountTypeFromNumber(opts.newLimits.accountType);
      }

      if ((0, _isUndefined.default)(opts.newLimits.statsOpType)) {
        throw new Error('opts.newLimits.statsOpType is not defined');
      }

      rawLimitsV2Entry.statsOpType = _base_operation.BaseOperation._statsOpTypeFromNumber(opts.newLimits.statsOpType);

      if ((0, _isUndefined.default)(opts.newLimits.assetCode) || !_base_operation.BaseOperation.isValidAsset(opts.newLimits.assetCode)) {
        throw new Error('opts.newLimits.assetCode is invalid');
      }

      rawLimitsV2Entry.assetCode = opts.newLimits.assetCode;

      if ((0, _isUndefined.default)(opts.newLimits.isConvertNeeded)) {
        throw new Error('opts.newLimits.isConvertNeeded is not defined');
      }

      rawLimitsV2Entry.isConvertNeeded = opts.newLimits.isConvertNeeded;
      rawLimitsV2Entry.dailyOut = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.newLimits.dailyOut);
      rawLimitsV2Entry.weeklyOut = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.newLimits.weeklyOut);
      rawLimitsV2Entry.monthlyOut = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.newLimits.monthlyOut);
      rawLimitsV2Entry.annualOut = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.newLimits.annualOut);
      rawLimitsV2Entry.ext = new _xdr_generated.default.LimitsV2EntryExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      attrs.requestDetails = new _xdr_generated.default.ReviewRequestOpRequestDetails.limitsUpdate(new _xdr_generated.default.LimitsUpdateDetails({
        newLimitsV2: new _xdr_generated.default.LimitsV2Entry(rawLimitsV2Entry),
        ext: new _xdr_generated.default.LimitsUpdateDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));
      return ReviewRequestBuilder._createOp(opts, attrs);
    }
    /**
     * Creates operation to review invoice request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} opts.requestHash - Hash of the request to be reviewed
     * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
     * @param {string} opts.reason - Reject reason
     * @param {object} opts.billPayDetails - invoice payment details (xdr.PaymentOpV2)
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ReviewRequestOp}
     */

  }, {
    key: "reviewInvoiceRequest",
    value: function reviewInvoiceRequest(opts) {
      var attrs = ReviewRequestBuilder._prepareAttrs(opts);

      var billPayDetails = _payment_v2_builder.PaymentV2Builder.prepareAttrs(opts.billPayDetails);

      attrs.requestDetails = new _xdr_generated.default.ReviewRequestOpRequestDetails.invoice(new _xdr_generated.default.BillPayDetails({
        paymentDetails: new _xdr_generated.default.PaymentOpV2(billPayDetails),
        ext: new _xdr_generated.default.BillPayDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));
      return ReviewRequestBuilder._createOp(opts, attrs);
    }
    /**
     * Creates operation to review contract request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} opts.requestHash - Hash of the request to be reviewed
     * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
     * @param {string} opts.reason - Reject reason
     * @param {object} opts.details - customer details about contract
     * @param {string} [opts.source] - The source account for the review request. Defaults to the transaction's source account.
     * @returns {xdr.ReviewRequestOp}
     */

  }, {
    key: "reviewContractRequest",
    value: function reviewContractRequest(opts) {
      var attrs = ReviewRequestBuilder._prepareAttrs(opts);

      attrs.requestDetails = new _xdr_generated.default.ReviewRequestOpRequestDetails.contract(new _xdr_generated.default.ContractDetails({
        details: (0, _stringify.default)(opts.details),
        ext: new _xdr_generated.default.ContractDetailsExt(_xdr_generated.default.LedgerVersion.emptyVersion())
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
            var newLimitsV2 = attrs.requestDetails().limitsUpdate().newLimitsV2();
            result.limitsUpdate = {
              newLimits: {
                id: newLimitsV2.id().toString(),
                statsOpType: newLimitsV2.statsOpType().value,
                assetCode: newLimitsV2.assetCode().toString(),
                isConvertNeeded: newLimitsV2.isConvertNeeded(),
                dailyOut: _base_operation.BaseOperation._fromXDRAmount(newLimitsV2.dailyOut()),
                weeklyOut: _base_operation.BaseOperation._fromXDRAmount(newLimitsV2.weeklyOut()),
                monthlyOut: _base_operation.BaseOperation._fromXDRAmount(newLimitsV2.monthlyOut()),
                annualOut: _base_operation.BaseOperation._fromXDRAmount(newLimitsV2.annualOut())
              }
            };

            if (newLimitsV2.accountId()) {
              result.limitsUpdate.newLimits.accountID = _base_operation.BaseOperation.accountIdtoAddress(newLimitsV2.accountId());
            }

            if (newLimitsV2.accountType()) {
              result.limitsUpdate.newLimits.accountType = newLimitsV2.accountType().value;
            }

            break;
          }

        case _xdr_generated.default.ReviewableRequestType.amlAlert():
          {
            result.amlAlert = {
              comment: attrs.requestDetails().amlAlertDetails().comment().toString()
            };
            break;
          }
      } // let rd = attrs.reviewDetails()
      // let parsed = JSON.stringify(JSON.parse(rd))


      result.reviewDetails = {
        tasksToAdd: attrs.reviewDetails().tasksToAdd(),
        tasksToRemove: attrs.reviewDetails().tasksToRemove(),
        externalDetails: attrs.reviewDetails().externalDetails().toString('utf8')
      };
      result.action = attrs.action().value;
      result.reason = attrs.reason().toString();
    }
  }]);
  return ReviewRequestBuilder;
}();

exports.ReviewRequestBuilder = ReviewRequestBuilder;