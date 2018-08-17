import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('fees', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.fees
  const feeType = 1

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get fees by type`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [feeType],
      path: `/fees/${feeType}`
    })
  })

  describe('.getAll', () => {
    const method = 'getAll'

    testGetRequest({
      title: `get all the fees`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/fees`
    })
  })

  describe('.getOverview', () => {
    const method = 'getOverview'

    testGetRequest({
      title: `get fees overview`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/fees_overview`
    })
  })
})
