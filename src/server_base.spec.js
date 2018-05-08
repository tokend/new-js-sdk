import AxiosMock from 'axios-mock-adapter'
import { NetworkError, TimeoutError } from './errors'
import mocks from './test_helpers/mock_factory'

import { ServerBase } from './server_base'

describe('ServerBase', () => {
  let server
  let sdk = mocks.tokenDSdk()

  const url = 'https://fizz.buzz'

  beforeEach(() => {
    server = new ServerBase(sdk, url)
  })

  describe('.constructor', () => {
    it('Should create a ServerBase instance.', () => {
      expectNoThrow(() => new ServerBase(sdk, url))
    })

    it(`Should create an instance w/o HTTPS when it's enabled in the options`, () => {
      expectNoThrow(() => new ServerBase(sdk, url, { allowHttp: true }))
    })

    it(`Should throw when no SDK instance injected.`, () => {
      expectThrow(() => new ServerBase(null, url))
    })

    it(`Should throw when a URL w/o HTTPS is provided and unsafe connections are not enabled.`, () => {
      expectThrow(() => new ServerBase(sdk, url))
    })

    it('Should throw when no URL provided.', () => {
      expectThrow(() => new ServerBase(sdk))
    })

    it('Should throw when a corrupt URL is provided.', () => {
      expectThrow(() => new ServerBase(sdk, url))
    })
  })

  describe('.useRequestInterceptor', () => {
    it('Should use a request interceptor.', () => {
      let descriptor = server.useRequestInterceptor(
        () => 'success',
        () => 'error'
      )
      expect(descriptor).to.be.a('number')
    })
  })

  describe('.ejectRequestInterceptor', () => {
    it('Should use a request interceptor.', () => {
      let descriptor = server.useRequestInterceptor(() => {}, () => {})
      server.ejectRequestInterceptor(descriptor)
    })
  })

  describe('.useResponseInterceptor', () => {
    it('Should use a request interceptor.', () => {
      let descriptor = server.useResponseInterceptor(
        () => 'success',
        () => 'error'
      )
      expect(descriptor).to.be.a('number')
    })
  })

  describe('.ejectResponseInterceptor', () => {
    it('Should use a request interceptor.', () => {
      let descriptor = server.useResponseInterceptor(() => {}, () => {})
      server.ejectResponseInterceptor(descriptor)
    })
  })

  it('Should parse network errors.', async () => {
    let mock = new AxiosMock(server._axios)
    mock.onAny().networkError()

    let error = await catchPromise(server._makeCallBuilder().get())
    expect(error).to.be.an.instanceOf(NetworkError)
  })

  it('Should parse timeout errors', async () => {
    let mock = new AxiosMock(server._axios)
    mock.onAny().timeout()

    let error = await catchPromise(server._makeCallBuilder().get())
    expect(error).to.be.an.instanceOf(TimeoutError)
  })

  it('Should pass through other errors', async () => {
    let mock = new AxiosMock(server._axios)
    mock.onAny().reply(500)

    let error = await catchPromise(server._makeCallBuilder().get())
    expect(error.response).to.have.a.property('status').equal(500)
  })
})
