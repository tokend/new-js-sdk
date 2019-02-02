"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionBuilder = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/date/now"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("./generated/xdr_generated"));

var _jsXdr = require("js-xdr");

var _keypair = require("./keypair");

var _transaction = require("./transaction");

var _memo = require("./memo");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _clone = _interopRequireDefault(require("lodash/clone"));

var TX_EXPIRATION_PERIOD = 60 * 60 * 24 * 7 - 60 * 60;

var TransactionBuilder =
/*#__PURE__*/
function () {
  /**
     * <p>Transaction builder helps constructs a new `{@link Transaction}` using the given account id</p>
     *
     * <p>Operations can be added to the transaction via their corresponding builder methods, and
     * each returns the TransactionBuilder object so they can be chained together. After adding
     * the desired operations, call the `build()` method on the `TransactionBuilder` to return a fully
     * constructed `{@link Transaction}` that can be signed. The returned transaction will contain
     * signature from the source account.</p>
     *
     * <p>The following code example creates a new transaction with {@link Operation.createAccount} and
     * {@link Operation.payment} operations.
     * The Transaction's source account first funds `destinationA`, then sends
     * a payment to `destinationB`. The built transaction is then signed by `sourceKeypair`.</p>
     *
     * ```
     * var transaction = new TransactionBuilder(source)
     *   .addOperation(Operation.createAccount({
            destination: destinationA,
            startingBalance: "20"
        }) // <- funds and creates destinationA
        .addOperation(Operation.payment({
            destination: destinationB,
            amount: "100"
            asset: Asset.native()
        }) // <- sends 100 XLM to destinationB
     *   .build();
     *
     * transaction.sign(sourceKeypair);
     * ```
     * @constructor
     * @param {string} sourceAccount - The source account for this transaction.
     * @param {object} [opts]
     * @param {object} [opts.timebounds] - The timebounds for the validity of this transaction.
     * @param {string} [opts.timebounds.minTime] - 64 bit unix timestamp
     * @param {string} [opts.timebounds.maxTime] - 64 bit unix timestamp
     * @param {Memo} [opts.memo] - The memo for the transaction
     */
  function TransactionBuilder(sourceAccount) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, TransactionBuilder);

    if (!sourceAccount) {
      throw new Error('must specify source account for the transaction');
    }

    this.source = sourceAccount;
    this.operations = [];
    this.signers = [];
    this.timebounds = (0, _clone.default)(opts.timebounds);
    this.salt = opts.salt;
    this.memo = opts.memo || _memo.Memo.none(); // the signed base64 form of the transaction to be sent to Horizon

    this.blob = null;
  }
  /**
     * Adds an operation to the transaction.
     * @param {xdr.Operation} operation The xdr operation object, use {@link Operation} static methods.
     * @returns {TransactionBuilder}
     */


  (0, _createClass2.default)(TransactionBuilder, [{
    key: "addOperation",
    value: function addOperation(operation) {
      this.operations.push(operation);
      return this;
    }
    /**
     * Adds multiple operations to the transaction
     *
     * @param {xdr.Operation[]} operations The xdr operation objects, use {@link Operation} static methods.
     * @returns {TransactionBuilder}
     */

  }, {
    key: "addOperations",
    value: function addOperations(operations) {
      this.operations = this.operations.concat(operations);
      return this;
    }
    /**
       * Adds a memo to the transaction.
       * @param {xdr.Memo} memo The xdr memo object, use {@link Memo} static methods.
       * @returns {TransactionBuilder}
       */

  }, {
    key: "addMemo",
    value: function addMemo(memo) {
      this.memo = memo;
      return this;
    }
    /** Adds a signer keypair to the transaction.
     *
     * @param signer - valid {Keypair} instance for signing the transactions
     * @returns {TransactionBuilder}
     */

  }, {
    key: "addSigner",
    value: function addSigner(signer) {
      this.signers.push(signer);
      return this;
    }
    /**
       * This will build the transaction.
       * It will also increment the source account's sequence number by 1.
       * @returns {Transaction} This method will return the built {@link Transaction}.
       */

  }, {
    key: "build",
    value: function build() {
      if (!this.salt) {
        this.salt = _bignumber.default.random(0);
      }

      var attrs = {
        sourceAccount: _keypair.Keypair.fromAccountId(this.source).xdrAccountId(),
        salt: _xdr_generated.default.Salt.fromString(this.salt.toString()),
        memo: this.memo,
        ext: new _xdr_generated.default.TransactionExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };

      if (!this.timebounds) {
        this.timebounds = {
          minTime: 0,
          maxTime: Math.round((0, _now.default)() / 1000) + TX_EXPIRATION_PERIOD
        };
      }

      this.timebounds = {
        minTime: _jsXdr.UnsignedHyper.fromString(this.timebounds.minTime.toString()),
        maxTime: _jsXdr.UnsignedHyper.fromString(this.timebounds.maxTime.toString())
      };
      attrs.timeBounds = new _xdr_generated.default.TimeBounds(this.timebounds);
      var xtx = new _xdr_generated.default.Transaction(attrs);
      xtx.operations(this.operations);
      var xenv = new _xdr_generated.default.TransactionEnvelope({
        tx: xtx
      });
      var tx = new _transaction.Transaction(xenv);
      tx.sign.apply(tx, (0, _toConsumableArray2.default)(this.signers));
      return tx;
    }
  }]);
  return TransactionBuilder;
}();

exports.TransactionBuilder = TransactionBuilder;