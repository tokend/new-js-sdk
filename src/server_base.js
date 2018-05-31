import axios from 'axios'
import uri from 'urijs'
import { NetworkError, TimeoutError } from './errors'
import { CallBuilder } from './call_builder'

/**
 * Server handles the network connection to some remote server
 * instance and exposes an interface for requests to that instance.
 *
 * @class ServerBase
 */
export class ServerBase {
  /**
   * Creates a Server instance.
   *
   * @constructor
   * @param {Swarm} sdk Parent Swarm SDK instance.
   * @param {string} serverUrl Server url.
   * @param {object} [opts]
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {Object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {Object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {Object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   * @param {string} [opts.responseType='json'] Indicates the type of data that the server will respond with options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'.
   */
  constructor (sdk, serverUrl, opts = {}) {
    if (!sdk) {
      throw new TypeError('An isntance of Swarm SDK expected.')
    }

    let parsedUrl = uri.parse(serverUrl)
    if (!(parsedUrl.protocol && parsedUrl.hostname)) {
      throw new Error('Invalid URL')
    }
    if (parsedUrl.protocol !== 'https' && !opts.allowHttp) {
      throw new Error(`
        Secure connection required.
        Set "allowHttp" to true if you are sure that you want to use unprotected connection.
      `)
    }

    this._sdk = sdk
    this._axios = axios.create({
      baseURL: serverUrl,
      proxy: opts.proxy,
      auth: opts.httpBasicAuth,
      headers: opts.customHeaders || axios.defaults.headers,
      withCredentials: opts.withCredentials,
      responseType: opts.responseType || axios.defaults.responseType
    })

    this.useResponseInterceptor(
      (response) => response,
      (error) => this._parseResponseError(error)
    )
  }

  /**
   * Use request interceptor.
   * @see [axios.js docs](https://github.com/axios/axios#interceptors)
   *
   * @param {function} handleSuccess Handler for successful requests.
   * @param {function} handleFailure Handler for failed requests.
   *
   * @return {Object} Axios.js interceptor object.
   */
  useRequestInterceptor (handleSuccess, handleFailure) {
    return this._axios.interceptors.request.use(
      handleSuccess,
      handleFailure
    )
  }

  /**
   * Eject request interceptor.
   * @see [axios.js docs](https://github.com/axios/axios#interceptors)
   *
   * @param {Object} interceptor Axios.js interceptor descriptor.
   */
  ejectRequestInterceptor (interceptor) {
    this._axios.interceptors.request.eject(interceptor)
  }

  /**
   * Use response interceptor.
   * @see [axios.js docs](https://github.com/axios/axios#interceptors)
   *
   * @param {function} handleSuccess Handler for successful responses.
   * @param {function} handleFailure Handler for failed responses.
   *
   * @return {Object} Axios.js interceptor object.
   */
  useResponseInterceptor (handleSuccess, handleFailure) {
    return this._axios.interceptors.response.use(
      handleSuccess,
      handleFailure
    )
  }

  /**
   * Eject response interceptor.
   * @see [axios.js docs](https://github.com/axios/axios#interceptors)
   *
   * @param {Object} interceptor Axios.js interceptor descriptor.
   */
  ejectResponseInterceptor (interceptor) {
    this._axios.interceptors.response.eject(interceptor)
  }

  _makeCallBuilder () {
    return new CallBuilder(this._axios, this._sdk)
  }

  _parseResponseError (error) {
    if (error.message === 'Network Error') {
      error = new NetworkError('Network error ocurred.', error)
    } else if (error.code === 'ECONNABORTED') {
      error = new TimeoutError(error.message, error)
    }

    return Promise.reject(error)
  }
}
