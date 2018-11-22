"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Factors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

var _wallet = require("../../wallet");

/**
 * TFA factors.
 */
var Factors =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Factors, _ResourceGroupBase);

  function Factors() {
    (0, _classCallCheck2.default)(this, Factors);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Factors).apply(this, arguments));
  }

  (0, _createClass2.default)(Factors, [{
    key: "getAll",

    /**
     * Get all TFA factors.
     *
     * @return {ApiResponse} Factors;
     */
    value: function getAll() {
      return this._makeCallBuilder().get();
    }
    /**
     * Create a TOTP factor.
     *
     *
     */

  }, {
    key: "createTotpFactor",
    value: function createTotpFactor() {
      return this._makeCallBuilderWithSignature().post({
        data: {
          type: 'totp'
        }
      });
    }
    /**
     * Change the factor priority.
     * Every factor with priority > 0 considered enabled.
     *
     * @param {string} factorId ID of the factor to be updated.
     * @param {Number} priority Desired factor priority.
     * @return {ApiResponse} Response.
     */

  }, {
    key: "changePriority",
    value: function changePriority(factorId, priority) {
      return this._makeCallBuilderWithSignature().appendUrlSegment(factorId).patch({
        data: {
          attributes: {
            priority: priority
          }
        }
      });
    }
    /**
     * Delete the factor.
     *
     * @param {string} factorId ID of the factor to be deleted.
     * @return {ApiResponse} Response.
     */

  }, {
    key: "delete",
    value: function _delete(factorId) {
      return this._makeCallBuilderWithSignature().appendUrlSegment(factorId).delete();
    }
    /**
     * Verify password factor and retry the failed request.
     *
     * @param {TFAError} tfaError TFA error instance.
     * @param {string} password User's password.
     *
     * @return {ResponseBase} Response of the retried request.
     */

  }, {
    key: "verifyPasswordFactorAndRetry",
    value: function () {
      var _verifyPasswordFactorAndRetry = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(tfaError, password) {
        var meta, email, kdfParams, factorWallet, otp;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                meta = tfaError.meta;
                email = this._sdk.wallet.email;
                _context.next = 4;
                return this._getKdfParams(email);

              case 4:
                kdfParams = _context.sent;
                factorWallet = _wallet.Wallet.fromEncrypted(meta.keychainData, kdfParams, meta.salt, email, password);
                otp = factorWallet.keypair.sign(meta.token).toString('base64');
                _context.next = 9;
                return this._makeCallBuilder(meta.walletId).appendUrlSegment([meta.factorId, 'verification']).put({
                  data: {
                    attributes: {
                      token: meta.token,
                      otp: otp
                    }
                  }
                });

              case 9:
                return _context.abrupt("return", tfaError.retryFailedRequest());

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function verifyPasswordFactorAndRetry(_x, _x2) {
        return _verifyPasswordFactorAndRetry.apply(this, arguments);
      };
    }()
    /**
     * Verify TOTP factor and retry the failed request.
     *
     * @param {TFAError} tfaError TFA error instance.
     * @param {string} otp One time password from a TOTP app.
     *
     * @return {ResponseBase} Response of the retried request.
     */

  }, {
    key: "verifyTotpFactorAndRetry",
    value: function () {
      var _verifyTotpFactorAndRetry = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(tfaError, otp) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._makeCallBuilder(tfaError.meta.walletId).appendUrlSegment([tfaError.meta.factorId, 'verification']).put({
                  data: {
                    attributes: {
                      token: tfaError.meta.token,
                      otp: otp
                    }
                  }
                });

              case 2:
                return _context2.abrupt("return", tfaError.retryFailedRequest());

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function verifyTotpFactorAndRetry(_x3, _x4) {
        return _verifyTotpFactorAndRetry.apply(this, arguments);
      };
    }()
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder(walletId) {
      walletId = walletId || this._sdk.wallet.id;
      return this._server._makeCallBuilder().appendUrlSegment('wallets').appendUrlSegment(walletId).appendUrlSegment('factors');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }, {
    key: "_getKdfParams",
    value: function () {
      var _getKdfParams2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(email) {
        var kdfResponse;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._sdk.api.wallets.getKdfParams(email);

              case 2:
                kdfResponse = _context3.sent;
                return _context3.abrupt("return", kdfResponse.data);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function _getKdfParams(_x5) {
        return _getKdfParams2.apply(this, arguments);
      };
    }()
  }]);
  return Factors;
}(_resource_group_base.ResourceGroupBase);

exports.Factors = Factors;