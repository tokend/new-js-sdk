"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _mock_factory = _interopRequireDefault(require("../test_helpers/mock_factory"));

var errors = _interopRequireWildcard(require("./errors"));

describe('errors', function () {
  var _mocks$axios = _mock_factory.default.axios(),
      axios = _mocks$axios.axios,
      axiosMock = _mocks$axios.axiosMock;

  afterEach(function () {
    return axiosMock.reset();
  });
  describe('ApiError', function () {
    var rawError = {
      errors: [{
        title: 'Title',
        detail: 'Detail',
        meta: {
          foo_bar: 'fooBar'
        }
      }]
    };
    var error;
    beforeEach(
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return makeRawError(rawError);

            case 2:
              response = _context.sent;
              error = new errors.ApiError(response, axios);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('Should parse error extras.', function () {
      expect(error).to.have.a.property('title').equal(rawError.errors[0].title);
      expect(error).to.have.a.property('detail').equal(rawError.errors[0].detail);
      expect(error).to.have.a.property('meta').deep.equal({
        fooBar: rawError.errors[0].meta.foo_bar
      });
    });
  });
  describe('BadRequestError', function () {
    it('Should parse a single error.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var rawError, response, error;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              rawError = {
                errors: [{
                  title: 'Title1',
                  detail: 'Detail',
                  meta: {
                    foo_bar: 'fooBar'
                  }
                }]
              };
              _context2.next = 3;
              return makeRawError(rawError);

            case 3:
              response = _context2.sent;
              error = new errors.BadRequestError(response, axios);
              expect(error).to.have.a.property('title').equal(rawError.errors[0].title);
              expect(error).to.have.a.property('detail').equal(rawError.errors[0].detail);
              expect(error).to.have.a.property('meta').deep.equal({
                fooBar: rawError.errors[0].meta.foo_bar
              });

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('Should parse errors array.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var rawError, response, error;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              rawError = {
                errors: [{
                  title: 'Title1',
                  detail: 'Detail',
                  meta: {
                    foo_bar: 'fooBar'
                  }
                }, {
                  title: 'Title2',
                  detail: 'Detail',
                  meta: {
                    foo_bar: 'fooBar'
                  }
                }]
              };
              _context3.next = 3;
              return makeRawError(rawError);

            case 3:
              response = _context3.sent;
              error = new errors.BadRequestError(response, axios);
              expect(error).to.have.a.property('nestedErrors').deep.equal([{
                title: 'Title1',
                detail: 'Detail',
                meta: {
                  fooBar: 'fooBar'
                }
              }, {
                title: 'Title2',
                detail: 'Detail',
                meta: {
                  fooBar: 'fooBar'
                }
              }]);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
  });

  function makeRawError(body) {
    axiosMock.onAny().reply(403, body);
    return axios.get().catch(function (err) {
      return err;
    });
  }
});