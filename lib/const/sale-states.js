"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.SALE_STATES = void 0;

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var SALE_STATES = (0, _freeze.default)({
  open: 1,
  closed: 2,
  canceled: 4
});
exports.SALE_STATES = SALE_STATES;