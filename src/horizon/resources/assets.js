import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Assets.
 *
 * @class
 */
export class Assets extends ResourceGroupBase {
  /**
   * Get asset by code.
   *
   * @param {string} assetCode - Asset code of asset to get
   * @return {HorizonResponse}
   */
  get (assetCode) {
    return this._makeCallBuilder()
      .appendUrlSegment(assetCode)
      .get()
  }

  /**
   * Get all existing assets.
   *
   * @return {HorizonResponse}
   */
  getAll () {
    return this._makeCallBuilder()
      .get()
  }

  /**
   * Gets all existing balances for this asset
   *
   * @param {string} assetCode - the code of asset
   * @return {HorizonResponse}
   */
  getHolders (assetCode) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment([assetCode, 'holders'])
      .get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('assets')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
