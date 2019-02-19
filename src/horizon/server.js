import { ServerBase } from '../server_base'
import { get } from 'lodash'
import { HorizonResponse } from './response'
import * as errors from '../errors'
import * as resources from './resources'

/**
 * Facilitates interaction with a Horizon server instance.
 *
 * @class
 */
export class HorizonServer extends ServerBase {
  /**
   * Create a new Horizon instance.
   *
   * @constructor
   *
   * @param {TokenD} sdk Parent SDK instance.
   * @param {string} serverUrl Horizon server instance URL.
   * @param {boolean} [opts.allowHttp] Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {Object} [opts.proxy] Proxy configuration. Look [axios docs](https://github.com/axios/axios#request-config) for more info
   * @param {Object} [opts.httpBasicAuth] HTTP basic auth credentials. Look [axios docs](https://github.com/axios/axios#request-config) for more info.
   * @param {Object} [opts.customHeaders] Custom headers for request.
   * @param {boolean} [opts.withCredentials] Indicates whether or not cross-site Access-Control requests should be made using credentials.
   */
  constructor (sdk, serverUrl, opts = {}) {
    opts.responseType = 'json'
    super(sdk, serverUrl, opts)

    this.useResponseInterceptor(
      (response) => new HorizonResponse(response, this._sdk),
      (error) => this._parseResponseError(error)
    )
  }

  /**
   * Get network details.
   *
   * @return {HorizonResponse} Network details.
   */
  getNetworkDetails () {
    return this._makeCallBuilder().get()
  }

  /**
   * Account details.
   *
   * @return {Account}
   */
  get account () {
    return new resources.Account(this, this._sdk)
  }

  /**
   * Assets.
   *
   * @return {Assets}
   */
  get assets () {
    return new resources.Assets(this, this._sdk)
  }

  /**
   * Asset pairs.
   *
   * @return {AssetPairs}
   */
  get assetPairs () {
    return new resources.AssetPairs(this, this._sdk)
  }

  /**
   * Asset pairs.
   *
   * @return {AssetPairs}
   */
  get atomicSwapBid () {
    return new resources.AtomicSwapBid(this, this._sdk)
  }

  /**
   * Balances.
   *
   * @return {Balances}
   */
  get balances () {
    return new resources.Balances(this, this._sdk)
  }

  /**
   * Charts.
   *
   * @return {Charts}
   */
  get charts () {
    return new resources.Charts(this, this._sdk)
  }

  /**
   * Core sales
   * @return {CoreSales}
   */
  get coreSales () {
    return new resources.CoreSales(this, this._sdk)
  }

  /**
   * Fees
   *
   * @return {Fees}
   */
  get fees () {
    return new resources.Fees(this, this._sdk)
  }

  /**
   * Key/value
   *
   * @return {KeyValue}
   */
  get keyValue () {
    return new resources.KeyValue(this, this._sdk)
  }

  /**
   * Limits
   *
   * @return {Limits}
   */
  get limits () {
    return new resources.Limits(this, this._sdk)
  }

  /**
   * Operations
   *
   * @return {Operations}
   */
  get operations () {
    return new resources.Operations(this, this._sdk)
  }

  /**
   * Order Book
   *
   * @return {OrderBook}
   */
  get orderBook () {
    return new resources.OrderBook(this, this._sdk)
  }

  /**
   * Payments
   *
   * @return {Payments}
   */
  get payments () {
    return new resources.Payments(this, this._sdk)
  }

  /**
   * Prices
   *
   * @return {Prices}
   */
  get prices () {
    return new resources.Prices(this, this._sdk)
  }

  /**
   * Public
   *
   * @return {Public}
   */
  get public () {
    return new resources.Public(this, this.sdk)
  }

  /**
   * Reviewable requests.
   *
   * @return {Request}
   */
  get request () {
    return new resources.Request(this, this._sdk)
  }

  /**
   * References.
   *
   * @return {References}
   */
  get references () {
    return new resources.References(this, this._sdk)
  }

  /**
   * Sales.
   *
   * @return {Sales}
   */

  get sales () {
    return new resources.Sales(this, this._sdk)
  }

  /**
   * Sale Antes
   *
   * @return {SaleAntes}
   */
  get saleAntes () {
    return new resources.SaleAntes(this, this._sdk)
  }

  /**
   * Transactions.
   *
   * @return {Transactions}
   */
  get transactions () {
    return new resources.Transactions(this, this._sdk)
  }

  /**
   * Trades
   *
   * @return {Trades}
   */
  get trades () {
    return new resources.Trades(this, this._sdk)
  }

  /**
   * Trusts
   *
   * @return {Trusts}
   */
  get trusts () {
    return new resources.Trusts(this, this._sdk)
  }

  /**
   * V2
   *
   * @return {V2}
   */
  get v2 () {
    return new resources.V2(this, this._sdk)
  }

  /**
   * History offers
   *
   * @return {OrderBook}
   */
  get historyOffers () {
    return new resources.HistoryOffers(this, this._sdk)
  }

  _parseResponseError (error) {
    if (error.response && error.response.status) {
      const errCode = get(error, 'response.data.errors[0].code')

      switch (error.response.status) {
        case 400:
          if (errCode === 'transaction_failed') {
            error = new errors.TransactionError(error, this._axios)
          } else {
            error = new errors.BadRequestError(error, this._axios)
          }
          break
        case 401:
          error = new errors.UnauthorizedError(error, this._axios)
          break
        case 403:
          // TFA errors are returned by API, parse as an API error
          error = new errors.TFARequiredError(error, this._axios)
          break
        case 404:
          error = new errors.NotFoundError(error, this._axios)
          break
        case 500:
          error = new errors.InternalServerError(error, this._axios)
          break
      }
    }

    return Promise.reject(error)
  }
}
