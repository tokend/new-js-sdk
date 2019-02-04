"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _sinon = _interopRequireDefault(require("sinon"));

var _base = require("../base");

var _wallet = require("../wallet");

var _apiCaller = require("./api-caller");

var _middlewares = _interopRequireDefault(require("./middlewares"));

describe('api-caller unit test', function () {
  describe('._call method', function () {
    var sandbox;
    var api;
    beforeEach(function () {
      api = _apiCaller.ApiCaller.getInstance('http://black.hole');
      sandbox = _sinon.default.createSandbox();
      sandbox.stub(api, '_axios');
      sandbox.stub(_middlewares.default, 'signRequest');
      sandbox.stub(_middlewares.default, 'flattenToAxiosJsonApiQuery');
      sandbox.stub(_middlewares.default, 'setJsonapiHeaders');
      sandbox.stub(_middlewares.default, 'parseJsonapiResponse');
    });
    afterEach(function () {
      _middlewares.default.signRequest.restore();

      _middlewares.default.flattenToAxiosJsonApiQuery.restore();

      _middlewares.default.setJsonapiHeaders.restore();

      _middlewares.default.parseJsonapiResponse.restore();
    });
    it('should set headers before signing the request',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              api._wallet = new _wallet.Wallet('qqq123@mail.com', _base.Keypair.random(), _base.Keypair.random().accountId(), 'anyRandomStringWeDoNotCareNow');
              _context.next = 3;
              return api._call('/foo/bar', {}, 'GET', true);

            case 3:
              expect(_middlewares.default.setJsonapiHeaders).to.have.been.calledBefore(_middlewares.default.signRequest);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  });
});