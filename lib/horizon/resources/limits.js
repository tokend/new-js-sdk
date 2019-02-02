"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Limits = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Limits.
 *
 * @class
 */
var Limits =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Limits, _ResourceGroupBase);

  function Limits() {
    (0, _classCallCheck2.default)(this, Limits);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Limits).apply(this, arguments));
  }

  (0, _createClass2.default)(Limits, [{
    key: "get",

    /**
     * Return specific limits rule
     *
     * @param {object} query
     * @param {string} query.asset - Asset on which limits are imposed on
     * @param [query.stats_op_type] - Stats operation type on which limits are imposed on
     * @param [query.account_id] - Account id on on which limits are imposed on
     * @param [query.account_type] - Account type on on which limits are imposed on
     *
     * @returns {HorizonResponse}
     *
     * Note: It's not allowed to specify both `account_id` and `account_type`
     */
    value: function get(query) {
      return this._makeCallBuilder().get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('limits');
    }
  }]);
  return Limits;
}(_resource_group_base.ResourceGroupBase);

exports.Limits = Limits;