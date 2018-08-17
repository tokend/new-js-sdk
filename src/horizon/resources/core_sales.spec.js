import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('core_sales', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.coreSales

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get the core sales`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/core_sales`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      path: `/core_sales`
    })
  })
})
