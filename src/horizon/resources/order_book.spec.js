import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('Order book', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.orderBook

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
      title: `get the order_book`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/order_book`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      params: query,
      path: `/order_book`
    })
  })
})
