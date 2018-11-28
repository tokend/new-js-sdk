"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xdrEnumToConstant = xdrEnumToConstant;
exports.OP_TYPES = exports.ACCOUNT_TYPES = exports.ASSET_PAIR_POLICIES = exports.ASSET_POLICIES = exports.PAYMENT_FEE_SUBTYPES = exports.FEE_TYPES = exports.REQUEST_TYPES = void 0;

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

var REQUEST_TYPES = (0, _freeze.default)(xdrEnumToConstant('ReviewableRequestType'));
exports.REQUEST_TYPES = REQUEST_TYPES;
var FEE_TYPES = (0, _freeze.default)(xdrEnumToConstant('FeeType'));
exports.FEE_TYPES = FEE_TYPES;
var PAYMENT_FEE_SUBTYPES = (0, _freeze.default)(xdrEnumToConstant('PaymentFeeType'));
exports.PAYMENT_FEE_SUBTYPES = PAYMENT_FEE_SUBTYPES;
var ASSET_POLICIES = (0, _freeze.default)(xdrEnumToConstant('AssetPolicy'));
exports.ASSET_POLICIES = ASSET_POLICIES;
var ASSET_PAIR_POLICIES = (0, _freeze.default)(xdrEnumToConstant('AssetPairPolicy'));
exports.ASSET_PAIR_POLICIES = ASSET_PAIR_POLICIES;
var ACCOUNT_TYPES = (0, _freeze.default)(xdrEnumToConstant('AccountType'));
exports.ACCOUNT_TYPES = ACCOUNT_TYPES;
var OP_TYPES = (0, _freeze.default)(xdrEnumToConstant('OperationType'));
exports.OP_TYPES = OP_TYPES;