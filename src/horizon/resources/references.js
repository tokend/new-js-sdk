import { ResourceGroupBase } from '../../resource_group_base'

/**
 * References.
 *
 * @class
 */
export class References extends ResourceGroupBase {
  /**
   * Return specific reference
   *
   * @param {string} reference - the unique reference
   * @returns {HorizonResponse}
   */
  get (reference) {
    return this._makeCallBuilder()
      .appendUrlSegment(reference)
      .get()
  }

  /**
   * Return all the references
   *
   * @param {object} query - url query params
   * @returns {HorizonResponse}
   */
  getAll (query = {}) {
    return this._makeCallBuilder()
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('references')
  }
}
