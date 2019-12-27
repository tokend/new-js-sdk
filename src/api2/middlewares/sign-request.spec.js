import { signRequest } from './sign-request'
import { Keypair } from '../../base'

describe('signRequest', () => {
  it('should properly sign the request', () => {
    const signerKp = Keypair.fromSecret('SANRZWBGCH6L6PPVW5KFHCETRMP6N3NJJD7F2FS54HTCXHVVXMB4BP2F')
    const accountID = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB'
    const requestConfig = {
      baseURL: 'https://example.com',
      url: '/foo/bar',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      method: 'GET',
      params: {}
    }

    const result = signRequest(requestConfig, accountID, signerKp)

    expect(result.headers).to.have.property('signature').deep.equal(
      `keyId="GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB",algorithm="ed25519-sha256",headers="real-request-target account",signature="7cQYehhAAe/J9tGyCP3H46fE9QQQki1Q0W2f9TznEYgTpHvCykxuPVoCcUgiW+7EIwsmHJXrElKEIRP1S1nwBA=="`
    )
  })
})
