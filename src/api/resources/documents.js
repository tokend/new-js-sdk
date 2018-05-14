import { omit } from 'lodash'
import { toSnakeCaseDeep } from '../../utils/case_converter'
import { ResourceGroupBase } from '../../resource_group_base'

const types = Object.freeze({
  assetLogo: 'asset_logo',
  fundLogo: 'fund_logo',
  fundDocument: 'fund_document',
  navReport: 'nav_report'
})

const supportedMimeTypes = Object.freeze({
  pdf: 'application/pdf',
  jpeg: 'image/jpeg',
  tiff: 'image/tiff',
  png: 'image/png',
  gif: 'image/gif'
})

/**
 * Documents.
 */
export class Documents extends ResourceGroupBase {
  /**
   * Document types.
   */
  get types () {
    return types
  }

  /**
   * Supported content types.
   */
  get supportedMimeTypes () {
    return supportedMimeTypes
  }

  /**
   * Create a document upload config.
   *
   * @param {string} documentType Document type.
   * @param {string} mimeType Content type.
   * @param {Buffer} data Document contents.
   *
   * @return {Promise.<Object>} Upload URL and form data.
   */
  async create (documentType, mimeType) {
    let response = await this._makeCallBuilder()
      .post({
        data: {
          type: documentType,
          attributes: { contentType: mimeType }
        }
      })

    let url = response.data.url
    let formData = omit(response.data, ['id', 'url', 'resourceType'])
    formData = toSnakeCaseDeep(formData)

    return { url, formData }
  }

  /**
   * Get document details by ID.
   *
   * @param {string} documentId Document ID.
   * @return {ApiResponse} Response containing an access URL.
   */
  get (documentId) {
    return this._makeCallBuilder()
      .appendUrlSegment(documentId)
      .get()
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('users')
      .appendAccountId()
      .appendUrlSegment('documents')
      .withSignature()
  }
}
