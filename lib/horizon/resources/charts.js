"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Charts = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Charts.
 *
 * @class
 */
var Charts =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Charts, _ResourceGroupBase);

  function Charts() {
    (0, _classCallCheck2.default)(this, Charts);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Charts).apply(this, arguments));
  }

  (0, _createClass2.default)(Charts, [{
    key: "get",

    /**
     * Get chart data by asset code.
     *
     * @param {string} assetCode - Asset code of chart to get
     * @return {HorizonResponse}
     */
    value: function get(assetCode) {
      return this._makeCallBuilder().appendUrlSegment(assetCode).get();
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('charts');
    }
  }]);
  return Charts;
}(_resource_group_base.ResourceGroupBase);

exports.Charts = Charts;