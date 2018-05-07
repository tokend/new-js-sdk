import { Api } from './api'
import { Horizon } from './horizon'
import { Wallet } from './wallet'

/**
 * TokendD Software Development Toolkit.
 *
 * @class
 */
export class TokenD {
  /**
   * Make a new TokenD SDK instance.
   *
   * @constructor
   *
   * @param {string} serverUrl TokenD backend url.
   * @param {object} [opts]
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {Object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {Object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {Object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   */
  constructor (serverUrl, opts) {
    this._api = new Api(serverUrl, opts)
    this._horizon = new Horizon(serverUrl, opts)
  }

  /**
   * Horizon server instance.
   */
  get horizon () {
    return this._horizon
  }

  /**
   * API server instance.
   */
  get api () {
    return this._api
  }

  /**
   * User's wallet.
   */
  get wallet () {
    return this._wallet
  }

  /**
   * Use a wallet to sign transactions.
   *
   * @param {Wallet} wallet User's wallet.
   */
  useWallet (wallet) {
    if (!(wallet instanceof Wallet)) {
      throw new TypeError('A wallet instance expected.')
    }

    this._wallet = wallet
  }
}
