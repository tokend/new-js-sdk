import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('sale_antes', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.saleAntes

  afterEach(() => {
    horizon.reset()
  })

  describe('.getPage', () => {
    const method = 'getPage'

    testGetRequest({
      title: `get the sale antes`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/sale_antes`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      path: `/sale_antes`
    })
  })
})
