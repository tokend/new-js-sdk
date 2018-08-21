import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('Sales', () => {
  const sdk = mocks.tokenDSdk()
  const resourceGroup = sdk.horizon.sales

  afterEach(() => {
    sdk.horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'
    const id = '10'

    testGetRequest({
      title: `Should get sale by id.`,
      horizon: sdk.horizon,
      resourceGroup,
      args: [id],
      method,
      path: `/sales/${id}`
    })
  })

  describe('.getPage', () => {
    const method = 'getPage'

    testGetRequest({
      title: `Should get assets requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [],
      path: `/sales`
    })
  })
})
