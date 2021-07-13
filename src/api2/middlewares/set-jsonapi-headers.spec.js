import { setJsonapiHeaders } from './set-jsonapi-headers'

describe('setJsonapiHeaders', () => {
  it('should set proper set of headers', () => {
    const headers = setJsonapiHeaders({ headers: {} })

    expect(headers).to.deep.equal({
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    })
  })
})
