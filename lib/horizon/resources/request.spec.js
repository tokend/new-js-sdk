"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Requests', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var account = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB';
  var anotherAccount = 'GDF7RAKSHWC5GKY2NRLYTZTBGFES5WX5Q6PRLX4VGH7X6TGLHLRPFIGD';
  var resourceGroup = sdk.horizon.request;
  var query = (0, _freeze.default)({
    reviewer: account,
    requestor: anotherAccount,
    state: 2
  });

  var getPath = function getPath(segment) {
    return "/request/".concat(segment);
  };

  afterEach(function () {
    sdk.horizon.reset();
  });
  describe('.get', function () {
    var method = 'get';
    var id = '10';
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [id],
      path: "/requests/".concat(id)
    });
  });
  describe('.getAllForAssets', function () {
    var method = 'getAllForAssets';
    var segment = 'assets';
    (0, _generic_test_cases.testGetRequest)({
      title: "Should get assets requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
  });
  describe('.getAllForPreissuances', function () {
    var method = 'getAllForPreissuances';
    var segment = 'preissuances';
    (0, _generic_test_cases.testGetRequest)({
      title: "Should get preissuances requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
  });
  describe('.getAllForIssuances', function () {
    var method = 'getAllForIssuances';
    var segment = 'issuances';
    (0, _generic_test_cases.testGetRequest)({
      title: "Should get issuances requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
  });
  describe('.getAllForWithdrawals', function () {
    var method = 'getAllForWithdrawals';
    var segment = 'withdrawals';
    (0, _generic_test_cases.testGetRequest)({
      title: "get withdrawals requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
  });
  describe('.getAllForSales', function () {
    var method = 'getAllForSales';
    var segment = 'sales';
    (0, _generic_test_cases.testGetRequest)({
      title: "get sales requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
  });
  describe('.getAllForLimitsUpdates', function () {
    var method = 'getAllForLimitsUpdates';
    var segment = 'limits_updates';
    (0, _generic_test_cases.testGetRequest)({
      title: "get limits_updates requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
  });
  describe('.getAllForUpdateKyc', function () {
    var method = 'getAllForUpdateKyc';
    var segment = 'update_kyc';
    (0, _generic_test_cases.testGetRequest)({
      title: "get update_kyc requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get update_kyc requests without query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [],
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [],
      path: getPath(segment)
    });
  });
  describe('.getAllForUpdateSaleDetails', function () {
    var method = 'getAllForUpdateSaleDetails';
    var segment = 'update_sale_details';
    (0, _generic_test_cases.testGetRequest)({
      title: "get update_sale_details requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get update_sale_details requests without query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [],
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [],
      path: getPath(segment)
    });
  });
  describe('.getAllForUpdateSaleEndTime', function () {
    var method = 'getAllForUpdateSaleEndTime';
    var segment = 'update_sale_end_time';
    (0, _generic_test_cases.testGetRequest)({
      title: "get update_sale_end_time requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get update_sale_end_time requests without query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [],
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [],
      path: getPath(segment)
    });
  });
  describe('.getAllForAtomicSwapBids', function () {
    var method = 'getAllForAtomicSwapBids';
    var segment = 'atomic_swap_bids';
    (0, _generic_test_cases.testGetRequest)({
      title: "get atomic_swap_bids requests",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
  });
  describe('.getAllForAtomicSwap', function () {
    var method = 'getAllForAtomicSwap';
    var segment = 'atomic_swaps';
    (0, _generic_test_cases.testGetRequest)({
      title: "get atomic_swap requests",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: getPath(segment)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: getPath(segment)
    });
  });
});