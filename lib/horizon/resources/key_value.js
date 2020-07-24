"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.KeyValue = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Key value.
 *
 * @class
 */
var KeyValue =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(KeyValue, _ResourceGroupBase);

  function KeyValue() {
    (0, _classCallCheck2.default)(this, KeyValue);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(KeyValue).apply(this, arguments));
  }

  (0, _createClass2.default)(KeyValue, [{
    key: "get",

    /**
     * Get k/v entry for provided key
     * @param key for the k/v entry
     * @returns {HorizonResponse}
     */
    value: function get(key) {
      return this._makeCallBuilder().appendUrlSegment(key).get();
    }
    /**
     * Get all the k/v entries
     * @returns {HorizonResponse}
     */

  }, {
    key: "getAll",
    value: function getAll() {
      return this._makeCallBuilder().get();
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('key_value');
    }
  }]);
  return KeyValue;
}(_resource_group_base.ResourceGroupBase);

exports.KeyValue = KeyValue;