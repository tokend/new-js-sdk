import { Api } from './server'
import { ApiResponse } from './response'
import AxiosMock from 'axios-mock-adapter'
import { ApiErrors } from './errors'

describe('Api', () => {
  let api
  let axiosMock

  beforeEach(() => {
    api = new Api('https://api.distlab.com')
    axiosMock = new AxiosMock(api._axios)
  })

  afterEach(() => {
    axiosMock.restore()
  })

  const responseBody = Object.freeze({
    data: {
      id: '1',
      type: 'contacts'
    }
  })

  it('Should parse responses.', async () => {
    axiosMock.onGet().reply(200, responseBody)

    let response = await api._makeCallBuilder().get()
    expect(response).to.be.an.instanceOf(ApiResponse)
  })

  it('Should parse an error responses.', async () => {
    axiosMock.onAny().reply(400, { errors: [] })

    let error = await catchPromise(api._makeCallBuilder().get())
    expect(error).to.be.an.instanceOf(ApiErrors)
  })

  it('Should bypass non-API errors.', async () => {
    axiosMock.onAny().timeout()

    let error = await catchPromise(api._makeCallBuilder().get())
    expect(error).not.to.be.an.instanceOf(ApiErrors)
  })

  it('Should convert request body to snake case.', async () => {
    axiosMock.onAny().reply((config) => {
      expect(config.data).to.equal('{"data":{"foo_bar":"barFoo"}}')
      return [200, responseBody]
    })

    await api._makeCallBuilder().post({ fooBar: 'barFoo' })
  })

  it('Should convert query params to snake case.', async () => {
    axiosMock.onAny('/', { params: { 'foo_bar': 'barFoo' } })
      .reply(200, responseBody)

    await api._makeCallBuilder().get({ fooBar: 'barFoo' })
  })
})
