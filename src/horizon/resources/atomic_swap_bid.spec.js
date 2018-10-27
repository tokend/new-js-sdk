import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('AtomicSwapBid', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.atomicSwapBid
  const accountId = sdk.wallet.accountId
  const owner = 'GCTCU6ZGTOFWPBKPSC56B6HHNFCRERPDOIBDQSAEX4JRPPZQOY33VUAV'
  const baseAsset = 'CCF'
  const bidId = '19'

  afterEach(() => {
    horizon.reset()
  })

  describe('.getBids', () => {
    const method = 'getBids'

    testGetRequest({
      title: `get the bids`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [owner, baseAsset],
      path: `atomic_swap_bids?owner_id=${owner}&base_asset=${baseAsset}`
    })
  })

  describe('.getBid', () => {
    const method = 'getBid'

    testGetRequest({
      title: `get the bid`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [bidId],
      path: `atomic_swap_bids/${bidId}`
    })
  })

  describe('.getSwapRequests', () => {
    const method = 'getSwapRequests'

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      params: accountId,
      args: [accountId],
      path: `atomic_swap_bids?requestor=${accountId}`
    })
  })
})
