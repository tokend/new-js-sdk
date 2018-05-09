import sinon from 'sinon'
import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
import { toNumber } from 'lodash'
import mocks from './test_helpers/mock_factory'

import { CallBuilder } from './call_builder'

describe('CallBuilder', () => {
  let sandbox
  let wallet
  let axiosInstance = axios.create()
  let axiosMock = new AxiosMock(axiosInstance)
  let callBuilder

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    wallet = mocks.wallet()
    callBuilder = new CallBuilder(axiosInstance, wallet)
  })

  afterEach(() => {
    axiosMock.reset()
    sandbox.restore()
  })

  describe('.constructor', () => {
    it('Should create a call builder instance', () => {
      expectNoThrow(() => new CallBuilder(axiosInstance))
    })

    it('Should throw if no axios instance provided', () => {
      expectThrow(() => new CallBuilder())
    })
  })

  const contact = { id: 1, name: 'John Smith' }

  describe('.appendUrlSegment', () => {
    it('Should append a number to the request URL.', () => {
      const contactId = 3432423

      axiosMock
        .onGet(`/contacts/${contactId}`)
        .reply(200, contact)

      return callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contactId)
        .get()
    })

    it('Should append a simple string to the request URL.', () => {
      const contactId = 'foo'

      axiosMock
        .onGet(`/contacts/${contactId}`)
        .reply(200, contact)

      return callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contactId)
        .get()
    })

    it('Should append a complex URL segment to the request URL.', () => {
      const subPath = '/foo/bar'

      axiosMock
        .onGet(`/contacts/foo/bar`)
        .reply(200, contact)

      return callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(subPath)
        .get()
    })

    it('Should throw if the provided segment is not a string or a number.', () => {
      expectThrow(() => callBuilder.appendUrlSegment({ foo: 'bar' }))
    })
  })

  describe('.withSignature', () => {
    it('Should require request signature if a default wallet is present.', () => {
      expectNoThrow(() => callBuilder.withSignature())
    })

    it('Should sign a request.', async () => {
      const timestamp = Date.UTC(2018, 3, 4) / 1000
      sandbox.useFakeTimers(timestamp * 1000)

      axiosMock.onAny()
        .reply(config => {
          expect(config.headers)
            .to.have.a.property('X-AuthPublicKey')
            .equal(wallet.accountId)
          expect(config.headers)
            .to.have.a.property('X-AuthSignature')
          expect(config.headers)
            .to.have.a.property('X-AuthValidUnTillTimestamp')
          expect(toNumber(config.headers['X-AuthValidUnTillTimestamp']))
            .to.be.above(timestamp)

          return [200, {}]
        })

      await callBuilder.withSignature().get()
    })

    it('Should use a wallet passed as an argument.', () => {
      let noAuthCallBuilder = new CallBuilder(axiosInstance)
      expectNoThrow(() => noAuthCallBuilder.withSignature(wallet))
    })

    it('Should throw if there is no wallet attached.', () => {
      let noAuthCallBuilder = new CallBuilder(axiosInstance)
      expectThrow(() => noAuthCallBuilder.withSignature())
    })
  })

  describe('.withTimeout', () => {
    const customTimeout = 1337

    it('Should set a custom request timeout.', async () => {
      axiosMock
        .onGet(`/`, { timeout: customTimeout })
        .reply(200, contact)

      await callBuilder
        .withTimeout(customTimeout)
        .get()
    })

    it('Should throw if the timeout is invalid.', () => {
      expectThrow(() => callBuilder.withTimeout('bitconneeeeect'))
    })
  })

  describe('.get', () => {
    const data = [contact]
    const queryParams = { name: 'Jo' }

    it('Should perform a GET request.', async () => {
      axiosMock
        .onGet(`/contacts`, { params: queryParams })
        .reply(200, data)

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .get(queryParams)

      expect(response).to.have.a.property('data').deep.equal(data)
    })
  })

  describe('.post', () => {
    it('Should perform a POST request.', async () => {
      axiosMock
        .onPost(`/contacts`)
        .reply(config => {
          expect(config.data).equal(JSON.stringify(contact))

          return [200, contact]
        })

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .post(contact)

      expect(response)
        .to.have.a.property('data')
        .deep.equal(contact)
    })
  })

  describe('.put', () => {
    it('Should perform a PUT request.', async () => {
      axiosMock
        .onPut(`/contacts/${contact.id}`)
        .reply(config => {
          expect(config.data).equal(JSON.stringify(contact))

          return [200, contact]
        })

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contact.id)
        .put(contact)

      expect(response)
        .to.have.a.property('data')
        .deep.equal(contact)
    })
  })

  describe('.patch', () => {
    it('Should perform a PUT request.', async () => {
      axiosMock
        .onPatch(`/contacts/${contact.id}`)
        .reply(config => {
          expect(config.data).equal(JSON.stringify(contact))

          return [200, contact]
        })

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contact.id)
        .patch(contact)

      expect(response)
        .to.have.a.property('data')
        .deep.equal(contact)
    })
  })

  describe('.delete', () => {
    it('Should perform a DELETE request.', async () => {
      axiosMock
        .onDelete(`/contacts/${contact.id}`)
        .reply(204)

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contact.id)
        .delete()

      expect(response).to.have.a.property('status').equal(204)
    })
  })
})
