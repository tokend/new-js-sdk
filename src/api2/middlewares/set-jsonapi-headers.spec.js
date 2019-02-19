import { setJsonapiHeaders } from './set-jsonapi-headers'

describe('setJsonapiHeaders', () => {
  it('should set proper set of headers', () => {
    const config = setJsonapiHeaders({ headers: {} })

    expect(config.headers).to.deep.equal({
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    })
  })
})
