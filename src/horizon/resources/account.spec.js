import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('Account', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.account
  const usersAccount = sdk.wallet.accountId
  const anotherAccount = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB'

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get the user's account`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}`
    })
  })

  describe('.getAccountKyc', () => {
    const method = 'getAccountKyc'

    testGetRequest({
      title: `get the user's kyc`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [usersAccount],
      path: `/accounts/${usersAccount}/account_kyc`
    })
  })

  describe('.getBalances', () => {
    const method = 'getBalances'

    testGetRequest({
      title: `get the user's balances`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}/balances`
    })

    testRequestSignature({
      method,
      horizon: horizon,
      resourceGroup,
      path: `/accounts/${anotherAccount}/balances`
    })
  })

  describe('.getDetails', () => {
    const method = 'getDetails'

    testGetRequest({
      title: `get the user's account details`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}/balances/details`
    })

    testRequestSignature({
      method,
      horizon: horizon,
      resourceGroup,
      path: `/accounts/${usersAccount}/balances/details`
    })
  })

  describe('.getLimits', () => {
    const method = 'getLimits'

    testGetRequest({
      title: `get the user's account limits`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}/limits`
    })
  })

  describe('.getOffers', () => {
    const method = 'getOffers'

    testGetRequest({
      title: `get the user's offers`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}/offers`
    })

    testRequestSignature({
      method,
      horizon: horizon,
      resourceGroup,
      path: `/accounts/${usersAccount}/offers`
    })
  })

  describe('.getOperations', () => {
    const method = 'getOperations'

    testGetRequest({
      title: `get the user's operations`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}/operations`
    })

    testRequestSignature({
      method,
      horizon: horizon,
      resourceGroup,
      path: `/accounts/${usersAccount}/operations`
    })
  })

  describe('.getPayments', () => {
    const method = 'getPayments'
    const query = {
      limit: 10
    }

    testGetRequest({
      title: `get the user's payments`,
      horizon: horizon,
      resourceGroup,
      method,
      params: query,
      args: [usersAccount, query],
      path: `/accounts/${usersAccount}/payments`
    })

    testRequestSignature({
      method,
      horizon: horizon,
      resourceGroup,
      params: query,
      args: [anotherAccount, query],
      path: `/accounts/${anotherAccount}/payments`
    })
  })

  describe('.getReferences', () => {
    const method = 'getReferences'

    testGetRequest({
      title: `get the user's references`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}/references`
    })

    testRequestSignature({
      method,
      horizon: horizon,
      resourceGroup,
      path: `/accounts/${usersAccount}/references`
    })
  })

  describe('.getSigners', () => {
    const method = 'getSigners'

    testGetRequest({
      title: `get the user's signers`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/accounts/${usersAccount}/signers`
    })
  })

  describe('.getSigner', () => {
    const signerId = 'GCJXUHPVJHSHCOHRCS65MOZMT2AJRRHHVH2KJM2GXR6GTF4U5O4P7BJO'
    const method = 'getSigner'

    testGetRequest({
      title: `get the user's signer`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [signerId],
      path: `/accounts/${usersAccount}/signers/${signerId}`
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
      horizon: horizon,
      resourceGroup,
      method,
      params: query,
      args: [query],
      path: `/accounts/${usersAccount}/summary`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      params: query,
      args: [query],
      path: `/accounts/${anotherAccount}/summary`
    })
  })
})
