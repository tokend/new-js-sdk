"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/date/now"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _mock_factory = _interopRequireDefault(require("./test_helpers/mock_factory"));

var errors = _interopRequireWildcard(require("./errors"));

describe('errors', function () {
  var _mocks$axios = _mock_factory.default.axios(),
      axios = _mocks$axios.axios,
      axiosMock = _mocks$axios.axiosMock;

  var requestConfig;
  var rawErrorResponse;
  var error;
  beforeEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            axiosMock.onAny().reply(403, {
              title: 'Forbidden'
            });
            requestConfig = {
              method: 'get',
              url: '/',
              headers: {
                Date: (0, _now.default)()
              }
            };
            _context.next = 4;
            return axios(requestConfig).catch(function (err) {
              return err;
            });

          case 4:
            rawErrorResponse = _context.sent;
            axiosMock.reset();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterEach(function () {
    return axiosMock.reset();
  });
  describe('ServerErrorBase', function () {
    beforeEach(function () {
      error = new errors.ServerErrorBase(rawErrorResponse, axios);
    });
    describe('.retryRequest', function () {
      it('Should retry exactly the same request.',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var response;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                axiosMock.onAny('/', requestConfig).reply(200, {
                  success: true
                });
                _context2.next = 3;
                return error.retryRequest();

              case 3:
                response = _context2.sent;
                expect(response.data);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
    });
    describe('.httpStatus', function () {
      it('Should expose http status.', function () {
        expect(error).to.have.a.property('httpStatus').equal(403);
      });
    });
    describe('.meta', function () {
      it('Should expose error meta.', function () {
        expect(error).to.have.a.property('meta');
      });
    });
  });
});