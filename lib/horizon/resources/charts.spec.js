"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Charts', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.charts;
  var assetCode = 'BTC';
  afterEach(function () {
    horizon.reset();
  });
  describe('.get', function () {
    var method = 'get';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the chart by asset code",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [assetCode],
      path: "/charts/".concat(assetCode)
    });
  });
});