"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _sinon = _interopRequireDefault(require("sinon"));

var _signersManager = require("./signers-manager");

var _apiCaller = require("../api-caller");

var _base = require("../../base");

var _xdr_generated = _interopRequireDefault(require("../../base/generated/xdr_generated"));

var _operation = require("../../base/operation");

function parseTransactionEnvelope(envelope) {
  var buffer = Buffer.from(envelope, 'base64');

  var transaction = _xdr_generated.default.TransactionEnvelope.fromXDR(buffer);

  var operations = transaction.tx().operations();
  return operations.map(function (operation) {
    return _operation.Operation.operationToObject(operation);
  });
}

describe('Signers manager', function () {
  var sandbox;
  var signersManagerInstance;
  beforeEach(function () {
    sandbox = _sinon.default.createSandbox();
    signersManagerInstance = new _signersManager.SignersManager(_apiCaller.ApiCaller.getInstance('https://api.test.com'));
  });
  describe('createChangeSignerTransaction', function () {
    beforeEach(function () {
      sandbox.stub(signersManagerInstance, '_getSigners').resolves([{
        id: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
        role: {
          id: '2'
        }
      }, {
        id: 'GAJIMZYYBBU7XPXDLR2HUI6KIIV5LMUNJ2WOHY2FQ2Y5MCTDPMLOFLDY',
        role: {
          id: '2'
        }
      }, {
        id: 'GBEHGGVNR6I4J3KV4WP5VONSGALNXJIXI3QHLLGXYVSVBEETR3YHFYDF',
        role: {
          id: '2'
        }
      }, {
        id: 'GD2BSUAJPCN3UKRI64IJI53BJ22NKSVQ7OB6CM2D6OLAZU7U44GC23A7',
        role: {
          id: '1'
        }
      }]);
      sandbox.stub(signersManagerInstance, '_getDefaultSignerRole').resolves('2');
    });
    it('should create a transaction, that changes master signer and removes signer to replace',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var result;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return signersManagerInstance.createChangeSignerTransaction({
                sourceAccount: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
                newPublicKey: 'GABMN37HVQYAX4YCUMSKCCEJNFV4YOMNZOZDUMNEW5FAX5QESM7QO63Q',
                signingKeypair: _base.Keypair.fromSecret('SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3'),
                signerToReplace: 'GAJIMZYYBBU7XPXDLR2HUI6KIIV5LMUNJ2WOHY2FQ2Y5MCTDPMLOFLDY'
              });

            case 2:
              result = _context.sent;
              expect(parseTransactionEnvelope(result)).to.deep.equal([{
                type: 'manageSigner',
                publicKey: 'GABMN37HVQYAX4YCUMSKCCEJNFV4YOMNZOZDUMNEW5FAX5QESM7QO63Q',
                roleID: '2',
                weight: '1000',
                identity: '0',
                details: {}
              }, {
                type: 'manageSigner',
                publicKey: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S'
              }, {
                type: 'manageSigner',
                publicKey: 'GAJIMZYYBBU7XPXDLR2HUI6KIIV5LMUNJ2WOHY2FQ2Y5MCTDPMLOFLDY'
              }]);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should create a transaction, that changes master signer and removes all the signers',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var result;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return signersManagerInstance.createChangeSignerTransaction({
                sourceAccount: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
                newPublicKey: 'GABMN37HVQYAX4YCUMSKCCEJNFV4YOMNZOZDUMNEW5FAX5QESM7QO63Q',
                signingKeypair: _base.Keypair.fromSecret('SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3')
              });

            case 2:
              result = _context2.sent;
              expect(parseTransactionEnvelope(result)).to.deep.equal([{
                type: 'manageSigner',
                publicKey: 'GABMN37HVQYAX4YCUMSKCCEJNFV4YOMNZOZDUMNEW5FAX5QESM7QO63Q',
                roleID: '2',
                weight: '1000',
                identity: '0',
                details: {}
              }, {
                type: 'manageSigner',
                publicKey: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S'
              }, {
                type: 'manageSigner',
                publicKey: 'GAJIMZYYBBU7XPXDLR2HUI6KIIV5LMUNJ2WOHY2FQ2Y5MCTDPMLOFLDY'
              }, {
                type: 'manageSigner',
                publicKey: 'GBEHGGVNR6I4J3KV4WP5VONSGALNXJIXI3QHLLGXYVSVBEETR3YHFYDF'
              }]);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
});