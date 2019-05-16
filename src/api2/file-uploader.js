import axios from 'axios'

import middlewares from './middlewares'
import _omit from 'lodash/omit'

import { toKebabCaseDeep } from '../utils/case_converter'

/**
 * FileUploader uploads a file to the storage server
 */
export class FileUploader {
  /**
   * @param {object} opts
   * @param {string} opts.storageURL
   * @param {ApiCaller} opts.apiCaller
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

  async uploadFile ({ type, mimeType, file }) {
    const config = await this._createDocumentAnchorConfig(
      { type, mimeType }
    )

    const formData = this._createFileFormData(
      file,
      _omit(config, ['id', 'url', 'type']),
      mimeType
    )
    await this._postFileFormData(formData)

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

  _createFileFormData (file, policy, mimeType) {
    // eslint-disable-next-line no-undef
    const formData = new FormData()

    for (const key in policy) {
      formData.append(toKebabCaseDeep(key), policy[key])
    }

    // eslint-disable-next-line no-undef
    const blob = new Blob([file], { type: mimeType })
    formData.append('file', blob)

    return formData
  }

  async _postFileFormData (formData) {
    const config = {
      baseURL: this._storageURL,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      method: 'POST'
    }

    try {
      await this._axios(config)
    } catch (e) {
      throw middlewares.parseJsonapiError(e, this._axios)
    }
  }
}
