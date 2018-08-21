import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('Prices', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.prices

  const baseAsset = 'ETH'
  const quoteAsset = 'BTC'

  afterEach(() => {
    horizon.reset()
  })

  describe('.getHistory', () => {
    const method = 'getHistory'

    const query = Object.freeze({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
      order: 'desc',
      limit: 20
    })

    testGetRequest({
      title: `get the price history`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      params: query,
      path: `/prices/history`
    })
  })
})
