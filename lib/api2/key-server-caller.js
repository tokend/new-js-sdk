"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.KeyServerCaller = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _urijs = _interopRequireDefault(require("urijs"));

var _base = require("../base");

var _lodash = require("lodash");

var SIGNATURE_VALID_SEC = 60;
var CONTENT_TYPE = {
  applicationJson: 'application/json'
  /**
   * Creates a new {@link CallBuilder}.
   *
   * @param {axios} axios Instance of axios.
   * @param {Wallet} wallet User's wallet.
   *
   * @class CallBuilder
   */

};

var KeyServerCaller =
/*#__PURE__*/
function () {
  /**
     * Creates a CallBuilder instance.
     *
     * @constructor
     * @param {Object} axios Axios.js instance.
     * @param {TokenD} [sdk] TokenD SDK instance.
     */
  function KeyServerCaller(opts) {
    (0, _classCallCheck2.default)(this, KeyServerCaller);
    this._axios = opts.axios;
    this._sdk = opts.sdk;
    this._wallet = null;
    this._urlSegments = [];
  }

  (0, _createClass2.default)(KeyServerCaller, [{
    key: "addWallet",
    value: function addWallet(wallet) {
      this._wallet = wallet;
      return this;
    }
  }, {
    key: "post",
    value: function post(urlSegment, data) {
      this._appendUrlSegment(urlSegment);

      var config = this._getRequestConfig({
        method: 'post',
        data: data,
        url: this._getUrl()
      }, false);

      return this._axios(config);
    }
  }, {
    key: "postWithSignature",
    value: function postWithSignature(urlSegment, data, wallet) {
      this._appendUrlSegment(urlSegment);

      this.addWallet(wallet);

      var config = this._getRequestConfig({
        method: 'post',
        data: data,
        url: this._getUrl()
      }, true);

      return this._axios(config);
    }
  }, {
    key: "get",
    value: function get(urlSegment, query) {
      this._appendUrlSegment(urlSegment);

      var config = this._getRequestConfig({
        method: 'get',
        params: query,
        url: this._getUrl()
      }, false);

      return this._axios(config);
    }
  }, {
    key: "getWithSignature",
    value: function getWithSignature(urlSegment, query, wallet) {
      this._appendUrlSegment(urlSegment);

      this.addWallet(wallet);

      var config = this._getRequestConfig({
        method: 'get',
        params: query,
        url: this._getUrl()
      }, true);

      return this._axios(config);
    }
  }, {
    key: "patch",
    value: function patch(urlSegment, data) {
      this._appendUrlSegment(urlSegment);

      var config = this._getRequestConfig({
        method: 'patch',
        data: data
      }, false);

      return this._axios(config);
    }
  }, {
    key: "patchWithSignature",
    value: function patchWithSignature(urlSegment, data, wallet) {
      this._appendUrlSegment(urlSegment);

      this.addWallet(wallet);

      var config = this._getRequestConfig({
        method: 'patch',
        data: data,
        url: this._getUrl()
      }, true);

      return this._axios(config);
    }
  }, {
    key: "delete",
    value: function _delete(urlSegment) {
      this._appendUrlSegment(urlSegment);

      var config = this._getRequestConfig({
        method: 'delete',
        url: this._getUrl()
      }, false);

      return this._axios(config);
    }
  }, {
    key: "deleteWithSignature",
    value: function deleteWithSignature(urlSegment, wallet) {
      this._appendUrlSegment(urlSegment);

      this.addWallet(wallet);

      var config = this._getRequestConfig({
        method: 'delete',
        url: this._getUrl()
      }, true);

      return this._axios(config);
    }
  }, {
    key: "_getRequestConfig",
    value: function _getRequestConfig(config) {
      var needSign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this._wallet) {
        this._signRequestLegacy(config);
      }

      config.headers = config.headers || {};
      config.headers['Content-Type'] = CONTENT_TYPE.applicationJson;
      config.withCredentials = false;
      return config;
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
    key: "_appendUrlSegment",
    value: function _appendUrlSegment(segment) {
      var _this = this;

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
            return _this._urlSegments.push(s);
          });
        } else {
          this._urlSegments.push(segment);
        }
      } else {
        throw new TypeError('Invalid segment.');
      }
    }
  }, {
    key: "_getUrl",
    value: function _getUrl() {
      return this._urlSegments.reduce(function (prev, next) {
        return "".concat(prev, "/").concat(encodeURIComponent(next));
      }, '');
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
  return KeyServerCaller;
}();

exports.KeyServerCaller = KeyServerCaller;