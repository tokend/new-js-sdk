"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testRequestSignature = testRequestSignature;
exports.testGetRequest = testGetRequest;

var _generic_test_cases = require("../../test_helpers/generic_test_cases.spec");

var _response = require("../response");

function testRequestSignature(_ref) {
  var horizon = _ref.horizon,
      resourceGroup = _ref.resourceGroup,
      method = _ref.method,
      args = _ref.args,
      path = _ref.path,
      params = _ref.params;
  (0, _generic_test_cases.testRequestSignatureBase)({
    server: horizon,
    responseClass: _response.HorizonResponse,
    resourceGroup: resourceGroup,
    method: method,
    args: args,
    path: path,
    params: params
  });
}

function testGetRequest(_ref2) {
  var title = _ref2.title,
      horizon = _ref2.horizon,
      resourceGroup = _ref2.resourceGroup,
      method = _ref2.method,
      args = _ref2.args,
      path = _ref2.path,
      params = _ref2.params;
  (0, _generic_test_cases.testGetRequestBase)({
    title: title,
    server: horizon,
    resourceGroup: resourceGroup,
    method: method,
    args: args,
    path: path,
    params: params,
    responseClass: _response.HorizonResponse
  });
}