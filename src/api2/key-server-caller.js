import uri from 'urijs'
import { hash } from '../base'
import { isNumber, isString } from 'lodash'

const SIGNATURE_VALID_SEC = 60

const CONTENT_TYPE = {
  applicationJson: 'application/json'
}

/**
 * Creates a new {@link CallBuilder}.
 *
 * @param {axios} axios Instance of axios.
 * @param {Wallet} wallet User's wallet.
 *
 * @class CallBuilder
 */
export class KeyServerCaller {
  /**
     * Creates a CallBuilder instance.
     *
     * @constructor
     * @param {Object} axios Axios.js instance.
     * @param {TokenD} [sdk] TokenD SDK instance.
     */
  constructor (opts) {
    this._axios = opts.axios
    this._sdk = opts.sdk
    this._wallet = null
    this._urlSegments = []
  }

  addWallet (wallet) {
    this._wallet = wallet
    return this
  }

  post (urlSegment, data) {
    this._appendUrlSegment(urlSegment)
    let config = this._getRequestConfig({
      method: 'post',
      data,
      url: this._getUrl()
    }, false)

    return this._axios(config)
  }

  postWithSignature (urlSegment, data, wallet) {
    this._appendUrlSegment(urlSegment)
    this.addWallet(wallet)
    let config = this._getRequestConfig({
      method: 'post',
      data,
      url: this._getUrl()
    }, true)

    return this._axios(config)
  }

  get (urlSegment, query) {
    this._appendUrlSegment(urlSegment)
    let config = this._getRequestConfig({
      method: 'get',
      params: query,
      url: this._getUrl()
    }, false)
    return this._axios(config)
  }

  getWithSignature (urlSegment, query, wallet) {
    this._appendUrlSegment(urlSegment)
    this.addWallet(wallet)
    let config = this._getRequestConfig({
      method: 'get',
      params: query,
      url: this._getUrl()
    }, true)
    return this._axios(config)
  }

  patch (urlSegment, data) {
    this._appendUrlSegment(urlSegment)
    let config = this._getRequestConfig({
      method: 'patch',
      data
    }, false)

    return this._axios(config)
  }

  patchWithSignature (urlSegment, data, wallet) {
    this._appendUrlSegment(urlSegment)
    this.addWallet(wallet)
    let config = this._getRequestConfig({
      method: 'patch',
      data,
      url: this._getUrl()
    }, true)

    return this._axios(config)
  }

  _getRequestConfig (config, needSign = false) {
    if (this._wallet) {
      this._signRequestLegacy(config)
    }

    config.headers = config.headers || {}
    config.headers['Content-Type'] = CONTENT_TYPE.applicationJson

    return config
  }

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

  _getUrl () {
    return this._urlSegments.reduce((prev, next) => {
      return `${prev}/${encodeURIComponent(next)}`
    }, '')
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
