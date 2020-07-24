"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.WalletsManager = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get3 = _interopRequireDefault(require("lodash/get"));

var _wallet = require("../../wallet");

var _keypair = require("../../base/keypair");

var _signer = require("./signer");

var _signersManager = require("./signers-manager");

var _apiCaller = require("../api-caller");

var _errors = require("../../errors");

/**
 * Wallets manager.
 */
var WalletsManager =
/*#__PURE__*/
function () {
  /**
   * WalletsManager constructor.
   *
   * @param {ApiCaller} apiCaller ApiCaller instance to process the requests.
   */
  function WalletsManager(apiCaller) {
    (0, _classCallCheck2.default)(this, WalletsManager);

    if (apiCaller) {
      this.useApi(apiCaller);
    }
  }

  (0, _createClass2.default)(WalletsManager, [{
    key: "useApi",
    value: function useApi(api) {
      if (!(api instanceof _apiCaller.ApiCaller)) {
        throw new Error('Is not ApiCaller');
      }

      this._signersManager = new _signersManager.SignersManager(api);
      this._apiCaller = api;
    }
    /**
     * Get key derivation params.
     *
     * @param {string} [email] User's email.
     * @param {boolean} [isRecovery=false] If true, get params for the recovery wallet.
     *
     * @return {Promise.<JsonapiResponse>} KDF params.
     */

  }, {
    key: "getKdfParams",
    value: function getKdfParams(email) {
      var isRecovery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this._apiCaller.get('/kdf', {
        email: email,
        is_recovery: isRecovery
      });
    }
  }, {
    key: "getSignerRoleId",
    value: function getSignerRoleId() {
      return this._apiCaller.get('/v3/key_values/signer_role:default');
    }
    /**
     * Get an encrypted wallet.
     *
     * If verification is required, look for wallet ID in the errors meta:
     * ```js
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
      var _get2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(email, password) {
        var _ref, kdfParams, walletId, walletResponse;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getKdfParams(email);

              case 2:
                _ref = _context.sent;
                kdfParams = _ref.data;
                walletId = _wallet.Wallet.deriveId(email, password, kdfParams, kdfParams.salt);
                _context.prev = 5;
                _context.next = 8;
                return this._apiCaller.get("/wallets/".concat(walletId));

              case 8:
                walletResponse = _context.sent;
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](5);

                // HACK: expose wallet Id to allow resend email
                if (_context.t0 instanceof _errors.VerificationRequiredError) {
                  (0, _set2.default)(_context.t0, '_meta.walletId', walletId);
                }

                throw _context.t0;

              case 15:
                return _context.abrupt("return", _wallet.Wallet.fromEncrypted({
                  keychainData: walletResponse.data.keychainData,
                  kdfParams: kdfParams,
                  salt: kdfParams.salt,
                  email: email,
                  password: password,
                  accountId: walletResponse.data.accountId,
                  sessionId: walletResponse.data.session.id,
                  sessionKey: walletResponse.data.session.encryptionKey
                }));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 11]]);
      }));

      function get(_x, _x2) {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Create a wallet.
     *
     * @param {string} email User's email.
     * @param {string} password User's password.
     * @param {Array} [signers] array of {@link Signer}
     *
     * @return {Promise.<object>} User's wallet.
     */

  }, {
    key: "createWithSigners",
    value: function () {
      var _createWithSigners = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(email, password) {
        var signers,
            _ref2,
            kdfParams,
            _ref3,
            roleId,
            mainWallet,
            encryptedMainWallet,
            secondFactorWallet,
            encryptedSecondFactorWallet,
            defaultSigner,
            relationshipsSigners,
            response,
            walletWithSession,
            _args2 = arguments;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                signers = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : [];
                signers.forEach(function (item) {
                  if (!(item instanceof _signer.Signer)) {
                    throw new TypeError('A signer instance expected.');
                  }
                });
                _context2.next = 4;
                return this.getKdfParams('');

              case 4:
                _ref2 = _context2.sent;
                kdfParams = _ref2.data;
                _context2.next = 8;
                return this.getSignerRoleId();

              case 8:
                _ref3 = _context2.sent;
                roleId = _ref3.data;
                mainWallet = _wallet.Wallet.generate(email);
                encryptedMainWallet = mainWallet.encrypt(kdfParams, password);
                secondFactorWallet = _wallet.Wallet.generate(email);
                encryptedSecondFactorWallet = secondFactorWallet.encrypt(kdfParams, password);
                defaultSigner = new _signer.Signer({
                  id: mainWallet.accountId,
                  roleId: roleId.value.u32,
                  weight: 1000,
                  identity: 1
                });
                signers.push(defaultSigner);
                relationshipsSigners = signers.map(function (item) {
                  return {
                    type: item.type,
                    id: item.id
                  };
                });
                _context2.next = 19;
                return this._apiCaller.post('/wallets', {
                  data: {
                    type: 'wallet',
                    id: encryptedMainWallet.id,
                    attributes: {
                      email: email,
                      salt: encryptedMainWallet.salt,
                      account_id: encryptedMainWallet.accountId,
                      keychain_data: encryptedMainWallet.keychainData
                    },
                    relationships: {
                      kdf: {
                        data: {
                          type: kdfParams.type,
                          id: kdfParams.id
                        }
                      },
                      factor: {
                        data: {
                          type: 'password',
                          id: encryptedMainWallet.id
                        }
                      },
                      signers: {
                        data: relationshipsSigners
                      }
                    }
                  },
                  included: [{
                    type: 'password',
                    id: encryptedMainWallet.id,
                    attributes: {
                      account_id: secondFactorWallet.accountId,
                      keychain_data: encryptedSecondFactorWallet.keychainData,
                      salt: encryptedSecondFactorWallet.salt
                    }
                  }].concat((0, _toConsumableArray2.default)(signers))
                });

              case 19:
                response = _context2.sent;
                walletWithSession = new _wallet.Wallet(mainWallet.email, mainWallet.keypair, (0, _get3.default)(response, 'data.accountId'), mainWallet.id, (0, _get3.default)(response, 'data.session.id'), (0, _get3.default)(response, 'data.session.encryptionKey'));
                return _context2.abrupt("return", {
                  wallet: walletWithSession,
                  response: response
                });

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createWithSigners(_x3, _x4) {
        return _createWithSigners.apply(this, arguments);
      }

      return createWithSigners;
    }()
    /**
     * Create a wallet.
     *
     * @param {string} email User's email.
     * @param {string} password User's password.
     * @param {Keypair} recoveryKeypair the keypair to later recover the account
     * @param {string} [referrerId] public key of the referrer
     *
     * @return {Promise.<object>} User's wallet and a recovery seed.
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(email, password, recoveryKeypair) {
        var referrerId,
            walletRecoveryKeypair,
            recoverySigner,
            wallet,
            _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                referrerId = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : '';
                walletRecoveryKeypair = recoveryKeypair || _keypair.Keypair.random();
                recoverySigner = new _signer.Signer({
                  id: walletRecoveryKeypair.accountId(),
                  roleId: 1,
                  weight: 1000,
                  identity: 1
                });
                _context3.next = 5;
                return this.createWithSigners(email, password, [recoverySigner]);

              case 5:
                wallet = _context3.sent;
                wallet.recoverySeed = walletRecoveryKeypair.secret();
                return _context3.abrupt("return", wallet);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function create(_x5, _x6, _x7) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Verify email.
     *
     * @param {string} payload Base64 encoded payload from the email link.
     *
     * @return {Promise.<JsonapiResponse>} Wallet verification request response.
     */

  }, {
    key: "verifyEmail",
    value: function verifyEmail(payload) {
      var decodedPayload = Buffer.from(payload, 'base64').toString('utf8');
      var jsonPayload = JSON.parse(decodedPayload);
      var endpoint = "/wallets/".concat(jsonPayload.meta.wallet_id, "/verification");
      return this._apiCaller.put(endpoint, {
        data: {
          type: 'wallet_verification',
          attributes: {
            token: jsonPayload.meta.token
          }
        }
      });
    }
    /**
     * Re-send verification email.
     *
     * @param {string} [walletId] ID of the wallet to resend email for.
     *
     * @return {Promise.<JsonapiResponse>} Verification request response.
     */

  }, {
    key: "resendEmail",
    value: function resendEmail(walletId) {
      var verificationWalletId = walletId || this._apiCaller.wallet.id;
      var endpoint = "/wallets/".concat(verificationWalletId, "/verification");
      return this._apiCaller.post(endpoint);
    }
    /**
     * Recover a wallet using the recovery seed.
     * @deprecated Use {@link kycRecovery}
     *
     * @param {string} email User's email.
     * @param {string} recoverySeed User's recovery seed.
     * @param {string} newPassword Desired password.
     *
     * @return {Promise.<Wallet>} New wallet.
     */

  }, {
    key: "recovery",
    value: function () {
      var _recovery = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(email, recoverySeed, newPassword) {
        var _ref4, kdfParams, accountId, recoveryWallet, newMainWallet, encryptedNewMainWallet, newSecondFactorWallet, encryptedSecondFactorWallet, tx, endpoint;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getKdfParams(email, true);

              case 2:
                _ref4 = _context4.sent;
                kdfParams = _ref4.data;
                _context4.next = 6;
                return this._getAccountIdByEmail(email);

              case 6:
                accountId = _context4.sent;
                recoveryWallet = _wallet.Wallet.fromRecoverySeed(kdfParams, kdfParams.salt, email, recoverySeed);
                newMainWallet = _wallet.Wallet.generate(email, accountId);
                encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword);
                newSecondFactorWallet = _wallet.Wallet.generate(email, accountId);
                encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(kdfParams, newPassword);
                _context4.next = 14;
                return this._signersManager.createChangeSignerTransaction({
                  newPublicKey: newMainWallet.keypair.accountId(),
                  signingKeypair: recoveryWallet.keypair,
                  sourceAccount: accountId
                });

              case 14:
                tx = _context4.sent;

                this._apiCaller.useWallet(recoveryWallet);

                endpoint = "/wallets/".concat(recoveryWallet.id);
                _context4.next = 19;
                return this._apiCaller.putWithSignature(endpoint, {
                  data: {
                    type: 'wallet',
                    id: encryptedNewMainWallet.id,
                    attributes: {
                      email: email,
                      account_id: encryptedNewMainWallet.accountId,
                      salt: encryptedNewMainWallet.salt,
                      keychain_data: encryptedNewMainWallet.keychainData
                    },
                    relationships: {
                      transaction: {
                        data: {
                          type: 'transaction',
                          id: '1'
                        }
                      },
                      kdf: {
                        data: {
                          type: kdfParams.type,
                          id: kdfParams.id
                        }
                      },
                      factor: {
                        data: {
                          type: 'password',
                          id: encryptedNewMainWallet.id
                        }
                      }
                    }
                  },
                  included: [{
                    type: 'transaction',
                    id: '1',
                    attributes: {
                      envelope: tx
                    }
                  }, {
                    id: encryptedNewMainWallet.id,
                    type: 'password',
                    attributes: {
                      account_id: encryptedSecondFactorWallet.accountId,
                      keychain_data: encryptedSecondFactorWallet.keychainData,
                      salt: encryptedSecondFactorWallet.salt
                    }
                  }]
                });

              case 19:
                return _context4.abrupt("return", newMainWallet);

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function recovery(_x8, _x9, _x10) {
        return _recovery.apply(this, arguments);
      }

      return recovery;
    }()
    /**
     * Recover a wallet using the kyc recovery.
     *
     * @param {string} email User's email.
     * @param {string} newPassword Desired password.
     *
     * @return {Promise.<Wallet>} New wallet.
     */

  }, {
    key: "kycRecovery",
    value: function () {
      var _kycRecovery = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(email, newPassword) {
        var _ref5, kdfParams, newMainWallet, encryptedNewMainWallet, newSecondFactorWallet, encryptedSecondFactorWallet, endpoint;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getKdfParams(email, true);

              case 2:
                _ref5 = _context5.sent;
                kdfParams = _ref5.data;
                newMainWallet = _wallet.Wallet.generate(email);
                encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword);
                newSecondFactorWallet = _wallet.Wallet.generate(email);
                encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(kdfParams, newPassword);

                this._apiCaller.useWallet(newMainWallet);

                endpoint = "/wallets/".concat(encryptedNewMainWallet.id);
                _context5.next = 12;
                return this._apiCaller.putWithSignature(endpoint, {
                  data: {
                    type: 'recovery-wallet',
                    id: encryptedNewMainWallet.id,
                    attributes: {
                      email: email,
                      salt: encryptedNewMainWallet.salt,
                      keychain_data: encryptedNewMainWallet.keychainData
                    },
                    relationships: {
                      kdf: {
                        data: {
                          type: kdfParams.type,
                          id: kdfParams.id
                        }
                      },
                      factor: {
                        data: {
                          type: 'password',
                          id: encryptedNewMainWallet.id
                        }
                      },
                      signer: {
                        data: {
                          type: 'signer',
                          id: encryptedNewMainWallet.accountId
                        }
                      }
                    }
                  },
                  included: [{
                    id: encryptedNewMainWallet.id,
                    type: 'password',
                    attributes: {
                      account_id: encryptedSecondFactorWallet.accountId,
                      keychain_data: encryptedSecondFactorWallet.keychainData,
                      salt: encryptedSecondFactorWallet.salt
                    }
                  }]
                });

              case 12:
                return _context5.abrupt("return", newMainWallet);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function kycRecovery(_x11, _x12) {
        return _kycRecovery.apply(this, arguments);
      }

      return kycRecovery;
    }()
    /**
     * Change password.
     *
     * @param {string} newPassword Desired password.
     *
     * @return {Promise.<Wallet>} New wallet.
     */

  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(newPassword) {
        var oldWallet, _ref6, kdfParams, newMainWallet, encryptedNewMainWallet, newSecondFactorWallet, encryptedSecondFactorWallet, tx, endpoint;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                oldWallet = this._apiCaller.wallet;
                _context6.next = 3;
                return this.getKdfParams(oldWallet.email, true);

              case 3:
                _ref6 = _context6.sent;
                kdfParams = _ref6.data;
                newMainWallet = _wallet.Wallet.generate(oldWallet.email, oldWallet.accountId);
                encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword);
                newSecondFactorWallet = _wallet.Wallet.generate(oldWallet.email);
                encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(kdfParams, newPassword);
                _context6.next = 11;
                return this._signersManager.createChangeSignerTransaction({
                  newPublicKey: newMainWallet.keypair.accountId(),
                  signingKeypair: oldWallet.keypair,
                  sourceAccount: oldWallet.accountId,
                  signerToReplace: oldWallet.keypair.accountId()
                });

              case 11:
                tx = _context6.sent;
                endpoint = "/wallets/".concat(oldWallet.id);
                _context6.next = 15;
                return this._apiCaller.putWithSignature(endpoint, {
                  data: {
                    type: 'wallet',
                    id: encryptedNewMainWallet.id,
                    attributes: {
                      email: oldWallet.email,
                      account_id: newMainWallet.keypair.accountId(),
                      salt: encryptedNewMainWallet.salt,
                      keychain_data: encryptedNewMainWallet.keychainData
                    },
                    relationships: {
                      transaction: {
                        data: {
                          type: 'transaction',
                          id: '1'
                        }
                      },
                      kdf: {
                        data: {
                          type: kdfParams.type,
                          id: kdfParams.id
                        }
                      },
                      factor: {
                        data: {
                          type: 'password',
                          id: encryptedNewMainWallet.id
                        }
                      }
                    }
                  },
                  included: [{
                    type: 'transaction',
                    id: '1',
                    attributes: {
                      envelope: tx
                    }
                  }, {
                    type: 'password',
                    id: encryptedNewMainWallet.id,
                    attributes: {
                      account_id: encryptedSecondFactorWallet.accountId,
                      keychain_data: encryptedSecondFactorWallet.keychainData,
                      salt: encryptedSecondFactorWallet.salt
                    }
                  }]
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

      function changePassword(_x13) {
        return _changePassword.apply(this, arguments);
      }

      return changePassword;
    }()
    /**
     * Get user account ID by provided recovery wallet ID.
     *
     * @param {string} recoveryWalletId ID of recovery wallet.
     *
     * @return {Promise.<string>} User's account ID.
     */

  }, {
    key: "_getAccountIdByRecoveryId",
    value: function () {
      var _getAccountIdByRecoveryId2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(recoveryWalletId) {
        var endpoint, _ref7, wallet;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                endpoint = "/wallets/".concat(recoveryWalletId);
                _context7.next = 3;
                return this._apiCaller.get(endpoint);

              case 3:
                _ref7 = _context7.sent;
                wallet = _ref7.data;
                return _context7.abrupt("return", wallet.accountId);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _getAccountIdByRecoveryId(_x14) {
        return _getAccountIdByRecoveryId2.apply(this, arguments);
      }

      return _getAccountIdByRecoveryId;
    }()
    /**
     * Get user account ID by email.
     *
     * @param {string} email account email.
     *
     * @return {Promise.<string>} User's account ID.
     */

  }, {
    key: "_getAccountIdByEmail",
    value: function () {
      var _getAccountIdByEmail2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8(email) {
        var _ref8, data;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._apiCaller.get('/identities', {
                  filter: {
                    identifier: email
                  },
                  page: {
                    limit: 1
                  }
                });

              case 2:
                _ref8 = _context8.sent;
                data = _ref8.data;
                return _context8.abrupt("return", (0, _get3.default)(data[0], 'address'));

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _getAccountIdByEmail(_x15) {
        return _getAccountIdByEmail2.apply(this, arguments);
      }

      return _getAccountIdByEmail;
    }()
  }]);
  return WalletsManager;
}();

exports.WalletsManager = WalletsManager;