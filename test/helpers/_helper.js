import { base } from '../../src'
import _get from 'lodash/get'
import { BadRequestError } from '../../src/errors'

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
  async submit (operations, signerKp = this.masterKp, sourceId = signerKp.accountId()) {
    const transaction = new base
      .TransactionBuilder(sourceId)
      .addOperations(operations)
      .build()

    transaction.sign(signerKp)

    try {
      const { data } = await this
        .sdk
        .horizon
        .transactions
        .submit(transaction)

      return data
    } catch (e) {
      if (e instanceof BadRequestError) {
        throw new Error(this.tryGetTxErrors(e))
      }
      throw e
    }
  }

  tryGetTxErrors (errorObject) {
    const resultCodes = _get(errorObject, 'meta.extras.resultCodes')
    if (!resultCodes) {
      return errorObject
    }

    const txCode = resultCodes.transaction
    const opCodes = (resultCodes.operations || []).join(',')

    return `Transaction Error: ${txCode}, operations: ${opCodes}`
  }
}

export const getRequestIdFromResultXdr = (resultXdr, resultType) => base
  .xdr
  .TransactionResult
  .fromXDR(Buffer.from(resultXdr, 'base64'))
  .result()
  .results()[0]
  .tr()
  [resultType]()
  .success()
  .requestId()
  .toString()
