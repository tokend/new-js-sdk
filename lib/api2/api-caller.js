"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ApiCaller = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-prototype-of"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/create"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _axios = _interopRequireDefault(require("axios"));

var _base = require("../base");

var _wallet = require("../wallet");

var _middlewares = _interopRequireDefault(require("./middlewares"));

var _case_converter = require("../utils/case_converter");

var _lodash = require("lodash");

/**
 * @typedef {import('../base/operations/base_operation').BaseOperation} BaseOperation
 * @typedef {import('../wallet').Wallet} Wallet
 */
var SUBMIT_TRANSACTION_TIMEOUT = 60 * 10000;
var methods = (0, _freeze.default)({
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  GET: 'GET',
  DELETE: 'DELETE'
});
/**
 * Represents ApiCaller that performs requests to TokenD servers
 *
 * @see {@link https://docs.tokend.io}
 * @see {@link /docs/README.md}
 */

var ApiCaller =
/*#__PURE__*/
function () {
  /**
   * Creates an `ApiCaller` instance
   *
   * @param {object} opts
   * @param {AxiosInstance} opts.axios - axios instance to use
   * @param {string} opts.baseURL - URL to a Horizon server to use
   *
   * @param {Wallet} [opts.wallet] - the initialized {@link Wallet} instance for
   * signing requests and transactions
   * @param {string} [opts.passphrase] - the passphrase of current TokenD
   * network (is used internally when signing transactions)
   */
  function ApiCaller() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, ApiCaller);
    this._axios = _axios.default.create();

    if (opts.baseURL) {
      this.useBaseURL(opts.baseURL);
    }

    this._wallet = null;
    this._networkDetails = {};
    this._customTimeout = null;
    this._clockDiff = 0;

    if (opts.wallet) {
      this.useWallet(opts.wallet);
    }

    if (opts.passphrase) {
      this.usePassphrase(opts.passphrase);
    }
  }
  /**
   * Returns a copy of the current instance but with a new wallet provided.
   * Use if you want to perform an operation with the same environment
   * config but another wallet should be used
   *
   * @example
   * await api.withWallet(newWallet).postOperations(operation)
   *
   * @param {Wallet} wallet - new wallet to use
   * @returns {ApiCaller} - Copy of the current instance but with a new wallet
   */


  (0, _createClass2.default)(ApiCaller, [{
    key: "withWallet",
    value: function withWallet(wallet) {
      var newCaller = (0, _assign.default)((0, _create.default)((0, _getPrototypeOf.default)(this)), this);
      newCaller.useWallet(wallet);
      return newCaller;
    }
    /**
     * Creates an `ApiCaller` instance with the provided `baseURL` set as default
     * Horizon server endpoint. It also * required network passphrase and wallet
     * provided to authorize transactions * and requests. Also check for
     * `usePassphrase()`, `useWallet()` and * `getInstanceWithPassphrase()`
     *
     * @param {string} baseURL - URL to a Horizon server to use
     * @returns {ApiCaller} - The initialized API caller instance
     */

  }, {
    key: "withBaseURL",
    value: function withBaseURL(baseURL) {
      var newCaller = (0, _assign.default)((0, _create.default)((0, _getPrototypeOf.default)(this)), this);
      newCaller.useBaseURL(baseURL);
      return newCaller;
    }
    /**
     * Creates an `ApiCaller` instance with the provided `baseURL` set as default
     * Horizon server endpoint but also * retrieves and sets network passphrase.
     * Fetches and assigns network details. * Check also for `networkDetails`
     * getter.
     *
     * @param {string} baseURL - URL to a Horizon server to use
     * @returns {ApiCaller} - The initialized API caller instance
     */

  }, {
    key: "get",

    /**
     * Makes a `GET` to a target `endpoint` with the provided `query` params.
     * Signing can be enabled with `needSign` argument. Parses the response in
     * JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} query - query params. query parameters should not contain
     * no more than 1 level of nesting.
     * @param {boolean} [needSign=false] - set `true` to sign the request, also
     * check for `.getWithSignature()`
     * @returns {Object} - the parsed response.
     */
    value: function get(endpoint, query) {
      var needSign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this._call({
        method: methods.GET,
        needSign: needSign,
        endpoint: endpoint,
        query: query,
        isEmptyBodyAllowed: true
      });
    }
    /**
     * Makes a `GET` to a target `endpoint` with the provided `query` params.
     * _Cannot_ sign request. _Does_ not parse the * response
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} query - query params. query parameters should not contain
     * no more than 1 level of nesting.
     * @returns {Object} - the response.
     */

  }, {
    key: "getRaw",
    value: function getRaw(endpoint, query) {
      return this._call({
        method: methods.GET,
        needRaw: true,
        endpoint: endpoint,
        query: query
      });
    }
    /**
     * Makes a `GET` to a target `endpoint` with the provided `query` params.
     * Signs the request. Parses the response in JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} query - query params. query parameters should not contain
     * no more than 1 level of nesting.
     * @returns {Object} - the parsed response.
     */

  }, {
    key: "getWithSignature",
    value: function getWithSignature(endpoint, query) {
      return this.get(endpoint, query, true);
    }
    /**
     * Makes a `POST` to a target `endpoint` with the provided `data` as body.
     * Signing can be enabled with `needSign` argument. Parses the response in
     * JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} data - body to include
     * @param {boolean} [needSign=false] - set `true` to sign the request, also
     * check for `.postWithSignature()`
     * @returns {Object} - the parsed response.
     */

  }, {
    key: "post",
    value: function post(endpoint, data) {
      var needSign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this._call({
        method: methods.POST,
        needSign: needSign,
        endpoint: endpoint,
        data: data
      });
    }
    /**
     * Makes a `POST` to a target `endpoint` with the provided `data` as body.
     * Signs the request. Parses the response in JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} data - body to include
     * @returns {Object} - the parsed response.
     */

  }, {
    key: "postWithSignature",
    value: function postWithSignature(endpoint, data) {
      return this.post(endpoint, data, true);
    }
    /**
     * Makes a `PATCH` to a target `endpoint` with the provided `data` as body.
     * Signing can be enabled with `needSign` argument. Parses the response in
     * JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} data - body to include
     * @param {boolean} [needSign=false] - set `true` to sign the request, also
     * check for `.patchWithSignature()`
     * @returns {Object} - the parsed response.
     */

  }, {
    key: "patch",
    value: function patch(endpoint, data) {
      var needSign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this._call({
        method: methods.PATCH,
        needSign: needSign,
        endpoint: endpoint,
        data: data
      });
    }
    /**
     * Makes a `PATCH` to a target `endpoint` with the provided `data` as body.
     * Signs the request. Parses the response in JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} data - body to include
     * @returns {Object} - the parsed response.
     */

  }, {
    key: "patchWithSignature",
    value: function patchWithSignature(endpoint, data) {
      return this.patch(endpoint, data, true);
    }
    /**
     * Makes a `PUT` to a target `endpoint` with the provided `data` as body.
     * Signing can be enabled with `needSign` argument. Parses the response in
     * JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} data - body to include
     * @param {boolean} [needSign=false] - set `true` to sign the request, also
     * check for `.putWithSignature()`
     * @returns {Object} - the parsed response.
     */

  }, {
    key: "put",
    value: function put(endpoint, data) {
      var needSign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this._call({
        method: methods.PUT,
        needSign: needSign,
        endpoint: endpoint,
        data: data
      });
    }
    /**
     * Makes a `PUT` to a target `endpoint` with the provided `data` as body.
     * Signs the request. Parses the response in JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} data - body to include
     * @returns {Object} - the parsed response.
     */

  }, {
    key: "putWithSignature",
    value: function putWithSignature(endpoint, data) {
      return this.put(endpoint, data, true);
    }
    /**
     * Makes a `DELETE` to a target `endpoint` with the provided `data` as body.
     * Signing can be enabled with `needSign` argument. Parses the response in
     * JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} data - body to include
     * @param {boolean} [needSign=false] - set `true` to sign the request, also
     * check for `.deleteWithSignature()`
     * @returns {Object} - the parsed response.
     */

  }, {
    key: "delete",
    value: function _delete(endpoint, data) {
      var needSign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this._call({
        method: methods.DELETE,
        needSign: needSign,
        endpoint: endpoint,
        data: data,
        isEmptyBodyAllowed: true
      });
    }
    /**
     * Makes a `DELETE` to a target `endpoint` with the provided `data` as body.
     * Signs the request. Parses the response in JsonApi format.
     *
     * @param {string} endpoint - target endpoint _with_ starting slash
     * @param {object} data - body to include
     * @returns {Object} - the parsed response.
     */

  }, {
    key: "deleteWithSignature",
    value: function deleteWithSignature(endpoint, data) {
      return this.delete(endpoint, data, true);
    }
    /**
     * Crafts a transaction envelope with the provided operations, signs it and
     * makes the post request with the envelope
     *
     * @see {@link BaseOperation}
     * @param {...BaseOperation} operations - operations to be included.
     * @returns {Promise} - Promise with response, keys data will be camel cased,
     * does not do any other actions on the response
     */

  }, {
    key: "postOperations",
    value: function postOperations() {
      if (!this._wallet) {
        throw new Error('No wallet found to sign the transaction');
      }

      return this.postTxEnvelope(this.getTransaction.apply(this, arguments));
    }
  }, {
    key: "postOperationsToSpecificEndpoint",
    value: function postOperationsToSpecificEndpoint(endpoint) {
      if (!this._wallet) {
        throw new Error('No wallet found to sign the transaction');
      }

      for (var _len = arguments.length, operations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        operations[_key - 1] = arguments[_key];
      }

      return this.postTxEnvelope(this.getTransaction.apply(this, operations), true, endpoint);
    }
  }, {
    key: "getTransaction",
    value: function getTransaction() {
      for (var _len2 = arguments.length, operations = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        operations[_key2] = arguments[_key2];
      }

      return new _base.TransactionBuilder(this._wallet.accountId).addOperations(operations).addSigner(this._wallet.keypair).build().toEnvelope().toXDR().toString('base64');
    }
  }, {
    key: "getBuildedTransaction",
    value: function getBuildedTransaction(operations) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new _base.TransactionBuilder(this._wallet.accountId, opts).addOperations(operations).addSigner(this._wallet.keypair).build();
    }
  }, {
    key: "signAndSendTransaction",
    value: function signAndSendTransaction(tx) {
      if (!this._wallet) {
        throw new Error('No wallet found to sign the transaction');
      }

      var transaction = new _base.Transaction(tx);
      transaction.sign(this._wallet.keypair);
      var envelopeTx = transaction.toEnvelope().toXDR().toString('base64');
      return this.postTxEnvelope(envelopeTx);
    }
    /**
     * Posts a transaction envelope.
     *
     * @param {string} envelope - a transaction envelope to be submitted.
     * @returns {Promise} - Promise with response, keys data will be camel cased,
     * does not do any other actions on the response
     */

  }, {
    key: "postTxEnvelope",
    value: function () {
      var _postTxEnvelope = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(envelope) {
        var waitForIngest,
            endpoint,
            config,
            response,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                waitForIngest = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                endpoint = _args.length > 2 && _args[2] !== undefined ? _args[2] : "/v3/transactions";
                // using raw axios because we don't need most of middleware, but need custom
                // request timeout here
                config = {
                  timeout: SUBMIT_TRANSACTION_TIMEOUT,
                  data: {
                    tx: envelope,
                    wait_for_ingest: waitForIngest
                  },
                  method: methods.POST,
                  url: "".concat(this._baseURL).concat(endpoint)
                };
                config = _middlewares.default.setJsonapiHeaders(config);
                _context.prev = 4;
                _context.next = 7;
                return this._axios(config);

              case 7:
                response = _context.sent;
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                throw _middlewares.default.parseJsonapiError(_context.t0);

              case 13:
                return _context.abrupt("return", {
                  // the response is not in JSON API format, but the error is
                  data: (0, _case_converter.toCamelCaseDeep)(response.data)
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));

      function postTxEnvelope(_x) {
        return _postTxEnvelope.apply(this, arguments);
      }

      return postTxEnvelope;
    }()
    /**
     * Performs a request
     *
     * @param {object} opts
     * @param {string} opts.endpoint - endpoint where to make the call to, e.g. `/accounts`
     * @param {object} opts.data - request data (for POST/PUT requests)
     * @param {object} opts.query - request query params. See {@link parseQuery} for details
     * @param {string} opts.method - the http method of request
     * @param {bool} opts.needSign - defines if will try to sign the request, `false` by default
     * @param {bool} opts.needRaw - defines if raw response should be returned, `false` by default
     * @param {bool} opts.isEmptyBodyAllowed - defines if empty body is allowed, `false` by default
     *
     * @private
     */

  }, {
    key: "_call",
    value: function () {
      var _call2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(opts) {
        var config, response;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                config = {
                  baseURL: this._baseURL,
                  params: opts.query || {},
                  paramsSerializer: function paramsSerializer(params) {
                    return (0, _entries.default)(params).map(function (_ref) {
                      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
                          key = _ref2[0],
                          value = _ref2[1];

                      return "".concat(key, "=").concat(encodeURIComponent(value));
                    }).join('&');
                  },
                  data: opts.isEmptyBodyAllowed && !opts.data ? undefined : opts.data || {},
                  method: opts.method,
                  url: opts.endpoint,
                  // TODO: smartly build url
                  withCredentials: true
                };
                config = _middlewares.default.flattenToAxiosJsonApiQuery(config);
                config = _middlewares.default.setJsonapiHeaders(config);

                if (this._customTimeout) {
                  config.timeout = this._customTimeout;
                }

                if (opts.needSign) {
                  config = _middlewares.default.signRequest(config, this._wallet.keypair);
                }

                _context2.prev = 5;
                _context2.next = 8;
                return this._axios(config);

              case 8:
                response = _context2.sent;
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](5);
                throw _middlewares.default.parseJsonapiError(_context2.t0, this._axios);

              case 14:
                if (!opts.needRaw) {
                  response = _middlewares.default.parseJsonapiResponse(response);

                  if (!(0, _lodash.isEmpty)(response.links)) {
                    if (opts.needSign) {
                      response.makeLinkCallersWithSignature(this);
                    } else {
                      response.makeLinkCallers(this);
                    }
                  }
                } else {
                  response = (0, _case_converter.toCamelCaseDeep)(response);
                }

                return _context2.abrupt("return", response);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 11]]);
      }));

      function _call(_x2) {
        return _call2.apply(this, arguments);
      }

      return _call;
    }()
    /**
     * Use a wallet to sign requests and transactions.
     *
     * @param {Wallet} wallet - A wallet to use
     * @see {@link /docs/README.md#wallets}
     */

  }, {
    key: "useWallet",
    value: function useWallet(wallet) {
      if (!(wallet instanceof _wallet.Wallet)) {
        throw new TypeError('A wallet instance expected.');
      }

      this._wallet = wallet;
    }
    /**
     * Use a passphrase to sign transactions.
     *
     * @param {Wallet} wallet - A wallet to use
     * @see {@link /docs/README.md#wallets}
     */

  }, {
    key: "usePassphrase",
    value: function usePassphrase(networkPassphrase) {
      _base.Network.use(new _base.Network(networkPassphrase));
    }
    /**
     * Assigns new baseURL to the current instance.
     *
     * @param {string} baseURL - URL to horizon server
     */

  }, {
    key: "useBaseURL",
    value: function useBaseURL(baseURL) {
      this._baseURL = baseURL;
    }
    /**
     * Assigns new network details to the instance. Network details can be
     * retrieved by calling root endpoint of you horizon, for example:
     * https://api.your.tokend.io/
     *
     * @param {Object} networkDetails - network details to use
     */

  }, {
    key: "useNetworkDetails",
    value: function useNetworkDetails(networkDetails) {
      this._networkDetails = networkDetails;
      this.usePassphrase(networkDetails.networkPassphrase);
    }
  }, {
    key: "networkDetails",

    /**
     * Returns network details fetched from Horizon’s root.
     *
     * @returns {Object} - Object with network details
     */
    get: function get() {
      return this._networkDetails;
    }
    /**
     * Returns current wallet
     *
     * @returns {Wallet}
     */

  }, {
    key: "wallet",
    get: function get() {
      return this._wallet;
    }
  }], [{
    key: "getInstance",
    value: function getInstance(baseURL) {
      return new ApiCaller({
        baseURL: baseURL
      });
    }
  }, {
    key: "getInstanceWithPassphrase",
    value: function () {
      var _getInstanceWithPassphrase = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(baseURL) {
        var caller, _ref3, networkDetails;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                caller = this.getInstance(baseURL);
                _context3.next = 3;
                return caller.getRaw('/');

              case 3:
                _ref3 = _context3.sent;
                networkDetails = _ref3.data;
                caller.useNetworkDetails(networkDetails);
                return _context3.abrupt("return", caller);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getInstanceWithPassphrase(_x3) {
        return _getInstanceWithPassphrase.apply(this, arguments);
      }

      return getInstanceWithPassphrase;
    }()
  }]);
  return ApiCaller;
}();

exports.ApiCaller = ApiCaller;