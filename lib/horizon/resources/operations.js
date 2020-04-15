"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Operations = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Operations.
 *
 * @class
 */
var Operations =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Operations, _ResourceGroupBase);

  function Operations() {
    (0, _classCallCheck2.default)(this, Operations);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Operations).apply(this, arguments));
  }

  (0, _createClass2.default)(Operations, [{
    key: "get",

    /**
     * Get operation by id
     * @param {number} id - Operation ID
     * @return {HorizonResponse}
     */
    value: function get(id) {
      return this._makeCallBuilderWithSignature().appendUrlSegment(id).get();
    }
    /**
     * Get operations history.
     *
     * @param {object} [query] request query.
     * @param {string} [query.account_id] - If present, the result will return only operations for specific account
     * @param {string} [query.balance_id] - If present, the result will return only operations for specific balance
     * @param {string} [query.asset] - If present, the result will return only operations for specific asset
     * @param {string} [query.tx_id] - If present, the result will return only operations from specific transaction
     * @param {string} [query.reference] - If present, the result will return only operations with specific reference
     * @param {string} [query.since] - Should be valid `RFC 3339` string. If present, the result will return only operations submitted after specific date.
     * @param {boolean} [query.completed_only] - If present, the result will return only completed operations. (true by default)
     * @param {boolean} [query.pending_only] - If present, the result will return only pending operations. (processing deposits/withdrawals etc.).
     * @param {boolean} [query.skip_canceled], -  If present, the result will not return canceled operations (true by default)
     * @param {number} [query.limit] - If present, the result page will contain only this number of records.
     * @param {string} [query.cursor] - If present, the result records will start from specific point.
     * @param {string} [query.order] - If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
     * @return {HorizonResponse}
     * Note: query_params `pending_only` and `completed_only` can't both be set
     */

  }, {
    key: "getPage",
    value: function getPage(query) {
      return this._makeCallBuilderWithSignature().get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('operations');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return Operations;
}(_resource_group_base.ResourceGroupBase);

exports.Operations = Operations;