"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('trusts', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.trusts;
  var balanceId = 'BAEUBIHPHVI6X3PDC7HSIHVN5OUB7UU3AVTOGUOZHCRVUGPORPIIHS44';
  afterEach(function () {
    horizon.reset();
  });
  describe('.getAll', function () {
    var method = 'getAll';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the trusts",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [balanceId],
      path: "/trusts/".concat(balanceId)
    });
  });
});