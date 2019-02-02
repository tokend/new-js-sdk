"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetPairs = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Asset pairs.
 *
 * @class
 */
var AssetPairs =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(AssetPairs, _ResourceGroupBase);

  function AssetPairs() {
    (0, _classCallCheck2.default)(this, AssetPairs);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AssetPairs).apply(this, arguments));
  }

  (0, _createClass2.default)(AssetPairs, [{
    key: "getAll",

    /**
     * Gets all the existing asset pairs.
     *
     * @return {HorizonResponse}
     */
    value: function getAll() {
      return this._makeCallBuilder().get();
    }
    /**
     * Converts amount from one asset to another
     *
     * @param query
     * @param {string} query.source_asset - Asset to convert from
     * @param {string} query.dest_asset - Asset to convert to
     * @param {string} query.amount - Amount to convert
     * @return {HorizonResponse}
     */

  }, {
    key: "convert",
    value: function convert(query) {
      return this._makeCallBuilder().appendUrlSegment('convert').get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('asset_pairs');
    }
  }]);
  return AssetPairs;
}(_resource_group_base.ResourceGroupBase);

exports.AssetPairs = AssetPairs;