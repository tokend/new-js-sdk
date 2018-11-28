"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _axios2 = _interopRequireDefault(require("axios"));

var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));

var _base = require("../base");

var _wallet = require("../wallet");

var _tokend_sdk = require("../tokend_sdk");

var Mocks =
/*#__PURE__*/
function () {
  function Mocks() {
    (0, _classCallCheck2.default)(this, Mocks);
  }

  (0, _createClass2.default)(Mocks, null, [{
    key: "axios",
    value: function axios() {
      var instance = _axios2.default.create();

      var axiosMock = new _axiosMockAdapter.default(instance);
      return {
        axios: instance,
        axiosMock: axiosMock
      };
    }
  }, {
    key: "wallet",
    value: function wallet() {
      var email = 'example@mail.com';

      var keypair = _base.Keypair.fromSecret('SANRZWBGCH6L6PPVW5KFHCETRMP6N3NJJD7F2FS54HTCXHVVXMB4BP2F');

      var accountId = keypair.accountId();
      var walletId = '4274027492374237';
      return new _wallet.Wallet(email, keypair, accountId, walletId);
    }
  }, {
    key: "tokenDSdk",
    value: function tokenDSdk() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$noWallet = _ref.noWallet,
          noWallet = _ref$noWallet === void 0 ? false : _ref$noWallet,
          _ref$legacySignatures = _ref.legacySignatures,
          legacySignatures = _ref$legacySignatures === void 0 ? false : _ref$legacySignatures;

      var sdk = new _tokend_sdk.TokenD('https://example.com', {
        legacySignatures: legacySignatures
      });

      Mocks._mockApiServer(sdk.api);

      Mocks._mockHorizonServer(sdk.horizon);

      if (!noWallet) {
        var wallet = Mocks.wallet();
        sdk.useWallet(wallet);
      }

      return sdk;
    }
  }, {
    key: "_mockApiServer",
    value: function _mockApiServer(server) {
      server = Mocks._mockServerAxios(server);

      server.makeGenericResponse = function () {
        return {
          data: {
            id: 1,
            type: 'generic',
            attributes: {
              foo: 'bar'
            }
          }
        };
      };

      return server;
    }
  }, {
    key: "_mockHorizonServer",
    value: function _mockHorizonServer(server) {
      server = Mocks._mockServerAxios(server);

      server.makeGenericResponse = function () {
        return {
          id: 1
        };
      };

      return server;
    }
  }, {
    key: "_mockServerAxios",
    value: function _mockServerAxios(server) {
      server._axiosMock = new _axiosMockAdapter.default(server._axios); // Add helper interceptors

      server._axios.interceptors.request.use(function (config) {
        if (server._sdk.legacySignatures) {
          config.authorized = !!config.headers['X-AuthSignature'];
        } else {
          config.authorized = !!config.headers['signature'];
        }

        return config;
      }, function (err) {
        return _promise.default.reject(err);
      }); // Proxy axios mock methods


      var methods = ['onGet', 'onPost', 'onPut', 'onPatch', 'onAny'];
      methods.forEach(function (method) {
        server[method] = function () {
          var _server$_axiosMock;

          return (_server$_axiosMock = server._axiosMock)[method].apply(_server$_axiosMock, arguments);
        };
      });

      server.reset = function () {
        return server._axiosMock.reset();
      };

      server.restore = function () {
        return server._axiosMock.restore();
      };

      return server;
    }
  }]);
  return Mocks;
}();

exports.default = Mocks;