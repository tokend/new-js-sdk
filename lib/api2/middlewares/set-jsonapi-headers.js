"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setJsonapiHeaders = setJsonapiHeaders;

var _lodash = _interopRequireDefault(require("lodash"));

var MIME_TYPE_JSON_API = 'application/vnd.api+json';
var HEADER_CONTENT_TYPE = 'Content-Type';
var HEADER_ACCEPT = 'Accept';

function setJsonapiHeaders(requestConfig) {
  var config = _lodash.default.cloneDeep(requestConfig);

  config.headers = config.headers || {};
  config.headers[HEADER_CONTENT_TYPE] = MIME_TYPE_JSON_API;
  config.headers[HEADER_ACCEPT] = MIME_TYPE_JSON_API;
  return config;
}