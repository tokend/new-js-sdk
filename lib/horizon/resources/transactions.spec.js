"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _mock_factory = _interopRequireDefault(require("../../test_helpers/mock_factory"));

var _response = require("../response");

var _transactions = require("./transactions");

var _transaction = require("../../base/transaction");

var _generic_test_cases = require("./generic_test_cases.spec");

describe('Transactions', function () {
  var sdk = _mock_factory.default.tokenDSdk();

  var horizon = sdk.horizon;
  var resourceGroup = horizon.transactions;
  var transactionId = '68719480833';
  afterEach(function () {
    sdk.horizon.reset();
  });
  describe('.submit', function () {
    var envelope = 'AAAAAELPBVl5D2w7ZN4VEg3wuyXKq33C20+0oYo16IG/Mjr3AAAAAAAAAAAAAAAAVr3s4gAAAABWvhQJAAAAAQAAAA9IYXBweSBiaXJ0aGRheSEAAAAAAQAAAAAAAAAXAAAAAF6HMBYbQQMTc/k31ljGpteDQR7p2PKiGKaR2gt876lrAAAAAQAAAAAHdEKwziwr7EctUiK7HjAA057xWHGIzjUMLm7LVSkfiwAAAAB3NZQAAAAAAACYloAAAAAAAAAAAAAAAAAAAAAAAJiWgAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAABHRlc3QAAAAAAAAAAAAAAAAAAAAA';
    it('Should submit transaction.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var tx, response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tx = new _transaction.Transaction(envelope);
              sdk.horizon.onPost('/transactions').reply(function (config) {
                expect(config.timeout).to.equal(_transactions.SUBMIT_TRANSACTION_TIMEOUT);
                expect(config.data).equal((0, _stringify.default)({
                  tx: envelope
                }));
                return [200, sdk.horizon.makeGenericResponse()];
              });
              _context.next = 4;
              return sdk.horizon.transactions.submit(tx);

            case 4:
              response = _context.sent;
              expect(response).to.be.an.instanceOf(_response.HorizonResponse);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('.get', function () {
    var method = 'get';
    (0, _generic_test_cases.testGetRequest)({
      title: "get the transaction by ID",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [transactionId],
      path: "/transactions/".concat(transactionId)
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [transactionId],
      path: "/transactions/".concat(transactionId)
    });
  });
  describe('.getPage', function () {
    var method = 'getPage';
    var query = (0, _freeze.default)({
      order: 'asc',
      cursor: '242343242342',
      limit: 20
    });
    (0, _generic_test_cases.testGetRequest)({
      title: "get the page of transactions",
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      path: "/transactions"
    });
    (0, _generic_test_cases.testRequestSignature)({
      horizon: horizon,
      resourceGroup: resourceGroup,
      method: method,
      args: [query],
      params: query,
      path: "/transactions"
    });
  });
});