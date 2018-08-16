import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('Assets', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.assets
  const assetCode = 'BTC'

  afterEach(() => {
    horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get the asset by code`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [assetCode],
      path: `/assets/${assetCode}`
    })
  })

  describe('.getAll', () => {
    const method = 'getAll'

    testGetRequest({
      title: `get all existing assets`,
      horizon: horizon,
      resourceGroup,
      method,
      path: `/assets`
    })
  })

  describe('.getHolders', () => {
    const method = 'getHolders'

    testGetRequest({
      title: `get the asset holders`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [assetCode],
      path: `/assets/${assetCode}/holders`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      args: [assetCode],
      path: `/assets/${assetCode}/holders`
    })
  })
})
