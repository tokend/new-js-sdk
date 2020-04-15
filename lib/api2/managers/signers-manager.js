"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.SignersManager = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _transaction_builder = require("../../base/transaction_builder");

var _manage_signer_builder = require("../../base/operations/manage_signer_builder");

var RECOVERY_SIGNER_ROLE_ID = '1';
var DEFAULT_SIGNER_IDENTITY = 0;
var DEFAULT_SIGNER_WEIGHT = 1000;
var DEFAULT_SIGNER_ROLE_KEY = 'signer_role:default';
/**
 * Signers manager.
 */

var SignersManager =
/*#__PURE__*/
function () {
  /**
   * SignersManager constructor.
   *
   * @param {ApiCaller} apiCaller ApiCaller instance to process the requests.
   */
  function SignersManager(apiCaller) {
    (0, _classCallCheck2.default)(this, SignersManager);
    this._apiCaller = apiCaller;
  }
  /**
   * Creates change signers transaction envelope
   *
   * @param {object} opts
   * @param {string} opts.newPublicKey New master signer ID of account
   * @param {string} opts.sourceAccount Transaction source account ID.
   * @param {string} [opts.signerToReplace] Specified signer ID to change.
   * @param {Keypair} opts.signingKeypair Keypair for signing transaction.
   *
   * @return {Promise.<string>} Base64-encoded transaction envelope
   */


  (0, _createClass2.default)(SignersManager, [{
    key: "createChangeSignerTransaction",
    value: function () {
      var _createChangeSignerTransaction = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_ref) {
        var newPublicKey, sourceAccount, signerToReplace, signingKeypair, tx, txEnv;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                newPublicKey = _ref.newPublicKey, sourceAccount = _ref.sourceAccount, signerToReplace = _ref.signerToReplace, signingKeypair = _ref.signingKeypair;
                tx = new _transaction_builder.TransactionBuilder(sourceAccount);
                _context.next = 4;
                return this._makeChangeSignerOperations({
                  newPublicKey: newPublicKey,
                  sourceAccount: sourceAccount,
                  signerToReplace: signerToReplace
                });

              case 4:
                tx.operations = _context.sent;
                txEnv = tx.build();
                txEnv.sign(signingKeypair);
                return _context.abrupt("return", txEnv.toEnvelope().toXDR().toString('base64'));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createChangeSignerTransaction(_x) {
        return _createChangeSignerTransaction.apply(this, arguments);
      }

      return createChangeSignerTransaction;
    }()
  }, {
    key: "_makeChangeSignerOperations",
    value: function () {
      var _makeChangeSignerOperations2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_ref2) {
        var newPublicKey, sourceAccount, signerToReplace, nonRecoverySigners, operations, createSignerOp, removeSignerOps;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                newPublicKey = _ref2.newPublicKey, sourceAccount = _ref2.sourceAccount, signerToReplace = _ref2.signerToReplace;
                _context2.next = 3;
                return this._getNonRecoverySigners(sourceAccount);

              case 3:
                nonRecoverySigners = _context2.sent;
                operations = [];
                _context2.next = 7;
                return this._makeCreateSignerOp(newPublicKey);

              case 7:
                createSignerOp = _context2.sent;
                operations.push(createSignerOp);

                if (nonRecoverySigners.length) {
                  removeSignerOps = signerToReplace ? this._makeRemoveMasterAndCurrentSignerOps(nonRecoverySigners, sourceAccount, signerToReplace) : this._makeRemoveAllSignersOps(nonRecoverySigners);
                  operations.push.apply(operations, (0, _toConsumableArray2.default)(removeSignerOps));
                }

                return _context2.abrupt("return", operations);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _makeChangeSignerOperations(_x2) {
        return _makeChangeSignerOperations2.apply(this, arguments);
      }

      return _makeChangeSignerOperations;
    }()
  }, {
    key: "_getNonRecoverySigners",
    value: function () {
      var _getNonRecoverySigners2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(accountId) {
        var signers;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._getSigners(accountId);

              case 2:
                signers = _context3.sent;
                return _context3.abrupt("return", signers.filter(function (signer) {
                  return signer.role.id !== RECOVERY_SIGNER_ROLE_ID;
                }));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _getNonRecoverySigners(_x3) {
        return _getNonRecoverySigners2.apply(this, arguments);
      }

      return _getNonRecoverySigners;
    }()
  }, {
    key: "_getSigners",
    value: function () {
      var _getSigners2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(accountId) {
        var endpoint, _ref3, signers;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                endpoint = "/v3/accounts/".concat(accountId, "/signers");
                _context4.next = 3;
                return this._apiCaller.get(endpoint);

              case 3:
                _ref3 = _context4.sent;
                signers = _ref3.data;
                return _context4.abrupt("return", signers);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _getSigners(_x4) {
        return _getSigners2.apply(this, arguments);
      }

      return _getSigners;
    }()
  }, {
    key: "_makeCreateSignerOp",
    value: function () {
      var _makeCreateSignerOp2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(newAccountId) {
        var signerRoleId;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._getDefaultSignerRole();

              case 2:
                signerRoleId = _context5.sent;
                return _context5.abrupt("return", _manage_signer_builder.ManageSignerBuilder.createSigner({
                  publicKey: newAccountId,
                  weight: DEFAULT_SIGNER_WEIGHT,
                  identity: DEFAULT_SIGNER_IDENTITY,
                  roleID: signerRoleId,
                  details: {}
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _makeCreateSignerOp(_x5) {
        return _makeCreateSignerOp2.apply(this, arguments);
      }

      return _makeCreateSignerOp;
    }()
  }, {
    key: "_getDefaultSignerRole",
    value: function () {
      var _getDefaultSignerRole2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6() {
        var endpoint, _ref4, data;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                endpoint = "/v3/key_values/".concat(DEFAULT_SIGNER_ROLE_KEY);
                _context6.next = 3;
                return this._apiCaller.get(endpoint);

              case 3:
                _ref4 = _context6.sent;
                data = _ref4.data;
                return _context6.abrupt("return", String(data.value.u32));

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _getDefaultSignerRole() {
        return _getDefaultSignerRole2.apply(this, arguments);
      }

      return _getDefaultSignerRole;
    }()
  }, {
    key: "_makeRemoveMasterAndCurrentSignerOps",
    value: function _makeRemoveMasterAndCurrentSignerOps(signers, masterId, signerId) {
      var _this = this;

      return signers.filter(function (signer) {
        return signer.id === masterId || signer.id === signerId;
      }).map(function (signer) {
        return _this._makeRemoveSignerOp(signer);
      });
    }
  }, {
    key: "_makeRemoveAllSignersOps",
    value: function _makeRemoveAllSignersOps(signers) {
      var _this2 = this;

      return signers.map(function (signer) {
        return _this2._makeRemoveSignerOp(signer);
      });
    }
  }, {
    key: "_makeRemoveSignerOp",
    value: function _makeRemoveSignerOp(signer) {
      return _manage_signer_builder.ManageSignerBuilder.deleteSigner({
        publicKey: signer.id
      });
    }
  }]);
  return SignersManager;
}();

exports.SignersManager = SignersManager;