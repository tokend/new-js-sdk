import uri from 'urijs'
import { hash } from './base'

import { isString, isNumber, isArray } from 'lodash'
const SIGNATURE_VALID_SEC = 60

/**
 * Creates a new {@link CallBuilder}.
 *
 * @param {axios} axios Instance of axios.
 * @param {Wallet} wallet User's wallet.
 *
 * @class CallBuilder
 */
export class CallBuilder {
  /**
   * Creates a CallBuilder instance.
   *
   * @constructor
   * @param {Object} axios Axios.js instance.
   * @param {Wallet} [wallet] User's wallet.
   */
  constructor (axios, wallet) {
    this._axios = axios
    this._wallet = wallet
    this._urlSegments = []
    this._customTimeout = null
    this._clockDiff = 0
  }

  /**
   * Append path segment.
   *
   * @param {string|number|(string|number)[]} segment URL path segment(s).
   * @return {CallBuilder} Self.
   */
  appendUrlSegment (segment) {
    if (isArray(segment)) {
      segment.forEach((s) => this._appendUrlSegment(s))
    } else {
      this._appendUrlSegment(segment)
    }

    return this
  }

  _appendUrlSegment (segment) {
    if (isNumber(segment)) {
      this._urlSegments.push(segment)
    } else if (isString(segment)) {
      if (segment.includes('/')) {
        // multiple segments in a single string e.g. "/foo/bar/x"
        let parsedLink = uri(segment)
        let segments = parsedLink.path()
          .split('/')
          .filter((x) => x.length > 0)
        segments.forEach((s) => this._urlSegments.push(s))
      } else {
        this._urlSegments.push(segment)
      }
    } else {
      throw new TypeError('Invalid segment.')
    }
  }

  /**
   * Authorize this request.
   *
   * @param {wallet} [wallet] Use another wallet for signature.
   * @return {CallBuilder} Self.
   */
  withSignature (wallet) {
    if (wallet) {
      this._wallet = wallet
    }
    if (!this._wallet) {
      throw new Error('Singing keys are required for this request.')
    }

    this._authRequired = true

    return this
  }

  /**
   * Set a request timeout.
   *
   * @param {Number} timeout Request timeout.
   * @return {CallBuilder} Self.
   */
  withTimeout (timeout) {
    if (!isNumber(timeout)) {
      throw new TypeError('A timeout in milliseconds expected.')
    }

    this._customTimeout = timeout

    return this
  }

  /**
   * Perform a POST request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  post (data) {
    let config = this._getRequestConfig('post')
    config.data = data

    return this._axios(config)
  }

  /**
   * Perform a GET request.
   *
   * @param {Object} [query] Request body.
   * @return {Promise} Request result.
   */
  get (query) {
    let config = this._getRequestConfig('get')
    config.params = query

    return this._axios(config)
  }

  /**
   * Perform a PUT request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  put (data) {
    let config = this._getRequestConfig('put')
    config.data = data

    return this._axios(config)
  }

  /**
   * Perform a PATCH request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  patch (data) {
    let config = this._getRequestConfig('patch')
    config.data = data

    return this._axios(config)
  }

  /**
   * Perform a DELETE request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  delete (data) {
    let config = this._getRequestConfig('delete')
    config.data = data

    return this._axios(config)
  }

  _getUrl () {
    return this._urlSegments.reduce((prev, next) => {
      return `${prev}/${encodeURIComponent(next)}`
    }, '')
  }

  _getRequestConfig (method) {
    let url = this._getUrl()
    let config = { method, url }

    if (this._authRequired) {
      this._signRequest(config)
    }

    if (this._customTimeout) {
      config.timeout = this._customTimeout
    }

    return config
  }

  _signRequest (config) {
    let validUntil = Math
      .floor(this._getTimestamp() + SIGNATURE_VALID_SEC)
      .toString()
    let signatureBase = `{ uri: '${config.url}', valid_untill: '${validUntil.toString()}'}`
    let data = hash(signatureBase)
    let signature = this._wallet.keypair.signDecorated(data)

    Object.assign(config, {
      headers: {
        'X-AuthValidUnTillTimestamp': validUntil.toString(),
        'X-AuthPublicKey': this._wallet.keypair.accountId(),
        'X-AuthSignature': signature.toXDR('base64')
      }
    })
  }

  _getTimestamp () {
    return Math.floor(new Date().getTime() / 1000) - this._clockDiff
  }
}
