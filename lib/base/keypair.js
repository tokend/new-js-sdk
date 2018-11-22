"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Keypair = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _network = require("./network");

var _signing = require("./signing");

var base58 = _interopRequireWildcard(require("./base58"));

var strkey = _interopRequireWildcard(require("./strkey"));

var _xdr_generated = _interopRequireDefault(require("./generated/xdr_generated"));

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var Keypair =
/*#__PURE__*/
function () {
  /**
   * `Keypair` represents public (and secret) keys of the account.
   *
   * Use more convenient methods to create `Keypair` object:
   * * `{@link Keypair.fromAccountId}`
   * * `{@link Keypair.fromSecret}`
   * * `{@link Keypair.random}`
   *
   * @constructor
   * @param {object} keys
   * @param {string} keys.publicKey Raw public key
   * @param {string} [keys.secretSeed] Raw secret key seed.
   */
  function Keypair(keys) {
    (0, _classCallCheck2.default)(this, Keypair);
    this._publicKey = Buffer.from(keys.publicKey);

    if (keys.secretSeed) {
      this._secretSeed = Buffer.from(keys.secretSeed);
      this._secretKey = Buffer.from(keys.secretKey);
    }
  }
  /**
   * @param {string} seed Secret key seed
   * @deprecated Use {@link Keypair.fromSecret}
   * @returns {Keypair}
   */


  (0, _createClass2.default)(Keypair, [{
    key: "xdrAccountId",
    value: function xdrAccountId() {
      return new _xdr_generated.default.AccountId.keyTypeEd25519(this._publicKey);
    }
  }, {
    key: "xdrBalanceId",
    value: function xdrBalanceId() {
      return new _xdr_generated.default.BalanceId.keyTypeEd25519(this._publicKey);
    }
  }, {
    key: "xdrPublicKey",
    value: function xdrPublicKey() {
      return new _xdr_generated.default.PublicKey.keyTypeEd25519(this._publicKey);
    }
    /**
     * Returns raw public key
     * @returns {Buffer}
     */

  }, {
    key: "rawPublicKey",
    value: function rawPublicKey() {
      return this._publicKey;
    }
  }, {
    key: "signatureHint",
    value: function signatureHint() {
      var a = this.xdrAccountId().toXDR();
      return a.slice(a.length - 4);
    }
    /**
     * Returns account ID associated with this `Keypair` object.
     * @returns {string}
     */

  }, {
    key: "accountId",
    value: function accountId() {
      return strkey.encodeCheck('accountId', this._publicKey);
    }
  }, {
    key: "balanceId",
    value: function balanceId() {
      return strkey.encodeCheck('balanceId', this._publicKey);
    }
    /**
     * @deprecated Use {@link Keypair.secret}
     * @returns {string}
     */

  }, {
    key: "seed",
    value: function seed() {
      console.log('Keypair.seed() is deprecated. Use Keypair.secret().');
      return this.secret();
    }
    /**
     * Returns secret key associated with this `Keypair` object
     * @returns {string}
     */

  }, {
    key: "secret",
    value: function secret() {
      return strkey.encodeCheck('seed', this._secretSeed);
    }
    /**
     * Returns raw secret key seed.
     * @deprecated
     * @returns {Buffer}
     */

  }, {
    key: "rawSeed",
    value: function rawSeed() {
      console.log('Keypair.rawSeed() is deprecated.');
      return this._secretSeed;
    }
    /**
     * Returns raw secret key.
     * @returns {Buffer}
     */

  }, {
    key: "rawSecretKey",
    value: function rawSecretKey() {
      return this._secretKey;
    }
    /**
     * Returns `true` if this `Keypair` object contains secret key and can sign.
     * @returns {boolean}
     */

  }, {
    key: "canSign",
    value: function canSign() {
      return !!this._secretKey;
    }
    /**
     * Signs data.
     * @param {Buffer} data Data to sign
     * @returns {Buffer}
     */

  }, {
    key: "sign",
    value: function sign(data) {
      if (!this.canSign()) {
        throw new Error('cannot sign: no secret key available');
      }

      return (0, _signing.sign)(data, this._secretKey);
    }
    /**
     * Verifies if `signature` for `data` is valid.
     * @param {Buffer} data Signed data
     * @param {Buffer} signature Signature
     * @returns {boolean}
     */

  }, {
    key: "verify",
    value: function verify(data, signature) {
      return (0, _signing.verify)(data, signature, this._publicKey);
    }
  }, {
    key: "signDecorated",
    value: function signDecorated(data) {
      var signature = this.sign(data);
      var hint = this.signatureHint();
      return new _xdr_generated.default.DecoratedSignature({
        hint: hint,
        signature: signature
      });
    }
  }], [{
    key: "fromSeed",
    value: function fromSeed(seed) {
      console.log('Keypair.fromSeed() is deprecated. Use Keypair.fromSecret().');
      return Keypair.fromSecret(seed);
    }
    /**
     * Creates a new `Keypair` instance from secret key.
     * @param {string} secretKey Secret key
     * @returns {Keypair}
     */

  }, {
    key: "fromSecret",
    value: function fromSecret(secretKey) {
      var rawSeed = strkey.decodeCheck('seed', secretKey);
      return this.fromRawSeed(rawSeed);
    }
    /**
     * Base58 address encoding is **DEPRECATED**! Use this method only for transition to strkey encoding.
     * @param {string} seed Base58 secret seed
     * @deprecated Use {@link Keypair.fromSecret}
     * @returns {Keypair}
     */

  }, {
    key: "fromBase58Seed",
    value: function fromBase58Seed(seed) {
      var rawSeed = base58.decodeBase58Check('seed', seed);
      return this.fromRawSeed(rawSeed);
    }
    /**
     * Creates a new `Keypair` object from secret seed raw bytes.
     *
     * @param {Buffer} rawSeed Buffer containing secret seed
     * @returns {Keypair}
     */

  }, {
    key: "fromRawSeed",
    value: function fromRawSeed(rawSeed) {
      rawSeed = Buffer.from(rawSeed);
      var rawSeedU8 = new Uint8Array(rawSeed);

      var keys = _tweetnacl.default.sign.keyPair.fromSeed(rawSeedU8);

      keys.secretSeed = rawSeed;
      return new this(keys);
    }
    /**
     * Returns `Keypair` object representing network master key.
     * @returns {Keypair}
     */

  }, {
    key: "master",
    value: function master() {
      return this.fromRawSeed(_network.Network.current().networkId());
    }
    /**
     * Creates a new `Keypair` object from account ID.
     * @param {string} accountId account ID (ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`)
     * @returns {Keypair}
     */

  }, {
    key: "fromAccountId",
    value: function fromAccountId(accountId) {
      var publicKey = strkey.decodeCheck('accountId', accountId);

      if (publicKey.length !== 32) {
        throw new Error('Invalid Stellar accountId');
      }

      return new this({
        publicKey: publicKey
      });
    }
  }, {
    key: "fromBalanceId",
    value: function fromBalanceId(balanceId) {
      var publicKey = strkey.decodeCheck('balanceId', balanceId);

      if (publicKey.length !== 32) {
        throw new Error('Invalid Stellar balanceId');
      }

      return new this({
        publicKey: publicKey
      });
    }
    /**
     * Create a random `Keypair` object.
     * @returns {Keypair}
     */

  }, {
    key: "random",
    value: function random() {
      var seed = _tweetnacl.default.randomBytes(32);

      return this.fromRawSeed(seed);
    }
    /**
     * Returns true if the given Stellar public key is valid.
     * @param {string} publicKey public key to check
     * @returns {boolean}
     */

  }, {
    key: "isValidPublicKey",
    value: function isValidPublicKey(publicKey) {
      if (publicKey && publicKey.length !== 56) {
        return false;
      }

      try {
        var decoded = strkey.decodeCheck('accountId', publicKey);

        if (decoded.length !== 32) {
          return false;
        }
      } catch (err) {
        return false;
      }

      return true;
    }
  }, {
    key: "isValidBalanceKey",
    value: function isValidBalanceKey(publicKey) {
      if (publicKey && publicKey.length !== 56) {
        return false;
      }

      try {
        var decoded = strkey.decodeCheck('balanceId', publicKey);

        if (decoded.length !== 32) {
          return false;
        }
      } catch (err) {
        return false;
      }

      return true;
    }
    /**
     * Returns true if the given Stellar secret key is valid.
     * @param {string} secretKey secret key to check
     * @returns {boolean}
     */

  }, {
    key: "isValidSecretKey",
    value: function isValidSecretKey(secretKey) {
      if (secretKey && secretKey.length !== 56) {
        return false;
      }

      try {
        var decoded = strkey.decodeCheck('seed', secretKey);

        if (decoded.length !== 32) {
          return false;
        }
      } catch (err) {
        return false;
      }

      return true;
    }
  }]);
  return Keypair;
}();

exports.Keypair = Keypair;