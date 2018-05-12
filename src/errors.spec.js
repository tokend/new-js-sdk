import mocks from './test_helpers/mock_factory'
import * as errors from './errors'

describe('errors', () => {
  let { axios, axiosMock } = mocks.axios()
  let requestConfig
  let rawErrorResponse
  let error

  beforeEach(async () => {
    axiosMock.onAny().reply(403, { title: 'Forbidden' })
    requestConfig = {
      headers: {
        Date: Date.now()
      }
    }
    rawErrorResponse = await (axios.get(requestConfig).catch(err => err))
  })

  afterEach(() => axiosMock.reset())

  describe('ServerErrorBase', () => {
    beforeEach(() => {
      error = new errors.ServerErrorBase(rawErrorResponse, axios)
    })

    it('.retryRequest', () => {
      it('Should retry exactly the same request.', async () => {
        axiosMock.onGet(requestConfig).reply(200, { success: true })
        let response = await error.retryRequest()
        expect(response.data).to.jsonEqual({ success: true })
      })
    })

    it('.httpStatus', () => {
      expect(error).to.have.a.property('httpStatus').equal(403)
    })
  })
})
