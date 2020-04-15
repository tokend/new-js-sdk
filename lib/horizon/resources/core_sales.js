"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CoreSales = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Core sales.
 *
 * @class
 */
var CoreSales =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(CoreSales, _ResourceGroupBase);

  function CoreSales() {
    (0, _classCallCheck2.default)(this, CoreSales);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CoreSales).apply(this, arguments));
  }

  (0, _createClass2.default)(CoreSales, [{
    key: "get",

    /**
     * Get the core sales.
     *
     * @return {HorizonResponse}
     */
    value: function get() {
      return this._makeCallBuilderWithSignature().get();
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('core_sales');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return CoreSales;
}(_resource_group_base.ResourceGroupBase);

exports.CoreSales = CoreSales;