"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.xdrEnumToConstant = xdrEnumToConstant;
exports.KEY_VALUE_ENTRY_TYPES = exports.OP_TYPES = void 0;

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _base = require("../base");

function xdrEnumToConstant(xdrEnum) {
  xdrEnum = typeof xdrEnum === 'string' ? _base.xdr[xdrEnum] : xdrEnum;

  try {
    var res = {};
    xdrEnum.values().forEach(function (item) {
      res[item.name] = item.value;
    });
    return res;
  } catch (error) {
    throw new Error("xdrEnumToConstant: Cannot get values from provided xdrEnum (".concat(xdrEnum, ")"));
  }
}

var OP_TYPES = (0, _freeze.default)(xdrEnumToConstant('OperationType'));
exports.OP_TYPES = OP_TYPES;
var KEY_VALUE_ENTRY_TYPES = (0, _freeze.default)(xdrEnumToConstant('KeyValueEntryType'));
exports.KEY_VALUE_ENTRY_TYPES = KEY_VALUE_ENTRY_TYPES;