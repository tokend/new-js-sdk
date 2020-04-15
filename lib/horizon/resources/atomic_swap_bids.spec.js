"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('AtomicSwapAsk', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.atomicSwapBid;
  var bidId = '19';
  afterEach(function () {
    horizon.reset();
  });
  describe('.getPage', function () {
    var method = 'getPage';
    var query = {
      owner: 'GCTCU6ZGTOFWPBKPSC56B6HHNFCRERPDOIBDQSAEX4JRPPZQOY33VUAV',
      baseAsset: 'CCF'
    };
    (0, _generic_test_cases.testGetRequest)({
      title: "get the bids",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: "/atomic_swap_bids"
    });
  });
  describe('.get', function () {
    var method = 'get';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the bid",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [bidId],
      path: "/atomic_swap_bids/".concat(bidId)
    });
  });
});