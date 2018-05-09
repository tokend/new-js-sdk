import { ServerBase } from '../server_base'
import { toSnakeCaseDeep } from '../utils/case_converter'
import { ApiResponse } from './response'
import { ApiErrors } from './errors'
import * as resources from './resources'

/**
 * Facilitates interaction with the API server.
 *
 * @class
 */
export class ApiServer extends ServerBase {
  /**
   * Create a new API server instance.
   *
   * @constructor
   * @param {TokenD} sdk Parent SDK instance.
   * @param {string} serverUrl API server URL.
   * @param {Object} opts
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {Object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {Object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {Object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   * @param {string} [opts.responseType='json'] Indicates the type of data that the server will respond with options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'.
   */
  constructor (sdk, serverUrl, opts = {}) {
    opts.responseType = 'json'
    super(sdk, serverUrl, opts)

    this.useRequestInterceptor(
      (config) => {
        if (config.params) {
          config.params = toSnakeCaseDeep(config.params)
        }
        if (config.data) {
          config.data = toSnakeCaseDeep(config.data)
        }

        return config
      },
      (err) => Promise.reject(err)
    )
    this.useResponseInterceptor(
      (response) => new ApiResponse(response),
      (error) => {
        if (error.response && error.response.status) {
          error = new ApiErrors(error.response.data)
        }

        return Promise.reject(error)
      }
    )
  }

  /**
   * Wallets.
   */
  get wallets () {
    return new resources.Wallets(this)
  }
}
