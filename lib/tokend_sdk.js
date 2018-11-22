"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenD = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/date/now"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _api = require("./api");

var _horizon = require("./horizon");

var _wallet = require("./wallet");

var _network = require("./base/network");

/**
 * TokendD Software Development Toolkit.
 *
 * @class
 */
var TokenD =
/*#__PURE__*/
function () {
  /**
   * Internal constructor. Use TokenD.create() instead.
   *
   * @private
   * @constructor
   */
  function TokenD(url) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, TokenD);
    this._api = new _api.ApiServer(this, url, opts);
    this._horizon = new _horizon.HorizonServer(this, url, opts);
    this._clockDiff = 0;
    this._legacySignatures = opts.legacySignatures || false;
  }
  /**
   * Make a new TokenD SDK instance.
   *
   * @param {string} url TokenD backend url.
   * @param {object} [opts]
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   * @param {boolean} [opts.legacySignatures] Use legacy signature scheme instead of IETF HTTP Signatures
   *
   * @return {Promise.<TokenD>}
   */


  (0, _createClass2.default)(TokenD, [{
    key: "useWallet",

    /**
     * Use a wallet to sign transactions.
     *
     * @param {Wallet} wallet User's wallet.
     */
    value: function useWallet(wallet) {
      if (!(wallet instanceof _wallet.Wallet)) {
        throw new TypeError('A wallet instance expected.');
      }

      this._wallet = wallet;
    }
    /**
     * Eject current wallet.
     */

  }, {
    key: "ejectWallet",
    value: function ejectWallet() {
      this._wallet = null;
    }
  }, {
    key: "_useNetworkPassphrase",
    value: function _useNetworkPassphrase(networkPassphrase) {
      _network.Network.use(new _network.Network(networkPassphrase));
    }
  }, {
    key: "_calculateClockDiff",
    value: function _calculateClockDiff(timestamp) {
      this._clockDiff = (0, _now.default)() / 1000 - timestamp;
    }
  }, {
    key: "horizon",

    /**
     * Horizon server instance.
     */
    get: function get() {
      return this._horizon;
    }
    /**
     * API server instance.
     */

  }, {
    key: "api",
    get: function get() {
      return this._api;
    }
    /**
     * User's wallet.
     */

  }, {
    key: "wallet",
    get: function get() {
      return this._wallet;
    }
    /**
     * Clock difference with the backend.
     */

  }, {
    key: "clockDiff",
    get: function get() {
      return this._clockDiff;
    }
    /**
     * Use legacy signature scheme instead of IETF HTTP Signatures.
     */

  }, {
    key: "legacySignatures",
    get: function get() {
      return this._legacySignatures;
    }
  }], [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(url, opts) {
        var sdk, networkDetails;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sdk = new TokenD(url, opts);
                _context.next = 3;
                return sdk.horizon.getNetworkDetails();

              case 3:
                networkDetails = _context.sent;

                sdk._useNetworkPassphrase(networkDetails.data.networkPassphrase);

                sdk._calculateClockDiff(networkDetails.data.currentTime);

                return _context.abrupt("return", sdk);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function create(_x, _x2) {
        return _create.apply(this, arguments);
      };
    }()
  }]);
  return TokenD;
}();

exports.TokenD = TokenD;