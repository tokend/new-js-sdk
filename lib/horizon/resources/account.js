"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Account = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Account.
 *
 * In short, Accounts are the central data structure in TokenD.
 *
 * For detailed information, see {@link https://tokend.gitbook.io/knowledge-base/technical-details/accounts}
 * @class
 */
var Account =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Account, _ResourceGroupBase);

  function Account() {
    (0, _classCallCheck2.default)(this, Account);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Account).apply(this, arguments));
  }

  (0, _createClass2.default)(Account, [{
    key: "get",

    /**
     * Get account by ID.
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @return {HorizonResponse}
     */
    value: function get(accountId) {
      return this._makeCallBuilderWithSignature(accountId).get();
    }
    /**
     * Gets account kyc (returns only blob ID, for how to get full KYC data, see {@link Blobs})
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @return {HorizonResponse}
     */

  }, {
    key: "getAccountKyc",
    value: function getAccountKyc(accountId) {
      return this._makeCallBuilder(accountId).appendUrlSegment('account_kyc').get();
    }
    /**
     * Get account balances.
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @return {HorizonResponse}
     */

  }, {
    key: "getBalances",
    value: function getBalances(accountId) {
      return this._makeCallBuilderWithSignature(accountId).appendUrlSegment('balances').get();
    }
    /**
     * Get balances details, which includes the list of owned tokens and opened sales.
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @return {HorizonResponse}
     */

  }, {
    key: "getDetails",
    value: function getDetails(accountId) {
      return this._makeCallBuilderWithSignature(accountId).appendUrlSegment(['balances', 'details']).get();
    }
    /**
     * Get account limits
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @returns {HorizonResponse}
     */

  }, {
    key: "getLimits",
    value: function getLimits(accountId) {
      return this._makeCallBuilder(accountId).appendUrlSegment('limits').get();
    }
    /**
     * Get user open offers
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @param {object} [query] Request options.
     * @param {string} [query.base_asset] For specific base asset
     * @param {string} [query.quote_asset] - For specific quote asset
     * @param {boolean} [query.is_buy] - Defines whether offer is about buying base from current account
     * @param {number} [query.offer_id] - For specific offer
     * @param {number} [query.order_book_id] - For specific order book (0 - for secondary market, sale ID - for sale offers)
     * @param {boolean} [query.only_primary] - Do not include secondary market offers
     * @return {HorizonResponse}
     *
     * Note: query params `base_asset` and `quote_asset` should both be set or both not set
     */

  }, {
    key: "getOffers",
    value: function getOffers(accountId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._makeCallBuilderWithSignature(accountId).appendUrlSegment('offers').get(query);
    }
    /**
     * Get account operations history
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @param {object} [query] request query.
     * @param {number} [query.limit] Page limit.
     * @param {string} [query.cursor] Page cursor.
     * @param {string} [query.order] Sorting order (asc/desc)
     * @param {string} [query.balance_id] - For fetching operations only for specified balance ID
     * @param {string} [query.asset] - For fetching operations only for specified asset
     * @param {string} [query.tx_id] - For specific transaction ID
     * @param {string} [query.reference] - For specific reference
     * @param {string} [query.reference] Payment reference.
     * @param {string} [query.since] Date interval value.
     * @param {boolean} [query.completed_only] Only completed payments will be returned. (true by default)
     * @param {boolean} [query.pending_only] Only pending payments will be returned (processing deposits/withdrawals etc.).
     * @param {boolean} [query.skip_canceled], Skips canceled operations (true by default)
     * @param {number} [query.operation_type] - For specific type of operation. Should be {xdr.OperationType} value
     * @return {HorizonResponse}
     *
     * Note: query_params `pending_only` and `completed_only` can't both be set
     *
     */

  }, {
    key: "getOperations",
    value: function getOperations(accountId, query) {
      return this._makeCallBuilderWithSignature(accountId).appendUrlSegment('operations').get(query);
    }
    /**
     * Get account payments history. Payments are operations {@link getOperations} that modify account's balance
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @param {object} [query] request query.
     * @param {number} [query.limit] Page limit.
     * @param {string} [query.cursor] Page cursor.
     * @param {string} [query.order] Sorting order (asc/desc)
     * @param {string} [query.balance_id] - For fetching operations only for specified balance ID
     * @param {string} [query.asset] - For fetching operations only for specified asset
     * @param {string} [query.tx_id] - For specific transaction ID
     * @param {string} [query.reference] - For specific reference
     * @param {string} [query.reference] Payment reference.
     * @param {string} [query.since] Date interval value.
     * @param {boolean} [query.completed_only] Only completed payments will be returned. (true by default)
     * @param {boolean} [query.pending_only] Only pending payments will be returned (processing deposits/withdrawals etc.).
     * @param {boolean} [query.skip_canceled], Skips canceled operations (true by default)
     *
     * @return {HorizonResponse}
     * Note: query_params `pending_only` and `completed_only` can't both be set
     *
     */

  }, {
    key: "getPayments",
    value: function getPayments(accountId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._makeCallBuilderWithSignature(accountId).appendUrlSegment('payments').get(query);
    }
    /**
     * Get account references
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @return {HorizonResponse}
     */

  }, {
    key: "getReferences",
    value: function getReferences(accountId) {
      return this._makeCallBuilderWithSignature(accountId).appendUrlSegment('references').get();
    }
    /**
     * Get account signers.
     *
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @return {HorizonResponse}
     */

  }, {
    key: "getSigners",
    value: function getSigners(accountId) {
      return this._makeCallBuilder(accountId).appendUrlSegment('signers').get();
    }
    /**
     * Get account signers.
     *
     * @param {string} signerId Signer ID.
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     * @return {HorizonResponse}
     */

  }, {
    key: "getSigner",
    value: function getSigner(signerId, accountId) {
      return this._makeCallBuilder(accountId).appendUrlSegment(['signers', signerId]).get();
    }
    /**
     * Get balances.
     *
     * @param {object} [query] Request options.
     * @param {Number} [query.since] Start of the timespan.
     * @param {Number} [query.to] End of the timespan.
     * @param {string} [accountId] Account ID. Uses account ID of the attached {@link Wallet} by default.
     *
     * @return {HorizonResponse}
     */

  }, {
    key: "getSummary",
    value: function getSummary(query, accountId) {
      return this._makeCallBuilderWithSignature(accountId).appendUrlSegment('summary').get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder(accountId) {
      return this._server._makeCallBuilder().appendUrlSegment('accounts').appendAccountId(accountId);
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature(accountId) {
      return this._makeCallBuilder(accountId).withSignature();
    }
  }]);
  return Account;
}(_resource_group_base.ResourceGroupBase);

exports.Account = Account;