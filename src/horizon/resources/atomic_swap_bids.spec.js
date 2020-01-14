import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('AtomicSwapAsk', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.atomicSwapBid
  const bidId = '19'

  afterEach(() => {
    horizon.reset()
  })

  describe('.getPage', () => {
    const method = 'getPage'
    const query = {
      owner: 'GCTCU6ZGTOFWPBKPSC56B6HHNFCRERPDOIBDQSAEX4JRPPZQOY33VUAV',
      baseAsset: 'CCF'
    }

    testGetRequest({
      title: `get the bids`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/atomic_swap_bids`
    })
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get the bid`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [bidId],
      path: `/atomic_swap_bids/${bidId}`
    })
  })
})
