"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('sale_antes', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.saleAntes;
  afterEach(function () {
    horizon.reset();
  });
  describe('.getPage', function () {
    var method = 'getPage';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the sale antes",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/sale_antes"
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/sale_antes"
    });
  });
});