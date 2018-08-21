import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('Charts', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.charts
  const assetCode = 'BTC'

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get the chart by asset code`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [assetCode],
      path: `/charts/${assetCode}`
    })
  })
})
