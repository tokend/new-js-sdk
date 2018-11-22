"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('references', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.references;
  afterEach(function () {
    horizon.reset();
  });
  describe('.get', function () {
    var method = 'get';
    var reference = 'qeqwrwewerqewrqwer';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the references",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [reference],
      path: "/references/".concat(reference)
    });
  });
  describe('.getAll', function () {
    var method = 'getAll';
    (0, _generic_test_cases.testGetRequest)({
      title: "get all the references",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/references"
    });
  });
});