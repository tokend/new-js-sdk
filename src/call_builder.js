import uri from 'urijs'
import { Keypair, hash } from './base'
import { isString, isNumber, isArray } from 'lodash'
import { MIMES } from './const'

const SIGNATURE_VALID_SEC = 60
const REQUEST_TARGET_HEADER = '(request-target)'
const SIGNED_HEADERS = [REQUEST_TARGET_HEADER]

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
   * @param {TokenD} [sdk] TokenD SDK instance.
   */
  constructor (axios, sdk) {
    this._axios = axios
    this._sdk = sdk
    this._urlSegments = []
    this._customTimeout = null
  }

  /**
   * Append URL segment.
   *
   * @param {(string|number|string[])} segment URL path segment(s).
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

  /**
   * Append an account ID to the URL.
   * Uses wallet's account ID by default.
   *
   * @param {string} [accountId] Custom account ID.
   * @return {CallBuilder} Self.
   */
  appendAccountId (accountId = null) {
    if (!(accountId || this._sdk.wallet)) {
      throw new Error('No account ID provided.')
    }
    accountId = accountId || this._sdk.wallet.accountId

    if (!Keypair.isValidPublicKey(accountId)) {
      throw new Error('Invalid account ID.')
    }

    return this.appendUrlSegment(accountId)
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
    this._wallet = wallet || this._sdk.wallet

    if (!this._wallet) {
      console.warn('Skipping signing the request cause no _wallet instance was found. Please re-check if it is an expected behaviour')
      return this
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
    let config = this._getRequestConfig({
      method: 'post',
      data
    })

    return this._axios(config)
  }

  /**
   * Perform a GET request.
   *
   * @param {Object} [query] Request body.
   * @return {Promise} Request result.
   */
  get (query) {
    let config = this._getRequestConfig({
      method: 'get',
      params: query
    })

    return this._axios(config)
  }

  /**
   * Perform a PUT request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  put (data) {
    let config = this._getRequestConfig({
      method: 'put',
      data
    })

    return this._axios(config)
  }

  /**
   * Perform a PATCH request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  patch (data) {
    let config = this._getRequestConfig({
      method: 'patch',
      data
    })

    return this._axios(config)
  }

  /**
   * Perform a DELETE request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  delete (data) {
    let config = this._getRequestConfig({
      method: 'delete',
      data
    })

    return this._axios(config)
  }

  _getUrl () {
    return this._urlSegments.reduce((prev, next) => {
      return `${prev}/${encodeURIComponent(next)}`
    }, '')
  }

  _getRequestConfig (config) {
    config.url = this._getUrl()

    if (this._authRequired) {
      this._signRequest(config)
    }

    if (this._customTimeout) {
      config.timeout = this._customTimeout
    }

    config.headers = config.headers || {}
    config.headers['Content-Type'] = MIMES.jsonApi
    config.headers['Accept'] = MIMES.jsonApi

    return config
  }

  _signRequest (config) {
    if (this._sdk.legacySignatures) {
      this._signRequestLegacy(config)
    } else {
      config.headers = config.headers || {}

      let digest = hash(this._requestDigest(config))
      let signature = this._wallet.keypair.sign(digest).toString('base64')
      let keyId = this._wallet.keypair.accountId()
      let algorithm = 'ed25519-sha256'
      config.headers.signature = `keyId="${keyId}",algorithm="${algorithm}",headers="${SIGNED_HEADERS.join(' ')}",signature="${signature}"`
    }
  }

  _requestDigest (config) {
    let toSign = SIGNED_HEADERS.map(header => {
      header = header.toLowerCase()
      if (header === REQUEST_TARGET_HEADER) {
        let method = config.method.toLowerCase()
        let endpoint = this._getFullUrl(config)

        return `${REQUEST_TARGET_HEADER}: ${method.toLowerCase()} ${endpoint}`
      };
      let value = config.headers[header]

      return `${header}: ${value}`
    })

    return toSign.join('\n')
  };

  _signRequestLegacy (config) {
    let validUntil = Math
      .floor(this._getTimestamp() + SIGNATURE_VALID_SEC)
      .toString()

    let fullUrl = this._getFullUrl(config)
    let signatureBase = `{ uri: '${fullUrl}', valid_untill: '${validUntil.toString()}'}`
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

  _getFullUrl (config) {
    let fullUrl = uri(config.url)
    if (config.params) {
      fullUrl = fullUrl.addQuery(config.params)
    }

    return fullUrl.toString()
  }

  _getTimestamp () {
    let now = Math.floor(new Date().getTime() / 1000)
    return now - this._sdk.clockDiff
  }
}
