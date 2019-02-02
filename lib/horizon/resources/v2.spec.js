"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('v2', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.v2;
  afterEach(function () {
    horizon.reset();
  });
  describe('.getAllTransactions', function () {
    var method = 'getAllTransactions';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the v2",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/v2/transactions"
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/v2/transactions"
    });
  });
});