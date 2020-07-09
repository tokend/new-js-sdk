import { Document } from '../document'
import isObject from 'lodash/isObject'

/**
 * Uploads an array of documents to the storage.
 *
 * @param {Document[]} documents - array of {@link Document}
 * instances to be uploaded
 */
export async function uploadDocuments (documents) {
  await Promise.all(documents.map(doc => uploadDocument(doc)))
}

export async function uploadDocumentsDeep (obj) {
  const docs = collectDocsToUploadDeep(obj)
  await uploadDocuments(docs)
}

/**
 * Uploads a document to the storage.
 *
 * @param {Document} [document] - instance of {@link Document}
 * to be uploaded
 * @returns {Promise} Modified document with set key
 */
async function uploadDocument (document) {
  if (!(document instanceof Document)) return
  return document.uploadSelf()
}

function collectDocsToUploadDeep (obj = {}) {
  const docs = []
  for (const val of Object.values(obj)) {
    if (val instanceof Document && !val.isUploaded) {
      docs.push(val)
      continue
    }
    if (isObject(val)) {
      docs.push(...collectDocsToUploadDeep(val))
    }
  }
  return docs
}
