"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Assets', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.assets;
  var assetCode = 'BTC';
  afterEach(function () {
    horizon.reset();
  });
  describe('.get', function () {
    var method = 'get';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the asset by code",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [assetCode],
      path: "/assets/".concat(assetCode)
    });
  });
  describe('.getAll', function () {
    var method = 'getAll';
    (0, _generic_test_cases.testGetRequest)({
      title: "get all existing assets",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/assets"
    });
  });
  describe('.getHolders', function () {
    var method = 'getHolders';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the asset holders",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [assetCode],
      path: "/assets/".concat(assetCode, "/holders")
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [assetCode],
      path: "/assets/".concat(assetCode, "/holders")
    });
  });
});