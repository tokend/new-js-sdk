import sinon from 'sinon'

import { VerificationManager } from './verification-manager'
import { ApiCaller } from '../api-caller'
import { base, Document } from '../..'

describe('Verification manager', () => {
  let sandbox = 'pisis'
  let manager
  let api

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    api = ApiCaller.getInstance('https://api.test.com')
    manager = new VerificationManager(api)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.createRequest', () => {
    const SOME_ROLE = '1'
    const SOME_BLOB_TYPE = '2'
    const SOME_BLOB_ID = 'oWrjnqwlnJwne213Nwqe'
    const SOME_ACCOUNT_ID = 'GBJLJVOVLTSN5WRZ5YHAWS5WHIOUKC3ZJUWXDRYCBMRRWNOIXOELZZMG'

    beforeEach(() => {
      sandbox.stub(api, 'postWithSignature').resolves({ data: { id: SOME_BLOB_ID } })
      sandbox.stub(api, 'postOperations').resolves()
    })

    it('should upload instances of Document provided in the blob data', async () => {
      const [doc1, doc2, doc3] = [new Document(), new Document(), new Document()]

      sandbox.stub(doc1, 'uploadSelf').resolves()
      sandbox.stub(doc2, 'uploadSelf').resolves()
      sandbox.stub(doc3, 'uploadSelf').resolves()

      const blobData = {
        documents: {
          doc1,
          doc2,
          additional: { doc3 }
        }
      }

      await manager.createRequest(blobData, {
        blobType: SOME_ROLE,
        accountId: SOME_ACCOUNT_ID,
        accountRoleToSet: SOME_ROLE
      })

      expect(doc1.uploadSelf).to.have.been.calledOnce
      expect(doc2.uploadSelf).to.have.been.calledOnce
      expect(doc3.uploadSelf).to.have.been.calledOnce
    })

    it('should create a blob with provided blob data', async () => {
      const blobData = { firstName: 'John', lastName: 'Doe' }
      const expectedValue = `{"firstName":"John","lastName":"Doe"}`

      await manager.createRequest(blobData, {
        blobType: SOME_BLOB_TYPE,
        accountId: SOME_ACCOUNT_ID,
        accountRoleToSet: SOME_ROLE
      })

      expect(api.postWithSignature).to.have.been.calledOnceWithExactly('/blobs', {
        data: {
          type: SOME_BLOB_TYPE,
          attributes: { value: expectedValue },
          relationships: { owner: { data: { id: SOME_ACCOUNT_ID } } }
        }
      })
    })

    describe('should create en operation with proper attributes', () => {
      it('when request ID is passed', async () => {
        const SOME_REQUEST_ID = '10'

        const expectedOperation = base.CreateChangeRoleRequestBuilder.createChangeRoleRequest({
          requestID: SOME_REQUEST_ID,
          accountRoleToSet: SOME_ROLE,
          destinationAccount: SOME_ACCOUNT_ID,
          creatorDetails: { blob_id: SOME_BLOB_ID }
        })

        await manager.createRequest({}, {
          requestId: SOME_REQUEST_ID,

          blobType: SOME_BLOB_TYPE,
          accountId: SOME_ACCOUNT_ID,
          accountRoleToSet: SOME_ROLE
        })

        expect(api.postOperations).to.have.been.calledOnceWithExactly(expectedOperation)
      })

      it('when request ID is not passed', async () => {
        const expectedOperation = base.CreateChangeRoleRequestBuilder.createChangeRoleRequest({
          requestID: '0',
          accountRoleToSet: SOME_ROLE,
          destinationAccount: SOME_ACCOUNT_ID,
          creatorDetails: { blob_id: SOME_BLOB_ID }
        })

        await manager.createRequest({}, {
          requestId: undefined,

          blobType: SOME_BLOB_TYPE,
          accountId: SOME_ACCOUNT_ID,
          accountRoleToSet: SOME_ROLE
        })

        expect(api.postOperations).to.have.been.calledOnceWithExactly(expectedOperation)
      })
    })
  })
})
