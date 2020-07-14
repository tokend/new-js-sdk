import { DocumentsManager } from '../api2'
import isObject from 'lodash/isObject'

/**
 * Wrapper to simplify work with documents
 * @class
 */
export class Document {
  /**
   * @param {object} opts
   * @param {File} [opts.file] - file representing a document
   * @param {string} [opts.name] - file name
   * @param {string} [opts.mimeType] - file MIME type
   * @param {string} [opts.key] - storage service file key
   * @param {string} [type] - storage service document type
   */
  constructor (opts = {}, type = '') {
    this._file = opts.file || null
    this._name = opts.name || ''
    this._mimeType = opts.mimeType || ''
    this._key = opts.key || ''
    this._type = type || ''
    this._privateUrl = ''
  }

  get file () { return this._file }
  get name () { return this._name }
  get mimeType () { return this._mimeType }
  get key () { return this._key }
  get type () { return this._type }
  get privateUrl () { return this._privateUrl }

  get publicUrl () {
    return this.documentsManager.getDocumentUrlByKey(this._key)
  }

  get isEmpty () {
    return !this._file && !this.isUploaded
  }

  get isUploaded () {
    return Boolean(this._key)
  }

  setFile (val) {
    this._file = val
    return this
  }

  setName (val) {
    this._name = val
    return this
  }

  setMimeType (val) {
    this._mimeType = val
    return this
  }

  setKey (val) {
    this._key = val
    return this
  }

  setType (val) {
    this._type = val
    return this
  }

  toJSON () {
    return {
      mime_type: this._mimeType || '',
      name: this._name || '',
      key: this._key || ''
    }
  }

  async uploadSelf () {
    if (this.isUploaded) return this
    if (this.isEmpty) throw new Error('Cannot upload an empty doc')
    const opts = {
      type: this._type,
      mimeType: this._mimeType,
      file: this._file
    }
    this._key = await this.documentsManager.uploadDocument(opts)
    return this
  }

  async getPrivateUrl () {
    if (!this.isUploaded) return ''
    this._privateUrl = await this.documentsManager.getPrivateUrl(this._key)
    return this
  }

  static useDocumentsManager (instance) {
    if (!(instance && instance instanceof DocumentsManager)) {
      throw new Error('Instance of DocumentsManager should be passed as parameter')
    }
    this.prototype.documentsManager = instance
  }

  /**
   * Uploads an array of documents to the storage.
   *
   * @param {Document[]} documents - array of {@link Document}
   * instances to be uploaded
   */
  static async uploadDocuments (documents) {
    await Promise.all(documents.map(doc => this._uploadDocument(doc)))
  }

  static async uploadDocumentsDeep (obj) {
    const docs = this._collectDocsToUploadDeep(obj)
    await this.uploadDocuments(docs)
  }

  /**
   * Uploads a document to the storage.
   *
   * @param {Document} [document] - instance of {@link Document}
   * to be uploaded
   * @returns {Promise} Modified document with set key
   */
  static async _uploadDocument (document) {
    if (!(document instanceof Document)) return
    return document.uploadSelf()
  }

  static _collectDocsToUploadDeep (obj = {}) {
    const docs = []
    for (const val of Object.values(obj)) {
      if (val instanceof Document && !val.isUploaded) {
        docs.push(val)
        continue
      }
      if (isObject(val)) {
        docs.push(...this._collectDocsToUploadDeep(val))
      }
    }
    return docs
  }
}
