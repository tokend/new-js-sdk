import { get, isArray } from 'lodash'
import { ResourceGroupBase } from '../../resource_group_base'

const types = Object.freeze({
  assetDescription: 'asset_description',
  fundOverview: 'fund_overview',
  fundUpdate: 'fund_update',
  navUpdate: 'nav_update'
})

const typesToFalgs = Object.freeze({
  [types.assetDescription]: 1,
  [types.fundOverview]: 2,
  [types.fundUpdate]: 4,
  [types.navUpdate]: 8
})

/**
 * Blobs.
 */
export class Blobs extends ResourceGroupBase {
  /**
   * Blob types.
   */
  get types () {
    return types
  }

  /**
   * Create a blob.
   *
   * @param {string} type Blob type.
   * @param {string} data Serialized blob data.
   * @param {string} accountId User's account ID.
   *
   * @return {ApiResponse} Blob data.
   */
  create (type, data, accountId) {
    return this._makeCallBuilder(accountId)
      .post({
        data: {
          type,
          attributes: { value: data }
        }
      })
  }

  /**
   * Get a blob.
   *
   * @param {string} blobId Blob ID.
   * @param {string} [accountId] User's account ID.
   */
  get (blobId, accountId) {
    return this._makeCallBuilder(accountId)
      .appendUrlSegment(blobId)
      .get()
  }

  /**
   * Get blobs.
   *
   * @param {object} query Query params.
   * @param {(Nubmer|string[])} query.type Filter by type.
   * @param {string} [accountId] User's account ID.
   */
  getAll (query, accountId) {
    if (isArray(get(query, 'type'))) {
      query.type = this._combineTypeFilters(query.type)
    }

    return this._makeCallBuilder(accountId).get(query)
  }

  _combineTypeFilters (types) {
    return types.reduce((flags, type) => {
      let flag = typesToFalgs[type]
      if (!flag) {
        throw new Error(`Invalid blob type: ${type}`)
      }
      return flags | flag
    }, 0)
  }

  _makeCallBuilder (accountId) {
    return this._server._makeCallBuilder()
      .withSignature()
      .appendUrlSegment('users')
      .appendAccountId(accountId)
      .appendUrlSegment('blobs')
  }
}
