"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _response = require("./response");

var errors = _interopRequireWildcard(require("../errors"));

var _mock_factory = _interopRequireDefault(require("../test_helpers/mock_factory"));

describe('ApiServer', function () {
  var api = _mock_factory.default.tokenDSdk().api;

  afterEach(function () {
    api.reset();
  });
  var responseBody = (0, _freeze.default)({
    data: {
      id: '1',
      type: 'contacts'
    }
  });
  it('Should parse responses.',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var response;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            api.onGet().reply(200, responseBody);
            _context.next = 3;
            return api._makeCallBuilder().get();

          case 3:
            response = _context.sent;
            expect(response).to.be.an.instanceOf(_response.ApiResponse);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should convert request body to snake case.',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            api.onAny().reply(function (config) {
              expect(config.data).to.equal('{"foo_bar":"barFoo"}');
              return [200, responseBody];
            });
            _context2.next = 3;
            return api._makeCallBuilder().post({
              fooBar: 'barFoo'
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should convert query params to snake case.',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            api.onAny('/', {
              params: {
                'foo_bar': 'barFoo'
              }
            }).reply(200, responseBody);
            _context3.next = 3;
            return api._makeCallBuilder().get({
              fooBar: 'barFoo'
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  describe('errors', function () {
    var testCases = [{
      name: 'Bad Request',
      status: 400,
      body: {
        errors: [{}]
      },
      expectedError: errors.BadRequestError
    }, {
      name: 'Not Allowed',
      status: 401,
      body: {
        errors: [{}]
      },
      expectedError: errors.NotAllowedError
    }, {
      name: 'Forbidden',
      status: 403,
      body: {
        errors: [{}]
      },
      expectedError: errors.ForbiddenRequestError
    }, {
      name: 'TFA Required',
      status: 403,
      body: {
        errors: [{
          code: 'tfa_required'
        }]
      },
      expectedError: errors.TFARequiredError
    }, {
      name: 'Verification Required',
      status: 403,
      body: {
        errors: [{
          code: 'verification_required'
        }]
      },
      expectedError: errors.VerificationRequiredError
    }, {
      name: 'Not Found',
      status: 404,
      body: {
        errors: [{}]
      },
      expectedError: errors.NotFoundError
    }, {
      name: 'Conflict',
      status: 409,
      body: {
        errors: [{}]
      },
      expectedError: errors.ConflictError
    }, {
      name: 'Internal Server Error',
      status: 500,
      body: {
        errors: [{}]
      },
      expectedError: errors.InternalServerError
    }, {
      name: 'Unexpected error',
      status: 488,
      body: {
        errors: [{}]
      },
      expectedError: errors.ServerError
    }];
    testCases.forEach(function (testCase) {
      it("Should parse \"".concat(testCase.name, "\" error."),
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        var error;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                api.onAny().reply(testCase.status, testCase.body);
                _context4.next = 3;
                return catchPromise(api._makeCallBuilder().get());

              case 3:
                error = _context4.sent;
                expect(error).to.be.an.instanceOf(testCase.expectedError);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
    });
    it('Should bypass non-server errors.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5() {
      var error;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              api.onAny().timeout();
              _context5.next = 3;
              return catchPromise(api._makeCallBuilder().get());

            case 3:
              error = _context5.sent;
              expect(error).not.to.be.an.instanceOf(errors.ServerError);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});