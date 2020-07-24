"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Order book', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.orderBook;
  var baseAsset = 'ETH';
  var quoteAsset = 'BTC';
  afterEach(function () {
    horizon.reset();
  });
  describe('.getAll', function () {
    var method = 'getAll';
    var query = (0, _freeze.default)({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
      order: 'desc',
      limit: 20
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get the order_book",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: "/order_book"
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: "/order_book"
    });
  });
});