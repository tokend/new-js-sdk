"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _base = require("../base");

var _sjclTokend = _interopRequireDefault(require("sjcl-tokend"));

var crypto = _interopRequireWildcard(require("./crypto"));

var _lodash = require("lodash");

/**
 * Manages user's key pair.
 *
 * @class
 */
var Wallet =
/*#__PURE__*/
function () {
  /**
   * Create a new instance from user's key pair.
   *
   * @constructor
   *
   * @param {string} email User's email.
   * @param {Keypair|string} keypair User's key pair or a secret seed.
   * @param {string} accountId User's account ID.
   * @param {string} [walletId] Wallet ID.
   */
  function Wallet(email, keypair, accountId, walletId) {
    (0, _classCallCheck2.default)(this, Wallet);

    if ((0, _lodash.isNil)(email)) {
      throw new Error('Email is required.');
    }

    if ((0, _lodash.isNil)(keypair)) {
      throw new Error('No keypair provided.');
    } else if ((0, _lodash.isString)(keypair)) {
      if (!_base.Keypair.isValidSecretKey(keypair)) {
        throw new Error('Invalid secret seed.');
      }

      keypair = _base.Keypair.fromSecret(keypair);
    } else if (!(keypair instanceof _base.Keypair)) {
      throw new Error('Invalid keypair. Expected a Keypair instance or a string seed.');
    }

    if (!_base.Keypair.isValidPublicKey(accountId)) {
      throw new Error('Invalid account ID.');
    }

    if (walletId && !(0, _lodash.isString)(walletId)) {
      throw new Error('Hex encoded wallet ID expected.');
    }

    this._email = email;
    this._keypair = keypair;
    this._accountId = accountId;
    this._id = walletId;
  }
  /**
   * Generate a new wallet.
   *
   * @param {string} email User's email.
   * @param {string} [accountId] User's account ID.
   *
   * @return {Wallet} The new wallet.
   */


  (0, _createClass2.default)(Wallet, [{
    key: "encrypt",

    /**
     * Encrypt wallet to securely store it.
     *
     * @param {object} kdfParams Scrypt params.
     * @param {string} password User's password.
     * @return {object} Encrypted keychain and metadata.
     */
    value: function encrypt(kdfParams, password) {
      if ((0, _lodash.isNil)(kdfParams)) {
        throw new Error('KDF params required');
      }

      if (!(0, _lodash.isString)(password) || password.length === 0) {
        throw new TypeError('Password must be a non-empty string');
      }

      var salt = crypto.randomBytes(16).toString('base64');
      var masterKey = crypto.calculateMasterKey(salt, this.email, password, kdfParams); // Decrypt keychain

      var walletKey = crypto.deriveWalletKey(masterKey);
      var rawKeychainData = {
        accountId: this.accountId,
        seed: this._keypair.secret()
      };
      var keychainData = crypto.encryptData((0, _stringify.default)(rawKeychainData), walletKey); // Derive wallet ID

      var rawWalletId = crypto.deriveWalletId(masterKey);
      this._id = _sjclTokend.default.codec.hex.fromBits(rawWalletId);
      return {
        id: this._id,
        accountId: this.accountId,
        email: this.email,
        salt: salt,
        keychainData: keychainData
      };
    }
    /**
     * Generate wallet recovery data.
     *
     * @param {object} kdfParams Scrypt params.
     * @param {Keypair} recoveryKeypair Recovery keypair.
     */

  }, {
    key: "encryptRecoveryData",
    value: function encryptRecoveryData(kdfParams, recoveryKeypair) {
      var recoveryWallet = new Wallet(this.email, this._keypair, recoveryKeypair.accountId());
      return recoveryWallet.encrypt(kdfParams, recoveryKeypair.secret());
    }
  }, {
    key: "id",

    /**
     * Wallet ID.
     */
    get: function get() {
      if (!this._id) {
        throw new Error('This wallet has no wallet ID yet.');
      }

      return this._id;
    }
    /**
     * Account ID.
     */

  }, {
    key: "accountId",
    get: function get() {
      return this._accountId;
    }
    /**
     * Email used for login.
     */

  }, {
    key: "email",
    get: function get() {
      return this._email;
    }
    /**
     * Secret seed.
     */

  }, {
    key: "secretSeed",
    get: function get() {
      return this._keypair.secret();
    }
    /**
     * Get signing keypair.
     */

  }, {
    key: "keypair",
    get: function get() {
      return this._keypair;
    }
  }], [{
    key: "generate",
    value: function generate(email) {
      var accountId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var keypair = _base.Keypair.random();

      accountId = accountId || keypair.accountId();
      return new Wallet(email, keypair, accountId);
    }
    /**
     * Decrypt a wallet obtained from a wallet server.
     *
     * @param {object} keychainData Encrypted wallet seed.
     * @param {object} kdfParams Scrypt params used for encryption.
     * @param {string} salt Salt used for encryption.
     * @param {string} email User's email.
     * @param {string} password User's password.
     */

  }, {
    key: "fromEncrypted",
    value: function fromEncrypted(keychainData, kdfParams, salt, email, password) {
      var rawMasterKey = crypto.calculateMasterKey(salt, email, password, kdfParams);
      var rawWalletId = crypto.deriveWalletId(rawMasterKey);
      var rawWalletKey = crypto.deriveWalletKey(rawMasterKey);
      var decryptedKeychain = JSON.parse(crypto.decryptData(keychainData, rawWalletKey));
      return new Wallet(email, _base.Keypair.fromSecret(decryptedKeychain.seed), decryptedKeychain.accountId, _sjclTokend.default.codec.hex.fromBits(rawWalletId));
    }
    /**
     * Restore recovery wallet from a recovery seed.
     *
     * @param {object} kdfParams Scrypt params.
     * @param {string} salt Salt used for encryption.
     * @param {string} email User's email.
     * @param {string} recoverySeed User's recovery seed.
     */

  }, {
    key: "fromRecoverySeed",
    value: function fromRecoverySeed(kdfParams, salt, email, recoverySeed) {
      var recoveryKeypair = _base.Keypair.fromSecret(recoverySeed);

      var walletId = Wallet.deriveId(email, recoverySeed, kdfParams, salt);
      return new Wallet(email, recoveryKeypair, recoveryKeypair.accountId(), walletId);
    }
    /**
     * Derive the wallet ID.
     *
     * @param {string} email
     * @param {string} password
     * @param {object} kdfParams
     * @param {string} salt
     *
     * @return {string} Wallet ID.
     */

  }, {
    key: "deriveId",
    value: function deriveId(email, password, kdfParams, salt) {
      var masterKey = crypto.calculateMasterKey(salt, email, password, kdfParams);
      var walletId = crypto.deriveWalletId(masterKey);
      return _sjclTokend.default.codec.hex.fromBits(walletId);
    }
  }]);
  return Wallet;
}();

exports.Wallet = Wallet;