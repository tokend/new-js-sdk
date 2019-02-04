"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Balances = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Balances.
 *
 * @class
 */
var Balances =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Balances, _ResourceGroupBase);

  function Balances() {
    (0, _classCallCheck2.default)(this, Balances);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Balances).apply(this, arguments));
  }

  (0, _createClass2.default)(Balances, [{
    key: "getPage",

    /**
     * Get balances.
     *
     * @param {object} [query] Request options.
     * @param {Number} [query.limit] Page limit.
     * @param {string} [query.cursor] Page cursor.
     * @param {string} [query.order] Sorting order.
     * @param {string} [query.asset] Filter by asset code.
     * @param {string} [query.account] Filter by balance owner.
     *
     * @return {HorizonResponse} Collection of balances.
     */
    value: function getPage(query) {
      return this._makeCallBuilder().get(query);
    }
    /**
     * Get balance asset.
     *
     * @param {string} balanceId Balance ID.
     * @return {HorizonResponse}
     */

  }, {
    key: "getAsset",
    value: function getAsset(balanceId) {
      return this._makeCallBuilder().appendUrlSegment([balanceId, 'asset']).get();
    }
    /**
     * Get balance owner account.
     *
     * @param {string} balanceId Balance ID.
     * @return {HorizonResponse}
     */

  }, {
    key: "getAccount",
    value: function getAccount(balanceId) {
      return this._makeCallBuilder().appendUrlSegment([balanceId, 'account']).get();
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('balances').withSignature();
    }
  }]);
  return Balances;
}(_resource_group_base.ResourceGroupBase);

exports.Balances = Balances;