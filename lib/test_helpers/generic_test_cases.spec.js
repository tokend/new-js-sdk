"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testRequestSignatureBase = testRequestSignatureBase;
exports.testGetRequestBase = testGetRequestBase;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

function testRequestSignatureBase(_ref) {
  var server = _ref.server,
      resourceGroup = _ref.resourceGroup,
      method = _ref.method,
      _ref$args = _ref.args,
      args = _ref$args === void 0 ? [] : _ref$args,
      path = _ref.path,
      params = _ref.params,
      responseClass = _ref.responseClass;
  it("Should sign the request.",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var response;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            server.onGet(path, {
              params: params
            }).reply(function (config) {
              if (!config.authorized) {
                return [401];
              }

              return [200, server.makeGenericResponse()];
            });
            _context.next = 3;
            return resourceGroup[method].apply(resourceGroup, (0, _toConsumableArray2.default)(args));

          case 3:
            response = _context.sent;
            expect(response).to.be.an.instanceOf(responseClass);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
}

function testGetRequestBase(_ref3) {
  var title = _ref3.title,
      server = _ref3.server,
      resourceGroup = _ref3.resourceGroup,
      method = _ref3.method,
      _ref3$args = _ref3.args,
      args = _ref3$args === void 0 ? [] : _ref3$args,
      path = _ref3.path,
      params = _ref3.params,
      responseClass = _ref3.responseClass;
  it("Should ".concat(title, "."),
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var response;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            server.onGet(path, {
              params: params
            }).reply(200, server.makeGenericResponse());
            _context2.next = 3;
            return resourceGroup[method].apply(resourceGroup, (0, _toConsumableArray2.default)(args));

          case 3:
            response = _context2.sent;
            expect(response).to.be.an.instanceOf(responseClass);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
}