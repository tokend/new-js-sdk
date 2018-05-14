import { ResourceGroupBase } from '../../resource_group_base'

const types = Object.freeze({
  individual: 'individual'
})

/**
 * KYC entities.
 */
export class KycEntities extends ResourceGroupBase {
  /**
   * Document types.
   */
  get types () {
    return types
  }

  /**
   * Create a document upload config.
   *
   * @param {string} documentType Entity type.
   * @param {string} kycData KYC data.
   * @param {string} [accountId] User's account ID.
   *
   * @return {ApiResponse} Response.
   */
  create (type, kycData, accountId) {
    return this._makeCallBuilder(accountId)
      .post({
        data: {
          type,
          attributes: kycData
        }
      })
  }

  /**
   * Get all entities.
   *
   * @param {string} [accountId] User's account ID.
   * @return {ApiResponse} List of KYC entities.
   */
  getAll (accountId) {
    return this._makeCallBuilder(accountId).get()
  }

  /**
   * Update an entity.
   *
   * @param {string} entityId Entity ID.
   * @param {object} kycData KYC data.
   * @param {string} [accountId] User's account ID.
   *
   * @return {ApiResponse} Response.
   */
  update (entityId, type, kycData, accountId) {
    return this._makeCallBuilder(accountId)
      .appendUrlSegment(entityId)
      .put({
        data: {
          type,
          attributes: kycData
        }
      })
  }

  _makeCallBuilder (accountId) {
    return this._server._makeCallBuilder()
      .appendUrlSegment('users')
      .appendAccountId(accountId)
      .appendUrlSegment('entities')
      .withSignature()
  }
}
