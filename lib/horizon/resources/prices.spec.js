"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Prices', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.prices;
  var baseAsset = 'ETH';
  var quoteAsset = 'BTC';
  afterEach(function () {
    horizon.reset();
  });
  describe('.getHistory', function () {
    var method = 'getHistory';
    var query = (0, _freeze.default)({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
      order: 'desc',
      limit: 20
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get the price history",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: "/prices/history"
    });
  });
});