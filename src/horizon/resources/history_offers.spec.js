import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('History offers', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.orderBook

  const baseAsset = 'ETH'
  const quoteAsset = 'BTC'
  const ownerId = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB'

  afterEach(() => {
    horizon.reset()
  })

  describe('.getAll', () => {
    const method = 'getAll'

    const query = Object.freeze({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
      owner_id: ownerId,
      order: 'desc',
      limit: 20
    })

    testGetRequest({
      title: `get history offers`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/history_offers`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      params: query,
      path: `/history_offers`
    })
  })
})
