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

  /**
   * Get account id by email
   * Actually user_id endpoint belongs to API, but due to the fact the response
   * isn’t packaged into a json api format, we placed it here.
   *
   * @param {string} email user’s email
   *
   * @return {Promise}
   */
  getAccountIdByEmail (email) {
    return this._server._makeCallBuilder()
      .appendUrlSegment('user_id')
      .get({ email })
  }

  /**
   * Get user's email by their account ID
   *
   * @param {string} accountId user’s account ID
   *
   * @return {String} user's email
   */
  async getEmailByAccountId (accountId) {
    const { data } = await this._server._makeCallBuilder()
      .appendUrlSegment('details')
      .post({
        addresses: [accountId]
      })

    const users = Object.values(data.users)
    return users.length ? users[0].email : ''
  }

  /**
   * Get public enums, such as countries, nationalities, genders, industries, etc.
   *
   * @return {Promise}
   */
  getEnums () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('data')
      .appendUrlSegment('enums')
      .get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('public')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
