import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
import sinon from 'sinon'
import { Keypair } from '../base'

import { ApiCaller } from './api-caller'

describe('api-caller unit test', () => {
  let api
  let sandbox
  let axiosInstance = axios.create()
  let axiosMock = new AxiosMock(axiosInstance)

  let sampleEndpoint = '/foo/bar'

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    api = new ApiCaller({
      axiosInstance: axios,
      apiUrl: 'http://backend.com'
    })
  })

  afterEach(() => {
    axiosMock.reset()
    sandbox.restore()
  })

  describe('public API', () => {
    beforeEach(() => {
      sinon.stub(api, '_call')
      axiosMock.onGet(sampleEndpoint).reply(200)
    })

    describe('.get', () => {
      it('should execute the `.call()` with proper `GET` method param', async () => {
        await api.get(sampleEndpoint)
        expect(api._call).to.have.been.calledWith('GET')
      })
    })

    describe('.post', () => {
      it('should execute the `.call()` with proper `POST` method param', async () => {
        await api.post(sampleEndpoint)
        expect(api._call).to.have.been.calledWith('POST')
      })
    })

    describe('.put', () => {
      it('should execute the `.call()` with proper `PUT` method param', async () => {
        await api.put(sampleEndpoint)
        expect(api._call).to.have.been.calledWith('PUT')
      })
    })

    describe('.patch', () => {
      it('should execute the `.call()` with proper `PATCH` method param', async () => {
        await api.patch(sampleEndpoint)
        expect(api._call).to.have.been.calledWith('PATCH')
      })
    })
  })

  describe('._call', () => {
    beforeEach(() => {
      sinon.stub(api._axios)
    })

    it('should call ._marshalQuery() before sending the response', async () => {
      sinon.stub(api._marshalQuery)
      await api._call(sampleEndpoint)
      expect(api._marshalQuery).to.have.been.calledBefore(api._axios)
    })
    it('should call ._buildHeaders() before sending the response', async () => {
      sinon.stub(api._buildHeaders)
      await api._call(sampleEndpoint)
      expect(api._buildHeaders).to.have.been.calledBefore(api._axios)
    })
    it('should call ._unmarshalResponse() after getting the response', async () => {
      sinon.stub(api._unmarshalResponse)
      await api._call(sampleEndpoint)
      expect(api._unmarshalResponse).to.have.been.calledAfter(api._axios)
    })
    it('should call .axios() with provided param', async () => {
      await api._call(sampleEndpoint, 'GET')
      expect(api._axios.args[0]).to.have.a.property('method').equal('GET')
    })
  })

  describe('_buildHeaders', () => {
    describe('`signature` header', () => {
      it('should have a valid signature field if keypair is found', () => {
        api._keypair = Keypair.fromSecret('SBHFWJ3OBQM2WM5M763GLGYOPGMUT3OBJU4OWZ5CKDULDSKCVTJ36B3R')

        const headers = api._buildHeaders()

        expect(headers).to.have
          .property('signature')
          .equal('keyId="GDWYJPD6H5GDT2KKNFJ4D2LDSAMU5ENXPOUDCWU7VGPLMMRB7BJ4SR6M",algorithm="ed25519-sha256",headers="(request-target)",signature="OhOfLyXQzt5ejT4sdGTQxsXSQ0X4YJwD4UaHlQPqTarZYqB79srecuOCm15bv6jXbWbI7jJYWhdgLzw4qprMCQ=="')
      })
      it('should not have a signature method if no keypair found', () => {
        api._keypair = null

        const headers = api._buildHeaders()

        expect(headers).to.not.have.property('signature')
      })
    })

    it('should have a valid `accept` header', () => {
      const headers = api._buildHeaders()
      expect(headers).to.have.property('Accept').equal('application/vnd.api+json')
    })
    it('should have a valid `content-type` header', () => {
      const headers = api._buildHeaders()
      expect(headers).to.have.property('Content-Type').equal('application/vnd.api+json')
    })
  })

  describe('_marshalQuery', () => {
    it('should properly marshal primitives passed to query params', () => {
      const query = {
        foo: 'bar',
        abc: 123
      }
      const result = api._marshalQuery(query)

      expect(result).to.equal('foo=bar&abc=123')
    })
    it('should properly marshal query param passed as an flat array', () => {
      const query = {
        foo: ['fizz', 'buzz', 'bar'],
        abc: [123, 'qq', 'test']
      }
      const result = api._marshalQuery(query)

      expect(result).to.equal('foo=fizz,buzz,bar&abc=123,qq,test')
    })
    it('should properly marshal query param passed as an flat object', () => {
      const query = {
        filter: {
          foo: 'bar',
          fizz: 'buz'
        },
        page: {
          limit: 20,
          number: 3
        }
      }
      const result = api._marshalQuery(query)

      expect(result).to.equal(
        'filter[foo]=bar&filter[fizz]=buz&page[limit]=20&page[number]=3'
      )
    })
    it('should throw an error when nested array provided', () => {
      const query = {
        foo: ['fizz', ['buzz', 'bar']]
      }

      expectThrow(api._marshalQuery(query))
    })
    it('should throw an error when nested object provided', () => {
      const query = {
        foo: {
          bar: {
            fizz: 'buzz'
          }
        }
      }

      expectThrow(api._marshalQuery(query))
    })
  })

  describe('_unmarshalResponse', () => {
    it('should properly deserialize the response data', () => {
      const rawResponse = {
        data: {
          type: 'articles',
          id: '1',
          attributes: {
            title: 'foo',
            text: 'bar'
          },
          relationships: {
            author: {
              data: {
                id: 1,
                type: 'authors'
              }
            }
          }
        },
        included: [{
          id: 1,
          type: 'authors',
          attributes: {
            first_name: 'John',
            last_name: 'Doe',
            age: 45
          }
        }]
      }

      const result = api._unmarshalResponse(rawResponse)

      expect(result).to.have.property('data').deep.equal({
        resourceId: '1',
        resourceType: 'authors',
        title: 'foo',
        text: 'bar',
        author: {
          firstName: 'John',
          lastName: 'Doe',
          age: 45
        }
      })
    })
  })
})

// TODO: open questions
// 1. how to define if we need to sign the request
// 2. how to save the passphrase
// 3. how to force using horizon timestamp
// 4. what to do with the next link
// 5. should we handle relationship links (backend doesn't support it for now)
// 6. trusted and flexible library to deserialize the jsonAPI response
