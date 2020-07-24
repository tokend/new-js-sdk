import { base, Document } from '../../index'
import { ApiCaller } from '../api-caller'

/**
 * @class VerificationManager
 *
 * Entity that manages verification operations.
 *
 * --- USAGE: ---
 *
 * Create a change role request:
 *
 * const api = new ApiCaller()
 * const manager = new VerificationManager(api)
 * const blobData = { first_name: 'John', last_name: 'Doe' }
 *
 * await manager.createRequest(blobData, {
 *   blobType: BLOB_TYPES.kycGeneral,
 *   accountRoleToSet: keyValues.accountRoleGeneral,
 *   accountId: 'GAYGJJZ5YVBZYO6XTXUCGDZFB3TB3LRF2KRNJ4TQKBMVYI7CAFBPQ4AB',
 * })
 */
export class VerificationManager {
  constructor (apiCaller) {
    if (apiCaller) {
      this.useApi(apiCaller)
    }
  }

  useApi (api) {
    if (!(api instanceof ApiCaller)) {
      throw new Error('Is not ApiCaller')
    }

    this._apiCaller = api
  }

  /**
   * Creates a KYC request.
   *
   * @param blobData - information taken from user. If blobData contains
   *                   an instance of {@link Document} (on anly object level) -
   *                   it will be automatically uploaded.
   *
   * @param {object} opts - additional options needed for request creation
   * @param {string|number} opts.accountRoleToSet - defines the role to be set
   *                                                when using the request.
   * @param {string} opts.blobType - type of blob to be created.
   * @param {string} opts.accountId - ID of account for role updating.
   * @param {string} [opts.requestId] - ID of existing request (if present).
   * @param opts
   */
  async createRequest (blobData, opts = {}) {
    const blobId = await this._createBlob(
      blobData, opts.accountId, opts.blobType
    )

    const operation = base.CreateChangeRoleRequestBuilder
      .createChangeRoleRequest({
        requestID: opts.requestId || '0',
        destinationAccount: opts.accountId,
        accountRoleToSet: String(opts.accountRoleToSet),
        creatorDetails: { blob_id: blobId }
      })

    await this._apiCaller.postOperations(operation)
  }

  async _createBlob (blobData, ownerAccountId, blobType) {
    await Document.uploadDocumentsDeep(blobData)

    const { data } = await this._apiCaller.postWithSignature('/blobs', {
      data: {
        type: blobType,
        attributes: {
          value: JSON.stringify(blobData)
        },
        relationships: {
          owner: {
            data: {
              id: ownerAccountId
            }
          }
        }
      }
    })

    return data.id
  }
}
