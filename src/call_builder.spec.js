import sinon from 'sinon'
import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
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

    it('Should use a wallet passed as an argument.', () => {
      let noAuthCallBuilder = new CallBuilder(axiosInstance)
      expectNoThrow(() => noAuthCallBuilder.withSignature(wallet))
    })

    it('Should throw if there is no wallet attached.', () => {
      let noAuthCallBuilder = new CallBuilder(axiosInstance)
      expectThrow(() => noAuthCallBuilder.withSignature())
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

    makeAuthTestCase(
      '/contacts',
      (config) => {
        config = Object.assign(config, { params: queryParams })
        return axiosMock
          .onGet(`/contacts`, config)
          .reply(200, data)
      },
      () => {
        return callBuilder
          .appendUrlSegment('contacts')
          .withSignature()
          .get(queryParams)
      }
    )
  })

  describe('.post', () => {
    it('Should perform a POST request.', async () => {
      axiosMock
        .onPost(`/contacts`, { data: contact })
        .reply(200, contact)

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .post(contact)

      expect(response)
        .to.have.a.property('data')
        .deep.equal(contact)
    })

    makeAuthTestCase(
      '/contacts',
      (config) => {
        config = Object.assign(config, { data: contact })
        return axiosMock
          .onPost(`/contacts`, config)
          .reply(200, contact)
      },
      () => {
        return callBuilder
          .appendUrlSegment('contacts')
          .withSignature()
          .post(contact)
      }
    )
  })

  describe('.put', () => {
    it('Should perform a PUT request.', async () => {
      axiosMock
        .onPut(`/contacts/${contact.id}`, { data: contact })
        .reply(200, contact)

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contact.id)
        .put(contact)

      expect(response)
        .to.have.a.property('data')
        .deep.equal(contact)
    })

    makeAuthTestCase(
      `/contacts/${contact.id}`,
      (config) => {
        config = Object.assign(config, { data: contact })
        return axiosMock
          .onPut(`/contacts/${contact.id}`, config)
          .reply(200, contact)
      },
      () => {
        return callBuilder
          .appendUrlSegment('contacts')
          .appendUrlSegment(contact.id)
          .withSignature()
          .put(contact)
      }
    )
  })

  describe('.patch', () => {
    it('Should perform a PUT request.', async () => {
      axiosMock
        .onPatch(`/contacts/${contact.id}`, { data: contact })
        .reply(200, contact)

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contact.id)
        .patch(contact)

      expect(response)
        .to.have.a.property('data')
        .deep.equal(contact)
    })

    makeAuthTestCase(
      `/contacts/${contact.id}`,
      (config) => {
        config = Object.assign(config, { data: contact })
        return axiosMock
          .onPatch(`/contacts/${contact.id}`, config)
          .reply(200, contact)
      },
      () => {
        return callBuilder
          .appendUrlSegment('contacts')
          .appendUrlSegment(contact.id)
          .withSignature()
          .patch(contact)
      }
    )
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

    makeAuthTestCase(
      `/contacts/${contact.id}`,
      (config) => {
        config = Object.assign(config, { data: contact })
        return axiosMock
          .onDelete(`/contacts/${contact.id}`, config)
          .reply(204)
      },
      () => {
        return callBuilder
          .appendUrlSegment('contacts')
          .appendUrlSegment(contact.id)
          .withSignature()
          .delete()
      }
    )
  })

  function makeAuthTestCase (url, makeBackendMock, makeCall) {
    it('Should authorize request if required.', async () => {
      let authHeaders = { 'X-AuthSignature': 'SIGNATURE' }
      sandbox.stub(wallet, 'signRequest')
        .withArgs(url)
        .returns({ headers: authHeaders })
      makeBackendMock({ headers: authHeaders })

      await makeCall()
      expect(wallet.signRequest).to.be.calledOnce
    })
  }
})
