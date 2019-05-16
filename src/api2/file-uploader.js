import axios from 'axios'

import FormData from 'form-data'

import _kebabCase from 'lodash/kebabCase'
import _omit from 'lodash/omit'

const HEADER_CONTENT_TYPE = 'Content-Type'
const MIME_TYPE_MULTIPART_FORM_DATA = 'multipart/form-data'

/**
 * FileUploader uploads a file to the storage server
 */
export class FileUploader {
  /**
   * @param {object} opts
   * @param {ApiCaller} opts.apiCaller
   * @param {string} [opts.storageURL]
   */
  constructor (opts = {}) {
    this._axios = axios.create()
    this._apiCaller = opts.apiCaller

    if (opts.storageURL) {
      this.useStorageURL(opts.storageURL)
    }
  }

  useStorageURL (url) {
    this._storageURL = url
  }

  /**
   * Uploads the file into storage
   *
   * @param {object} opts
   * @param {string} opts.type - Type of the document
   * (!! nothing common with MIME-type)
   * @param {string} opts.mimeType - MIME-type of the file being uploaded
   * @param {ArrayBuffer} opts.file - File itself
   *
   * @return {string} - File storage key
   */
  async uploadFile ({ type, mimeType, file }) {
    const config = await this._createDocumentAnchorConfig(
      { type, mimeType }
    )

    const formData = this._createFileFormData({
      file,
      policy: _omit(config, ['id', 'url', 'type'])
    })
    await this._postFormData(formData)

    return config.key
  }

  async _createDocumentAnchorConfig ({ type, mimeType }) {
    const { data: config } = await this._apiCaller.postWithSignature(
      '/documents',
      {
        data: {
          type,
          attributes: { content_type: mimeType },
          relationships: {
            owner: {
              data: { id: this._apiCaller.wallet.accountId }
            }
          }
        }
      }
    )

    return config
  }

  _createFileFormData ({ file, policy }) {
    const formData = new FormData()

    for (const key in policy) {
      formData.append(_kebabCase(key), policy[key])
    }

    formData.append('file', file)

    return formData
  }

  async _postFormData (formData) {
    const config = {
      headers: {
        [HEADER_CONTENT_TYPE]: MIME_TYPE_MULTIPART_FORM_DATA
      }
    }

    await this._axios.post(this._storageURL, formData, config)
  }
}
