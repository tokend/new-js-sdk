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
   * Create a user.
   *
   * @param {string} [accountId] Other user's account.
   *
   * @return {Promise} Collection of balances.
   */
  create (accountId) {
    return this._makeCallBuilder()
      .appendAccountId(accountId)
      .put({ data: { attributes: {} } })
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('users')
      .withSignature()
  }
}
