import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('Public', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.public

  const operationId = '68719480833'

  afterEach(() => {
    horizon.reset()
  })

  describe('.getOperation', () => {
    const method = 'getOperation'

    testGetRequest({
      title: `get the public operation by ID`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [operationId],
      path: `/public/operations/${operationId}`
    })
  })

  describe('.getOperationsPage', () => {
    const method = 'getOperationsPage'

    const query = Object.freeze({
      order: 'asc',
      cursor: '242343242342',
      limit: 20
    })

    testGetRequest({
      title: `get all the public operations`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/public/operations`
    })
  })
})
