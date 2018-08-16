import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('Asset pairs', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.assetPairs
  const baseAsset = 'BTC'
  const quoteAsset = 'ETH'
  const amount = '0.012'

  afterEach(() => {
    horizon.reset()
  })

  describe('.getAll', () => {
    const method = 'getAll'

    testGetRequest({
      title: `get all the asset pairs`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/asset_pairs`
    })
  })

  describe('.convert', () => {
    const method = 'convert'
    const query = {
      source_asset: baseAsset,
      dest_asset: quoteAsset,
      amount: amount
    }

    testGetRequest({
      title: `make request to convert amount`,
      horizon: horizon,
      resourceGroup,
      method,
      params: query,
      args: [query],
      path: `/asset_pairs/convert`
    })
  })
})
