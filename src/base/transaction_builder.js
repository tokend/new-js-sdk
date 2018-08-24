import { default as xdr } from './generated/xdr_generated'
import { UnsignedHyper } from 'js-xdr'
import { Keypair } from './keypair'
import { Transaction } from './transaction'
import { Memo } from './memo'
import BigNumber from 'bignumber.js'
import clone from 'lodash/clone'

let TX_EXPIRATION_PERIOD = 60 * 60 * 24 * 7 - 60 * 60

export class TransactionBuilder {
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
  constructor (sourceAccount, opts = {}) {
    if (!sourceAccount) {
      throw new Error('must specify source account for the transaction')
    }
    this.source = sourceAccount
    this.operations = []
    this.signers = []

    this.timebounds = clone(opts.timebounds)
    this.salt = opts.salt
    this.memo = opts.memo || Memo.none()

    // the signed base64 form of the transaction to be sent to Horizon
    this.blob = null
  }

  /**
     * Adds an operation to the transaction.
     * @param {xdr.Operation} operation The xdr operation object, use {@link Operation} static methods.
     * @returns {TransactionBuilder}
     */
  addOperation (operation) {
    this.operations.push(operation)
    return this
  }

  /**
   * Adds multiple operations to the transaction
   *
   * @param {xdr.Operation[]} operations The xdr operation objects, use {@link Operation} static methods.
   * @returns {TransactionBuilder}
   */
  addOperations (operations) {
    this.operations = this.operations.concat(operations)
    return this
  }

  /**
     * Adds a memo to the transaction.
     * @param {xdr.Memo} memo The xdr memo object, use {@link Memo} static methods.
     * @returns {TransactionBuilder}
     */
  addMemo (memo) {
    this.memo = memo
    return this
  }

  /** Adds a signer keypair to the transaction.
   *
   * @param signer - valid {Keypair} instance for signing the transactions
   * @returns {TransactionBuilder}
   */
  addSigner (signer) {
    this.signers.push(signer)
    return this
  }

  /**
     * This will build the transaction.
     * It will also increment the source account's sequence number by 1.
     * @returns {Transaction} This method will return the built {@link Transaction}.
     */
  build () {
    if (!this.salt) {
      this.salt = BigNumber.random(0)
    }

    let attrs = {
      sourceAccount: Keypair
        .fromAccountId(this.source)
        .xdrAccountId(),
      salt: xdr.Salt.fromString(this.salt.toString()),
      memo: this.memo,
      ext: new xdr.TransactionExt(xdr.LedgerVersion.emptyVersion())
    }

    if (!this.timebounds) {
      this.timebounds = {
        minTime: 0,
        maxTime: Math.round(Date.now() / 1000) + TX_EXPIRATION_PERIOD
      }
    }

    this.timebounds = {
      minTime: UnsignedHyper.fromString(this.timebounds.minTime.toString()),
      maxTime: UnsignedHyper.fromString(this.timebounds.maxTime.toString())
    }

    attrs.timeBounds = new xdr.TimeBounds(this.timebounds)

    let xtx = new xdr.Transaction(attrs)
    xtx.operations(this.operations)
    let xenv = new xdr.TransactionEnvelope({ tx: xtx })

    let tx = new Transaction(xenv)
    tx.sign(...this.signers)

    return tx
  }
}
