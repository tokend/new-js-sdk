"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.References = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * References.
 *
 * @class
 */
var References =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(References, _ResourceGroupBase);

  function References() {
    (0, _classCallCheck2.default)(this, References);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(References).apply(this, arguments));
  }

  (0, _createClass2.default)(References, [{
    key: "get",

    /**
     * Return specific reference
     *
     * @param {string} reference - the unique reference
     * @returns {HorizonResponse}
     */
    value: function get(reference) {
      return this._makeCallBuilder().appendUrlSegment(reference).get();
    }
    /**
     * Return all the references
     *
     * @param {object} query - url query params
     * @returns {HorizonResponse}
     */

  }, {
    key: "getAll",
    value: function getAll() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._makeCallBuilder().get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('references');
    }
  }]);
  return References;
}(_resource_group_base.ResourceGroupBase);

exports.References = References;