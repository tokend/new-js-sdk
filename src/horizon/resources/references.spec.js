import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('references', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.references

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'
    const reference = 'qeqwrwewerqewrqwer'

    testGetRequest({
      title: `get the references`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [reference],
      path: `/references/${reference}`
    })
  })

  describe('.getAll', () => {
    const method = 'getAll'

    testGetRequest({
      title: `get all the references`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/references`
    })
  })
})
