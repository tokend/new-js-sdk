import sinon from 'sinon'

import { FileUploader } from './file-uploader'
import { ApiCaller } from './api-caller'

describe('file-uploader unit test', () => {
  let sandbox
  let fileUploader

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    const apiCaller = ApiCaller.getInstance('https://api.com')
    fileUploader = new FileUploader({ apiCaller })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('method', () => {
    describe('uploadFile', () => {
      it('loads document config, calls uploadFile method, and sets document key',
        async () => {
          sandbox.stub(fileUploader, '_createDocumentAnchorConfig').resolves({
            id: 'id',
            url: 'https://storage.com',
            type: 'type',
            key: 'doc-key',
            somePolicy: 'value'
          })
          sandbox.stub(fileUploader, '_createFileFormData').returns({
            key: 'value'
          })
          sandbox.stub(fileUploader, '_postFormData').resolves()

          await fileUploader.uploadFile({
            type: 'type',
            mimeType: 'mime-type',
            file: { name: 'file' }
          })

          expect(fileUploader._createDocumentAnchorConfig)
            .calledOnceWithExactly({
              type: 'type',
              mimeType: 'mime-type'
            })
          expect(fileUploader._createFileFormData)
            .calledOnceWithExactly({
              file: { name: 'file' },
              policy: {
                key: 'doc-key',
                somePolicy: 'value'
              }
            })
          expect(fileUploader._postFormData)
            .calledOnceWithExactly({ key: 'value' })
        }
      )
    })

    describe('_createDocumentAnchorConfig', () => {
      it('calls apiCaller.postWithSignature method with provided params', async () => {
        sandbox.stub(fileUploader._apiCaller, 'wallet')
          .get(_ => ({ accountId: 'SOME_ACCOUNT_ID' }))
        sandbox.stub(fileUploader._apiCaller, 'postWithSignature')
          .resolves({ data: { key: 'doc-key' } })

        const result = await fileUploader._createDocumentAnchorConfig({
          type: 'doc-type',
          mimeType: 'mime-type'
        })

        expect(fileUploader._apiCaller.postWithSignature)
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
        sandbox.stub(fileUploader._axios, 'post').resolves()
        fileUploader.useStorageURL('https://storage.com')

        await fileUploader._postFormData({ key: 'value' })

        expect(fileUploader._axios.post).calledOnceWithExactly(
          'https://storage.com',
          { key: 'value' },
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
      })
    })
  })
})
