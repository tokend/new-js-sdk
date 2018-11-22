"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _sinon = _interopRequireDefault(require("sinon"));

var _axios = _interopRequireDefault(require("axios"));

var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));

var _mock_factory = _interopRequireDefault(require("./test_helpers/mock_factory"));

var _call_builder = require("./call_builder");

describe('CallBuilder', function () {
  var sandbox;

  var axiosInstance = _axios.default.create();

  var axiosMock = new _axiosMockAdapter.default(axiosInstance);

  var sdk = _mock_factory.default.tokenDSdk({
    legacySignatures: false
  });

  var sdkLegacySignatures = _mock_factory.default.tokenDSdk({
    legacySignatures: true
  });

  var noWalletSdk = _mock_factory.default.tokenDSdk({
    noWallet: true
  });

  var callBuilder;
  var noWalletCallBuilder;
  var legacySignaturesCallBuilder;
  beforeEach(function () {
    sandbox = _sinon.default.createSandbox();
    callBuilder = new _call_builder.CallBuilder(axiosInstance, sdk);
    noWalletCallBuilder = new _call_builder.CallBuilder(axiosInstance, noWalletSdk);
    legacySignaturesCallBuilder = new _call_builder.CallBuilder(axiosInstance, sdkLegacySignatures);
  });
  afterEach(function () {
    axiosMock.reset();
    sandbox.restore();
  });
  describe('.constructor', function () {
    it('Should create a call builder instance', function () {
      expectNoThrow(function () {
        return new _call_builder.CallBuilder(axiosInstance);
      });
    });
    it('Should throw if no axios instance provided', function () {
      expectThrow(function () {
        return new _call_builder.CallBuilder();
      });
    });
  });
  var contact = {
    id: 1,
    name: 'John Smith'
  };
  describe('.appendUrlSegment', function () {
    it('Should append a number to the request URL.', function () {
      var contactId = 3432423;
      axiosMock.onGet("/contacts/".concat(contactId)).reply(200, contact);
      return callBuilder.appendUrlSegment('contacts').appendUrlSegment(contactId).get();
    });
    it('Should append a simple string to the request URL.', function () {
      var contactId = 'foo';
      axiosMock.onGet("/contacts/".concat(contactId)).reply(200, contact);
      return callBuilder.appendUrlSegment('contacts').appendUrlSegment(contactId).get();
    });
    it('Should append a complex URL segment to the request URL.', function () {
      var subPath = '/foo/bar';
      axiosMock.onGet("/contacts/foo/bar").reply(200, contact);
      return callBuilder.appendUrlSegment('contacts').appendUrlSegment(subPath).get();
    });
    it('Should throw if the provided segment is not a string or a number.', function () {
      expectThrow(function () {
        return callBuilder.appendUrlSegment({
          foo: 'bar'
        });
      });
    });
  });
  describe('.appendAccountId', function () {
    it("Should use wallet's account ID.",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              axiosMock.onGet("/accounts/".concat(sdk.wallet.accountId)).reply(200, contact);
              _context.next = 3;
              return callBuilder.appendUrlSegment('accounts').appendAccountId().get();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it("Should use custom account ID.",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var accountId;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              accountId = 'GDCB5EOW2EIDENABVPRLRSBPL746DWGBMOZDWMVCRXBQQFOLLARTVNQ3';
              axiosMock.onGet("/accounts/".concat(accountId)).reply(200, contact);
              _context2.next = 4;
              return callBuilder.appendUrlSegment('accounts').appendAccountId(accountId).get();

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it("Should throw if an invalid account ID provided.", function () {
      expectThrow(function () {
        return noWalletCallBuilder.appendAccountId('bad id');
      });
    });
    it("Should throw if now account ID present.", function () {
      expectThrow(function () {
        return noWalletCallBuilder.appendAccountId();
      });
    });
  });
  describe('.withSignature', function () {
    it('Should require request signature if a default wallet is present.', function () {
      expectNoThrow(function () {
        return callBuilder.withSignature();
      });
    });
    it('Should use a wallet passed as an argument.', function () {
      var noAuthCallBuilder = new _call_builder.CallBuilder(axiosInstance);
      expectNoThrow(function () {
        return noAuthCallBuilder.withSignature(sdk.wallet);
      });
    });
    it('Should sign a request.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var timestamp;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              timestamp = Date.UTC(2018, 3, 4) / 1000;
              sandbox.useFakeTimers(timestamp * 1000);
              axiosMock.onAny().reply(function (config) {
                // 'Date' http header is not allowed to be set in most browsers, so we don't set it for now
                // expect(config.headers)
                //   .to.have.a.property('date')
                //   .equal('Wed, 04 Apr 2018 00:00:00 GMT')
                expect(config.headers).to.have.a.property('signature') // same here
                // .equal(`keyId="GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB",algorithm="ed25519-sha256",headers="(request-target) date",signature="iAteM8F+Y6Tl88RFN460FPXwEcQ3FN9apW4feZTQJRA7ZiMP0m3oH8k8JimsQT9lH3jtrdzuXGQAAPPE5VH+CQ=="`)
                .equal("keyId=\"GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB\",algorithm=\"ed25519-sha256\",headers=\"(request-target)\",signature=\"OhOfLyXQzt5ejT4sdGTQxsXSQ0X4YJwD4UaHlQPqTarZYqB79srecuOCm15bv6jXbWbI7jJYWhdgLzw4qprMCQ==\"");
                return [200, {}];
              });
              _context3.next = 5;
              return callBuilder.withSignature().get();

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('Should sign a request(legacy).',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4() {
      var timestamp;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              timestamp = Date.UTC(2018, 3, 4) / 1000;
              sandbox.useFakeTimers(timestamp * 1000);
              axiosMock.onAny().reply(function (config) {
                expect(config.headers).to.have.a.property('X-AuthPublicKey').equal(sdk.wallet.accountId);
                expect(config.headers).to.have.a.property('X-AuthSignature').equal('bQHOGAAAAEDuZW71sEhG6IgVBZ/avvM5ZNOF3BCyYGJ7einbPb4Cyhr/s3Hdl14zf2/Q3zAbFJb6KaqFTmidyuGOYykIV3UC');
                expect(config.headers).to.have.a.property('X-AuthValidUnTillTimestamp').equal('1522800060');
                return [200, {}];
              });
              _context4.next = 5;
              return legacySignaturesCallBuilder.withSignature().get();

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
    it('Should throw if there is no wallet attached.', function () {
      expectThrow(function () {
        return noWalletCallBuilder.withSignature();
      });
    });
  });
  describe('.withTimeout', function () {
    var customTimeout = 1337;
    it('Should set a custom request timeout.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5() {
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              axiosMock.onGet("/", {
                timeout: customTimeout
              }).reply(200, contact);
              _context5.next = 3;
              return callBuilder.withTimeout(customTimeout).get();

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
    it('Should throw if the timeout is invalid.', function () {
      expectThrow(function () {
        return callBuilder.withTimeout('bitconneeeeect');
      });
    });
  });
  describe('.get', function () {
    var data = [contact];
    var queryParams = {
      name: 'Jo'
    };
    it('Should perform a GET request.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6() {
      var response;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              axiosMock.onGet("/contacts", {
                params: queryParams
              }).reply(200, data);
              _context6.next = 3;
              return callBuilder.appendUrlSegment('contacts').get(queryParams);

            case 3:
              response = _context6.sent;
              expect(response).to.have.a.property('data').deep.equal(data);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));
  });
  describe('.post', function () {
    it('Should perform a POST request.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee7() {
      var response;
      return _regenerator.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              axiosMock.onPost("/contacts").reply(function (config) {
                expect(config.data).equal((0, _stringify.default)(contact));
                return [200, contact];
              });
              _context7.next = 3;
              return callBuilder.appendUrlSegment('contacts').post(contact);

            case 3:
              response = _context7.sent;
              expect(response).to.have.a.property('data').deep.equal(contact);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    })));
  });
  describe('.put', function () {
    it('Should perform a PUT request.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee8() {
      var response;
      return _regenerator.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              axiosMock.onPut("/contacts/".concat(contact.id)).reply(function (config) {
                expect(config.data).equal((0, _stringify.default)(contact));
                return [200, contact];
              });
              _context8.next = 3;
              return callBuilder.appendUrlSegment('contacts').appendUrlSegment(contact.id).put(contact);

            case 3:
              response = _context8.sent;
              expect(response).to.have.a.property('data').deep.equal(contact);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    })));
  });
  describe('.patch', function () {
    it('Should perform a PUT request.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee9() {
      var response;
      return _regenerator.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              axiosMock.onPatch("/contacts/".concat(contact.id)).reply(function (config) {
                expect(config.data).equal((0, _stringify.default)(contact));
                return [200, contact];
              });
              _context9.next = 3;
              return callBuilder.appendUrlSegment('contacts').appendUrlSegment(contact.id).patch(contact);

            case 3:
              response = _context9.sent;
              expect(response).to.have.a.property('data').deep.equal(contact);

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    })));
  });
  describe('.delete', function () {
    it('Should perform a DELETE request.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee10() {
      var response;
      return _regenerator.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              axiosMock.onDelete("/contacts/".concat(contact.id)).reply(204);
              _context10.next = 3;
              return callBuilder.appendUrlSegment('contacts').appendUrlSegment(contact.id).delete();

            case 3:
              response = _context10.sent;
              expect(response).to.have.a.property('status').equal(204);

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    })));
  });
});