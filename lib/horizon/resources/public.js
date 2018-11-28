"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Public = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Public. Represents public data endpoints
 *
 * @class
 */
var Public =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Public, _ResourceGroupBase);

  function Public() {
    (0, _classCallCheck2.default)(this, Public);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Public).apply(this, arguments));
  }

  (0, _createClass2.default)(Public, [{
    key: "getOperation",

    /**
     * Get operation by id. Works the same as {@link Operations.get}, but the private details are omitted
     *
     * @param id
     * @returns {Promise}
     */
    value: function getOperation(id) {
      return this._makeCallBuilder().appendUrlSegment(['operations', id]).get();
    }
    /**
     * Get operations page. Works the same as {@link Operations.getPage}, but the private details are omitted
     * @param [query] The request query, the same as {@link Operations.getPage}
     *
     * @returns {Promise}
     */

  }, {
    key: "getOperationsPage",
    value: function getOperationsPage(query) {
      return this._makeCallBuilder().appendUrlSegment('operations').get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('public');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return Public;
}(_resource_group_base.ResourceGroupBase);

exports.Public = Public;