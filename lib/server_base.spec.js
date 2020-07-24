"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));

var _errors = require("./errors");

var _mock_factory = _interopRequireDefault(require("./test_helpers/mock_factory"));

var _server_base = require("./server_base");

describe('ServerBase', function () {
  var server;

  var sdk = _mock_factory.default.tokenDSdk();

  var url = 'https://fizz.buzz';
  beforeEach(function () {
    server = new _server_base.ServerBase(sdk, url);
  });
  describe('.constructor', function () {
    it('Should create a ServerBase instance.', function () {
      expectNoThrow(function () {
        return new _server_base.ServerBase(sdk, url);
      });
    });
    it("Should create an instance w/o HTTPS when it's enabled in the options", function () {
      expectNoThrow(function () {
        return new _server_base.ServerBase(sdk, url, {
          allowHttp: true
        });
      });
    });
    it("Should throw when no SDK instance injected.", function () {
      expectThrow(function () {
        return new _server_base.ServerBase(null, url);
      });
    });
    it("Should throw when a URL w/o HTTPS is provided and unsafe connections are not enabled.", function () {
      expectThrow(function () {
        return new _server_base.ServerBase(sdk, url);
      });
    });
    it('Should throw when no URL provided.', function () {
      expectThrow(function () {
        return new _server_base.ServerBase(sdk);
      });
    });
    it('Should throw when a corrupt URL is provided.', function () {
      expectThrow(function () {
        return new _server_base.ServerBase(sdk, url);
      });
    });
  });
  describe('.useRequestInterceptor', function () {
    it('Should use a request interceptor.', function () {
      var descriptor = server.useRequestInterceptor(function () {
        return 'success';
      }, function () {
        return 'error';
      });
      expect(descriptor).to.be.a('number');
    });
  });
  describe('.ejectRequestInterceptor', function () {
    it('Should use a request interceptor.', function () {
      var descriptor = server.useRequestInterceptor(function () {}, function () {});
      server.ejectRequestInterceptor(descriptor);
    });
  });
  describe('.useResponseInterceptor', function () {
    it('Should use a request interceptor.', function () {
      var descriptor = server.useResponseInterceptor(function () {
        return 'success';
      }, function () {
        return 'error';
      });
      expect(descriptor).to.be.a('number');
    });
  });
  describe('.ejectResponseInterceptor', function () {
    it('Should use a request interceptor.', function () {
      var descriptor = server.useResponseInterceptor(function () {}, function () {});
      server.ejectResponseInterceptor(descriptor);
    });
  });
  it('Should parse network errors.',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var mock, error;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mock = new _axiosMockAdapter.default(server._axios);
            mock.onAny().networkError();
            _context.next = 4;
            return catchPromise(server._makeCallBuilder().get());

          case 4:
            error = _context.sent;
            expect(error).to.be.an.instanceOf(_errors.NetworkError);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should parse timeout errors',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var mock, error;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mock = new _axiosMockAdapter.default(server._axios);
            mock.onAny().timeout();
            _context2.next = 4;
            return catchPromise(server._makeCallBuilder().get());

          case 4:
            error = _context2.sent;
            expect(error).to.be.an.instanceOf(_errors.TimeoutError);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should pass through other errors',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var mock, error;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mock = new _axiosMockAdapter.default(server._axios);
            mock.onAny().reply(500);
            _context3.next = 4;
            return catchPromise(server._makeCallBuilder().get());

          case 4:
            error = _context3.sent;
            expect(error.response).to.have.a.property('status').equal(500);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});