"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _horizon = require("./horizon");

var _api = require("./api");

var _wallet = require("./wallet");

var _network = require("./base/network");

var _mock_factory = _interopRequireDefault(require("./test_helpers/mock_factory"));

var _sinon = _interopRequireDefault(require("sinon"));

var _tokend_sdk = require("./tokend_sdk");

describe('TokenD', function () {
  var sandbox;
  var sdk;
  var url = 'https://tokend.org/';
  var opts = {
    allowHttp: false
  };

  var wallet = _mock_factory.default.wallet();

  beforeEach(function () {
    sandbox = _sinon.default.createSandbox();
    sdk = new _tokend_sdk.TokenD(url, opts);
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('.constructor', function () {
    it('Should make an SDK instance.', function () {
      var sdk = new _tokend_sdk.TokenD(url, opts);
      expect(sdk).to.have.a.property('api').instanceOf(_api.ApiServer);
      expect(sdk).to.have.a.property('horizon').instanceOf(_horizon.HorizonServer);
    });
  });
  describe('.create', function () {
    var networkPassphrase = 'Main Net';
    var serverTimestamp = 1525881668;
    var clockDiff = 133700;
    beforeEach(
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              sandbox.useFakeTimers((serverTimestamp - clockDiff) * 1000);
              sandbox.stub(_horizon.HorizonServer.prototype, 'getNetworkDetails').returns(_promise.default.resolve({
                data: {
                  networkPassphrase: networkPassphrase,
                  currentTime: serverTimestamp
                }
              }));
              sandbox.stub(_network.Network, 'use');
              _context.next = 5;
              return _tokend_sdk.TokenD.create(url, opts);

            case 5:
              sdk = _context.sent;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('Should create an SDK instance.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              expect(sdk).to.be.an.instanceOf(_tokend_sdk.TokenD);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('Should sync network passphrase.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              expect(_network.Network.use).to.be.calledWith(new _network.Network(networkPassphrase));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))); // TODO: this test fails because of @babel/runtime-corejs2 polyfills Date property with no way to use sinon fake timers. Uncomment when resolved
    // it('Should sync clock.', async () => {
    //   expect(sdk).to.have.a.property('clockDiff').equal(-clockDiff)
    // })
  });
  describe('.useWallet', function () {
    it('Should use a wallet.', function () {
      expectNoThrow(function () {
        return sdk.useWallet(wallet);
      });
      expect(sdk).to.have.a.property('wallet').instanceOf(_wallet.Wallet);
    });
    it('Should throw if an invalid wallet passed.', function () {
      expectThrow(function () {
        return sdk.useWallet(null);
      });
    });
  });
  describe('.ejectWallet', function () {
    it('Should eject wallet.', function () {
      sdk.useWallet(wallet);
      expectNoThrow(function () {
        return sdk.ejectWallet();
      });
      expect(sdk.wallet).to.be.null;
    });
  });
  describe('.legacySignatures', function () {
    it('Should not use legacy signatures by default', function () {
      expect(sdk).to.have.a.property('legacySignatures').equal(false);
    });
  });
});