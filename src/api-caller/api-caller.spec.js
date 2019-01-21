import AxiosMock from 'axios-mock-adapter'
import axios from 'axios'
import sinon from 'sinon'

import { Keypair } from '../base'
import { ApiCaller } from './api-caller'

describe('api-caller unit test', () => {
  let api
  let sandbox
  let axiosInstance = axios.create()
  let axiosMock = new AxiosMock(axiosInstance)

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
    let sampleEndpoint = '/foo/bar'
    let sampleQuery = {
      'fizz': 'buzz'
    }

    beforeEach(() => {
      sinon.stub(api, '_call')
      axiosMock.onGet(sampleEndpoint).reply(200)
    })

    describe('.get', () => {
      it('should execute the `.call()` with proper `GET` method param', async () => {
        await api.get(sampleEndpoint, sampleQuery)

        expect(api._call).to.have.been.calledWithExactly(
          sampleEndpoint,
          sampleQuery,
          'GET'
        )
      })
    })

    describe('.post', () => {
      it('should execute the `.call()` with proper `POST` method param', async () => {
        await api.post(sampleEndpoint, sampleQuery)

        expect(api._call).to.have.been.calledWithExactly(
          sampleEndpoint,
          sampleQuery,
          'POST'
        )
      })
    })

    describe('.put', () => {
      it('should execute the `.call()` with proper `PUT` method param', async () => {
        await api.put(sampleEndpoint, sampleQuery)

        expect(api._call).to.have.been.calledWithExactly(
          sampleEndpoint,
          sampleQuery,
          'PUT'
        )
      })
    })

    describe('.patch', () => {
      it('should execute the `.call()` with proper `PATCH` method param', async () => {
        await api.patch(sampleEndpoint, sampleQuery)

        expect(api._call).to.have.been.calledWithExactly(
          sampleEndpoint,
          sampleQuery,
          'PATCH'
        )
      })
    })
  })

  describe('._call method', () => {
    let sampleEndpoint = '/fizz/buzz'
    let sampleQuery = {
      'foo': 'bar'
    }

    it('should properly call the private methods', async () => {
      let sampleConfig = {
        test: 'test'
      }

      sinon.stub(api, '_axios')
      sinon.stub(api, '_getUrl').returns('http://backend.com')
      sinon.stub(api, '_marshalQuery').returns(sampleQuery)
      sinon.stub(api, '_getRequestConfig').returns(sampleConfig)
      sinon.stub(api, '_unmarshalResponse')

      await api._call(sampleEndpoint, sampleQuery, 'GET')

      expect(api._getUrl).to.have.been.calledBefore(api._axios)
      expect(api._marshalQuery).to.have.been.calledBefore(api._axios)
      expect(api._marshalQuery).to.have.been.calledWithExactly(sampleQuery)
      expect(api._getRequestConfig).to.have.been.calledBefore(api._axios)
      expect(api._getRequestConfig).to.have.been.calledWithExactly({
        url: 'http://backend.com',
        params: sampleQuery,
        method: 'GET'
      })
      expect(api._unmarshalResponse).to.have.been.calledAfter(api._axios)
      expect(api._axios).to.have.been.calledWithExactly({
        method: 'GET',
        params: sampleQuery,
        config: sampleConfig
      })
    })
  })

  describe('_getRequestConfig', () => {
    beforeEach(() => {
      sinon.stub(api, '_getSignature')
    })

    it('should set a valid `Accept` header', () => {
      const { headers } = api._getRequestConfig({})

      expect(headers).to.have.property('Accept').equal('application/vnd.api+json')
    })

    it('should set a valid `Content-Type` header', () => {
      const { headers } = api._getRequestConfig({})

      expect(headers).to.have.property('Content-Type').equal('application/vnd.api+json')
    })

    it('should call ._getSignature()', () => {
      api._getRequestConfig({})

      expect(api._getSignature).to.have.been.called
    })
  })

  describe('_getSignature', () => {
    it('should return a valid signature when keypair is present', () => {
      api._keypair = Keypair.fromSecret('SBHFWJ3OBQM2WM5M763GLGYOPGMUT3OBJU4OWZ5CKDULDSKCVTJ36B3R')

      const signature = api._getSignature({
        url: 'https://backend.com',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        },
        method: 'get',
        params: {}
      })

      expect(signature).to.equal(
        `keyId="GDWYJPD6H5GDT2KKNFJ4D2LDSAMU5ENXPOUDCWU7VGPLMMRB7BJ4SR6M",algorithm="ed25519-sha256",headers="(request-target)",signature="3vcNhiy16TZKGPCuLNw5iIs1XGO1rsMl5gaM5NatDgrJ5iam1H6m+K8A/xLqGyQQJkEfk9VFi047klt3d6fZCQ=="`
      )
    })

    it('should throw an error if keypair is not found', () => {
      api._keypair = null

      expect(api._getSignature.bind(api)).to.throw('Keypair not found')
    })
  })

  describe('_marshalQuery', () => {
    it('should do nothing with primitives passed to query params', () => {
      const query = {
        foo: 'bar',
        abc: 123
      }

      const result = api._marshalQuery(query)

      expect(result).to.deep.equal(query)
    })

    it('should properly marshal query param passed as an flat array', () => {
      const query = {
        foo: ['fizz', 'buzz', 'bar'],
        abc: [123, 'qq', 'test']
      }

      const result = api._marshalQuery(query)

      expect(result).to.deep.equal({
        foo: 'fizz,buzz,bar',
        abc: '123,qq,test'
      })
    })

    it('should properly marshal query param passed as an flat object', () => {
      const query = {
        filter: {
          fizz: 'buz',
          foo: 'bar'
        },
        page: {
          limit: 20,
          number: 3
        }
      }

      const result = api._marshalQuery(query)

      expect(result).to.deep.equal({
        'filter[fizz]': 'buz',
        'filter[foo]': 'bar',
        'page[number]': 3,
        'page[limit]': 20
      })
    })

    it('should throw an error when nested array provided', () => {
      const query = {
        foo: ['fizz', ['buzz', 'bar']]
      }

      expect(() => api._marshalQuery(query)).to.throw('Nested query params are not allowed')
    })

    it('should throw an error when nested object provided', () => {
      const query = {
        foo: {
          bar: {
            fizz: 'buzz'
          }
        }
      }

      expect(() => api._marshalQuery(query)).to.throw('Nested query params are not allowed')
    })
  })

  describe.skip('_unmarshalResponse', () => {
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
