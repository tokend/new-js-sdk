import AxiosMock from 'axios-mock-adapter'
import { NetworkError, TimeoutError } from './errors'

import { ServerBase } from './server_base'

describe('ServerBase', () => {
  let server
  beforeEach(() => {
    server = new ServerBase('https://fizz.buzz')
  })

  describe('.constructor', () => {
    it('Should create a ServerBase instance.', () => {
      expectNoThrow(() => new ServerBase('https://tokend.org/horizon'))
    })

    it(`Should create an instance w/o HTTPS when it's enabled in the options`, () => {
      expectNoThrow(() => new ServerBase('http://fizz.buzz', { allowHttp: true }))
    })

    it(`Should throw when a URL w/o HTTPS is provided and unsafe connections are not enabled.`, () => {
      expectThrow(() => new ServerBase('http://fizz.buzz'))
    })

    it('Should throw when no URL provided.', () => {
      expectThrow(() => new ServerBase())
    })

    it('Should throw when a corrupt URL is provided.', () => {
      expectThrow(() => new ServerBase('fsdfsdfsd@4324242*(*(*(*('))
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
