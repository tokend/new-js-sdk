"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Sales', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var resourceGroup = sdk.horizon.sales;
  afterEach(function () {
    sdk.horizon.reset();
  });
  describe('.get', function () {
    var method = 'get';
    var id = '10';
    (0, _generic_test_cases.testGetRequest)({
      title: "Should get sale by id.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      args: [id],
      method: method,
      path: "/sales/".concat(id)
    });
  });
  describe('.getPage', function () {
    var method = 'getPage';
    (0, _generic_test_cases.testGetRequest)({
      title: "Should get assets requests with query params.",
      horizon: sdk.horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [],
      path: "/sales"
    });
  });
});