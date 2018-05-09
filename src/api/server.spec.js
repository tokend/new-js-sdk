import { ApiResponse } from './response'
import { ApiErrors } from './errors'
import mocks from '../test_helpers/mock_factory'

describe('ApiServer', () => {
  let api = mocks.tokenDSdk().api

  afterEach(() => {
    api.reset()
  })

  const responseBody = Object.freeze({
    data: {
      id: '1',
      type: 'contacts'
    }
  })

  it('Should parse responses.', async () => {
    api.onGet().reply(200, responseBody)

    let response = await api._makeCallBuilder().get()
    expect(response).to.be.an.instanceOf(ApiResponse)
  })

  it('Should parse an error responses.', async () => {
    api.onAny().reply(400, { errors: [] })

    let error = await catchPromise(api._makeCallBuilder().get())
    expect(error).to.be.an.instanceOf(ApiErrors)
  })

  it('Should bypass non-API errors.', async () => {
    api.onAny().timeout()

    let error = await catchPromise(api._makeCallBuilder().get())
    expect(error).not.to.be.an.instanceOf(ApiErrors)
  })

  it('Should convert request body to snake case.', async () => {
    api.onAny().reply((config) => {
      expect(config.data).to.equal('{"foo_bar":"barFoo"}')
      return [200, responseBody]
    })

    await api._makeCallBuilder().post({ fooBar: 'barFoo' })
  })

  it('Should convert query params to snake case.', async () => {
    api.onAny('/', { params: { 'foo_bar': 'barFoo' } })
      .reply(200, responseBody)

    await api._makeCallBuilder().get({ fooBar: 'barFoo' })
  })
})
