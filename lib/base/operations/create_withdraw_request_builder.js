"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateWithdrawRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var CreateWithdrawRequestBuilder =
/*#__PURE__*/
function () {
  function CreateWithdrawRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateWithdrawRequestBuilder);
  }

  (0, _createClass2.default)(CreateWithdrawRequestBuilder, null, [{
    key: "createWithdrawWithAutoConversion",

    /**
     * Creates operation to create withdraw request
     * @param {object} opts
     * @param {string} opts.balance - Balance ID from which withdraw will be perfromed
     * @param {string} opts.amount - amount to be withdrawn
     * @param {object} opts.fee - fee to be charged
     * @param {string} opts.fee.fixed - fixed fee to be charged
     * @param {string} opts.fee.percent - percent fee to be charged
     * @param {object} opts.externalDetails - External details needed for PSIM to process withdraw operation
     * @param {number|string} opts.allTasks - Bitmask of all tasks which must be completed for the request approval
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CreateWithdrawalRequestOp}
     */
    value: function createWithdrawWithAutoConversion(opts) {
      var attrs = {};

      if (!_keypair.Keypair.isValidBalanceKey(opts.balance)) {
        throw new Error('balance is invalid');
      }

      attrs.balance = _keypair.Keypair.fromBalanceId(opts.balance).xdrBalanceId();

      if (!_base_operation.BaseOperation.isValidAmount(opts.amount, false)) {
        throw new Error('opts.amount is invalid');
      }

      attrs.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);
      attrs.universalAmount = _base_operation.BaseOperation._toUnsignedXDRAmount('0');

      if (!_base_operation.BaseOperation.isFeeValid(opts.fee)) {
        throw new Error('opts.fee is invalid');
      }

      attrs.fee = _base_operation.BaseOperation.feeToXdr(opts.fee);

      if ((0, _isUndefined.default)(opts.externalDetails)) {
        throw new Error('externalDetails is invalid');
      }

      attrs.externalDetails = (0, _stringify.default)(opts.externalDetails);

      if ((0, _isUndefined.default)(attrs.preConfirmationDetails)) {
        attrs.preConfirmationDetails = '';
      }

      attrs.ext = new _xdr_generated.default.WithdrawalRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());

      if ((0, _isUndefined.default)(opts.allTasks)) {
        opts.allTasks = 0;
      }

      var request = new _xdr_generated.default.WithdrawalRequest(attrs);
      var withdrawRequestOp = new _xdr_generated.default.CreateWithdrawalRequestOp({
        request: request,
        allTasks: opts.allTasks,
        ext: new _xdr_generated.default.CreateWithdrawalRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createWithdrawalRequest(withdrawRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createWithdrawalRequestOpToObject",
    value: function createWithdrawalRequestOpToObject(result, attrs) {
      var request = attrs.request();
      result.balance = _base_operation.BaseOperation.balanceIdtoString(request.balance());
      result.amount = _base_operation.BaseOperation._fromXDRAmount(request.amount());
      result.fee = {
        fixed: _base_operation.BaseOperation._fromXDRAmount(request.fee().fixed()),
        percent: _base_operation.BaseOperation._fromXDRAmount(request.fee().percent())
      };
      result.universalAmount = _base_operation.BaseOperation._fromXDRAmount(request.universalAmount());
      result.allTasks = attrs.allTasks();
      result.externalDetails = JSON.parse(request.externalDetails());
    }
  }]);
  return CreateWithdrawRequestBuilder;
}();

exports.CreateWithdrawRequestBuilder = CreateWithdrawRequestBuilder;