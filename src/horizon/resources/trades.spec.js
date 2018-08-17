import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('Trades', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.trades

  const baseAsset = 'ETH'
  const quoteAsset = 'BTC'

  afterEach(() => {
    horizon.reset()
  })

  describe('.getAll', () => {
    const method = 'getAll'

    const query = Object.freeze({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
      order: 'desc',
      limit: 20
    })

    testGetRequest({
      title: `get the trade history`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/trades`
    })
  })
})
