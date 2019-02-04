"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _response = require("./response");

var errors = _interopRequireWildcard(require("../errors"));

var _mock_factory = _interopRequireDefault(require("../test_helpers/mock_factory"));

describe('HorizonServer', function () {
  var horizon = _mock_factory.default.tokenDSdk().horizon;

  afterEach(function () {
    horizon.reset();
  });
  describe('.getNetworkDetails', function () {
    it('Should get network details.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              horizon.onGet('/').reply(200, horizon.makeGenericResponse);
              _context.next = 3;
              return horizon.getNetworkDetails();

            case 3:
              response = _context.sent;
              expect(response).to.be.an.instanceOf(_response.HorizonResponse);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  });
  describe('Error parsers.', function () {
    var testCases = [{
      name: 'Bad Request',
      status: 400,
      body: {
        errors: [{
          title: 'Bad Request',
          detail: 'Bad Request'
        }]
      },
      expectedError: errors.BadRequestError
    }, {
      name: 'Unauthorized',
      status: 401,
      body: {
        errors: [{
          title: 'Unauthorized',
          detail: 'Unauthorized'
        }]
      },
      expectedError: errors.UnauthorizedError
    }, {
      name: 'Not Found',
      status: 404,
      body: {
        errors: [{
          title: 'Not Found',
          detail: 'Not Found'
        }]
      },
      expectedError: errors.NotFoundError
    }, {
      name: 'Internal Server Error',
      status: 500,
      body: {
        errors: [{
          title: 'Internal Server Error',
          detail: 'Internal Server Error'
        }]
      },
      expectedError: errors.InternalServerError
    }];
    testCases.forEach(function (testCase) {
      it("Should parse and wrap \"".concat(testCase.name, "\" error."),
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var error;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                horizon.onAny().reply(testCase.status, testCase.body);
                _context2.next = 3;
                return catchPromise(horizon._makeCallBuilder().get());

              case 3:
                error = _context2.sent;
                expect(error).to.be.an.instanceOf(testCase.expectedError);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      })));
    });
    it('Should parse error details.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var rawError, error;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              rawError = {
                title: 'Bad request',
                detail: 'Detail',
                meta: {
                  extras: {
                    tx: 'tsfsdfsd',
                    tx_hash: 'le hash'
                  }
                }
              };
              horizon.onAny().reply(400, {
                errors: [rawError]
              });
              _context3.next = 4;
              return catchPromise(horizon._makeCallBuilder().get());

            case 4:
              error = _context3.sent;
              expect(error).to.have.a.property('detail').equal(rawError.detail);
              expect(error).to.have.a.property('meta').deep.equal({
                extras: {
                  tx: rawError.meta.extras.tx,
                  txHash: rawError.meta.extras.tx_hash
                }
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('Should parse 2FA errors from the API.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4() {
      var error;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              horizon.onAny().reply(403, {
                errors: [{
                  title: '2FA required.',
                  details: '2FA required.'
                }]
              });
              _context4.next = 3;
              return catchPromise(horizon._makeCallBuilder().get());

            case 3:
              error = _context4.sent;
              expect(error).to.be.an.instanceOf(errors.TFARequiredError);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
  });
  it('Should parse responses.',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5() {
    var body, response;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            body = {
              foo: 'bar'
            };
            horizon.onGet().reply(200, body);
            _context5.next = 4;
            return horizon._makeCallBuilder().get();

          case 4:
            response = _context5.sent;
            expect(response).to.be.an.instanceOf(_response.HorizonResponse);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  })));
});