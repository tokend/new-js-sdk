import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('Payments', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.payments

  afterEach(() => {
    horizon.reset()
  })

  describe('.getAll', () => {
    const method = 'getAll'

    const query = Object.freeze({
      order: 'asc',
      cursor: '242343242342',
      limit: 20
    })

    testGetRequest({
      title: `get all the payments`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/payments`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      params: query,
      args: [query],
      path: `/payments`
    })
  })
})
