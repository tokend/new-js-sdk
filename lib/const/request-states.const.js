"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.REQUEST_STATES_STR = exports.REQUEST_STATES = void 0;

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var REQUEST_STATES = (0, _freeze.default)({
  pending: 1,
  cancelled: 2,
  approved: 3,
  rejected: 4,
  permanentlyRejected: 5
});
exports.REQUEST_STATES = REQUEST_STATES;
var REQUEST_STATES_STR = (0, _freeze.default)({
  pending: 'pending',
  cancelled: 'cancelled',
  approved: 'approved',
  rejected: 'rejected',
  permanentlyRejected: 'permanently_rejected'
});
exports.REQUEST_STATES_STR = REQUEST_STATES_STR;