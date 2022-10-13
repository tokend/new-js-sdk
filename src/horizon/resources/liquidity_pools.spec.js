import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('liquidity-pools', () => {
  const sdk = mocks.tokenDSdk()
  const resourceGroup = sdk.horizon.liquidityPools

  afterEach(() => {
    sdk.horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'
    const id = '1'

    testGetRequest({
      title: 'Should get liquidity pool by id',
      horizon: sdk.horizon,
      resourceGroup,
      args: [id],
      method: method,
      path: `/liquidity-pools/${id}`
    })
  })
})
