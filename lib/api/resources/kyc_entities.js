"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KycEntities = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _resource_group_base = require("../../resource_group_base");

var types = (0, _freeze.default)({
  individual: 'individual'
});
/**
 * KYC entities.
 */

var KycEntities =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(KycEntities, _ResourceGroupBase);

  function KycEntities() {
    (0, _classCallCheck2.default)(this, KycEntities);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(KycEntities).apply(this, arguments));
  }

  (0, _createClass2.default)(KycEntities, [{
    key: "create",

    /**
     * Create a document upload config.
     *
     * @param {string} documentType Entity type.
     * @param {string} kycData KYC data.
     * @param {string} [accountId] User's account ID.
     *
     * @return {ApiResponse} Response.
     */
    value: function create(type, kycData, accountId) {
      return this._makeCallBuilder(accountId).post({
        data: {
          type: type,
          attributes: kycData
        }
      });
    }
    /**
     * Get all entities.
     *
     * @param {string} [accountId] User's account ID.
     * @return {ApiResponse} List of KYC entities.
     */

  }, {
    key: "getAll",
    value: function getAll(accountId) {
      return this._makeCallBuilder(accountId).get();
    }
    /**
     * Update an entity.
     *
     * @param {string} entityId Entity ID.
     * @param {object} kycData KYC data.
     * @param {string} [accountId] User's account ID.
     *
     * @return {ApiResponse} Response.
     */

  }, {
    key: "update",
    value: function update(entityId, type, kycData, accountId) {
      return this._makeCallBuilder(accountId).appendUrlSegment(entityId).put({
        data: {
          type: type,
          attributes: kycData
        }
      });
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder(accountId) {
      return this._server._makeCallBuilder().appendUrlSegment('users').appendAccountId(accountId).appendUrlSegment('entities').withSignature();
    }
  }, {
    key: "types",

    /**
     * Document types.
     */
    get: function get() {
      return types;
    }
  }]);
  return KycEntities;
}(_resource_group_base.ResourceGroupBase);

exports.KycEntities = KycEntities;