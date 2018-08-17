import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('v2', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.v2

  afterEach(() => {
    horizon.reset()
  })

  describe('.getAllTransactions', () => {
    const method = 'getAllTransactions'

    testGetRequest({
      title: `get the v2`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/v2/transactions`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      path: `/v2/transactions`
    })
  })
})
