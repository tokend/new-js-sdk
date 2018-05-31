import { get } from 'lodash'
import { ServerBase } from '../server_base'
import { toSnakeCaseDeep } from '../utils/case_converter'
import { ApiResponse } from './response'
import * as errors from './errors'
import * as horizonErrors from '../horizon/errors'
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
   * @param {Swarm} sdk Parent SDK instance.
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
      (response) => {
        if (response.data.url) {
          return response.data
        }

        return new ApiResponse(response, this._sdk)
      },
      (error) => {
        if (error.response && error.response.status) {
          let horizonError = Boolean(get(error, 'response.data.status'))
          if (horizonError) {
            // NOTE: all API routes go through Horizon, so some horizon errors
            // are expected
            switch (error.response.status) {
              case 404:
                error = new horizonErrors.NotFoundError(error, this._axios)
                break
              case 500:
                error = new horizonErrors.InternalServerError(
                  error,
                  this._axios
                )
                break
              default:
                error = new horizonErrors.HorizonError(error, this._axios)
            }
          } else {
            switch (error.response.status) {
              case 400:
                error = new errors.BadRequestError(error, this._axios)
                break
              case 401:
                error = new errors.NotAllowedError(error, this._axios)
                break
              case 403:
                let errCode = get(error, 'response.data.errors[0].code')

                if (errCode === 'tfa_required') {
                  error = new errors.TFARequiredError(error, this._axios)
                } else if (errCode === 'verification_required') {
                  error = new errors.VerificationRequiredError(
                    error,
                    this._axios
                  )
                } else {
                  error = new errors.ForbiddenRequestError(error, this._axios)
                }
                break
              case 404:
                error = new errors.NotFoundError(error, this._axios)
                break
              case 409:
                error = new errors.ConflictError(error, this._axios)
                break
              case 500:
                error = new errors.InternalServerError(error, this._axios)
                break
              default:
                error = new errors.ApiError(error, this._axios)
            }
          }
        }

        return Promise.reject(error)
      }
    )
  }

  /**
   * Wallets.
   */
  get wallets () {
    return new resources.Wallets(this, this._sdk)
  }

  /**
   * TFA factors.
   */
  get factors () {
    return new resources.Factors(this, this._sdk)
  }

  /**
   * Users.
   */
  get users () {
    return new resources.Users(this, this._sdk)
  }

  /**
   * Documents.
   */
  get documents () {
    return new resources.Documents(this, this._sdk)
  }

  /**
   * KYC entities.
   */
  get kycEntities () {
    return new resources.KycEntities(this, this._sdk)
  }

  /**
   * Blobs.
   */
  get blobs () {
    return new resources.Blobs(this, this._sdk)
  }
}
