"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _sinon = _interopRequireDefault(require("sinon"));

var _walletsManager = require("./wallets-manager");

var _apiCaller = require("../api-caller");

var _wallet = require("../../wallet");

var _base = require("../../base");

describe('Wallets manager', function () {
  var sandbox;
  var walletsManagerInstance;
  beforeEach(function () {
    sandbox = _sinon.default.createSandbox();
    walletsManagerInstance = new _walletsManager.WalletsManager(_apiCaller.ApiCaller.getInstance('https://api.test.com'));
    var stubGet = sandbox.stub(walletsManagerInstance._apiCaller, 'get').withArgs('/v3/key_values/signer_role:default').resolves({
      data: {
        value: {
          u32: 1
        }
      }
    });
    stubGet.withArgs('/kdf').resolves({
      data: {
        bits: 256,
        n: 8,
        p: 1,
        r: 8,
        salt: '/1dwsCq6f1zdpIObxLBOiQ=='
      }
    });
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('method', function () {
    describe('getKdfParams', function () {
      it('returns KDF params calling _apiCaller.get with correct params',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return walletsManagerInstance.getKdfParams('foo@bar.com', true);

              case 2:
                result = _context.sent;
                expect(walletsManagerInstance._apiCaller.get).to.have.been.calledOnceWithExactly('/kdf', {
                  email: 'foo@bar.com',
                  is_recovery: true
                });
                expect(result).to.deep.equal({
                  data: {
                    bits: 256,
                    n: 8,
                    p: 1,
                    r: 8,
                    salt: '/1dwsCq6f1zdpIObxLBOiQ=='
                  }
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    });
    describe('getSignerRoleId', function () {
      it('returns signer role id calling _apiCaller.get with correct params',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var result;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return walletsManagerInstance.getSignerRoleId();

              case 2:
                result = _context2.sent;
                expect(walletsManagerInstance._apiCaller.get).to.have.been.calledOnceWith('/v3/key_values/signer_role:default');
                expect(result).to.deep.equal({
                  data: {
                    value: {
                      u32: 1
                    }
                  }
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
    });
    describe('get', function () {
      it('returns decrypted wallet received from response of _apiCaller.get method called with derived wallet ID',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var result;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sandbox.stub(_wallet.Wallet, 'deriveId').returns('some-wallet-id');

                walletsManagerInstance._apiCaller.get.withArgs('/wallets/some-wallet-id').resolves({
                  data: {
                    accountId: 'SOME_ACCOUNT_ID',
                    keychainData: 'SOME_KEYCHAIN_DATA',
                    session: {
                      id: 'SOME_SESSION_ID',
                      encryptionKey: 'SOME_SESSION_KEY'
                    }
                  }
                });

                sandbox.stub(_wallet.Wallet, 'fromEncrypted').returns(new _wallet.Wallet('foo@bar.com', 'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3', 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S', 'some-wallet-id', 'some-session-id', 'some-session-key'));
                _context3.next = 5;
                return walletsManagerInstance.get('foo@bar.com', 'qwe123');

              case 5:
                result = _context3.sent;
                expect(walletsManagerInstance._apiCaller.get.withArgs('/wallets/some-wallet-id')).to.have.been.calledOnce;
                expect(_wallet.Wallet.fromEncrypted).calledOnceWithExactly({
                  keychainData: 'SOME_KEYCHAIN_DATA',
                  kdfParams: {
                    bits: 256,
                    n: 8,
                    p: 1,
                    r: 8,
                    salt: '/1dwsCq6f1zdpIObxLBOiQ=='
                  },
                  salt: '/1dwsCq6f1zdpIObxLBOiQ==',
                  email: 'foo@bar.com',
                  password: 'qwe123',
                  accountId: 'SOME_ACCOUNT_ID',
                  sessionId: 'SOME_SESSION_ID',
                  sessionKey: 'SOME_SESSION_KEY'
                });
                expect(result).to.deep.equal(new _wallet.Wallet('foo@bar.com', 'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3', 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S', 'some-wallet-id', 'some-session-id', 'some-session-key'));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
    });
    describe('createWithSigners', function () {
      it('returns new wallet, created by calling _apiCaller.post method with generated params',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        var result;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                sandbox.stub(_wallet.Wallet, 'generate').returns(new _wallet.Wallet('foo@bar.com', 'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3', 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S', 'some-wallet-id'));
                sandbox.stub(walletsManagerInstance._apiCaller, 'post').withArgs('/wallets').resolves({
                  data: {
                    accountId: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
                    session: {
                      id: 'some-session-id',
                      encryptionKey: 'some-session-key'
                    }
                  }
                });
                _context4.next = 4;
                return walletsManagerInstance.createWithSigners('foo@bar.com', 'qwe123', []);

              case 4:
                result = _context4.sent;
                expect(_wallet.Wallet.generate).to.have.been.calledWithExactly('foo@bar.com');
                expect(walletsManagerInstance._apiCaller.post).to.have.been.calledOnceWith('/wallets');
                expect(result.response).to.deep.equal({
                  data: {
                    accountId: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
                    session: {
                      id: 'some-session-id',
                      encryptionKey: 'some-session-key'
                    }
                  }
                });
                expect(result.wallet.email).to.equal('foo@bar.com');
                expect(result.wallet.accountId).to.equal('GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S');

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
    });
    describe('create', function () {
      it('returns new wallet, created by calling _apiCaller.post method with generated params',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5() {
        var result;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                sandbox.stub(_wallet.Wallet, 'generate').returns(new _wallet.Wallet('foo@bar.com', 'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3', 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S', 'some-wallet-id'));
                sandbox.stub(walletsManagerInstance._apiCaller, 'post').withArgs('/wallets').resolves({
                  data: {
                    accountId: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
                    session: {
                      id: 'some-session-id',
                      encryptionKey: 'some-session-key'
                    }
                  }
                });
                _context5.next = 4;
                return walletsManagerInstance.create('foo@bar.com', 'qwe123', _base.Keypair.fromSecret('SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3'));

              case 4:
                result = _context5.sent;
                expect(_wallet.Wallet.generate).to.have.been.calledWithExactly('foo@bar.com');
                expect(walletsManagerInstance._apiCaller.post).to.have.been.calledOnceWith('/wallets');
                expect(result.response).to.deep.equal({
                  data: {
                    accountId: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
                    session: {
                      id: 'some-session-id',
                      encryptionKey: 'some-session-key'
                    }
                  }
                });
                expect(result.recoverySeed).to.equal('SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3');
                expect(result.wallet.email).to.equal('foo@bar.com');
                expect(result.wallet.accountId).to.equal('GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S');

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
    });
    describe('verifyEmail', function () {
      it('calls _apiCaller.put with derived verification params',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6() {
        var payload;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                payload = Buffer.from((0, _stringify.default)({
                  type: 1,
                  meta: {
                    token: 'some-token',
                    wallet_id: 'some-wallet-id'
                  }
                })).toString('base64');
                sandbox.stub(walletsManagerInstance._apiCaller, 'put').withArgs('/wallets/some-wallet-id/verification').resolves();
                _context6.next = 4;
                return walletsManagerInstance.verifyEmail(payload);

              case 4:
                expect(walletsManagerInstance._apiCaller.put).to.have.been.calledOnceWithExactly('/wallets/some-wallet-id/verification', {
                  data: {
                    type: 'wallet_verification',
                    attributes: {
                      token: 'some-token'
                    }
                  }
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })));
    });
    describe('resendEmail', function () {
      it('calls _apiCaller.post with derived verification wallet ID',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7() {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                sandbox.stub(walletsManagerInstance._apiCaller, 'post').withArgs('/wallets/some-wallet-id/verification').resolves();
                _context7.next = 3;
                return walletsManagerInstance.resendEmail('some-wallet-id');

              case 3:
                expect(walletsManagerInstance._apiCaller.post).to.have.been.calledOnceWithExactly('/wallets/some-wallet-id/verification');

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      })));
    });
    describe('recovery', function () {
      it('changes user\'s main wallet by calling _apiCaller.putWithSignature with derived params',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8() {
        var result;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                sandbox.stub(_wallet.Wallet, 'generate').returns(new _wallet.Wallet('foo@bar.com', 'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3', 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S', 'some-wallet-id'));
                sandbox.stub(walletsManagerInstance, '_getAccountIdByEmail').resolves('GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S');
                sandbox.stub(walletsManagerInstance._signersManager, 'createChangeSignerTransaction').resolves('SOME_TX_ENVELOPE');
                sandbox.stub(walletsManagerInstance._apiCaller, 'putWithSignature').resolves();
                _context8.next = 6;
                return walletsManagerInstance.recovery('foo@bar.com', 'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3', 'qwe123');

              case 6:
                result = _context8.sent;
                expect(_wallet.Wallet.generate).to.have.been.calledWithExactly('foo@bar.com', 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S');
                expect(walletsManagerInstance._getAccountIdByEmail).to.have.been.calledOnce;
                expect(walletsManagerInstance._signersManager.createChangeSignerTransaction).to.have.been.calledOnce;
                expect(walletsManagerInstance._apiCaller.putWithSignature).to.have.been.calledOnce;
                expect(result.email).to.equal('foo@bar.com');
                expect(result.accountId).to.equal('GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S');

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      })));
    });
    describe('changePassword', function () {
      var mockedWallet = new _wallet.Wallet('foo@bar.com', 'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3', 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S', 'some-wallet-id');
      it('changes user\'s main wallet by calling _apiCaller.putWithSignature with derived params',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee9() {
        var result;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                sandbox.stub(walletsManagerInstance._apiCaller, 'wallet').get(function () {
                  return mockedWallet;
                });
                sandbox.stub(_wallet.Wallet, 'generate').returns(mockedWallet);
                sandbox.stub(walletsManagerInstance._signersManager, 'createChangeSignerTransaction').resolves('SOME_TX_ENVELOPE');
                sandbox.stub(walletsManagerInstance._apiCaller, 'putWithSignature').resolves();
                _context9.next = 6;
                return walletsManagerInstance.changePassword('qwe123');

              case 6:
                result = _context9.sent;
                expect(_wallet.Wallet.generate).to.have.been.calledWithExactly('foo@bar.com', 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S');
                expect(walletsManagerInstance._signersManager.createChangeSignerTransaction).to.have.been.calledOnce;
                expect(walletsManagerInstance._apiCaller.putWithSignature).to.have.been.calledOnce;
                expect(result.email).to.equal('foo@bar.com');
                expect(result.accountId).to.equal('GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S');

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      })));
    });
  });
});