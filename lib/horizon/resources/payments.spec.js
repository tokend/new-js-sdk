"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Payments', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.payments;
  afterEach(function () {
    horizon.reset();
  });
  describe('.getPage', function () {
    var method = 'getPage';
    var query = (0, _freeze.default)({
      order: 'asc',
      cursor: '242343242342',
      limit: 20
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get all the payments",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: "/payments"
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      params: query,
      args: [query],
      path: "/payments"
    });
  });
});