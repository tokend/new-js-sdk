"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Public = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/values"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

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
    /**
     * Get account id by email
     * Actually user_id endpoint belongs to API, but due to the fact the response
     * isn’t packaged into a json api format, we placed it here.
     *
     * @param {string} email user’s email
     *
     * @return {Promise}
     */

  }, {
    key: "getAccountIdByEmail",
    value: function getAccountIdByEmail(email) {
      return this._server._makeCallBuilder().appendUrlSegment('user_id').get({
        email: email
      });
    }
    /**
     * Get user's email by their account ID
     *
     * @param {string} accountId user’s account ID
     *
     * @return {String} user's email
     */

  }, {
    key: "getEmailByAccountId",
    value: function () {
      var _getEmailByAccountId = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(accountId) {
        var _ref, data, users;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._server._makeCallBuilder().appendUrlSegment('details').post({
                  addresses: [accountId]
                });

              case 2:
                _ref = _context.sent;
                data = _ref.data;
                users = (0, _values.default)(data.users);
                return _context.abrupt("return", users.length ? users[0].email : '');

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getEmailByAccountId(_x) {
        return _getEmailByAccountId.apply(this, arguments);
      }

      return getEmailByAccountId;
    }()
    /**
     * Get public enums, such as countries, nationalities, genders, industries, etc.
     *
     * @return {Promise}
     */

  }, {
    key: "getEnums",
    value: function getEnums() {
      return this._server._makeCallBuilder().appendUrlSegment('data').appendUrlSegment('enums').get();
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