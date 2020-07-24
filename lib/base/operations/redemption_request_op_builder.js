"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.RedemptionRequestBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var RedemptionRequestBuilder =
/*#__PURE__*/
function () {
  function RedemptionRequestBuilder() {
    (0, _classCallCheck2.default)(this, RedemptionRequestBuilder);
  }

  (0, _createClass2.default)(RedemptionRequestBuilder, null, [{
    key: "redemptionRequest",
    value: function redemptionRequest(opts) {
      if (!_keypair.Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
        throw new TypeError('sourceBalanceId is invalid');
      }

      if (!_keypair.Keypair.isValidPublicKey(opts.destination)) {
        throw new TypeError('destination accountID is invalid');
      }

      if (!_base_operation.BaseOperation.isValidAmount(opts.amount)) {
        throw new TypeError('amount argument must be of type String and represent a positive number');
      }

      if ((0, _isUndefined.default)(opts.reference)) {
        opts.reference = '';
      }

      var attrs = {
        ext: new _xdr_generated.default.CreateRedemptionRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion()),
        reference: opts.reference,
        allTasks: opts.allTasks,
        redemptionRequest: new _xdr_generated.default.RedemptionRequest({
          sourceBalanceId: _keypair.Keypair.fromBalanceId(opts.sourceBalanceId).xdrBalanceId(),
          destination: _keypair.Keypair.fromAccountId(opts.destination).xdrAccountId(),
          amount: _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount),
          creatorDetails: opts.creatorDetails,
          reference: opts.reference,
          ext: new _xdr_generated.default.RedemptionRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        })
      };
      var createRedemptionRequestOp = new _xdr_generated.default.CreateRedemptionRequestOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createRedemptionRequest(createRedemptionRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "redemptionRequestToObject",
    value: function redemptionRequestToObject(result, attrs) {
      var request = attrs.redemptionRequest();
      result.sourceBalanceId = _base_operation.BaseOperation.balanceIdtoString(request.sourceBalanceId());
      result.destination = _base_operation.BaseOperation.accountIdtoAddress(request.destination());
      result.amount = _base_operation.BaseOperation._fromXDRAmount(request.amount());
      result.creatorDetails = JSON.parse(request.creatorDetails());
      result.allTasks = attrs.allTasks();
    }
  }]);
  return RedemptionRequestBuilder;
}();

exports.RedemptionRequestBuilder = RedemptionRequestBuilder;