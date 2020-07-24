"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.FactorsManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _wallet = require("../../wallet");

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _apiCaller = require("../api-caller");

/**
 * Factors manager.
 */
var FactorsManager =
/*#__PURE__*/
function () {
  /**
   * FactorsManager constructor.
   *
   * @param {ApiCaller} apiCaller ApiCaller instance to process the requests.
   */
  function FactorsManager(apiCaller) {
    (0, _classCallCheck2.default)(this, FactorsManager);

    if (apiCaller) {
      this.useApi(apiCaller);
    }
  }

  (0, _createClass2.default)(FactorsManager, [{
    key: "useApi",
    value: function useApi(api) {
      if (!(api instanceof _apiCaller.ApiCaller)) {
        throw new Error('Is not ApiCaller');
      }

      this._apiCaller = api;
    }
    /**
     * Verify password factor and retry the failed request.
     *
     * @param {TFARequiredError} tfaError TFA error instance.
     * @param {string} password User's password.
     *
     * @return {Promise.<JsonapiResponse>} Response of the retried request.
     */

  }, {
    key: "verifyPasswordFactorAndRetry",
    value: function () {
      var _verifyPasswordFactorAndRetry = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(tfaError, password) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.verifyPasswordFactor(tfaError, password);

              case 2:
                return _context.abrupt("return", this._retryFailedRequest(tfaError));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function verifyPasswordFactorAndRetry(_x, _x2) {
        return _verifyPasswordFactorAndRetry.apply(this, arguments);
      }

      return verifyPasswordFactorAndRetry;
    }()
    /**
     * Verify password factor.
     *
     * @param {TFARequiredError} tfaError TFA error instance.
     * @param {string} password User's password.
     *
     * @return {Promise.<JsonapiResponse>} Response of verification request.
     */

  }, {
    key: "verifyPasswordFactor",
    value: function () {
      var _verifyPasswordFactor = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(tfaError, password) {
        var meta, email, accountId, _ref, kdfParams, factorWallet, otp, walletId, endpoint;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                meta = tfaError.meta;
                email = this._apiCaller.wallet.email;
                accountId = this._apiCaller.wallet.accountId;
                _context2.next = 5;
                return this._getKdfParams(email);

              case 5:
                _ref = _context2.sent;
                kdfParams = _ref.data;
                factorWallet = _wallet.Wallet.fromEncrypted({
                  keychainData: meta.keychainData,
                  kdfParams: kdfParams,
                  salt: meta.salt,
                  email: email,
                  password: password,
                  accountId: accountId
                });
                otp = factorWallet.keypair.sign(meta.token).toString('base64');
                walletId = this._apiCaller.wallet.id;
                endpoint = "/wallets/".concat(walletId, "/factors/").concat(meta.factorId, "/verification");
                return _context2.abrupt("return", this._apiCaller.put(endpoint, {
                  data: {
                    attributes: {
                      token: meta.token,
                      otp: otp
                    }
                  }
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function verifyPasswordFactor(_x3, _x4) {
        return _verifyPasswordFactor.apply(this, arguments);
      }

      return verifyPasswordFactor;
    }()
    /**
     * Verify TOTP factor and retry the failed request.
     *
     * @param {TFARequiredError} tfaError TFA error instance.
     * @param {string} otp One time password from a TOTP app.
     *
     * @return {Promise.<JsonapiResponse>} Response of the retried request.
     */

  }, {
    key: "verifyTotpFactorAndRetry",
    value: function () {
      var _verifyTotpFactorAndRetry = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(tfaError, otp) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.verifyTotpFactor(tfaError, otp);

              case 2:
                return _context3.abrupt("return", this._retryFailedRequest(tfaError));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function verifyTotpFactorAndRetry(_x5, _x6) {
        return _verifyTotpFactorAndRetry.apply(this, arguments);
      }

      return verifyTotpFactorAndRetry;
    }()
    /**
     * Verify TOTP factor.
     *
     * @param {TFARequiredError} tfaError TFA error instance.
     * @param {string} otp One time password from a TOTP app.
     *
     * @return {Promise.<JsonapiResponse>} Response of verification request.
     */

  }, {
    key: "verifyTotpFactor",
    value: function verifyTotpFactor(tfaError, otp) {
      var walletId = tfaError.meta.walletId;
      var factorId = tfaError.meta.factorId;
      var endpoint = "/wallets/".concat(walletId, "/factors/").concat(factorId, "/verification");
      return this._apiCaller.put(endpoint, {
        data: {
          attributes: {
            token: tfaError.meta.token,
            otp: otp
          }
        }
      });
    }
    /**
     * Performs failed request and parses response/error.
     *
     * @param {TFARequiredError} error TFA error instance.
     *
     * @return {Promise.<JsonapiResponse>} Response of retried request.
     */

  }, {
    key: "_retryFailedRequest",
    value: function () {
      var _retryFailedRequest2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(error) {
        var response;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return error.retryRequest();

              case 3:
                response = _context4.sent;
                _context4.next = 9;
                break;

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                throw _middlewares.default.parseJsonapiError(_context4.t0);

              case 9:
                response = _middlewares.default.parseJsonapiResponse(response);
                return _context4.abrupt("return", response);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 6]]);
      }));

      function _retryFailedRequest(_x7) {
        return _retryFailedRequest2.apply(this, arguments);
      }

      return _retryFailedRequest;
    }()
    /**
     * Performs failed request and parses response/error.
     *
     * @param {string} email Email for getting KDF params.
     *
     * @return {Promise.<JsonapiResponse>} KDF request response.
     */

  }, {
    key: "_getKdfParams",
    value: function _getKdfParams(email) {
      return this._apiCaller.get('/kdf', {
        email: email
      });
    }
  }]);
  return FactorsManager;
}();

exports.FactorsManager = FactorsManager;