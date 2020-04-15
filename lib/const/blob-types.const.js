"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.BLOB_TYPES = void 0;

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var BLOB_TYPES = (0, _freeze.default)({
  assetDescription: 'asset_description',
  saleOverview: 'fund_overview',
  saleDocument: 'fund_document',
  kycCorporate: 'alpha',
  kycGeneral: 'kyc_form',
  bravo: 'bravo'
});
exports.BLOB_TYPES = BLOB_TYPES;