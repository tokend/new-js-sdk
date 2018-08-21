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
  const orderBookId = '12'

  afterEach(() => {
    horizon.reset()
  })

  describe('.getPage', () => {
    const method = 'getPage'

    const query = Object.freeze({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
      order_book_id: orderBookId,
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
