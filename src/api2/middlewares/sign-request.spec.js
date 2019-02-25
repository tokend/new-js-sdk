import { signRequest } from './sign-request'
import { Keypair } from '../../base'

describe('signRequest', () => {
  it('should properly sign the request', () => {
    const signerKp = Keypair.fromSecret('SANRZWBGCH6L6PPVW5KFHCETRMP6N3NJJD7F2FS54HTCXHVVXMB4BP2F')
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

    const result = signRequest(requestConfig, signerKp)

    expect(result.headers).to.have.property('signature').deep.equal(
      `keyId="GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB",algorithm="ed25519-sha256",headers="(request-target)",signature="p4Dc3rOLvjltcor8MmdpXu7/6s9VDxq+4ONbI+iIrRyo8B6WYwvSx4YAsfzI5Hk4eb56zkxyXdWCONNp273YBQ=="`
    )
  })
})
