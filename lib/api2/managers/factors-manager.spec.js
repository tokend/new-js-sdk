"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _sinon = _interopRequireDefault(require("sinon"));

var _factorsManager = require("./factors-manager");

var _apiCaller = require("../api-caller");

var _wallet = require("../../wallet");

var _errors = require("../../errors");

describe('Factors manager', function () {
  var sandbox;
  var factorsManagerInstance;
  beforeEach(function () {
    sandbox = _sinon.default.createSandbox();
    factorsManagerInstance = new _factorsManager.FactorsManager(_apiCaller.ApiCaller.getInstance('https://api.test.com'));
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('method', function () {
    describe('verifyPasswordFactor', function () {
      it('calls _apiCaller.put to proper endpoint with derived error attributes',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sandbox.stub(factorsManagerInstance._apiCaller, 'wallet').get(function () {
                  return {
                    id: 'some-wallet-id',
                    email: 'foo@bar.com',
                    accountId: 'SOME_ACCOUNT_ID'
                  };
                });
                sandbox.stub(factorsManagerInstance, '_getKdfParams').resolves({
                  data: 'some-kdf-params'
                });
                sandbox.stub(_wallet.Wallet, 'fromEncrypted').returns(new _wallet.Wallet('foo@bar.com', 'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3', 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S', 'some-wallet-id'));
                sandbox.stub(factorsManagerInstance._apiCaller, 'put').resolves();
                _context.next = 6;
                return factorsManagerInstance.verifyPasswordFactor(new _errors.TFARequiredError({
                  response: {
                    data: {
                      errors: [{
                        meta: {
                          token: 'some-token',
                          keychain_data: 'some-keychain-data',
                          salt: 'some-salt',
                          factor_id: '1'
                        }
                      }]
                    }
                  }
                }), 'qwe123');

              case 6:
                expect(factorsManagerInstance._getKdfParams).to.have.been.calledOnceWithExactly('foo@bar.com');
                expect(_wallet.Wallet.fromEncrypted).to.have.been.calledOnceWithExactly({
                  keychainData: 'some-keychain-data',
                  kdfParams: 'some-kdf-params',
                  salt: 'some-salt',
                  email: 'foo@bar.com',
                  password: 'qwe123',
                  accountId: 'SOME_ACCOUNT_ID'
                });
                expect(factorsManagerInstance._apiCaller.put).to.have.been.calledOnceWith('/wallets/some-wallet-id/factors/1/verification');

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    });
    describe('verifyTotpFactor', function () {
      it('calls apiCaller.put to proper endpoint with derived error attributes',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sandbox.stub(factorsManagerInstance._apiCaller, 'put').resolves();
                _context2.next = 3;
                return factorsManagerInstance.verifyTotpFactor(new _errors.TFARequiredError({
                  response: {
                    data: {
                      errors: [{
                        meta: {
                          wallet_id: 'some-wallet-id',
                          factor_id: '1',
                          token: 'some-token'
                        }
                      }]
                    }
                  }
                }), '123456');

              case 3:
                expect(factorsManagerInstance._apiCaller.put).to.have.been.calledOnceWithExactly('/wallets/some-wallet-id/factors/1/verification', {
                  data: {
                    attributes: {
                      token: 'some-token',
                      otp: '123456'
                    }
                  }
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
    });
  });
});