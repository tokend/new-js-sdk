"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Assets = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Assets.
 *
 * @class
 */
var Assets =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Assets, _ResourceGroupBase);

  function Assets() {
    (0, _classCallCheck2.default)(this, Assets);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Assets).apply(this, arguments));
  }

  (0, _createClass2.default)(Assets, [{
    key: "get",

    /**
     * Get asset by code.
     *
     * @param {string} assetCode - Asset code of asset to get
     * @return {HorizonResponse}
     */
    value: function get(assetCode) {
      return this._makeCallBuilder().appendUrlSegment(assetCode).get();
    }
    /**
     * Get all existing assets.
     *
     * @return {HorizonResponse}
     */

  }, {
    key: "getAll",
    value: function getAll() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._makeCallBuilder().get(query);
    }
    /**
     * Gets all existing balances for this asset
     *
     * @param {string} assetCode - the code of asset
     * @return {HorizonResponse}
     */

  }, {
    key: "getHolders",
    value: function getHolders(assetCode) {
      return this._makeCallBuilderWithSignature().appendUrlSegment([assetCode, 'holders']).get();
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('assets');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return Assets;
}(_resource_group_base.ResourceGroupBase);

exports.Assets = Assets;