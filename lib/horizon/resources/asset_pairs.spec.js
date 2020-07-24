"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Asset pairs', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.assetPairs;
  var baseAsset = 'BTC';
  var quoteAsset = 'ETH';
  var amount = '0.012';
  afterEach(function () {
    horizon.reset();
  });
  describe('.getAll', function () {
    var method = 'getAll';
    (0, _generic_test_cases.testGetRequest)({
      title: "get all the asset pairs",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/asset_pairs"
    });
  });
  describe('.convert', function () {
    var method = 'convert';
    var query = {
      source_asset: baseAsset,
      dest_asset: quoteAsset,
      amount: amount
    };
    (0, _generic_test_cases.testGetRequest)({
      title: "make request to convert amount",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      params: query,
      args: [query],
      path: "/asset_pairs/convert"
    });
  });
});