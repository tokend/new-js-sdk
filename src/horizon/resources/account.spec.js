import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('Account', () => {
  const horizon = mocks.horizon()
  const resourceGroup = horizon.account
  const usersAccount = horizon.wallet.accountId
  const anotherAccount = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB'

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get the user's account`,
      horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}`
    })

    testGetRequest({
      title: `get another account`,
      horizon,
      resourceGroup,
      method,
      args: [anotherAccount],
      path: `/accounts/${anotherAccount}`
    })

    testRequestSignature({
      horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}`
    })
  })

  describe('.getBalances', () => {
    const method = 'getBalances'
    const query = { limit: 10 }

    testGetRequest({
      title: `get the user's balances`,
      horizon,
      resourceGroup,
      method,
      params: query,
      args: [query],
      path: `/accounts/${usersAccount}/balances`
    })

    testGetRequest({
      title: `get another user's balances`,
      horizon,
      resourceGroup,
      method,
      params: query,
      args: [query, anotherAccount],
      path: `/accounts/${anotherAccount}/balances`
    })

    testRequestSignature({
      method,
      horizon,
      resourceGroup,
      params: query,
      args: [query],
      path: `/accounts/${anotherAccount}/balances`
    })
  })

  describe('.getDetails', () => {
    const method = 'getDetails'

    testGetRequest({
      title: `get the user's account details`,
      horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}/balances/details`
    })

    testGetRequest({
      title: `get another account details`,
      horizon,
      resourceGroup,
      method,
      args: [anotherAccount],
      path: `/accounts/${anotherAccount}/balances/details`
    })

    testRequestSignature({
      method,
      horizon,
      resourceGroup,
      path: `/accounts/${usersAccount}/balances/details`
    })
  })

  describe('.getReferrals', () => {
    const method = 'getReferrals'
    const query = {
      limit: 10
    }

    testGetRequest({
      title: `get the user's referrals`,
      horizon,
      resourceGroup,
      method,
      params: query,
      args: [query],
      path: `/accounts/${usersAccount}/referrals`
    })

    testGetRequest({
      title: `get another user's referrals`,
      horizon,
      resourceGroup,
      method,
      params: query,
      args: [query, anotherAccount],
      path: `/accounts/${anotherAccount}/referrals`
    })

    testRequestSignature({
      method,
      horizon,
      resourceGroup,
      params: query,
      args: [query],
      path: `/accounts/${anotherAccount}/referrals`
    })
  })

  describe('.getSigners', () => {
    const method = 'getSigners'

    testGetRequest({
      title: `get the user's signers`,
      horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}/signers`
    })

    testGetRequest({
      title: `get another user's signers`,
      horizon,
      resourceGroup,
      method,
      args: [anotherAccount],
      path: `/accounts/${anotherAccount}/signers`
    })
  })

  describe('.getSigner', () => {
    const signerId = 'GCJXUHPVJHSHCOHRCS65MOZMT2AJRRHHVH2KJM2GXR6GTF4U5O4P7BJO'
    const method = 'getSigner'

    testGetRequest({
      title: `get the user's signer`,
      horizon,
      resourceGroup,
      method,
      args: [signerId],
      path: `/accounts/${usersAccount}/signers/${signerId}`
    })

    testGetRequest({
      title: `get another user's signer`,
      horizon,
      resourceGroup,
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

    testGetRequest({
      title: `get the user's summary`,
      horizon,
      resourceGroup,
      method,
      params: query,
      args: [query],
      path: `/accounts/${usersAccount}/summary`
    })

    testGetRequest({
      title: `get another user's summary`,
      horizon,
      resourceGroup,
      method,
      params: query,
      args: [query, anotherAccount],
      path: `/accounts/${anotherAccount}/summary`
    })

    testRequestSignature({
      horizon,
      resourceGroup,
      method,
      params: query,
      args: [query],
      path: `/accounts/${anotherAccount}/summary`
    })
  })
})
