"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ApiServer = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _lodash = require("lodash");

var _server_base = require("../server_base");

var _case_converter = require("../utils/case_converter");

var _response = require("./response");

var errors = _interopRequireWildcard(require("../errors"));

var resources = _interopRequireWildcard(require("./resources"));

/**
 * Facilitates interaction with the API server.
 *
 * @class
 */
var ApiServer =
/*#__PURE__*/
function (_ServerBase) {
  (0, _inherits2.default)(ApiServer, _ServerBase);

  /**
   * Create a new API server instance.
   *
   * @constructor
   * @param {TokenD} sdk Parent SDK instance.
   * @param {string} serverUrl API server URL.
   * @param {Object} opts
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {Object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {Object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {Object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   * @param {string} [opts.responseType='json'] Indicates the type of data that the server will respond with options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'.
   */
  function ApiServer(sdk, serverUrl) {
    var _this;

    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2.default)(this, ApiServer);
    opts.responseType = 'json';
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ApiServer).call(this, sdk, serverUrl, opts));

    _this.useRequestInterceptor(function (config) {
      if (config.params) {
        config.params = (0, _case_converter.toSnakeCaseDeep)(config.params);
      }

      if (config.data) {
        config.data = (0, _case_converter.toSnakeCaseDeep)(config.data);
      }

      return config;
    }, function (err) {
      return _promise.default.reject(err);
    });

    _this.useResponseInterceptor(function (response) {
      if (response.status === 204) {
        return;
      }

      if (response.data.url) {
        return response.data;
      }

      return new _response.ApiResponse(response, _this._sdk);
    }, function (error) {
      if (error.response && error.response.status) {
        var horizonError = Boolean((0, _lodash.get)(error, 'response.data.status'));

        if (horizonError) {
          // NOTE: all API routes go through Horizon, so some horizon errors
          // are expected
          switch (error.response.status) {
            case 404:
              error = new errors.NotFoundError(error, _this._axios);
              break;

            case 500:
              error = new errors.InternalServerError(error, _this._axios);
              break;

            default:
              error = new errors.ServerError(error, _this._axios);
          }
        } else {
          var errCode = (0, _lodash.get)(error, 'response.data.errors[0].code');

          switch (error.response.status) {
            case 400:
              if (errCode === 'transaction_failed') {
                error = new errors.TransactionError(error, _this._axios);
              } else {
                error = new errors.BadRequestError(error, _this._axios);
              }

              break;

            case 401:
              error = new errors.NotAllowedError(error, _this._axios);
              break;

            case 403:
              if (errCode === 'tfa_required') {
                error = new errors.TFARequiredError(error, _this._axios);
              } else if (errCode === 'verification_required') {
                error = new errors.VerificationRequiredError(error, _this._axios);
              } else {
                error = new errors.ForbiddenRequestError(error, _this._axios);
              }

              break;

            case 404:
              error = new errors.NotFoundError(error, _this._axios);
              break;

            case 409:
              error = new errors.ConflictError(error, _this._axios);
              break;

            case 500:
              error = new errors.InternalServerError(error, _this._axios);
              break;

            default:
              error = new errors.ServerError(error, _this._axios);
          }
        }
      }

      return _promise.default.reject(error);
    });

    return _this;
  }
  /**
   * Wallets.
   */


  (0, _createClass2.default)(ApiServer, [{
    key: "wallets",
    get: function get() {
      return new resources.Wallets(this, this._sdk);
    }
    /**
     * TFA factors.
     */

  }, {
    key: "factors",
    get: function get() {
      return new resources.Factors(this, this._sdk);
    }
    /**
     * Users.
     */

  }, {
    key: "users",
    get: function get() {
      return new resources.Users(this, this._sdk);
    }
    /**
     * Documents.
     */

  }, {
    key: "documents",
    get: function get() {
      return new resources.Documents(this, this._sdk);
    }
    /**
     * KYC entities.
     */

  }, {
    key: "kycEntities",
    get: function get() {
      return new resources.KycEntities(this, this._sdk);
    }
    /**
     * Blobs.
     */

  }, {
    key: "blobs",
    get: function get() {
      return new resources.Blobs(this, this._sdk);
    }
  }]);
  return ApiServer;
}(_server_base.ServerBase);

exports.ApiServer = ApiServer;