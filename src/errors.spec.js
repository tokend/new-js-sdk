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
      method: 'get',
      url: '/',
      headers: {
        Date: Date.now()
      }
    }
    rawErrorResponse = await (axios(requestConfig).catch(err => err))
    axiosMock.reset()
  })

  afterEach(() => axiosMock.reset())

  describe('ServerErrorBase', () => {
    beforeEach(() => {
      error = new errors.ServerErrorBase(rawErrorResponse, axios)
    })

    describe('.retryRequest', () => {
      it('Should retry exactly the same request.', async () => {
        axiosMock.onAny('/', requestConfig).reply(200, { success: true })
        let response = await error.retryRequest()
        expect(response.data)
      })
    })

    describe('.httpStatus', () => {
      it('Should expose http status.', () => {
        expect(error).to.have.a.property('httpStatus').equal(403)
      })
    })

    describe('.meta', () => {
      it('Should expose error meta.', () => {
        expect(error).to.have.a.property('meta')
      })
    })
  })
})
