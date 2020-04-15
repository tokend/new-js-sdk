"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Fees = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Fees.
 *
 * @class
 */
var Fees =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Fees, _ResourceGroupBase);

  function Fees() {
    (0, _classCallCheck2.default)(this, Fees);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Fees).apply(this, arguments));
  }

  (0, _createClass2.default)(Fees, [{
    key: "get",

    /**
     * Get all fees for specific type
     *
     * @param {number} feeType
     * @param {object} [query] Request query
     * @param {string} [query.asset] For specific asset
     * @param {number} [query.subtype] For specific subtype
     * @param {string} [query.account] For specific account
     * @param {string} [query.amount] For specific amount
     *
     * @return {HorizonResponse}
     */
    value: function get(feeType) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._makeCallBuilder().appendUrlSegment(feeType).get(query);
    }
    /**
     * Get all fees existing in the system
     *
     * @param {object} [query] Request query
     * @param [query.account_id]
     * @param [query.account_type]
     * @return {HorizonResponse}
     */

  }, {
    key: "getAll",
    value: function getAll() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._makeCallBuilder().get(query);
    }
    /**
     * Get all fees existing in the system excluding specific account/account_type fees and default generated entries
     *
     * @param {object} [query] Request query
     * @param [query.account_id]
     * @param [query.account_type]
     * @return {HorizonResponse}
     */

  }, {
    key: "getOverview",
    value: function getOverview() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._server._makeCallBuilder().appendUrlSegment('fees_overview').get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('fees');
    }
  }]);
  return Fees;
}(_resource_group_base.ResourceGroupBase);

exports.Fees = Fees;