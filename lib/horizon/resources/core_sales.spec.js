"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('core_sales', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.coreSales;
  afterEach(function () {
    horizon.reset();
  });
  describe('.get', function () {
    var method = 'get';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the core sales",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/core_sales"
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/core_sales"
    });
  });
});