"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerBase = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _urijs = _interopRequireDefault(require("urijs"));

var _errors = require("./errors");

var _call_builder = require("./call_builder");

/**
 * Server handles the network connection to some remote server
 * instance and exposes an interface for requests to that instance.
 *
 * @class ServerBase
 */
var ServerBase =
/*#__PURE__*/
function () {
  /**
   * Creates a Server instance.
   *
   * @constructor
   * @param {TokenD} sdk Parent TokenD SDK instance.
   * @param {string} serverUrl Server url.
   * @param {object} [opts]
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {Object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {Object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {Object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   * @param {string} [opts.responseType='json'] Indicates the type of data that the server will respond with options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'.
   */
  function ServerBase(sdk, serverUrl) {
    var _this = this;

    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2.default)(this, ServerBase);

    if (!sdk) {
      throw new TypeError('An isntance of TokenD SDK expected.');
    }

    var parsedUrl = _urijs.default.parse(serverUrl);

    if (!(parsedUrl.protocol && parsedUrl.hostname)) {
      throw new Error('Invalid URL');
    }

    if (parsedUrl.protocol !== 'https' && !opts.allowHttp) {
      throw new Error("\n        Secure connection required.\n        Set \"allowHttp\" to true if you are sure that you want to use unprotected connection.\n      ");
    }

    this._sdk = sdk;
    this._axios = _axios.default.create({
      baseURL: serverUrl,
      proxy: opts.proxy,
      auth: opts.httpBasicAuth,
      headers: opts.customHeaders || _axios.default.defaults.headers,
      withCredentials: opts.withCredentials,
      responseType: opts.responseType || _axios.default.defaults.responseType
    });
    this.useResponseInterceptor(function (response) {
      return response;
    }, function (error) {
      return _this._parseResponseError(error);
    });
  }
  /**
   * Use request interceptor.
   * @see [axios.js docs](https://github.com/axios/axios#interceptors)
   *
   * @param {function} handleSuccess Handler for successful requests.
   * @param {function} handleFailure Handler for failed requests.
   *
   * @return {Object} Axios.js interceptor object.
   */


  (0, _createClass2.default)(ServerBase, [{
    key: "useRequestInterceptor",
    value: function useRequestInterceptor(handleSuccess, handleFailure) {
      return this._axios.interceptors.request.use(handleSuccess, handleFailure);
    }
    /**
     * Eject request interceptor.
     * @see [axios.js docs](https://github.com/axios/axios#interceptors)
     *
     * @param {Object} interceptor Axios.js interceptor descriptor.
     */

  }, {
    key: "ejectRequestInterceptor",
    value: function ejectRequestInterceptor(interceptor) {
      this._axios.interceptors.request.eject(interceptor);
    }
    /**
     * Use response interceptor.
     * @see [axios.js docs](https://github.com/axios/axios#interceptors)
     *
     * @param {function} handleSuccess Handler for successful responses.
     * @param {function} handleFailure Handler for failed responses.
     *
     * @return {Object} Axios.js interceptor object.
     */

  }, {
    key: "useResponseInterceptor",
    value: function useResponseInterceptor(handleSuccess, handleFailure) {
      return this._axios.interceptors.response.use(handleSuccess, handleFailure);
    }
    /**
     * Eject response interceptor.
     * @see [axios.js docs](https://github.com/axios/axios#interceptors)
     *
     * @param {Object} interceptor Axios.js interceptor descriptor.
     */

  }, {
    key: "ejectResponseInterceptor",
    value: function ejectResponseInterceptor(interceptor) {
      this._axios.interceptors.response.eject(interceptor);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return new _call_builder.CallBuilder(this._axios, this._sdk);
    }
  }, {
    key: "_parseResponseError",
    value: function _parseResponseError(error) {
      if (error.message === 'Network Error') {
        error = new _errors.NetworkError('Network error ocurred.', error);
      } else if (error.code === 'ECONNABORTED') {
        error = new _errors.TimeoutError(error.message, error);
      }

      return _promise.default.reject(error);
    }
  }]);
  return ServerBase;
}();

exports.ServerBase = ServerBase;