"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Prices = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Prices.
 *
 * @class
 */
var Prices =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Prices, _ResourceGroupBase);

  function Prices() {
    (0, _classCallCheck2.default)(this, Prices);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Prices).apply(this, arguments));
  }

  (0, _createClass2.default)(Prices, [{
    key: "getHistory",

    /**
     * Return price history for selected pair of assets. Always returns 360 points smartly
     * calculated for the specific period. Is great to use in charts
     *
     * @param query
     * @param query.base_asset - Base asset from the pair we're interested in
     * @param query.quote_asset - Quote asset from the pair we're interested in
     * @param [query.since] - If presented, the result will return only history from presented date. Should be a valid `RFC3339` string
     * @returns {HorizonResponse}
     */
    value: function getHistory() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._makeCallBuilder().appendUrlSegment('history').get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('prices');
    }
  }]);
  return Prices;
}(_resource_group_base.ResourceGroupBase);

exports.Prices = Prices;