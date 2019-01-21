import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import cloneDeep from 'lodash/cloneDeep'
import { hash } from '../base'

import uri from 'urijs'
// import { MIMES } from '../const'

// const SIGNATURE_VALID_SEC = 60
const REQUEST_TARGET_HEADER = '(request-target)'
const SIGNED_HEADERS = [REQUEST_TARGET_HEADER]

export class ApiCaller {
  constructor (opts) {
    this._axios = opts.axiosInstance
    this._apiUrl = opts.apiUrl
    this._keypair = null
  }

  get (endpoint, query) { return this._call(endpoint, query, 'GET') }
  post (endpoint, query) { return this._call(endpoint, query, 'POST') }
  put (endpoint, query) { return this._call(endpoint, query, 'PUT') }
  patch (endpoint, query) { return this._call(endpoint, query, 'PATCH') }

  async _call (endpoint, query, method) {
    const url = this._getUrl(endpoint)
    const params = this._marshalQuery(query)
    const config = this._getRequestConfig({ url, method, params })

    const response = await this._axios({
      method,
      config,
      params
    })

    return this._unmarshalResponse(response)
  }

  _marshalQuery (query = {}) {
    let result = cloneDeep(query)

    for (const [key, value] of Object.entries(query)) {
      this._validateParam(value)
      if (isArray(value)) {
        result[key] = value.join(',')
      } else if (isObject(value)) {
        delete result[key]
        result = {
          ...result,
          ...this._marshalObjectParam(key, value)
        }
      }
    }

    return result
  }

  _validateParam (param) {
    if (isArray(param) || isObject(param)) {
      for (const v of Object.values(param)) {
        if (isArray(v) || isObject(v)) {
          throw new Error('Nested query params are not allowed')
        }
      }
    }
  }

  _marshalObjectParam (paramName, obj) {
    let result = {}

    for (const [key, value] of Object.entries(obj)) {
      result[`${paramName}[${key}]`] = value
    }

    return result
  }

  _getRequestConfig (config) {
    config.headers = config.headers || {}

    config.headers['Content-Type'] = 'application/vnd.api+json'
    config.headers['Accept'] = 'application/vnd.api+json'
    config.headers['signature'] = this._getSignature(config)

    // if (this._authRequired) {
    //   this._signRequest(config)
    // }

    // if (this._customTimeout) {
    //   config.timeout = this._customTimeout
    // }

    return config
  }

  _getUrl (endpoint) {
    return encodeURIComponent(this._apiUrl + endpoint)
  }

  _getSignature (config) {
    if (!this._keypair) {
      throw new Error('Keypair not found')
    }

    let digest = hash(this._requestDigest(config))
    let signature = this._keypair.sign(digest).toString('base64')
    let keyId = this._keypair.accountId()
    let algorithm = 'ed25519-sha256'

    return `keyId="${keyId}",algorithm="${algorithm}",headers="${SIGNED_HEADERS.join(' ')}",signature="${signature}"`
  }

  _getFullUrl (config) {
    let fullUrl = uri(config.url)
    if (config.params) {
      fullUrl = fullUrl.addQuery(config.params)
    }

    return fullUrl.toString()
  }

  _requestDigest (config) {
    let toSign = SIGNED_HEADERS.map(header => {
      header = header.toLowerCase()
      if (header === REQUEST_TARGET_HEADER) {
        let method = config.method.toLowerCase()
        let endpoint = this._getFullUrl(config)

        return `${REQUEST_TARGET_HEADER}: ${method.toLowerCase()} ${endpoint}`
      }
      let value = config.headers[ header ]

      return `${header}: ${value}`
    })

    return toSign.join('\n')
  }

  _unmarshalResponse () {
    // TODO
  }
}
