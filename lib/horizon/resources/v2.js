"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.V2 = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * V2.
 *
 * @class
 */
var V2 =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(V2, _ResourceGroupBase);

  function V2() {
    (0, _classCallCheck2.default)(this, V2);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(V2).apply(this, arguments));
  }

  (0, _createClass2.default)(V2, [{
    key: "getAllTransactions",
    value: function getAllTransactions(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('transactions').get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('v2');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return V2;
}(_resource_group_base.ResourceGroupBase);

exports.V2 = V2;