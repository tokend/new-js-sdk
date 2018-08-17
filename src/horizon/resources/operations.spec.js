import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('operations', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.operations

  const operationId = '68719480833'

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get the operation by ID`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [operationId],
      path: `/operations/${operationId}`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      args: [operationId],
      path: `/operations/${operationId}`
    })
  })

  describe('.getAll', () => {
    const method = 'getAll'

    const query = Object.freeze({
      order: 'asc',
      cursor: '242343242342',
      limit: 20
    })

    testGetRequest({
      title: `get all the operations`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/operations`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      params: query,
      args: [query],
      path: `/operations`
    })
  })
})
