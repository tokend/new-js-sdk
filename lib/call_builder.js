"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallBuilder = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _urijs = _interopRequireDefault(require("urijs"));

var _base = require("./base");

var _lodash = require("lodash");

var _const = require("./const");

var SIGNATURE_VALID_SEC = 60;
var REQUEST_TARGET_HEADER = '(request-target)';
var SIGNED_HEADERS = [REQUEST_TARGET_HEADER];
/**
 * Creates a new {@link CallBuilder}.
 *
 * @param {axios} axios Instance of axios.
 * @param {Wallet} wallet User's wallet.
 *
 * @class CallBuilder
 */

var CallBuilder =
/*#__PURE__*/
function () {
  /**
   * Creates a CallBuilder instance.
   *
   * @constructor
   * @param {Object} axios Axios.js instance.
   * @param {TokenD} [sdk] TokenD SDK instance.
   */
  function CallBuilder(axios, sdk) {
    (0, _classCallCheck2.default)(this, CallBuilder);
    this._axios = axios;
    this._sdk = sdk;
    this._urlSegments = [];
    this._customTimeout = null;
  }
  /**
   * Append URL segment.
   *
   * @param {(string|number|string[])} segment URL path segment(s).
   * @return {CallBuilder} Self.
   */


  (0, _createClass2.default)(CallBuilder, [{
    key: "appendUrlSegment",
    value: function appendUrlSegment(segment) {
      var _this = this;

      if ((0, _lodash.isArray)(segment)) {
        segment.forEach(function (s) {
          return _this._appendUrlSegment(s);
        });
      } else {
        this._appendUrlSegment(segment);
      }

      return this;
    }
    /**
     * Append an account ID to the URL.
     * Uses wallet's account ID by default.
     *
     * @param {string} [accountId] Custom account ID.
     * @return {CallBuilder} Self.
     */

  }, {
    key: "appendAccountId",
    value: function appendAccountId() {
      var accountId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!(accountId || this._sdk.wallet)) {
        throw new Error('No account ID provided.');
      }

      accountId = accountId || this._sdk.wallet.accountId;

      if (!_base.Keypair.isValidPublicKey(accountId)) {
        throw new Error('Invalid account ID.');
      }

      return this.appendUrlSegment(accountId);
    }
  }, {
    key: "_appendUrlSegment",
    value: function _appendUrlSegment(segment) {
      var _this2 = this;

      if ((0, _lodash.isNumber)(segment)) {
        this._urlSegments.push(segment);
      } else if ((0, _lodash.isString)(segment)) {
        if (segment.includes('/')) {
          // multiple segments in a single string e.g. "/foo/bar/x"
          var parsedLink = (0, _urijs.default)(segment);
          var segments = parsedLink.path().split('/').filter(function (x) {
            return x.length > 0;
          });
          segments.forEach(function (s) {
            return _this2._urlSegments.push(s);
          });
        } else {
          this._urlSegments.push(segment);
        }
      } else {
        throw new TypeError('Invalid segment.');
      }
    }
    /**
     * Authorize this request.
     *
     * @param {wallet} [wallet] Use another wallet for signature.
     * @return {CallBuilder} Self.
     */

  }, {
    key: "withSignature",
    value: function withSignature(wallet) {
      this._wallet = wallet || this._sdk.wallet;

      if (!this._wallet) {
        console.warn('Skipping signing the request cause no _wallet instance was found. Please re-check if it is an expected behaviour');
        return this;
      }

      this._authRequired = true;
      return this;
    }
    /**
     * Set a request timeout.
     *
     * @param {Number} timeout Request timeout.
     * @return {CallBuilder} Self.
     */

  }, {
    key: "withTimeout",
    value: function withTimeout(timeout) {
      if (!(0, _lodash.isNumber)(timeout)) {
        throw new TypeError('A timeout in milliseconds expected.');
      }

      this._customTimeout = timeout;
      return this;
    }
    /**
     * Perform a POST request.
     *
     * @param {Object} [data] Request body.
     * @return {Promise} Request result.
     */

  }, {
    key: "post",
    value: function post(data) {
      var config = this._getRequestConfig({
        method: 'post',
        data: data
      });

      return this._axios(config);
    }
    /**
     * Perform a GET request.
     *
     * @param {Object} [query] Request body.
     * @return {Promise} Request result.
     */

  }, {
    key: "get",
    value: function get(query) {
      var config = this._getRequestConfig({
        method: 'get',
        params: query
      });

      return this._axios(config);
    }
    /**
     * Perform a PUT request.
     *
     * @param {Object} [data] Request body.
     * @return {Promise} Request result.
     */

  }, {
    key: "put",
    value: function put(data) {
      var config = this._getRequestConfig({
        method: 'put',
        data: data
      });

      return this._axios(config);
    }
    /**
     * Perform a PATCH request.
     *
     * @param {Object} [data] Request body.
     * @return {Promise} Request result.
     */

  }, {
    key: "patch",
    value: function patch(data) {
      var config = this._getRequestConfig({
        method: 'patch',
        data: data
      });

      return this._axios(config);
    }
    /**
     * Perform a DELETE request.
     *
     * @param {Object} [data] Request body.
     * @return {Promise} Request result.
     */

  }, {
    key: "delete",
    value: function _delete(data) {
      var config = this._getRequestConfig({
        method: 'delete',
        data: data
      });

      return this._axios(config);
    }
  }, {
    key: "_getUrl",
    value: function _getUrl() {
      return this._urlSegments.reduce(function (prev, next) {
        return "".concat(prev, "/").concat(encodeURIComponent(next));
      }, '');
    }
  }, {
    key: "_getRequestConfig",
    value: function _getRequestConfig(config) {
      config.url = this._getUrl();

      if (this._authRequired) {
        this._signRequest(config);
      }

      if (this._customTimeout) {
        config.timeout = this._customTimeout;
      }

      config.headers = config.headers || {};
      config.headers['Content-Type'] = _const.MIMES.jsonApi;
      config.headers['Accept'] = _const.MIMES.jsonApi;
      return config;
    }
  }, {
    key: "_signRequest",
    value: function _signRequest(config) {
      if (this._sdk.legacySignatures) {
        this._signRequestLegacy(config);
      } else {
        config.headers = config.headers || {};
        var digest = (0, _base.hash)(this._requestDigest(config));

        var signature = this._wallet.keypair.sign(digest).toString('base64');

        var keyId = this._wallet.keypair.accountId();

        var algorithm = 'ed25519-sha256';
        config.headers.signature = "keyId=\"".concat(keyId, "\",algorithm=\"").concat(algorithm, "\",headers=\"").concat(SIGNED_HEADERS.join(' '), "\",signature=\"").concat(signature, "\"");
      }
    }
  }, {
    key: "_requestDigest",
    value: function _requestDigest(config) {
      var _this3 = this;

      var toSign = SIGNED_HEADERS.map(function (header) {
        header = header.toLowerCase();

        if (header === REQUEST_TARGET_HEADER) {
          var method = config.method.toLowerCase();

          var endpoint = _this3._getFullUrl(config);

          return "".concat(REQUEST_TARGET_HEADER, ": ").concat(method.toLowerCase(), " ").concat(endpoint);
        }

        ;
        var value = config.headers[header];
        return "".concat(header, ": ").concat(value);
      });
      return toSign.join('\n');
    }
  }, {
    key: "_signRequestLegacy",
    value: function _signRequestLegacy(config) {
      var validUntil = Math.floor(this._getTimestamp() + SIGNATURE_VALID_SEC).toString();

      var fullUrl = this._getFullUrl(config);

      var signatureBase = "{ uri: '".concat(fullUrl, "', valid_untill: '").concat(validUntil.toString(), "'}");
      var data = (0, _base.hash)(signatureBase);

      var signature = this._wallet.keypair.signDecorated(data);

      (0, _assign.default)(config, {
        headers: {
          'X-AuthValidUnTillTimestamp': validUntil.toString(),
          'X-AuthPublicKey': this._wallet.keypair.accountId(),
          'X-AuthSignature': signature.toXDR('base64')
        }
      });
    }
  }, {
    key: "_getFullUrl",
    value: function _getFullUrl(config) {
      var fullUrl = (0, _urijs.default)(config.url);

      if (config.params) {
        fullUrl = fullUrl.addQuery(config.params);
      }

      return fullUrl.toString();
    }
  }, {
    key: "_getTimestamp",
    value: function _getTimestamp() {
      var now = Math.floor(new Date().getTime() / 1000);
      return now - this._sdk.clockDiff;
    }
  }]);
  return CallBuilder;
}();

exports.CallBuilder = CallBuilder;