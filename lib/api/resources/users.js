"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Users.
 */
var Users =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Users, _ResourceGroupBase);

  function Users() {
    (0, _classCallCheck2.default)(this, Users);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Users).apply(this, arguments));
  }

  (0, _createClass2.default)(Users, [{
    key: "getPage",

    /**
     * Get users.
     *
     * @param {object} [query] Request options.
     * @param {Number} [query.page] Page number.
     * @param {Number} [query.state] Bit mask to filter users by state.
     * @param {Number} [query.type] Bit mask to filter users by type.
     * @param {string} [query.email] Substring to match against user emails.
     * @param {string} [query.address] Substring to match against account addresses.
     *
     * @return {Promise} Collection of balances.
     */
    value: function getPage() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._makeCallBuilder().get(query);
    }
    /**
     * Get a user.
     *
     * @param {string} [accountId] Other user's account.
     *
     * @return {Promise} Collection of balances.
     */

  }, {
    key: "get",
    value: function get(accountId) {
      return this._makeCallBuilder().appendAccountId(accountId).get();
    }
    /**
     * Create a user.
     *
     * @param {string} [accountId] Other user's account.
     *
     * @return {Promise} Collection of balances.
     */

  }, {
    key: "create",
    value: function create(accountId) {
      return this._makeCallBuilder().appendAccountId(accountId).put({
        data: {
          attributes: {}
        }
      });
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('users').withSignature();
    }
  }]);
  return Users;
}(_resource_group_base.ResourceGroupBase);

exports.Users = Users;