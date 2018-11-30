"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HorizonServer = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _server_base = require("../server_base");

var _response = require("./response");

var errors = _interopRequireWildcard(require("../errors"));

var resources = _interopRequireWildcard(require("./resources"));

/**
 * Facilitates interaction with a Horizon server instance.
 *
 * @class
 */
var HorizonServer =
/*#__PURE__*/
function (_ServerBase) {
  (0, _inherits2.default)(HorizonServer, _ServerBase);

  /**
   * Create a new Horizon instance.
   *
   * @constructor
   *
   * @param {TokenD} sdk Parent SDK instance.
   * @param {string} serverUrl Horizon server instance URL.
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {Object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {Object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {Object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   */
  function HorizonServer(sdk, serverUrl) {
    var _this;

    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2.default)(this, HorizonServer);
    opts.responseType = 'json';
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HorizonServer).call(this, sdk, serverUrl, opts));

    _this.useResponseInterceptor(function (response) {
      return new _response.HorizonResponse(response, _this._sdk);
    }, function (error) {
      return _this._parseResponseError(error);
    });

    return _this;
  }
  /**
   * Get network details.
   *
   * @return {HorizonResponse} Network details.
   */


  (0, _createClass2.default)(HorizonServer, [{
    key: "getNetworkDetails",
    value: function getNetworkDetails() {
      return this._makeCallBuilder().get();
    }
    /**
     * Account details.
     *
     * @return {Account}
     */

  }, {
    key: "_parseResponseError",
    value: function _parseResponseError(error) {
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 400:
            error = new errors.BadRequestError(error, this._axios);
            break;

          case 401:
            error = new errors.UnauthorizedError(error, this._axios);
            break;

          case 403:
            // TFA errors are returned by API, parse as an API error
            error = new errors.TFARequiredError(error, this._axios);
            break;

          case 404:
            error = new errors.NotFoundError(error, this._axios);
            break;

          case 500:
            error = new errors.InternalServerError(error, this._axios);
            break;
        }
      }

      return _promise.default.reject(error);
    }
  }, {
    key: "account",
    get: function get() {
      return new resources.Account(this, this._sdk);
    }
    /**
     * Assets.
     *
     * @return {Assets}
     */

  }, {
    key: "assets",
    get: function get() {
      return new resources.Assets(this, this._sdk);
    }
    /**
     * Asset pairs.
     *
     * @return {AssetPairs}
     */

  }, {
    key: "assetPairs",
    get: function get() {
      return new resources.AssetPairs(this, this._sdk);
    }
    /**
     * Asset pairs.
     *
     * @return {AssetPairs}
     */

  }, {
    key: "atomicSwapBid",
    get: function get() {
      return new resources.AtomicSwapBid(this, this._sdk);
    }
    /**
     * Balances.
     *
     * @return {Balances}
     */

  }, {
    key: "balances",
    get: function get() {
      return new resources.Balances(this, this._sdk);
    }
    /**
     * Charts.
     *
     * @return {Charts}
     */

  }, {
    key: "charts",
    get: function get() {
      return new resources.Charts(this, this._sdk);
    }
    /**
     * Core sales
     * @return {CoreSales}
     */

  }, {
    key: "coreSales",
    get: function get() {
      return new resources.CoreSales(this, this._sdk);
    }
    /**
     * Fees
     *
     * @return {Fees}
     */

  }, {
    key: "fees",
    get: function get() {
      return new resources.Fees(this, this._sdk);
    }
    /**
     * Key/value
     *
     * @return {KeyValue}
     */

  }, {
    key: "keyValue",
    get: function get() {
      return new resources.KeyValue(this, this._sdk);
    }
    /**
     * Limits
     *
     * @return {Limits}
     */

  }, {
    key: "limits",
    get: function get() {
      return new resources.Limits(this, this._sdk);
    }
    /**
     * Operations
     *
     * @return {Operations}
     */

  }, {
    key: "operations",
    get: function get() {
      return new resources.Operations(this, this._sdk);
    }
    /**
     * Order Book
     *
     * @return {OrderBook}
     */

  }, {
    key: "orderBook",
    get: function get() {
      return new resources.OrderBook(this, this._sdk);
    }
    /**
     * Payments
     *
     * @return {Payments}
     */

  }, {
    key: "payments",
    get: function get() {
      return new resources.Payments(this, this._sdk);
    }
    /**
     * Prices
     *
     * @return {Prices}
     */

  }, {
    key: "prices",
    get: function get() {
      return new resources.Prices(this, this._sdk);
    }
    /**
     * Public
     *
     * @return {Public}
     */

  }, {
    key: "public",
    get: function get() {
      return new resources.Public(this, this.sdk);
    }
    /**
     * Reviewable requests.
     *
     * @return {Request}
     */

  }, {
    key: "request",
    get: function get() {
      return new resources.Request(this, this._sdk);
    }
    /**
     * References.
     *
     * @return {References}
     */

  }, {
    key: "references",
    get: function get() {
      return new resources.References(this, this._sdk);
    }
    /**
     * Sales.
     *
     * @return {Sales}
     */

  }, {
    key: "sales",
    get: function get() {
      return new resources.Sales(this, this._sdk);
    }
    /**
     * Sale Antes
     *
     * @return {SaleAntes}
     */

  }, {
    key: "saleAntes",
    get: function get() {
      return new resources.SaleAntes(this, this._sdk);
    }
    /**
     * Transactions.
     *
     * @return {Transactions}
     */

  }, {
    key: "transactions",
    get: function get() {
      return new resources.Transactions(this, this._sdk);
    }
    /**
     * Trades
     *
     * @return {Trades}
     */

  }, {
    key: "trades",
    get: function get() {
      return new resources.Trades(this, this._sdk);
    }
    /**
     * Trusts
     *
     * @return {Trusts}
     */

  }, {
    key: "trusts",
    get: function get() {
      return new resources.Trusts(this, this._sdk);
    }
    /**
     * V2
     *
     * @return {V2}
     */

  }, {
    key: "v2",
    get: function get() {
      return new resources.V2(this, this._sdk);
    }
    /**
     * History offers
     *
     * @return {OrderBook}
     */

  }, {
    key: "historyOffers",
    get: function get() {
      return new resources.HistoryOffers(this, this._sdk);
    }
  }]);
  return HorizonServer;
}(_server_base.ServerBase);

exports.HorizonServer = HorizonServer;