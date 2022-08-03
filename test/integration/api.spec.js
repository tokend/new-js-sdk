import { NotFoundError } from '../../src/errors'
import { sdk, api } from '../helpers'

describe('API integration test', () => {
  describe('errors', () => {
    it('should properly parse horizon error in JSON API format', async () => {
      const notExistingAssetCode = 'eutgweukrjwqrh'
      const err = await catchPromise(sdk.horizon.assets.get(notExistingAssetCode))

      expect(err).to.be.an.instanceOf(NotFoundError)
      expect(err.httpStatus).to.exist
      expect(err.meta).to.exist
      expect(err.title).to.exist
      expect(err.detail).to.exist
    })
    it('should properly parse api error from delete identity endpoint', async () => {
      
      let err = await catchPromise(api.deleteWithSignature('/identities/undefinedqmfnapnsk@mail.com'))
    
      expect(err).to.be.an.instanceOf(NotFoundError)
      expect(err.httpStatus).to.exist
      expect(err.title).to.exist
    })
  })
})
