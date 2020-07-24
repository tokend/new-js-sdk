"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Account', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.account;
  var usersAccount = sdk.wallet.accountId;
  var anotherAccount = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB';
  afterEach(function () {
    horizon.reset();
  });
  describe('.get', function () {
    var method = 'get';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's account",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/accounts/".concat(usersAccount)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/accounts/".concat(usersAccount)
    });
  });
  describe('.getAccountKyc', function () {
    var method = 'getAccountKyc';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's kyc",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [usersAccount],
      path: "/accounts/".concat(usersAccount, "/account_kyc")
    });
  });
  describe('.getBalances', function () {
    var method = 'getBalances';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's balances",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/accounts/".concat(usersAccount, "/balances")
    });
    (0, _generic_test_cases.testRequestSignature)({
      method: method,
      horizon: horizon,
      resourceGroup: resourceGroup,
      path: "/accounts/".concat(anotherAccount, "/balances")
    });
  });
  describe('.getDetails', function () {
    var method = 'getDetails';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's account details",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/accounts/".concat(usersAccount, "/balances/details")
    });
    (0, _generic_test_cases.testRequestSignature)({
      method: method,
      horizon: horizon,
      resourceGroup: resourceGroup,
      path: "/accounts/".concat(usersAccount, "/balances/details")
    });
  });
  describe('.getLimits', function () {
    var method = 'getLimits';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's account limits",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/accounts/".concat(usersAccount, "/limits")
    });
  });
  describe('.getOffers', function () {
    var method = 'getOffers';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's offers",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/accounts/".concat(usersAccount, "/offers")
    });
    (0, _generic_test_cases.testRequestSignature)({
      method: method,
      horizon: horizon,
      resourceGroup: resourceGroup,
      path: "/accounts/".concat(usersAccount, "/offers")
    });
  });
  describe('.getOperations', function () {
    var method = 'getOperations';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's operations",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/accounts/".concat(usersAccount, "/operations")
    });
    (0, _generic_test_cases.testRequestSignature)({
      method: method,
      horizon: horizon,
      resourceGroup: resourceGroup,
      path: "/accounts/".concat(usersAccount, "/operations")
    });
  });
  describe('.getPayments', function () {
    var method = 'getPayments';
    var query = {
      limit: 10
    };
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's payments",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      params: query,
      args: [usersAccount, query],
      path: "/accounts/".concat(usersAccount, "/payments")
    });
    (0, _generic_test_cases.testRequestSignature)({
      method: method,
      horizon: horizon,
      resourceGroup: resourceGroup,
      params: query,
      args: [anotherAccount, query],
      path: "/accounts/".concat(anotherAccount, "/payments")
    });
  });
  describe('.getReferences', function () {
    var method = 'getReferences';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's references",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/accounts/".concat(usersAccount, "/references")
    });
    (0, _generic_test_cases.testRequestSignature)({
      method: method,
      horizon: horizon,
      resourceGroup: resourceGroup,
      path: "/accounts/".concat(usersAccount, "/references")
    });
  });
  describe('.getSigners', function () {
    var method = 'getSigners';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's signers",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      path: "/accounts/".concat(usersAccount, "/signers")
    });
  });
  describe('.getSigner', function () {
    var signerId = 'GCJXUHPVJHSHCOHRCS65MOZMT2AJRRHHVH2KJM2GXR6GTF4U5O4P7BJO';
    var method = 'getSigner';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's signer",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [signerId],
      path: "/accounts/".concat(usersAccount, "/signers/").concat(signerId)
    });
  });
  describe('.getSummary', function () {
    var method = 'getSummary';
    var query = {
      from: '2018-01-01',
      to: '2018-05-01'
    };
    (0, _generic_test_cases.testGetRequest)({
      title: "get the user's summary",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      params: query,
      args: [query],
      path: "/accounts/".concat(usersAccount, "/summary")
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      params: query,
      args: [query],
      path: "/accounts/".concat(anotherAccount, "/summary")
    });
  });
});