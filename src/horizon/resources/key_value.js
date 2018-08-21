import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Key value.
 *
 * @class
 */
export class KeyValue extends ResourceGroupBase {
  /**
   * Get k/v entry for provided key
   * @param key for the k/v entry
   * @returns {HorizonResponse}
   */
  get (key) {
    return this._makeCallBuilder()
      .appendUrlSegment(key)
      .get()
  }

  /**
   * Get all the k/v entries
   * @returns {HorizonResponse}
   */
  getAll () {
    return this._makeCallBuilder().get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('key_value')
  }
}
