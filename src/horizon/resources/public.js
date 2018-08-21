import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Public. Represents public data endpoints
 *
 * @class
 */
export class Public extends ResourceGroupBase {
  /**
   * Get operation by id. Works the same as {@link Operations.get}, but the private details are omitted
   *
   * @param id
   * @returns {Promise}
   */
  getOperation (id) {
    return this._makeCallBuilder()
      .appendUrlSegment(['operations', id])
      .get()
  }

  /**
   * Get operations page. Works the same as {@link Operations.getPage}, but the private details are omitted
   * @param [query] The request query, the same as {@link Operations.getPage}
   *
   * @returns {Promise}
   */
  getOperationsPage (query) {
    return this._makeCallBuilder()
      .appendUrlSegment('operations')
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('public')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
