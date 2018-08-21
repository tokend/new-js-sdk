import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Asset pairs.
 *
 * @class
 */
export class AssetPairs extends ResourceGroupBase {
  /**
   * Gets all the existing asset pairs.
   *
   * @return {HorizonResponse}
   */
  getAll () {
    return this._makeCallBuilder()
      .get()
  }

  /**
   * Converts amount from one asset to another
   *
   * @param query
   * @param {string} query.source_asset - Asset to convert from
   * @param {string} query.dest_asset - Asset to convert to
   * @param {string} query.amount - Amount to convert
   * @return {HorizonResponse}
   */
  convert (query) {
    return this._makeCallBuilder()
      .appendUrlSegment('convert')
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('asset_pairs')
  }
}
