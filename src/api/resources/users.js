import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Users.
 */
export class Users extends ResourceGroupBase {
  /**
   * Get users.
   *
   * @param {object} [query] Request options.
   * @param {Number} [query.page] Page number.
   * @param {Number} [query.state] Bit mask to filter users by state.
   * @param {Number} [query.type] Bit mask to filter users by type.
   * @param {string} [query.email] Substring to match against user emails.
   * @param {string} [query.address] Substring to match against account addresses.
   *
   * @return {Promise} Collection of balances.
   */
  getPage (query = {}) {
    return this._makeCallBuilder().get(query)
  }

  /**
   * Get a user.
   *
   * @param {string} [accountId] Other user's account.
   *
   * @return {Promise} Collection of balances.
   */
  get (accountId) {
    return this._makeCallBuilder()
      .appendAccountId(accountId)
      .get()
  }

  /**
   * Get a user documents.
   *
   * @param {string} [accountId] Account id of the user.
   *
   * @return {Promise} List of user's documents.
   */

  getUserDocuments (accountId) {
    return this._makeCallBuilder()
      .appendAccountId(accountId)
      .appendUrlSegment('documents')
      .get()
  }

  /**
   * Get a user document by file key.
   *
   * @param {object} [query] Request options.
   * @param {string} [query.accountId] Account id of the user.
   * @param {string} [query.fileKey] Key of the requested document (file).
   *
   * @return {Promise} Document information.
   */

  getUserDocumentByFileKey ({ accountId, fileKey }) {
    return this._makeCallBuilder()
      .appendAccountId(accountId)
      .appendUrlSegment('documents')
      .appendUrlSegment(fileKey)
      .get()
  }

  /**
   * Create a user.
   *
   * @param {string} [accountId] Other user's account.
   *
   * @return {Promise} Collection of balances.
   */
  create (accountId) {
    return this._makeCallBuilder()
      .appendAccountId(accountId)
      .put({
        data: {
          attributes: {
            type: 1
          }
        }
      })
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('users')
      .withSignature()
  }
}
