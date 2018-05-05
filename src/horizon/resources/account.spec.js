import mocks from '../../test_helpers/mock-factory'
import { HorizonResponse } from '../response'

describe('Account', () => {
  let horizon = mocks.horizon()
  let usersAccount = horizon.wallet.accountId
  let anotherAccount = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB'

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    makeGetRequestTestCase({
      title: `get the user's account`,
      method,
      args: [],
      path: `/accounts/${usersAccount}`
    })

    makeGetRequestTestCase({
      title: `get another account`,
      method,
      args: [anotherAccount],
      path: `/accounts/${anotherAccount}`
    })

    makeRequestSignatureTestCase({
      method,
      args: [],
      path: `/accounts/${usersAccount}`
    })
  })

  describe('.getBalances', () => {
    const method = 'getBalances'
    const query = { limit: 10 }

    makeGetRequestTestCase({
      title: `get the user's balances`,
      method,
      params: query,
      args: [query],
      path: `/accounts/${usersAccount}/balances`
    })

    makeGetRequestTestCase({
      title: `get another user's balances`,
      method,
      params: query,
      args: [query, anotherAccount],
      path: `/accounts/${anotherAccount}/balances`
    })

    makeRequestSignatureTestCase({
      method,
      params: query,
      args: [query],
      path: `/accounts/${anotherAccount}/balances`
    })
  })

  describe('.getDetails', () => {
    const method = 'getDetails'

    makeGetRequestTestCase({
      title: `get the user's account details`,
      method,
      args: [],
      path: `/accounts/${usersAccount}/balances/details`
    })

    makeGetRequestTestCase({
      title: `get another account details`,
      method,
      args: [anotherAccount],
      path: `/accounts/${anotherAccount}/balances/details`
    })

    makeRequestSignatureTestCase({
      method,
      args: [],
      path: `/accounts/${usersAccount}/balances/details`
    })
  })

  describe('.getReferrals', () => {
    const method = 'getReferrals'
    const query = {
      limit: 10
    }

    makeGetRequestTestCase({
      title: `get the user's referrals`,
      method,
      params: query,
      args: [query],
      path: `/accounts/${usersAccount}/referrals`
    })

    makeGetRequestTestCase({
      title: `get another user's referrals`,
      method,
      params: query,
      args: [query, anotherAccount],
      path: `/accounts/${anotherAccount}/referrals`
    })

    makeRequestSignatureTestCase({
      method,
      params: query,
      args: [query],
      path: `/accounts/${anotherAccount}/referrals`
    })
  })

  describe('.getSigners', () => {
    const method = 'getSigners'

    makeGetRequestTestCase({
      title: `get the user's signers`,
      method,
      args: [],
      path: `/accounts/${usersAccount}/signers`
    })

    makeGetRequestTestCase({
      title: `get another user's signers`,
      method,
      args: [anotherAccount],
      path: `/accounts/${anotherAccount}/signers`
    })
  })

  describe('.getSigner', () => {
    const signerId = 'GCJXUHPVJHSHCOHRCS65MOZMT2AJRRHHVH2KJM2GXR6GTF4U5O4P7BJO'
    const method = 'getSigner'

    makeGetRequestTestCase({
      title: `get the user's signer`,
      method,
      args: [signerId],
      path: `/accounts/${usersAccount}/signers/${signerId}`
    })

    makeGetRequestTestCase({
      title: `get another user's signer`,
      method,
      args: [signerId, anotherAccount],
      path: `/accounts/${anotherAccount}/signers/${signerId}`
    })
  })

  describe('.getSummary', () => {
    const method = 'getSummary'
    const query = {
      from: '2018-01-01',
      to: '2018-05-01'
    }

    makeGetRequestTestCase({
      title: `get the user's summary`,
      method,
      params: query,
      args: [query],
      path: `/accounts/${usersAccount}/summary`
    })

    makeGetRequestTestCase({
      title: `get another user's summary`,
      method,
      params: query,
      args: [query, anotherAccount],
      path: `/accounts/${anotherAccount}/summary`
    })

    makeRequestSignatureTestCase({
      method,
      params: query,
      args: [query],
      path: `/accounts/${anotherAccount}/summary`
    })
  })

  function makeGetRequestTestCase ({ title, method, args, path, params }) {
    it(`Should ${title}.`, async () => {
      horizon
        .onGet(path, { params })
        .reply(200, horizon.makeGenericResponse())
      let response = await horizon.account[method](...args)
      expect(response).to.be.an.instanceOf(HorizonResponse)
    })
  }

  function makeRequestSignatureTestCase ({ method, args, path }) {
    it(`Should sign the request.`, async () => {
      horizon
        .onGet(path)
        .reply((config) => {
          if (!config.authorized) {
            return [401]
          }
          return [200, horizon.makeGenericResponse()]
        })
      let response = await horizon.account[method](...args)
      expect(response).to.be.an.instanceOf(HorizonResponse)
    })
  }
})
