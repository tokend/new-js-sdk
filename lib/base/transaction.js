"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _index = require("./index");

var _strkey = require("./strkey");

var _operation = require("./operation");

var _network = require("./network");

var _map = _interopRequireDefault(require("lodash/map"));

var _each = _interopRequireDefault(require("lodash/each"));

var Transaction =
/*#__PURE__*/
function () {
  /**
    * A new Transaction object is created from a transaction envelope or via {@link TransactionBuilder}.
    * Once a Transaction has been created from an envelope, its attributes and operations
    * should not be changed. You should only add signers (using {@link Transaction#sign}) to a Transaction object before
    * submitting to the network or forwarding on to additional signers.
    * @constructor
    * @param {string|xdr.TransactionEnvelope} envelope - The transaction envelope object or base64 encoded string.
    */
  function Transaction(envelope) {
    (0, _classCallCheck2.default)(this, Transaction);

    if (typeof envelope === 'string') {
      var buffer = Buffer.from(envelope, 'base64');
      envelope = _index.xdr.TransactionEnvelope.fromXDR(buffer);
    } // since this transaction is immutable, save the tx


    this.tx = envelope.tx();
    this.source = (0, _strkey.encodeCheck)('accountId', envelope.tx().sourceAccount().ed25519());
    this.memo = this.tx.memo();
    this.salt = this.tx.salt().toString();
    var timeBounds = this.tx.timeBounds();
    this.timeBounds = {
      minTime: timeBounds.minTime().toString(),
      maxTime: timeBounds.maxTime().toString()
    };
    var operations = this.tx.operations() || [];
    this.operations = (0, _map.default)(operations, function (op) {
      return _operation.Operation.operationToObject(op);
    });
    var signatures = envelope.signatures() || [];
    this.signatures = (0, _map.default)(signatures, function (s) {
      return s;
    });
  }
  /**
     * Signs the transaction with the given {@link Keypair}.
     * @param {...Keypair} keypairs Keypairs of signers
     * @returns {void}
     */


  (0, _createClass2.default)(Transaction, [{
    key: "sign",
    value: function sign() {
      var _this = this;

      var txHash = this.hash();

      for (var _len = arguments.length, keypairs = new Array(_len), _key = 0; _key < _len; _key++) {
        keypairs[_key] = arguments[_key];
      }

      (0, _each.default)(keypairs, function (kp) {
        var sig = kp.signDecorated(txHash);

        _this.signatures.push(sig);
      });
    }
    /**
       * Returns a hash for this transaction, suitable for signing.
       * @returns {Buffer}
       */

  }, {
    key: "hash",
    value: function hash() {
      return (0, _index.hash)(this.signatureBase());
    }
    /**
       * Returns the "signature base" of this transaction, which is the value
       * that, when hashed, should be signed to create a signature that
       * validators on the Stellar Network will accept.
       *
       * It is composed of a 4 prefix bytes followed by the xdr-encoded form
       * of this transaction.
       * @returns {Buffer}
       */

  }, {
    key: "signatureBase",
    value: function signatureBase() {
      return Buffer.concat([_network.Network.current().networkId(), _index.xdr.EnvelopeType.tx().toXDR(), this.tx.toXDR()]);
    }
    /**
       * To envelope returns a xdr.TransactionEnvelope which can be submitted to the network.
       * @returns {xdr.TransactionEnvelope}
       */

  }, {
    key: "toEnvelope",
    value: function toEnvelope() {
      var tx = this.tx;
      var signatures = this.signatures;
      var envelope = new _index.xdr.TransactionEnvelope({
        tx: tx,
        signatures: signatures
      });
      return envelope;
    }
  }]);
  return Transaction;
}();

exports.Transaction = Transaction;