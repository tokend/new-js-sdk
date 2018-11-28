"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTemplate = resolveTemplate;
exports.parseQueryParams = parseQueryParams;

var _urijs = _interopRequireDefault(require("urijs"));

var _URITemplate = _interopRequireDefault(require("urijs/src/URITemplate"));

function resolveTemplate(urlTemplate, bindings) {
  return new _URITemplate.default(urlTemplate).expand(bindings);
}

function parseQueryParams(url) {
  return (0, _urijs.default)(url).query(true);
}