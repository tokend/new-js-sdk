"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('History offers', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.historyOffers;
  var baseAsset = 'ETH';
  var quoteAsset = 'BTC';
  var ownerId = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB';
  afterEach(function () {
    horizon.reset();
  });
  describe('.getAll', function () {
    var method = 'getAll';
    var query = (0, _freeze.default)({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
      owner_id: ownerId,
      order: 'desc',
      limit: 20
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get history offers",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: "/history_offers"
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: "/history_offers"
    });
  });
});