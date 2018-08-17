import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('limits', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.limits
  const asset = 'BTC'
  const statsOpType = 1
  const accountId = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB'

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    const query = {
      stats_op_type: statsOpType,
      asset: asset,
      account_id: accountId,
      account_type: ''
    }

    testGetRequest({
      title: `get the limits`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/limits`
    })
  })
})
