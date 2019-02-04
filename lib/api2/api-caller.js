"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiCaller = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _axios = _interopRequireDefault(require("axios"));

var _base = require("../base");

var _wallet = require("../wallet");

var _middlewares = _interopRequireDefault(require("./middlewares"));

var SUBMIT_TRANSACTION_TIMEOUT = 60 * 10000;
var methods = (0, _freeze.default)({
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  GET: 'GET'
});
/**
 * ApiCaller performs the request to the API, with the following
 */

var ApiCaller =
/*#__PURE__*/
function () {
  /**
   * @param {object} opts
   * @param {AxiosInstance} opts.axios
   * @param {string} opts.baseURL
   *
   * @param {Wallet} [opts.wallet] - the initialized {@link Wallet} instance for signing requests/transactions
   * @param {string} [opts.passphrase] - the passphrase of current TokenD network (is used internally when signing transactions)
   */
  function ApiCaller(opts) {
    (0, _classCallCheck2.default)(this, ApiCaller);
    this._axios = opts.axios;
    this._baseURL = opts.baseURL;
    this._wallet = null;
    this._customTimeout = null;
    this._clockDiff = 0;

    if (opts.wallet) {
      this.useWallet(opts.wallet);
    }

    if (opts.passphrase) {
      this.usePassphrase(opts.passphrase);
    }
  }

  (0, _createClass2.default)(ApiCaller, [{
    key: "patch",
    value: function patch(endpoint, query) {
      return this._call(endpoint, query, methods.PATCH);
    }
  }, {
    key: "post",
    value: function post(endpoint, query) {
      return this._call(endpoint, query, methods.POST);
    }
  }, {
    key: "put",
    value: function put(endpoint, query) {
      return this._call(endpoint, query, methods.PUT);
    }
  }, {
    key: "get",
    value: function get(endpoint, query) {
      return this._call(endpoint, query, methods.GET);
    }
  }, {
    key: "getWithSignature",
    value: function getWithSignature(endpoint, query) {
      return this._callWithSignature(endpoint, query, methods.GET);
    }
  }, {
    key: "patchWithSignature",
    value: function patchWithSignature(endpoint, query) {
      return this._callWithSignature(endpoint, query, methods.PATCH);
    }
  }, {
    key: "postWithSignature",
    value: function postWithSignature(endpoint, query) {
      return this._callWithSignature(endpoint, query, methods.POST);
    }
  }, {
    key: "putWithSignature",
    value: function putWithSignature(endpoint, query) {
      return this._callWithSignature(endpoint, query, methods.PUT);
    }
    /**
     * Craft the transaction, sign it and make the post request with it's
     * enveloper to the backend
     * @param operations
     * @returns {Promise<*>}
     */

  }, {
    key: "postOperations",
    value: function postOperations() {
      if (!this._wallet) {
        throw new Error('No wallet found to sign the transaction');
      }

      for (var _len = arguments.length, operations = new Array(_len), _key = 0; _key < _len; _key++) {
        operations[_key] = arguments[_key];
      }

      return this.postTxEnvelope(new _base.TransactionBuilder(this._wallet.accountId).addOperations(operations).addSigner(this._wallet.keypair).build().toEnvelope().toXDR().toString('base64'));
    }
    /**
     * Post a transaction envelope.
     *
     * @param {string} envelope - a transaction envelope to be submitted.
     */

  }, {
    key: "postTxEnvelope",
    value: function () {
      var _postTxEnvelope = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(envelope) {
        var response;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._customTimeout = SUBMIT_TRANSACTION_TIMEOUT;
                _context.next = 3;
                return this.post('/transactions', {
                  tx: envelope
                });

              case 3:
                response = _context.sent;
                this._customTimeout = null;
                return _context.abrupt("return", response);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postTxEnvelope(_x) {
        return _postTxEnvelope.apply(this, arguments);
      }

      return postTxEnvelope;
    }()
    /**
     * Performs a request with signature
     * @private
     */

  }, {
    key: "_callWithSignature",
    value: function _callWithSignature(endpoint, query, method) {
      return this._call(endpoint, query, method, true);
    }
    /**
     * Performs a request
     *
     * @param {string} endpoint - endpoint where to make the call to, e.g. `/accounts`
     * @param query - request query params. See {@link parseQuery} for details
     * @param method - the http method of request
     * @param needSign - defines if will try to sign the request, `false` by default
     *
     * @private
     */

  }, {
    key: "_call",
    value: function () {
      var _call2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(endpoint, query, method) {
        var needSign,
            url,
            config,
            response,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                needSign = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : false;
                url = this._baseURL + endpoint; // TODO: smartly build url

                config = {
                  url: url,
                  method: method,
                  params: query
                };
                config = _middlewares.default.flattenToAxiosJsonApiQuery(config);
                config = _middlewares.default.setJsonapiHeaders(config);

                if (this._customTimeout) {
                  config.timeout = this._customTimeout;
                }

                if (needSign) {
                  config = _middlewares.default.signRequest(config, this._wallet.keypair);
                }

                _context2.prev = 7;
                _context2.next = 10;
                return this._axios(config);

              case 10:
                response = _context2.sent;
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](7);
                throw _middlewares.default.parseJsonapiError(_context2.t0);

              case 16:
                return _context2.abrupt("return", _middlewares.default.parseJsonapiResponse(response));

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 13]]);
      }));

      function _call(_x2, _x3, _x4) {
        return _call2.apply(this, arguments);
      }

      return _call;
    }()
    /**
     * Use a wallet to sign requests and transactions.
     *
     * @param {Wallet} wallet User's wallet.
     */

  }, {
    key: "useWallet",
    value: function useWallet(wallet) {
      if (!(wallet instanceof _wallet.Wallet)) {
        throw new TypeError('A wallet instance expected.');
      }

      this._wallet = wallet;
    }
  }, {
    key: "usePassphrase",
    value: function usePassphrase(networkPassphrase) {
      _base.Network.use(new _base.Network(networkPassphrase));
    }
  }], [{
    key: "getInstance",
    value: function getInstance(baseURL) {
      return new ApiCaller({
        baseURL: baseURL,
        axios: _axios.default.create()
      });
    }
  }, {
    key: "getInstanceWithPassphrase",
    value: function () {
      var _getInstanceWithPassphrase = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(baseURL) {
        var caller, networkDetails;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                caller = this.getInstance(baseURL);
                _context3.next = 3;
                return caller.get('/');

              case 3:
                networkDetails = _context3.sent;
                caller.usePassphrase(networkDetails.data.networkPassphrase);
                return _context3.abrupt("return", caller);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getInstanceWithPassphrase(_x5) {
        return _getInstanceWithPassphrase.apply(this, arguments);
      }

      return getInstanceWithPassphrase;
    }()
  }]);
  return ApiCaller;
}();

exports.ApiCaller = ApiCaller;