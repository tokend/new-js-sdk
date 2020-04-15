"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Trades', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.trades;
  var baseAsset = 'ETH';
  var quoteAsset = 'BTC';
  var orderBookId = '12';
  afterEach(function () {
    horizon.reset();
  });
  describe('.getPage', function () {
    var method = 'getPage';
    var query = (0, _freeze.default)({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
      order_book_id: orderBookId,
      order: 'desc',
      limit: 20
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get the trade history",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: "/trades"
    });
  });
});