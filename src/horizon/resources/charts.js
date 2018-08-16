import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Charts.
 *
 * @class
 */
export class Charts extends ResourceGroupBase {
  /**
   * Get chart data by asset code.
   *
   * @param {string} assetCode - Asset code of chart to get
   * @return {HorizonResponse}
   */
  get (assetCode) {
    return this._makeCallBuilder()
      .appendUrlSegment(assetCode)
      .get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('charts')
  }
}
