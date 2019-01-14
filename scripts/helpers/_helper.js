import { base } from '../../src'

export class Helper {
  /**
   * @param {object}  opts
   * @param {TokenD}  opts.sdk
   * @param {Keypair} opts.masterKp
   */
  constructor (opts) {
    this._sdk = opts.sdk
    this._masterKp = opts.masterKp
  }

  delay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  get sdk () { return this._sdk }
  get masterKp () { return this._masterKp }
  get masterId () { return this._masterKp.accountId() }

  /**
   * @param {array|object} operations - list of operations, passing the single operation as object will work too
   * @param {Keypair} [signerKp] - the keypair to sign the operation, will use master if not provided
   * @param {string} [sourceId] - the account ID of the source, will use signer PK, if not provided
   *
   * @returns {HorizonResponse}
   */
  submit (operations, signerKp = this.masterKp, sourceId = signerKp.accountId()) {
    const transaction = new base
      .TransactionBuilder(sourceId)
      .addOperations(operations)
      .build()

    transaction.sign(signerKp)

    try {
      return this
        .sdk
        .horizon
        .transactions
        .submit(transaction)
    } catch (e) {
      console.error('Failed to submit transaction')
      console.log(e)

      throw e
    }
  }
}

export const getRequestIdFromResultXdr = (resultXdr, resultType) => base
  .xdr
  .TransactionResult
  .fromXDR(new Buffer(resultXdr, 'base64'))
  .result()
  .results()[0]
  .tr()
  [resultType]()
  .success()
  .requestId()
  .toString()
