"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _sjclTokend = _interopRequireDefault(require("sjcl-tokend"));

var _lodash = require("lodash");

var crypto = _interopRequireWildcard(require("./crypto"));

describe('wallet/crypto', function () {
  var key = fromBase64('6tRntTzIp/RbxSyk7PEzPNKC1yaK5Zt1L/3msZQsTVM=');
  describe('.encryptData', function () {
    it('Should correctly encrypt/decrypt data', function () {
      var secret = 'this is secret data';
      var encrypted = crypto.encryptData(secret, key);
      var decrypted = crypto.decryptData(encrypted, key);
      expect(decrypted).to.be.equal(secret);
    });
    it('Should throw if no data provided.', function () {
      expectThrow(function () {
        return crypto.encryptData(null, key);
      });
    });
  });
  describe('.decryptData', function () {
    it('Should throw if data is corrupt.', function () {
      var encrypted = 'the corrupt';
      expectThrow(function () {
        return crypto.decryptData(encrypted, key);
      });
    });
  });
  var masterKey = 'GDuj7CqgKXcuXxu1R67wvGKdC94BwBlJqs8tJwUhdn8=';
  describe('.calculateMasterKey', function () {
    var salt = 'pUQVfhuX9o3dBz14yIiEVg==';
    var email = 'test@distlab.com';
    var password = 'password';
    var kdfParamsV1 = {
      id: 1,
      bits: 256,
      n: 4096,
      p: 1,
      r: 8
    };
    var kdfParamsV2 = (0, _assign.default)((0, _lodash.cloneDeep)(kdfParamsV1), {
      id: 2
    });
    it('Should calculate master key with KDF v.1', function () {
      var calculated = crypto.calculateMasterKey(salt, email, password, kdfParamsV1);
      expect(toBase64(calculated)).to.equal(masterKey);
    });
    it('Should calculate master key with KDF v.2', function () {
      var emailWithCaps = 'tEsT@distlab.com';
      var calculated = crypto.calculateMasterKey(salt, emailWithCaps, password, kdfParamsV2);
      expect(toBase64(calculated)).to.equal(masterKey);
    });
  });
  describe('.deriveWalletId', function () {
    it('Should derive wallet ID.', function () {
      var walletId = crypto.deriveWalletId(fromBase64(masterKey));
      expect(toBase64(walletId)).equal('Y5yxJ/femcvLkJAKuH/zinSIzd6Nbg9XeIsrFS5/EKM=');
    });
  });
  describe('.deriveWalletKey', function () {
    it('Should derive wallet key.', function () {
      var walletKey = crypto.deriveWalletKey(fromBase64(masterKey));
      expect(toBase64(walletKey)).equal('IqeLjTUXGYitNEscv/BvwG/pPVuz/uaTh3ov+KPF5Wc=');
    });
  });
  describe('.deriveSessionKey', function () {
    it('Should derive session key.', function () {
      var encryptedKey = '8fba16b1342cecd011f6cf9bdfe8426ffc0cedae083c8fb28e1f02388d1a744d';
      var sessionKey = crypto.deriveSessionKey(fromBase64(encryptedKey));
      expect(toBase64(sessionKey)).equal('Ya7uo4SrnANRiCFyzLSiS1/Oe1dTB0RFuHm4EqFu2XI=');
    });
  });
  describe('.randomBytes', function () {
    it('Should generate random bytes.', function () {
      var length = 32;
      var generated = crypto.randomBytes(length);
      expect(generated).to.be.an.instanceOf(Buffer);
      expect(generated).to.have.lengthOf(length);
    });
  });
  describe('.encryptSecretSeed', function () {
    it('Should correctly encrypt/decrypt secret seed', function () {
      var encryptedKey = '8fba16b1342cecd011f6cf9bdfe8426ffc0cedae083c8fb28e1f02388d1a744d';
      var secret = 'this is secret data';
      var key = crypto.deriveSessionKey(encryptedKey);
      var encrypted = crypto.encryptData(secret, key);
      var decrypted = crypto.decryptData(encrypted, key);
      expect(decrypted).to.be.equal(secret);
    });
  });

  function toBase64(raw) {
    return _sjclTokend.default.codec.base64.fromBits(raw);
  }

  function fromBase64(encoded) {
    return _sjclTokend.default.codec.base64.toBits(encoded);
  }
});