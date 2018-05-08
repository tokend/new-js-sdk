import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('Balances', () => {
  const sdk = mocks.tokenDSdk()
  const asset = 'USD'
  const account = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB'
  const resourceGroup = sdk.horizon.balances

  afterEach(() => {
    sdk.horizon.reset()
  })

  describe('.getPage', () => {
    const method = 'getPage'
    const query = Object.freeze({
      order: 'asc',
      cursor: '242343242342',
      limit: 20,
      asset,
      account
    })

    testGetRequest({
      title: `Should get a page of balances.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      params: query,
      path: '/balances'
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/balances`
    })
  })

  describe('.getAsset', () => {
    const method = 'getAsset'
    const balanceId = '432423423432'

    testGetRequest({
      title: `Should get balance asset.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [balanceId],
      path: `/balances/${balanceId}/asset`
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [balanceId],
      path: `/balances/${balanceId}/asset`
    })
  })

  describe('.getAccount', () => {
    const method = 'getAccount'
    const balanceId = '432423423432'

    testGetRequest({
      title: `Should get balance asset.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [balanceId],
      path: `/balances/${balanceId}/account`
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [balanceId],
      path: `/balances/${balanceId}/account`
    })
  })
})
