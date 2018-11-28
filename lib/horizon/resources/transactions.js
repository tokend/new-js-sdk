"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transactions = exports.SUBMIT_TRANSACTION_TIMEOUT = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

var _base = require("../../base");

var SUBMIT_TRANSACTION_TIMEOUT = 60 * 10000;
/**
 * Transactions.
 *
 * @class
 */

exports.SUBMIT_TRANSACTION_TIMEOUT = SUBMIT_TRANSACTION_TIMEOUT;

var Transactions =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Transactions, _ResourceGroupBase);

  function Transactions() {
    (0, _classCallCheck2.default)(this, Transactions);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Transactions).apply(this, arguments));
  }

  (0, _createClass2.default)(Transactions, [{
    key: "submitOperations",

    /**
     * Submits a transaction from a group of operations
     *
     * @param {xdr.Operation} operations - list of operations to submit
     * @returns {HorizonResponse}
     */
    value: function submitOperations() {
      var wallet = this._sdk.wallet;

      for (var _len = arguments.length, operations = new Array(_len), _key = 0; _key < _len; _key++) {
        operations[_key] = arguments[_key];
      }

      return this.submit(new _base.TransactionBuilder(wallet.accountId).addOperations(operations).addSigner(wallet.keypair).build());
    }
    /**
     * Submit a transaction.
     *
     * @param {Transaction} transaction A transaction to be submitted.
     * @return {HorizonResponse} Response.
     */

  }, {
    key: "submit",
    value: function submit(transaction) {
      var tx = transaction.toEnvelope().toXDR().toString('base64');
      return this._makeCallBuilder().withTimeout(SUBMIT_TRANSACTION_TIMEOUT).post({
        tx: tx
      });
    }
    /**
     * Get transaction by ID.
     *
     * @param {number} id - Transaction ID.
     * @return {HorizonResponse}
     */

  }, {
    key: "get",
    value: function get(id) {
      return this._makeCallBuilderWithSignature().appendUrlSegment(id).get();
    }
    /**
     * Get the page of transactions.
     *
     * @param {object} [query] request query.
     * @param {string} [query.account_id] - If present, the result will contain only transactions that modified specific account
     * @param {number} [query.ledger_id] - If present, the result will contain only transaction from specific ledger
     * @param {number} [query.limit] If present, the result page will contain only this number of records.
     * @param {string} [query.cursor] If present, the result records will start from specific point.
     * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
     *
     * @return {HorizonResponse}
     */

  }, {
    key: "getPage",
    value: function getPage(query) {
      return this._makeCallBuilderWithSignature().get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('transactions');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return Transactions;
}(_resource_group_base.ResourceGroupBase);

exports.Transactions = Transactions;