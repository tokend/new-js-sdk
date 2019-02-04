"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEY_VALUE_KEYS = void 0;

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var KEY_VALUE_KEYS = (0, _freeze.default)({
  issuanceTasks: 'issuance_tasks',
  preIssuanceTasks: 'preissuance_tasks',
  assetCreateTasks: 'asset_create_tasks',
  saleCreateTasks: 'sale_create_tasks:*'
});
exports.KEY_VALUE_KEYS = KEY_VALUE_KEYS;