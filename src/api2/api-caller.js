import axios from 'axios'

import { Network, TransactionBuilder } from '../base'
import { Wallet } from '../wallet'

import middlewares from './middlewares'
import { toCamelCaseDeep } from '../utils/case_converter'
import { isEmpty } from 'lodash'

const SUBMIT_TRANSACTION_TIMEOUT = 60 * 10000

const methods = Object.freeze({
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  GET: 'GET',
  DELETE: 'DELETE'
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
  constructor (opts = {}) {
    this._axios = axios.create()
    if (opts.baseURL) {
      this.useBaseURL(opts.baseURL)
    }

    this._wallet = null
    this._networkDetails = {}
    this._customTimeout = null
    this._clockDiff = 0

    if (opts.wallet) {
      this.useWallet(opts.wallet)
    }

    if (opts.passphrase) {
      this.usePassphrase(opts.passphrase)
    }
  }

  withWallet (wallet) {
    const newCaller = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    newCaller.useWallet(wallet)
    return newCaller
  }

  withBaseURL (baseURL) {
    const newCaller = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    newCaller.useBaseURL(baseURL)
    return newCaller
  }

  static getInstance (baseURL) {
    return new ApiCaller({
      baseURL
    })
  }

  static async getInstanceWithPassphrase (baseURL) {
    const caller = this.getInstance(baseURL)
    const { data: networkDetails } = await caller.getRaw('/')

    caller._networkDetails = networkDetails
    caller.usePassphrase(networkDetails.networkPassphrase)

    return caller
  }

  get networkDetails () {
    return this._networkDetails
  }

  get wallet () {
    return this._wallet
  }

  get (endpoint, query, needSign = false) {
    return this._call({
      method: methods.GET,
      needSign,
      endpoint,
      query
    })
  }

  getRaw (endpoint, query) {
    return this._call({
      method: methods.GET,
      needRaw: true,
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
      needSign,
      endpoint,
      data
    })
  }

  postWithSignature (endpoint, data) {
    return this.post(endpoint, data, true)
  }

  patch (endpoint, data, needSign = false) {
    return this._call({
      method: methods.PATCH,
      needSign,
      endpoint,
      data
    })
  }

  patchWithSignature (endpoint, data) {
    return this.patch(endpoint, data, true)
  }

  put (endpoint, data, needSign = false) {
    return this._call({
      method: methods.PUT,
      needSign,
      endpoint,
      data
    })
  }

  putWithSignature (endpoint, data) {
    return this.put(endpoint, data, true)
  }

  delete (endpoint, data, needSign = false) {
    return this._call({
      method: methods.DELETE,
      needSign,
      endpoint,
      data,
      isEmptyBodyAllowed: true
    })
  }

  deleteWithSignature (endpoint, data) {
    return this.delete(endpoint, data, true)
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
    config = middlewares.setJsonapiHeaders(config)

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
   * Performs a request
   *
   * @param {object} opts
   * @param {string} opts.endpoint - endpoint where to make the call to, e.g. `/accounts`
   * @param {object} opts.data - request data (for POST/PUT requests)
   * @param {object} opts.query - request query params. See {@link parseQuery} for details
   * @param {string} opts.method - the http method of request
   * @param {bool} opts.needSign - defines if will try to sign the request, `false` by default
   * @param {bool} opts.needRaw - defines if raw response should be returned, `false` by default
   * @param {bool} opts.isEmptyBodyAllowed - defines if empty body is allowed, `false` by default
   *
   * @private
   */
  async _call (opts) {
    let config = {
      baseURL: this._baseURL,
      params: opts.query || {},
      paramsSerializer: function (params) {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&')
      },
      data: (opts.isEmptyBodyAllowed && !opts.data)
        ? undefined
        : opts.data || {},
      method: opts.method,
      url: opts.endpoint // TODO: smartly build url
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
      throw middlewares.parseJsonapiError(e, this._axios)
    }

    if (!opts.needRaw) {
      response = middlewares.parseJsonapiResponse(response)

      if (!isEmpty(response.links)) {
        if (opts.needSign) {
          response.makeLinkCallersWithSignature(this)
        } else {
          response.makeLinkCallers(this)
        }
      }
    } else {
      response = toCamelCaseDeep(response)
    }

    return response
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

  useBaseURL (baseURL) {
    this._baseURL = baseURL
  }

  useNetworkDetails (networkDetails) {
    this._networkDetails = networkDetails
    this.usePassphrase(networkDetails.networkPassphrase)
  }
}
