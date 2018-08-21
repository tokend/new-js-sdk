import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('key_value', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.keyValue
  const key = 'test12221312'

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get the key/value pair by key`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [key],
      path: `/key_value/${key}`
    })
  })

  describe('.getAll', () => {
    const method = 'getAll'

    testGetRequest({
      title: `get all the key/values`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/key_value`
    })
  })
})
