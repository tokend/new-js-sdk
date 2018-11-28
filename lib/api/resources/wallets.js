"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallets = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _lodash = require("lodash");

var _resource_group_base = require("../../resource_group_base");

var _wallet = require("../../wallet");

var _keypair = require("../../base/keypair");

var _change_signers = require("./change_signers");

var errors = _interopRequireWildcard(require("../errors"));

var _horizon = require("../../horizon");

/**
 * Wallets.
 */
var Wallets =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Wallets, _ResourceGroupBase);

  function Wallets() {
    (0, _classCallCheck2.default)(this, Wallets);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Wallets).apply(this, arguments));
  }

  (0, _createClass2.default)(Wallets, [{
    key: "getKdfParams",

    /**
     * Get key derivation params.
     *
     * @param {string} [email] User's email.
     * @param {boolean} [isRecovery=false] If true, get params for the recovery wallet.
     */
    value: function getKdfParams(email) {
      var isRecovery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this._makeCallBuilder().appendUrlSegment('kdf').get({
        email: email,
        isRecovery: isRecovery
      });
    }
    /**
     * Get an encrypted wallet.
     *
     * If verification is required, look for wallet ID in the errors meta:
     * ```
     * err.meta.walletId
     * ```
     *
     * @param {string} email User's email.
     * @param {string} password User's password.
     *
     * @return {Promise.<Wallet>} User's wallet.
     */

  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(email, password) {
        var kdfResponse, kdfParams, walletId, walletResponse, verificationRequired;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getKdfParams(email);

              case 2:
                kdfResponse = _context.sent;
                kdfParams = kdfResponse.data;
                walletId = _wallet.Wallet.deriveId(email, password, kdfParams, kdfParams.salt);
                _context.prev = 5;
                _context.next = 8;
                return this._makeWalletsCallBuilder().appendUrlSegment(walletId).get();

              case 8:
                walletResponse = _context.sent;
                _context.next = 16;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](5);
                // HACK: expose wallet Id to allow resend email
                verificationRequired = _context.t0 instanceof errors.VerificationRequiredError;

                if (verificationRequired) {
                  (0, _lodash.set)(_context.t0.errors[0], 'meta.walletId', walletId);
                }

                throw _context.t0;

              case 16:
                return _context.abrupt("return", _wallet.Wallet.fromEncrypted(walletResponse.data.keychainData, kdfParams, kdfParams.salt, email, password));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 11]]);
      }));

      return function get(_x, _x2) {
        return _get.apply(this, arguments);
      };
    }()
    /**
     * Create a wallet.
     *
     * @param {string} email User's email.
     * @param {string} password User's password.
     *
     * @return {Promise.<object>} User's wallet and a recovery seed.
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(email, password) {
        var kdfResponse, kdfParams, mainWallet, encryptedMainWallet, secondFactorWallet, encryptedSecondFactorWallet, recoveryKeypair, encryptedRecoveryWallet;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getKdfParams();

              case 2:
                kdfResponse = _context2.sent;
                kdfParams = kdfResponse.data;
                mainWallet = _wallet.Wallet.generate(email);
                encryptedMainWallet = mainWallet.encrypt(kdfParams, password);
                secondFactorWallet = _wallet.Wallet.generate(email);
                encryptedSecondFactorWallet = secondFactorWallet.encrypt(kdfParams, password);
                recoveryKeypair = _keypair.Keypair.random();
                encryptedRecoveryWallet = mainWallet.encryptRecoveryData(kdfParams, recoveryKeypair);
                _context2.next = 12;
                return this._makeWalletsCallBuilder().post({
                  data: {
                    type: 'wallet',
                    id: encryptedMainWallet.id,
                    attributes: {
                      accountId: encryptedMainWallet.accountId,
                      keychainData: encryptedMainWallet.keychainData,
                      email: email,
                      salt: encryptedMainWallet.salt
                    },
                    relationships: {
                      kdf: {
                        data: {
                          type: kdfParams.resourceType,
                          id: kdfParams.id
                        }
                      },
                      recovery: {
                        data: {
                          type: 'recovery',
                          id: encryptedRecoveryWallet.id,
                          attributes: {
                            accountId: encryptedRecoveryWallet.accountId,
                            keychainData: encryptedRecoveryWallet.keychainData,
                            salt: encryptedRecoveryWallet.salt
                          }
                        }
                      },
                      factor: {
                        data: {
                          type: 'password',
                          attributes: {
                            accountId: secondFactorWallet.accountId,
                            keychainData: encryptedSecondFactorWallet.keychainData,
                            salt: encryptedSecondFactorWallet.salt
                          }
                        }
                      }
                    }
                  }
                });

              case 12:
                return _context2.abrupt("return", {
                  wallet: mainWallet,
                  recoverySeed: recoveryKeypair.secret()
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function create(_x3, _x4) {
        return _create.apply(this, arguments);
      };
    }()
    /**
     * Verify email.
     *
     * @param {string} payload Base64 encoded payload from the email link.
     */

  }, {
    key: "verifyEmail",
    value: function () {
      var _verifyEmail = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(payload) {
        var decodedPayload, jsonPayload;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                decodedPayload = Buffer.from(payload, 'base64').toString('utf8');
                jsonPayload = JSON.parse(decodedPayload);
                return _context3.abrupt("return", this._makeWalletsCallBuilder().appendUrlSegment(jsonPayload.meta.wallet_id).appendUrlSegment('verification').put({
                  data: {
                    attributes: {
                      token: jsonPayload.meta.token
                    }
                  }
                }));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function verifyEmail(_x5) {
        return _verifyEmail.apply(this, arguments);
      };
    }()
    /**
     * Re-send verification email.
     *
     * @param {string} [walletId] ID of the wallet to resend email for.
     */

  }, {
    key: "resendEmail",
    value: function () {
      var _resendEmail = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(walletId) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                walletId = walletId || this._sdk.wallet.id;
                return _context4.abrupt("return", this._makeWalletsCallBuilder().appendUrlSegment(walletId).appendUrlSegment('verification').post());

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function resendEmail(_x6) {
        return _resendEmail.apply(this, arguments);
      };
    }()
    /**
     * Recover a wallet using the recovery seed.
     *
     * @param {string} email User's email.
     * @param {string} recoverySeed User's recovery seed.
     * @param {string} newPassword Desired password.
     *
     * @return {Wallet} New wallet.
     */

  }, {
    key: "recovery",
    value: function () {
      var _recovery = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(email, recoverySeed, newPassword) {
        var kdfResponse, kdfParams, recoveryWallet, newMainWallet, encryptedNewMainWallet, newSecondFactorWallet, encryptedSecondFactorWallet, accountId, signers, tx;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getKdfParams(email, true);

              case 2:
                kdfResponse = _context5.sent;
                kdfParams = kdfResponse.data;
                recoveryWallet = _wallet.Wallet.fromRecoverySeed(kdfParams, kdfParams.salt, email, recoverySeed);
                newMainWallet = _wallet.Wallet.generate(email);
                encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword);
                newSecondFactorWallet = _wallet.Wallet.generate(email);
                encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(kdfParams, newPassword);
                _context5.next = 11;
                return this._getAccountIdByRecoveryId(recoveryWallet.id);

              case 11:
                accountId = _context5.sent;
                _context5.next = 14;
                return this._getSigners(accountId);

              case 14:
                signers = _context5.sent;
                tx = (0, _change_signers.makeChangeSignerTransaction)({
                  newPublicKey: newMainWallet.accountId,
                  signers: signers,
                  signingKeypair: recoveryWallet.keypair,
                  soucreAccount: accountId
                });
                _context5.next = 18;
                return this._makeWalletsCallBuilder().appendUrlSegment(recoveryWallet.id).withSignature(recoveryWallet).put({
                  data: {
                    type: 'wallet',
                    id: encryptedNewMainWallet.id,
                    attributes: {
                      email: email,
                      accountId: encryptedNewMainWallet.accountId,
                      salt: encryptedNewMainWallet.salt,
                      keychainData: encryptedNewMainWallet.keychainData
                    },
                    relationships: {
                      transaction: {
                        data: {
                          attributes: {
                            envelope: tx
                          }
                        }
                      },
                      kdf: {
                        data: {
                          type: kdfParams.resourceType,
                          id: kdfParams.id
                        }
                      },
                      factor: {
                        data: {
                          type: 'password',
                          attributes: {
                            accountId: encryptedSecondFactorWallet.accountId,
                            keychainData: encryptedSecondFactorWallet.keychainData,
                            salt: encryptedSecondFactorWallet.salt
                          }
                        }
                      }
                    }
                  }
                });

              case 18:
                return _context5.abrupt("return", newMainWallet);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function recovery(_x7, _x8, _x9) {
        return _recovery.apply(this, arguments);
      };
    }()
    /**
     * Change password.
     *
     * @param {string} newPassword Desired password.
     * @return {Wallet} New wallet.
     */

  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(newPassword) {
        var oldWallet, kdfResponse, kdfParams, newMainWallet, encryptedNewMainWallet, newSecondFactorWallet, encryptedSecondFactorWallet, signers, tx;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                oldWallet = this._sdk.wallet;
                _context6.next = 3;
                return this.getKdfParams(oldWallet.email, true);

              case 3:
                kdfResponse = _context6.sent;
                kdfParams = kdfResponse.data;
                newMainWallet = _wallet.Wallet.generate(oldWallet.email, oldWallet.accountId);
                encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword);
                newSecondFactorWallet = _wallet.Wallet.generate(oldWallet.email);
                encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(kdfParams, newPassword);
                _context6.next = 11;
                return this._getSigners(this._sdk.wallet.accountId);

              case 11:
                signers = _context6.sent;
                tx = (0, _change_signers.makeChangeSignerTransaction)({
                  newPublicKey: oldWallet.accountId,
                  signers: signers,
                  signingKeypair: oldWallet.keypair,
                  soucreAccount: oldWallet.accountId,
                  signerToReplace: oldWallet.keypair.accountId()
                });
                _context6.next = 15;
                return this._makeWalletsCallBuilder().appendUrlSegment(oldWallet.id).withSignature(oldWallet).put({
                  data: {
                    type: 'wallet',
                    id: encryptedNewMainWallet.id,
                    attributes: {
                      email: oldWallet.email,
                      accountId: encryptedNewMainWallet.accountId,
                      salt: encryptedNewMainWallet.salt,
                      keychainData: encryptedNewMainWallet.keychainData
                    },
                    relationships: {
                      transaction: {
                        data: {
                          attributes: {
                            envelope: tx
                          }
                        }
                      },
                      kdf: {
                        data: {
                          type: kdfParams.resourceType,
                          id: kdfParams.id
                        }
                      },
                      factor: {
                        data: {
                          type: 'password',
                          attributes: {
                            accountId: encryptedSecondFactorWallet.accountId,
                            keychainData: encryptedSecondFactorWallet.keychainData,
                            salt: encryptedSecondFactorWallet.salt
                          }
                        }
                      }
                    }
                  }
                });

              case 15:
                return _context6.abrupt("return", newMainWallet);

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function changePassword(_x10) {
        return _changePassword.apply(this, arguments);
      };
    }()
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder();
    }
  }, {
    key: "_makeWalletsCallBuilder",
    value: function _makeWalletsCallBuilder() {
      return this._makeCallBuilder().appendUrlSegment('wallets');
    }
  }, {
    key: "_getSigners",
    value: function _getSigners(accountId) {
      return this._sdk.horizon.account.getSigners(accountId).then(function (response) {
        return response.data.signers;
      }).catch(function (err) {
        if (err instanceof _horizon.errors.NotFoundError) {
          return [];
        }

        return _promise.default.reject(err);
      });
    }
  }, {
    key: "_getAccountIdByRecoveryId",
    value: function () {
      var _getAccountIdByRecoveryId2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(recoveryWalletId) {
        var wallet;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._makeWalletsCallBuilder().appendUrlSegment(recoveryWalletId).get({});

              case 2:
                wallet = _context7.sent;
                return _context7.abrupt("return", wallet.data.accountId);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function _getAccountIdByRecoveryId(_x11) {
        return _getAccountIdByRecoveryId2.apply(this, arguments);
      };
    }()
  }]);
  return Wallets;
}(_resource_group_base.ResourceGroupBase);

exports.Wallets = Wallets;