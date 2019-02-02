"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('key_value', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.keyValue;
  var key = 'test12221312';
  afterEach(function () {
    horizon.reset();
  });
  describe('.get', function () {
    var method = 'get';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the key/value pair by key",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [key],
      path: "/key_value/".concat(key)
    });
  });
  describe('.getAll', function () {
    var method = 'getAll';
    (0, _generic_test_cases.testGetRequest)({
      title: "get all the key/values",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/key_value"
    });
  });
});