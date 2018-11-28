"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Blobs = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _lodash = require("lodash");

var _resource_group_base = require("../../resource_group_base");

var _Object$freeze2;

var types = (0, _freeze.default)({
  assetDescription: 'asset_description',
  fundOverview: 'fund_overview',
  fundUpdate: 'fund_update',
  navUpdate: 'nav_update'
});
var typesToFalgs = (0, _freeze.default)((_Object$freeze2 = {}, (0, _defineProperty2.default)(_Object$freeze2, types.assetDescription, 1), (0, _defineProperty2.default)(_Object$freeze2, types.fundOverview, 2), (0, _defineProperty2.default)(_Object$freeze2, types.fundUpdate, 4), (0, _defineProperty2.default)(_Object$freeze2, types.navUpdate, 8), _Object$freeze2));
/**
 * Blobs.
 */

var Blobs =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Blobs, _ResourceGroupBase);

  function Blobs() {
    (0, _classCallCheck2.default)(this, Blobs);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Blobs).apply(this, arguments));
  }

  (0, _createClass2.default)(Blobs, [{
    key: "create",

    /**
     * Create a blob.
     *
     * @param {string} type Blob type.
     * @param {string} data Serialized blob data.
     * @param {string} accountId User's account ID.
     *
     * @return {ApiResponse} Blob data.
     */
    value: function create(type, data, accountId) {
      return this._makeCallBuilder(accountId).post({
        data: {
          type: type,
          attributes: {
            value: data
          }
        }
      });
    }
    /**
     * Get a blob.
     *
     * @param {string} blobId Blob ID.
     * @param {string} [accountId] User's account ID.
     */

  }, {
    key: "get",
    value: function get(blobId, accountId) {
      return this._makeCallBuilder(accountId).appendUrlSegment(blobId).get();
    }
    /**
     * Get blobs.
     *
     * @param {object} query Query params.
     * @param {(Nubmer|string[])} query.type Filter by type.
     * @param {string} [accountId] User's account ID.
     */

  }, {
    key: "getAll",
    value: function getAll(query, accountId) {
      if ((0, _lodash.isArray)((0, _lodash.get)(query, 'type'))) {
        query.type = this._combineTypeFilters(query.type);
      }

      return this._makeCallBuilder(accountId).get(query);
    }
  }, {
    key: "_combineTypeFilters",
    value: function _combineTypeFilters(types) {
      return types.reduce(function (flags, type) {
        var flag = typesToFalgs[type];

        if (!flag) {
          throw new Error("Invalid blob type: ".concat(type));
        }

        return flags | flag;
      }, 0);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder(accountId) {
      return this._server._makeCallBuilder().withSignature().appendUrlSegment('users').appendAccountId(accountId).appendUrlSegment('blobs');
    }
  }, {
    key: "types",

    /**
     * Blob types.
     */
    get: function get() {
      return types;
    }
  }]);
  return Blobs;
}(_resource_group_base.ResourceGroupBase);

exports.Blobs = Blobs;