"use strict";

var _base = require("../base");

var _wallet = require("./wallet");

describe('Wallet', function () {
  var email = 'example@mail.com';

  var keypair = _base.Keypair.fromSecret('SBRTPKBJIXEUIT37PZ5AN3HZRPRPF4EC7WK5LL55IZJHYKAJLA2I4KKX');

  var recoveryKeypair = _base.Keypair.fromSecret('SD5L6H3TLEVEIDNKEUVRM3UYL6FLSTRO2LZGMKMMWAR7FSER42U2OWMG');

  var accountId = keypair.accountId();
  var walletId = 'fa4323ab43243234324234232442';
  var password = 'password';
  var salt = 'pUQVfhuX9o3dBz14yIiEVg==';
  var kdfParams = {
    bits: 256,
    n: 8,
    p: 1,
    r: 8
  };
  var wallet;
  beforeEach(function () {
    wallet = new _wallet.Wallet(email, keypair, accountId, walletId);
  });
  describe('.constructor', function () {
    it('Should instantiate a wallet w/o a walletId.', function () {
      expectNoThrow(function () {
        return new _wallet.Wallet(email, keypair, accountId);
      });
    });
    it('Should instantiate a wallet w/ a walletId.', function () {
      expectNoThrow(function () {
        return new _wallet.Wallet(email, keypair, accountId, walletId);
      });
    });
    it('Should instantiate a wallet from secret seed.', function () {
      expectNoThrow(function () {
        return new _wallet.Wallet(email, keypair.secret(), accountId);
      });
    });
    it('Should throw if email is missing.', function () {
      expectThrow(function () {
        return new _wallet.Wallet(undefined, keypair, accountId);
      });
    });
    it('Should throw if an email is invalid.', function () {
      expectThrow(function () {
        return new _wallet.Wallet(432423, keypair, accountId);
      });
    });
    it('Should throw if keypair is missing.', function () {
      expectThrow(function () {
        return new _wallet.Wallet(email, undefined, accountId);
      });
    });
    it('Should throw if a key pair is invalid.', function () {
      expectThrow(function () {
        return new _wallet.Wallet(email, 42323423, accountId);
      });
    });
    it('Should throw if a secret seed is invalid.', function () {
      expectThrow(function () {
        return new _wallet.Wallet(email, 'bad seed', accountId);
      });
    });
    it('Should throw if the account ID is invalid.', function () {
      expectThrow(function () {
        return new _wallet.Wallet(email, keypair, 432432);
      });
    });
    it('Should throw if the wallet ID is invalid.', function () {
      expectThrow(function () {
        return new _wallet.Wallet(email, keypair, accountId, 432432);
      });
    });
  });
  describe('.generate', function () {
    it('Should generate a wallet.', function () {
      var generatedWallet = _wallet.Wallet.generate(email);

      expect(generatedWallet).to.be.an.instanceOf(_wallet.Wallet);
    });
    it('Should generate a wallet with custom account ID.', function () {
      var generatedWallet = _wallet.Wallet.generate(email, accountId);

      expect(generatedWallet).to.have.a.property('accountId').equal(accountId);
    });
  });
  describe('.fromEncrypted', function () {
    it('Should decrypt a wallet.', function () {
      var keychainData = 'eyJJViI6IllLa1RKbGgyUE1nVjBxRWYiLCJjaXBoZXJUZXh0IjoidXhRRHN3NXoyeWdZMFo3VmVGTmYzTHI1N0JpMnpoV1FZZThtRVhyWlZtUnJnTGpPU01mQlBmZElEMWtGOVZaOStsaGNTZXBIaTJnbERsbFk1QjZRUndCRmMvR2VwRjcvUlVwZnRwRWRUNVN1ci9HOVQvUnJ1T0E5dk42NUoyWkppYnhjRXVuYVFRenFCYVFwOTNVZ0Z2T3lMVlg3T1NrbVQvdnNJUGxoVk5yN3U2VGNuR2lrbGlqaWVrdlk0ZEp2NmwrVWRHWmkyZGhOeWc9PSIsImNpcGhlck5hbWUiOiJhZXMiLCJtb2RlTmFtZSI6ImdjbSJ9';

      var decryptedWallet = _wallet.Wallet.fromEncrypted({
        keychainData: keychainData,
        kdfParams: kdfParams,
        salt: salt,
        email: email,
        password: password,
        accountId: accountId
      });

      expect(decryptedWallet).to.be.an.instanceOf(_wallet.Wallet);
    });
  });
  describe('.fromRecoverySeed', function () {
    it('Should create a recovery wallet from a recovery seed.', function () {
      var recoveryWallet = _wallet.Wallet.fromRecoverySeed(kdfParams, salt, email, recoveryKeypair.secret());

      expect(recoveryWallet).to.be.an.instanceOf(_wallet.Wallet);
      expect(recoveryWallet).to.have.a.property('id').equal('b29af63670c2ff250f6517b9bd23e2e0ab992db0df777305ac75c41766e9a718');
    });
  });
  describe('.deriveId', function () {
    it('Should derive wallet ID.', function () {
      var derivedId = _wallet.Wallet.deriveId(email, password, kdfParams, salt);

      expect(derivedId).to.equal('a2b57747260e2e475214ab2775d31db207bd902882e3327e7f5110b3c415c2d9');
    });
  });
  describe('.encrypt', function () {
    it('Should encrypt a wallet.', function () {
      var encrypted = wallet.encrypt(kdfParams, password);
      expect(encrypted).to.have.a.property('id');
      expect(encrypted).to.have.a.property('salt');
      expect(encrypted).to.have.a.property('keychainData');
      expect(encrypted).to.have.a.property('email').equal(email);
      expect(encrypted).to.have.a.property('accountId').equal(accountId);
    });
    it('Should throw if no kdf params provided', function () {
      expectThrow(function () {
        return wallet.encrypt();
      });
    });
    it('Should throw if no password provided.', function () {
      expectThrow(function () {
        return wallet.encrypt(kdfParams);
      });
    });
  });
  describe('.encryptRecoveryData', function () {
    it('Should encrypt recovery data.', function () {
      var encrypted = wallet.encryptRecoveryData(kdfParams, recoveryKeypair);
      expect(encrypted).to.have.a.property('id');
      expect(encrypted).to.have.a.property('salt');
      expect(encrypted).to.have.a.property('keychainData');
      expect(encrypted).to.have.a.property('email').equal(email);
      expect(encrypted).to.have.a.property('accountId').equal(recoveryKeypair.accountId());
    });
  });
  describe('.id', function () {
    it('Should get wallet ID', function () {
      var result = wallet.id;
      expect(result).to.equal(walletId);
    });
    it('Should throw if no wallet ID yet', function () {
      var idLess = new _wallet.Wallet(email, keypair, accountId);
      expectThrow(function () {
        return idLess.id;
      });
    });
  });
  describe('.secretSeed', function () {
    it('Should expose secret seed.', function () {
      expect(wallet).to.have.a.property('secretSeed').equal(keypair.secret());
    });
  });
  describe('.keypair', function () {
    it('Should expose keypair.', function () {
      expect(wallet).to.have.a.property('keypair').deep.equal(keypair);
    });
  });
});