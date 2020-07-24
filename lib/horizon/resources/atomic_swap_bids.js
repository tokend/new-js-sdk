"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.AtomicSwapBid = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * AtomicSwapBib.
 *
 * In short, AtomicSwapBib are the central data structure for payment system.
 *
 * @class
 */
var AtomicSwapBid =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(AtomicSwapBid, _ResourceGroupBase);

  function AtomicSwapBid() {
    (0, _classCallCheck2.default)(this, AtomicSwapBid);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AtomicSwapBid).apply(this, arguments));
  }

  (0, _createClass2.default)(AtomicSwapBid, [{
    key: "getPage",

    /**
     * This endpoint represents atomic swap bids filters them by owner id and base asset
     *
     * @param [query] - request query
     * @return {Promise}
     */
    value: function getPage(query) {
      return this._makeCallBuilder().get(query);
    }
    /**
     * Provides information on a single atomic swap bid.
     *
     * @param {string} id Bid id
     * @return {Promise}
     */

  }, {
    key: "get",
    value: function get(id) {
      return this._makeCallBuilder().appendUrlSegment(id).get();
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('atomic_swap_bids');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return AtomicSwapBid;
}(_resource_group_base.ResourceGroupBase);

exports.AtomicSwapBid = AtomicSwapBid;