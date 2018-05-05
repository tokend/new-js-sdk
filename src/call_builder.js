import uri from 'urijs'
import { isString, isNumber, isArray } from 'lodash'

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
   * Perform a POST request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  post (data) {
    let config = this._getRequestConfig()
    config.data = data

    return this._axios.post(this._getUrl(), config)
  }

  /**
   * Perform a GET request.
   *
   * @param {Object} [query] Request body.
   * @return {Promise} Request result.
   */
  get (query) {
    let config = this._getRequestConfig()
    config.params = query

    return this._axios.get(this._getUrl(), config)
  }

  /**
   * Perform a PUT request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  put (data) {
    let config = this._getRequestConfig()
    config.data = data

    return this._axios.put(this._getUrl(), config)
  }

  /**
   * Perform a PATCH request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  patch (data) {
    let config = this._getRequestConfig()
    config.data = data

    return this._axios.patch(this._getUrl(), config)
  }

  /**
   * Perform a DELETE request.
   *
   * @param {Object} [data] Request body.
   * @return {Promise} Request result.
   */
  delete (data) {
    let config = this._getRequestConfig()
    config.data = data

    return this._axios.delete(this._getUrl(), config)
  }

  _getUrl () {
    return this._urlSegments.reduce((prev, next) => {
      return `${prev}/${encodeURIComponent(next)}`
    }, '')
  }

  _getRequestConfig () {
    let config = {}

    if (this._authRequired) {
      let url = this._getUrl()
      let signature = this._wallet.signRequest(url)
      config = Object.assign(config, signature)
    }

    return config
  }
}
