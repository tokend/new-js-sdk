import axios from 'axios'
import FormData from 'form-data'

import _kebabCase from 'lodash/kebabCase'
import _omit from 'lodash/omit'

import { ApiCaller } from '../api-caller'

import { StorageServerError } from '../../errors'

const HEADER_CONTENT_TYPE = 'Content-Type'
const MIME_TYPE_MULTIPART_FORM_DATA = 'multipart/form-data'

/**
 * DocumentsManager uploads a document to the storage server
 */
export class DocumentsManager {
  /**
   * @param {object} opts
   * @param {ApiCaller} [opts.apiCaller] API caller instance.
   * @param {string} [opts.storageURL] Storage base URL.
   */
  constructor (opts = {}) {
    this._axios = axios.create()

    if (opts.apiCaller) {
      this.useApi(opts.apiCaller)
    }

    if (opts.storageURL) {
      this.useStorageURL(opts.storageURL)
    }
  }

  /**
   * Use an API caller to create document's config.
   *
   * @param {ApiCaller} api API caller instance.
   */
  useApi (api) {
    if (!(api instanceof ApiCaller)) {
      throw new TypeError('An ApiCaller instance expected')
    }

    this._apiCaller = api
  }

  /**
   * Use a storage URL to upload documents.
   *
   * @param {string} url Storage base URL.
   */
  useStorageURL (url) {
    this._storageURL = url
  }

  /**
   * Returns document URL by provided storage key.
   *
   * @param {string} key File storage key.
   *
   * @return {string} - Document URL
   */
  getDocumentUrlByKey (key) {
    if (key) {
      return `${this._storageURL}/${key}`
    } else {
      return ''
    }
  }

  /**
   * Uploads the document into storage
   *
   * @param {object} opts
   * @param {string} opts.type - Type of the document
   * (!! nothing common with MIME-type)
   * @param {string} opts.mimeType - MIME-type of the file being uploaded
   * @param {ArrayBuffer} opts.file - File itself
   * @param {string} [accountId] - Document's owner account ID.
   * User wallet's account ID by default
   *
   * @return {string} - File storage key
   */
  async uploadDocument ({ type, mimeType, file, accountId }) {
    const config = await this._createDocumentAnchorConfig(
      { type, mimeType, accountId }
    )

    const formData = this._createFileFormData({
      file,
      policy: _omit(config, ['id', 'url', 'type'])
    })
    await this._postFormData(formData)

    return config.key
  }

  async _createDocumentAnchorConfig ({ type, mimeType, accountId }) {
    const { data: config } = await this._apiCaller.postWithSignature(
      '/api/documents',
      {
        data: {
          type,
          attributes: { content_type: mimeType },
          relationships: {
            owner: {
              data: { id: accountId || this._apiCaller.wallet.accountId }
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

    try {
      await this._axios.post(this._storageURL, formData, config)
    } catch (e) {
      throw new StorageServerError(e, this._axios)
    }
  }
}
