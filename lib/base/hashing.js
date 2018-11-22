"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hash = hash;

var _lodash = require("lodash");

var _crypto = _interopRequireDefault(require("crypto"));

function hash(data) {
  var hasher = _crypto.default.createHash('sha256');

  if ((0, _lodash.isString)(data)) {
    data = Buffer.from(data, 'utf8');
  } else if ((0, _lodash.isArray)(data)) {
    data = Buffer.from(data);
  }

  hasher.update(data);
  return hasher.digest();
}