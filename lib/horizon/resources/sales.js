"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sales = void 0;

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
var Sales =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Sales, _ResourceGroupBase);

  function Sales() {
    (0, _classCallCheck2.default)(this, Sales);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Sales).apply(this, arguments));
  }

  (0, _createClass2.default)(Sales, [{
    key: "get",

    /**
     * Get sale by ID
     *
     * @param id - the ID of the sale
     * @returns {Promise}
     */
    value: function get(id) {
      return this._makeCallBuilder().appendUrlSegment(id).get();
    }
    /**
     * Get sales.
     * @param [query] - request query
     * @param [query.owner] - If present, the result will return only sales created by specific account ID
     * @param [query.base_asset] - If present, the result will return only attached to specific asset
     * @param [query.name] - If present, the result will return only sales with specific name
     * @param [query.open_only] - If present, the result will return only sales with open state (including upcoming)
     * @param [query.upcoming] - If present, the result will return only sales with open state and upcoming
     *                           start date (combining this filter set to `false` with `open_only=true`
     *                           will actually return all opened, but not upcoming sales)
     * @param [query.voting] - If present, the result will return only sales with voting state
     * @param [query.promotions] - If present, the result will return only sales with promotion state
     * @param [query.sort_by] - If present, the result will return sort sales by:
     *                          start time (default) - 1
     *                          most founded - 2
     *                          end time - 3
     *                          popularity - 4
     *                          start time - 5
     *
     * @return {Promise} Collection of balances.
     *
     * Note: Actually the page will include all existing sales, so that's why default query params, such as
     * cursor/limit/order are obsolete. Although filters described in this section will work, consider a
     * workaround about filtering/sorting the records on the client side
     */

  }, {
    key: "getPage",
    value: function getPage() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._makeCallBuilder().get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('sales');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return Sales;
}(_resource_group_base.ResourceGroupBase);

exports.Sales = Sales;