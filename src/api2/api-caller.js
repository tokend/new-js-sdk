import axios from 'axios'

import { Network, TransactionBuilder } from '../base'
import { Wallet } from '../wallet'

import middlewares from './middlewares'

const SUBMIT_TRANSACTION_TIMEOUT = 60 * 10000

const methods = Object.freeze({
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  GET: 'GET'
})

/**
 * ApiCaller performs the request to the API, with the following
 */
export class ApiCaller {
  /**
   * @param {object} opts
   * @param {AxiosInstance} opts.axios
   * @param {string} opts.baseURL
   *
   * @param {Wallet} [opts.wallet] - the initialized {@link Wallet} instance for signing requests/transactions
   * @param {string} [opts.passphrase] - the passphrase of current TokenD network (is used internally when signing transactions)
   */
  constructor (opts) {
    this._axios = opts.axios
    this._baseURL = opts.baseURL

    this._wallet = null
    this._customTimeout = null
    this._clockDiff = 0

    if (opts.wallet) {
      this.useWallet(opts.wallet)
    }

    if (opts.passphrase) {
      this.usePassphrase(opts.passphrase)
    }
  }

  static getInstance (baseURL) {
    return new ApiCaller({
      baseURL,
      axios: axios.create()
    })
  }

  static async getInstanceWithPassphrase (baseURL) {
    const caller = this.getInstance(baseURL)
    const networkDetails = await caller.get('/')

    caller.usePassphrase(networkDetails.data.networkPassphrase)

    return caller
  }

  patch (endpoint, query) { return this._call(endpoint, query, methods.PATCH) }
  post (endpoint, query) { return this._call(endpoint, query, methods.POST) }
  put (endpoint, query) { return this._call(endpoint, query, methods.PUT) }
  get (endpoint, query) { return this._call(endpoint, query, methods.GET) }

  getWithSignature (endpoint, query) {
    return this._callWithSignature(endpoint, query, methods.GET)
  }

  patchWithSignature (endpoint, query) {
    return this._callWithSignature(endpoint, query, methods.PATCH)
  }

  postWithSignature (endpoint, query) {
    return this._callWithSignature(endpoint, query, methods.POST)
  }

  putWithSignature (endpoint, query) {
    return this._callWithSignature(endpoint, query, methods.PUT)
  }

  /**
   * Craft the transaction, sign it and make the post request with it's
   * enveloper to the backend
   * @param operations
   * @returns {Promise<*>}
   */
  postTx (...operations) {
    if (!this._wallet) {
      throw new Error('No wallet found to sign the transaction')
    }

    return this.postTxEnvelope(
      new TransactionBuilder(this._wallet.accountId)
        .addOperations(operations)
        .addSigner(this._wallet.keypair)
        .build()
        .toEnvelope()
        .toXDR()
        .toString('base64')
    )
  }

  /**
   * Post a transaction envelope.
   *
   * @param {string} envelope - a transaction envelope to be submitted.
   */
  async postTxEnvelope (envelope) {
    this._customTimeout = SUBMIT_TRANSACTION_TIMEOUT

    const response = await this.post('/transactions', {
      tx: envelope
    })

    this._customTimeout = null

    return response
  }

  /**
   * Performs a request with signature
   * @private
   */
  _callWithSignature (endpoint, query, method) {
    return this._call(endpoint, query, method, true)
  }

  /**
   * Performs a request
   *
   * @param {string} endpoint - endpoint where to make the call to, e.g. `/accounts`
   * @param query - request query params. See {@link parseQuery} for details
   * @param method - the http method of request
   * @param needSign - defines if will try to sign the request, `false` by default
   *
   * @private
   */
  async _call (endpoint, query, method, needSign = false) {
    let url = this._baseURL + endpoint // TODO: smartly build url
    let config = { url, method }

    config.params = middlewares.parseQuery(query)

    config = middlewares.setJsonapiHeaders(config)

    if (this._customTimeout) {
      config.timeout = this._customTimeout
    }

    if (needSign) {
      config = middlewares.signRequest(config, this._wallet.keypair)
    }

    try {
      const response = await this._axios(config)
      return middlewares.parseJsonapiResponse(response)
    } catch (e) {
      throw middlewares.parseJsonapiError(e)
    }
  }

  /**
   * Use a wallet to sign requests and transactions.
   *
   * @param {Wallet} wallet User's wallet.
   */
  useWallet (wallet) {
    if (!(wallet instanceof Wallet)) {
      throw new TypeError('A wallet instance expected.')
    }

    this._wallet = wallet
  }

  usePassphrase (networkPassphrase) {
    Network.use(new Network(networkPassphrase))
  }
}
