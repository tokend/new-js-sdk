import { ResponseBase } from './response_base'

describe('ResponseBase', () => {
  let response
  const rawResponse = Object.freeze({
    data: { foo: 'bar' },
    status: 200,
    headers: {
      'X-Foo': 'Bar'
    }
  })

  beforeEach(() => {
    response = new ResponseBase(rawResponse)
  })

  describe('.constructor', () => {
    it('Should wrap a raw axios.js response.', () => {
      expectNoThrow(() => new ResponseBase(rawResponse))
    })
  })

  describe('.data', () => {
    it('Should unwrap response data.', () => {
      expect(response)
        .to.have.a.property('data')
        .deep.equal(rawResponse.data)
    })
  })

  describe('.httpStatus', () => {
    it('Should expose response status.', () => {
      expect(response)
        .to.have.a.property('httpStatus')
        .deep.equal(rawResponse.status)
    })
  })

  describe('.headers', () => {
    it('Should expose response headers.', () => {
      expect(response)
        .to.have.a.property('headers')
        .deep.equal(rawResponse.headers)
    })
  })

  describe('.toJSON', () => {
    it('Should serialize only response body.', () => {
      expect(response).to.jsonEqual(rawResponse.data)
    })
  })
})
