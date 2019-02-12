import axios from 'axios'

import { Network, TransactionBuilder } from '../base'
import { Wallet } from '../wallet'

import middlewares from './middlewares'
import { toCamelCaseDeep } from '../utils/case_converter'

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

  get (endpoint, query, needSign = false) {
    return this._call({
      method: methods.GET,
      needSign: false,
      endpoint,
      query
    })
  }

  getWithSignature (endpoint, query) {
    return this.get(endpoint, query, true)
  }

  post (endpoint, data, needSign = false) {
    return this._call({
      method: methods.POST,
      needSign: false,
      endpoint,
      data
    })
  }

  postWithSignature (endpoint, data) {
    return this.post(endpoint, data, true)
  }

  patch (endpoint, data) {
    return this._call({
      method: methods.PATCH,
      needSign: false,
      endpoint,
      data
    })
  }

  patchWithSignature (endpoint, data) {
    return this.patch(endpoint, data, true)
  }

  put (endpoint, data) {
    return this._call({
      method: methods.PUT,
      needSign: false,
      endpoint,
      data
    })
  }

  putWithSignature (endpoint, data) {
    return this.put(endpoint, data, true)
  }

  /**
   * Craft the transaction, sign it and make the post request with it's
   * enveloper to the backend
   * @param operations
   * @returns {Promise<*>}
   */
  postOperations (...operations) {
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
    // using raw axios because we don't need most of middleware, but need custom
    // request timeout here
    let config = {
      timeout: SUBMIT_TRANSACTION_TIMEOUT,
      data: {
        tx: envelope
      },
      method: methods.POST,
      url: `${this._baseURL}/transactions`
    }

    let response
    try {
      response = await this._axios(config)
    } catch (e) {
      throw middlewares.parseJsonapiError(e)
    }

    return {
      // the response is not in JSON API format, but the error is
      data: toCamelCaseDeep(response.data)
    }
  }

  /**
   * Performs a request with signature
   * @private
   */
  _callWithSignature (opts) {
    return this._call({
      ...opts,
      needSign: true
    })
  }

  /**
   * Performs a request
   *
   * @param {object} opts
   * @param {string} opts.endpoint - endpoint where to make the call to, e.g. `/accounts`
   * @param {object} opts.data - request data (for POST/PUT requests)
   * @param {object} opts.query - request query params. See {@link parseQuery} for details
   * @param {string} opts.method - the http method of request
   * @param {bool} opts.needSign - defines if will try to sign the request, `false` by default
   *
   * @private
   */
  async _call (opts) {
    let config = {
      params: opts.query || {},
      data: opts.data || {},
      method: opts.method,
      url: this._baseURL + opts.endpoint // TODO: smartly build url
    }

    config = middlewares.flattenToAxiosJsonApiQuery(config)
    config = middlewares.setJsonapiHeaders(config)

    if (this._customTimeout) {
      config.timeout = this._customTimeout
    }

    if (opts.needSign) {
      config = middlewares.signRequest(config, this._wallet.keypair)
    }

    let response

    try {
      response = await this._axios(config)
    } catch (e) {
      throw middlewares.parseJsonapiError(e)
    }

    return middlewares.parseJsonapiResponse(response)
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
