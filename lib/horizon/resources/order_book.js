"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.OrderBook = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Order Book.
 *
 * @class
 */
var OrderBook =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(OrderBook, _ResourceGroupBase);

  function OrderBook() {
    (0, _classCallCheck2.default)(this, OrderBook);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OrderBook).apply(this, arguments));
  }

  (0, _createClass2.default)(OrderBook, [{
    key: "getAll",

    /**
     * Get the order book
     * @param query
     * @param query.base_asset - Base asset from the pair
     * @param query.quote_asset - Quote asset from the pair
     * @param query.is_buy - Defines if the offers are buying or selling the base asset
     * @param [query.owner_id] - Account ID of the owner of offers
     * @param [query.order_book_id] - Order book ID, 0 - for secondary market, otherwise - sale ID
     * @returns {HorizonResponse}
     */
    value: function getAll(query) {
      return this._makeCallBuilderWithSignature().get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('order_book');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return OrderBook;
}(_resource_group_base.ResourceGroupBase);

exports.OrderBook = OrderBook;