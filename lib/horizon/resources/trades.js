"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Trades = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Trades.
 *
 * @class
 */
var Trades =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Trades, _ResourceGroupBase);

  function Trades() {
    (0, _classCallCheck2.default)(this, Trades);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Trades).apply(this, arguments));
  }

  (0, _createClass2.default)(Trades, [{
    key: "getPage",

    /**
     * Get the page of the history of completed trades.
     *
     * @param query
     * @param query.base_asset - Base asset from the pair of assets, which history, we're requesting
     * @param query.quote_asset - Quote asset from the pair of assets, which history, we're requesting
     * @param [query.order_book_id] - If present, the result will return only trades for specific order book (0 - for secondary market, sale ID otherwise)
     * @return {HorizonResponse}
     */
    value: function getPage(query) {
      return this._makeCallBuilder().get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('trades');
    }
  }]);
  return Trades;
}(_resource_group_base.ResourceGroupBase);

exports.Trades = Trades;