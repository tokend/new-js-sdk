import { ApiServer } from './api'
import { HorizonServer } from './horizon'
import { Wallet } from './wallet'
import { Network } from './base/network'

/**
 * TokendD Software Development Toolkit.
 *
 * @class
 */
export class TokenD {
  /**
   * Internal constructor. Use TokenD.create() isntead.
   *
   * @private
   * @constructor
   */
  constructor (url, opts = {}) {
    this._api = new ApiServer(this, url, opts)
    this._horizon = new HorizonServer(this, url, opts)
    this._clockDiff = 0
    this._legacySignatures = opts.legacySignatures || false
  }

  /**
   * Make a new TokenD SDK instance.
   *
   * @constructor
   *
   * @param {string} url TokenD backend url.
   * @param {object} [opts]
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   * @param {boolean} [opts.legacySignatures] Use legacy signature scheme instead of IETF HTTP Signatures
   *
   * @return {Promise.<TokenD>}
   */
  static async create (url, opts) {
    let sdk = new TokenD(url, opts)
    let networkDetails = await sdk.horizon.getNetworkDetails()

    sdk._useNetworkPassphrase(networkDetails.data.networkPassphrase)
    sdk._calculateClockDiff(networkDetails.data.currentTime)

    return sdk
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
   * Clock difference with the backend.
   */
  get clockDiff () {
    return this._clockDiff
  }

  /**
   * Use legacy signature scheme instead of IETF HTTP Signatures.
   */
  get legacySignatures () {
    return this._legacySignatures
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

  /**
   * Eject current wallet.
   */
  ejectWallet () {
    this._wallet = null
  }

  _useNetworkPassphrase (networkPassphrase) {
    Network.use(new Network(networkPassphrase))
  }

  _calculateClockDiff (timestamp) {
    this._clockDiff = (Date.now() / 1000) - timestamp
  }
}
