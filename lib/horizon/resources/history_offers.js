"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryOffers = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * History Offers.
 *
 * @class
 */
var HistoryOffers =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(HistoryOffers, _ResourceGroupBase);

  function HistoryOffers() {
    (0, _classCallCheck2.default)(this, HistoryOffers);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HistoryOffers).apply(this, arguments));
  }

  (0, _createClass2.default)(HistoryOffers, [{
    key: "getAll",

    /**
     * Get the order book
     * @param query
     * @param query.base_asset - Base asset from the pair
     * @param query.quote_asset - Quote asset from the pair
     * @param query.owner_id - the result will return only history offers for specific account ID
     * @returns {HorizonResponse}
     */
    value: function getAll(query) {
      return this._makeCallBuilderWithSignature().get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('history_offers');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return HistoryOffers;
}(_resource_group_base.ResourceGroupBase);

exports.HistoryOffers = HistoryOffers;