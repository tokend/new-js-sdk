import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Prices.
 *
 * @class
 */
export class Prices extends ResourceGroupBase {
  /**
   * Return price history for selected pair of assets. Always returns 360 points smartly
   * calculated for the specific period. Is great to use in charts
   *
   * @param query
   * @param query.base_asset - Base asset from the pair we're interested in
   * @param query.quote_asset - Quote asset from the pair we're interested in
   * @param [query.since] - If presented, the result will return only history from presented date. Should be a valid `RFC3339` string
   * @returns {HorizonResponse}
   */
  getHistory (query = {}) {
    return this._makeCallBuilder()
      .appendUrlSegment('history')
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('prices')
  }
}
