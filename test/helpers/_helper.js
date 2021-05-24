import { base } from '../../src'
import _get from 'lodash/get'
import { BadRequestError, TransactionError } from '../../src/errors'

export class Helper {
  /**
   * @param {object}    opts
   * @param {TokenD}    opts.sdk
   * @param {ApiCaller} opts.api
   * @param {Keypair}   opts.masterKp
   */
  constructor (opts) {
    this._sdk = opts.sdk
    this._api = opts.api
    this._masterKp = opts.masterKp
  }

  delay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  get sdk () { return this._sdk }
  get api () { return this._api }
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

    const envelope = transaction.toEnvelope().toXDR().toString('base64')

    try {
      const { data } = await this.api.postTxEnvelope(envelope, false)
      return data.data.attributes
    } catch (e) {
      if ((e instanceof BadRequestError) || (e instanceof TransactionError)) {
        const errorString = this.tryGetTxErrorString(e)
        if (errorString) {
          throw new Error(errorString)
        }
        throw e
      }
      throw e
    }
  }

  tryGetTxErrorString (errorObject) {
    let resultCodes = _get(errorObject, 'meta.resultCodes')

    if (resultCodes) {
      const txCode = resultCodes.transaction
      const opCodes = (resultCodes.operations || []).join(',')

      return `Transaction Error: ${txCode}, operations: ${opCodes}`
    } else if (errorObject.title === 'Transaction Malformed') {
      return `Transaction Malformed. SDK and horizon should use same XDR version`
    } else {
      return errorObject.title || null
    }
  }
}

export const getRequestIdFromResultXdr = (resultXdr, resultType) => base
  .xdr
  .TransactionResult
  .fromXDR(Buffer.from(resultXdr, 'base64'))
  .result()
  .results()[0]
  .tr()[resultType]()
  .success()
  .requestId()
  .toString()

export const getSuccessResultFromXDR = (resultXdr, resultType) => base
  .xdr
  .TransactionResult
  .fromXDR(Buffer.from(resultXdr, 'base64'))
  .result()
  .results()[0]
  .tr()[resultType]()
  .success()

export const getOpResultFromXDR = (resultXdr, resultType) => base
  .xdr
  .TransactionResult
  .fromXDR(Buffer.from(resultXdr, 'base64'))
  .result()
  .results()[0]
  .tr()[resultType]()
