import { cloneDeep } from 'lodash'
import mocks from '../test_helpers/mock_factory'
import { ApiResponse } from './response'

describe('ApiResponse', () => {
  const rawSingleItemResponse = Object.freeze({
    data: {
      type: 'articles',
      id: '1',
      attributes: {
        title: 'foo',
        text: 'bar'
      },
      relationships: {
        author: {
          links: {
            self: '/authors/1'
          },
          data: {
            id: 1,
            type: 'authors'
          }
        }
      }
    }
  })
  const rawCollectionResponse = Object.freeze({
    links: {
      self: '/articles?page=1',
      next: '/articles?page=2'
    },
    data: [
      {
        links: {
          self: { href: '/articles/1' }
        },
        type: 'articles',
        id: '1',
        attributes: {
          title: 'JSON API paints my bikeshed!'
        },
        relationships: {
          author: {
            links: {
              self: '/authors/1'
            },
            data: {
              id: 1,
              type: 'authors'
            }
          }
        }
      },
      {
        links: {
          self: '/articles/2'
        },
        type: 'articles',
        id: '2',
        attributes: {
          title: 'Rails is Omakase'
        },
        relationships: {
          author: {
            links: {
              self: '/authors/1'
            },
            data: {
              id: 1,
              type: 'authors'
            }
          }
        }
      }
    ]
  })

  let sdk = mocks.tokenDSdk()
  let singleItemResponse
  let collectionResponse

  beforeEach(() => {
    singleItemResponse = new ApiResponse(
      { data: cloneDeep(rawSingleItemResponse) },
      sdk
    )
    collectionResponse = new ApiResponse(
      { data: cloneDeep(rawCollectionResponse) },
      sdk
    )
  })

  afterEach(() => {
    sdk.api.reset()
  })

  describe('.constructor', () => {
    it('Should extract a single item response data.', () => {
      expect(singleItemResponse)
        .to.have.a.property('data')
        .jsonEqual({
          id: '1',
          resourceType: 'articles',
          title: 'foo',
          text: 'bar'
        })
    })

    it('Should extract a collection response data.', () => {
      expect(collectionResponse)
        .to.have.a.property('data')
        .jsonEqual([
          {
            id: '1',
            resourceType: 'articles',
            title: 'JSON API paints my bikeshed!',
            relationships: {
              author: {
                id: 1,
                resourceType: 'authors'
              }
            }
          },
          {
            id: '2',
            resourceType: 'articles',
            title: 'Rails is Omakase',
            relationships: {
              author: {
                id: 1,
                resourceType: 'authors'
              }
            }
          }
        ])
    })

    it('Should parse legacy document retrieval response.', () => {
      const rawLegacyResponse = Object.freeze({
        url: 'https://foo.bar/fdsfdsfdsfd'
      })

      let response = new ApiResponse({ data: rawLegacyResponse })
      expect(response)
        .to.have.a.property('data')
        .jsonEqual(rawLegacyResponse)
    })

    it('Should resolve root level links.', async () => {
      expect(collectionResponse)
        .to.have.a.property('fetchSelf').a('function')
      expect(collectionResponse)
        .to.have.a.property('fetchNext').a('function')

      const params = { page: '2' }
      sdk.api
        .onGet(`/articles`, { params })
        .reply(200, cloneDeep(rawCollectionResponse))

      let nextResponse = await collectionResponse.fetchNext()
      expect(nextResponse).to.be.an.instanceOf(ApiResponse)
    })

    it('Should resolve links in collection items.', async () => {
      expect(collectionResponse.data[0])
        .to.have.a.property('fetchSelf').a('function')

      sdk.api
        .onGet(`/articles/1`)
        .reply(200, cloneDeep(rawSingleItemResponse))

      let selfResponse = await collectionResponse.data[0].fetchSelf()
      expect(selfResponse).to.be.an.instanceOf(ApiResponse)
    })

    it('Should resolve root level relationships.', () => {
      expect(singleItemResponse.relationships)
        .to.have.a.property('author')
        .jsonEqual({
          id: 1,
          resourceType: 'authors'
        })
    })

    it('Should resolve relationships in the collection items.', async () => {
      expect(collectionResponse.data[0].relationships)
        .to.have.a.property('author')
        .jsonEqual({
          id: 1,
          resourceType: 'authors'
        })
    })

    it('Should resolve included relationships', () => {
      const rawResponse = cloneDeep(rawSingleItemResponse)
      rawResponse.included = [{
        id: 1,
        type: 'authors',
        attributes: {
          first_name: 'John',
          last_name: 'Doe',
          age: 45
        }
      }]
      const response = new ApiResponse({ data: rawResponse }, sdk)

      expect(response.relationships)
        .to.have.a.property('author')
        .jsonEqual({
          id: 1,
          resourceType: 'authors',
          attributes: {
            firstName: 'John',
            lastName: 'Doe',
            age: 45
          }
        })
    })

    it('Should resolve included relationships', () => {
      const rawResponse = cloneDeep(rawCollectionResponse)
      rawResponse.included = [{
        id: 1,
        type: 'authors',
        attributes: {
          first_name: 'John',
          last_name: 'Doe',
          age: 45
        }
      }]
      const response = new ApiResponse({ data: rawResponse }, sdk)

      expect(response.data[0].relationships)
        .to.have.a.property('author')
        .jsonEqual({
          id: 1,
          resourceType: 'authors',
          attributes: {
            firstName: 'John',
            lastName: 'Doe',
            age: 45
          }
        })
      expect(response.data[1].relationships)
        .to.have.a.property('author')
        .jsonEqual({
          id: 1,
          resourceType: 'authors',
          attributes: {
            firstName: 'John',
            lastName: 'Doe',
            age: 45
          }
        })
    })

    it('Should resolve relationship links', async () => {
      expect(singleItemResponse.relationships.author)
        .to.have.a.property('fetchSelf').a('function')

      sdk.api
        .onGet(`/authors/1`)
        .reply(200, cloneDeep(rawSingleItemResponse))

      let selfResponse = await singleItemResponse
        .relationships
        .author
        .fetchSelf()

      expect(selfResponse).to.be.an.instanceOf(ApiResponse)
    })

    it('Should sign link requests if a wallet is present.', async () => {
      sdk.api
        .onAny()
        .reply((config) => {
          if (!config.authorized) {
            return [401]
          }
          return [200, sdk.api.makeGenericResponse()]
        })

      let nextResponse = await collectionResponse.fetchNext()
      expect(nextResponse).to.be.an.instanceOf(ApiResponse)
    })

    it('Should perform link requests w/o signature if no wallet provided.', async () => {
      sdk.ejectWallet()

      sdk.api
        .onAny()
        .reply(200, sdk.api.makeGenericResponse())

      let nextResponse = await collectionResponse.fetchNext()
      expect(nextResponse).to.be.an.instanceOf(ApiResponse)
    })
  })

  it('Should parse 204(No Content)', () => {
    const noContentResponse = { status: 204, data: '' }
    expectNoThrow(() => new ApiResponse(noContentResponse, sdk.api))
  })
})
