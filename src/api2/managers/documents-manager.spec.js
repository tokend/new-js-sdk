import sinon from 'sinon'

import { DocumentsManager } from './documents-manager'
import { ApiCaller } from '../api-caller'

describe('documents-manager unit test', () => {
  let sandbox
  let documentsManager

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    const apiCaller = ApiCaller.getInstance('https://api.com')
    documentsManager = new DocumentsManager({ apiCaller })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('method', () => {
    describe('uploadDocument', () => {
      it('calls proper methods and returns file storage key', async () => {
        sandbox.stub(documentsManager, '_createDocumentAnchorConfig').resolves({
          id: 'id',
          url: 'https://storage.com',
          type: 'type',
          key: 'doc-key',
          somePolicy: 'value'
        })
        sandbox.stub(documentsManager, '_createFileFormData').returns({
          key: 'value'
        })
        sandbox.stub(documentsManager, '_postFormData').resolves()

        const result = await documentsManager.uploadDocument({
          type: 'type',
          mimeType: 'mime-type',
          file: { name: 'file' },
          accountId: 'SOME_ACCOUNT_ID'
        })

        expect(result).to.equal('doc-key')
        expect(documentsManager._createDocumentAnchorConfig)
          .calledOnceWithExactly({
            type: 'type',
            mimeType: 'mime-type',
            accountId: 'SOME_ACCOUNT_ID'
          })
        expect(documentsManager._createFileFormData)
          .calledOnceWithExactly({
            file: { name: 'file' },
            policy: {
              key: 'doc-key',
              somePolicy: 'value'
            }
          })
        expect(documentsManager._postFormData)
          .calledOnceWithExactly({ key: 'value' })
      }
      )
    })

    describe('_createDocumentAnchorConfig', () => {
      it('calls apiCaller.postWithSignature method with provided params', async () => {
        sandbox.stub(documentsManager._apiCaller, 'wallet')
          .get(_ => ({ accountId: 'SOME_ACCOUNT_ID' }))
        sandbox.stub(documentsManager._apiCaller, 'postWithSignature')
          .resolves({ data: { key: 'doc-key' } })

        const result = await documentsManager._createDocumentAnchorConfig({
          type: 'doc-type',
          mimeType: 'mime-type'
        })

        expect(documentsManager._apiCaller.postWithSignature)
          .to.have.been.calledOnceWithExactly(
            '/api/documents',
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
        sandbox.stub(documentsManager._axios, 'post').resolves()
        documentsManager.useStorageURL('https://storage.com')

        await documentsManager._postFormData({ key: 'value' })

        expect(documentsManager._axios.post).calledOnceWithExactly(
          'https://storage.com',
          { key: 'value' },
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
      })
    })
  })
})
