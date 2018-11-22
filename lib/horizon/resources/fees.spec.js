"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('fees', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.fees;
  var feeType = 1;
  afterEach(function () {
    horizon.reset();
  });
  describe('.get', function () {
    var method = 'get';
    (0, _generic_test_cases.testGetRequest)({
      title: "get fees by type",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [feeType],
      path: "/fees/".concat(feeType)
    });
  });
  describe('.getAll', function () {
    var method = 'getAll';
    (0, _generic_test_cases.testGetRequest)({
      title: "get all the fees",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/fees"
    });
  });
  describe('.getOverview', function () {
    var method = 'getOverview';
    (0, _generic_test_cases.testGetRequest)({
      title: "get fees overview",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/fees_overview"
    });
  });
});