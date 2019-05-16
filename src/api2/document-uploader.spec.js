import sinon from 'sinon'

import { DocumentUploader } from './document-uploader'
import { ApiCaller } from './api-caller'

describe('file-uploader unit test', () => {
  let sandbox
  let documentUploader

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    const apiCaller = ApiCaller.getInstance('https://api.com')
    documentUploader = new DocumentUploader({ apiCaller })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('method', () => {
    describe('uploadDocument', () => {
      it('calls proper methods and returns file storage key', async () => {
        sandbox.stub(documentUploader, '_createDocumentAnchorConfig').resolves({
          id: 'id',
          url: 'https://storage.com',
          type: 'type',
          key: 'doc-key',
          somePolicy: 'value'
        })
        sandbox.stub(documentUploader, '_createFileFormData').returns({
          key: 'value'
        })
        sandbox.stub(documentUploader, '_postFormData').resolves()

        const result = await documentUploader.uploadDocument({
          type: 'type',
          mimeType: 'mime-type',
          file: { name: 'file' },
          accountId: 'SOME_ACCOUNT_ID'
        })

        expect(result).to.equal('doc-key')
        expect(documentUploader._createDocumentAnchorConfig)
          .calledOnceWithExactly({
            type: 'type',
            mimeType: 'mime-type',
            accountId: 'SOME_ACCOUNT_ID'
          })
        expect(documentUploader._createFileFormData)
          .calledOnceWithExactly({
            file: { name: 'file' },
            policy: {
              key: 'doc-key',
              somePolicy: 'value'
            }
          })
        expect(documentUploader._postFormData)
          .calledOnceWithExactly({ key: 'value' })
      }
      )
    })

    describe('_createDocumentAnchorConfig', () => {
      it('calls apiCaller.postWithSignature method with provided params', async () => {
        sandbox.stub(documentUploader._apiCaller, 'wallet')
          .get(_ => ({ accountId: 'SOME_ACCOUNT_ID' }))
        sandbox.stub(documentUploader._apiCaller, 'postWithSignature')
          .resolves({ data: { key: 'doc-key' } })

        const result = await documentUploader._createDocumentAnchorConfig({
          type: 'doc-type',
          mimeType: 'mime-type'
        })

        expect(documentUploader._apiCaller.postWithSignature)
          .to.have.been.calledOnceWithExactly(
            '/documents',
            {
              data: {
                type: 'doc-type',
                attributes: { content_type: 'mime-type' },
                relationships: {
                  owner: {
                    data: { id: 'SOME_ACCOUNT_ID' }
                  }
                }
              }
            }
          )
        expect(result).to.deep.equal({ key: 'doc-key' })
      })
    })

    describe('_postFormData', () => {
      it('posts file form data', async () => {
        sandbox.stub(documentUploader._axios, 'post').resolves()
        documentUploader.useStorageURL('https://storage.com')

        await documentUploader._postFormData({ key: 'value' })

        expect(documentUploader._axios.post).calledOnceWithExactly(
          'https://storage.com',
          { key: 'value' },
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
      })
    })
  })
})
