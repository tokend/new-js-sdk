"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Public', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.public;
  var operationId = '68719480833';
  afterEach(function () {
    horizon.reset();
  });
  describe('.getOperation', function () {
    var method = 'getOperation';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the public operation by ID",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [operationId],
      path: "/public/operations/".concat(operationId)
    });
  });
  describe('.getOperationsPage', function () {
    var method = 'getOperationsPage';
    var query = (0, _freeze.default)({
      order: 'asc',
      cursor: '242343242342',
      limit: 20
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get all the public operations",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: "/public/operations"
    });
  });
});