"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Balances', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var asset = 'USD';
  var account = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB';
  var resourceGroup = sdk.horizon.balances;
  afterEach(function () {
    sdk.horizon.reset();
  });
  describe('.getPage', function () {
    var method = 'getPage';
    var query = (0, _freeze.default)({
      order: 'asc',
      cursor: '242343242342',
      limit: 20,
      asset: asset,
      account: account
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "Should get a page of balances.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: '/balances'
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: "/balances"
    });
  });
  describe('.getAsset', function () {
    var method = 'getAsset';
    var balanceId = '432423423432';
    (0, _generic_test_cases.testGetRequest)({
      title: "Should get balance asset.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [balanceId],
      path: "/balances/".concat(balanceId, "/asset")
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [balanceId],
      path: "/balances/".concat(balanceId, "/asset")
    });
  });
  describe('.getAccount', function () {
    var method = 'getAccount';
    var balanceId = '432423423432';
    (0, _generic_test_cases.testGetRequest)({
      title: "Should get balance asset.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [balanceId],
      path: "/balances/".concat(balanceId, "/account")
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [balanceId],
      path: "/balances/".concat(balanceId, "/account")
    });
  });
});