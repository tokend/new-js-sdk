import mocks from '../../test_helpers/mock_factory'
import {
  testGetRequest
} from './generic_test_cases.spec'

describe('trusts', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.trusts
  const balanceId = 'BAEUBIHPHVI6X3PDC7HSIHVN5OUB7UU3AVTOGUOZHCRVUGPORPIIHS44'

  afterEach(() => {
    horizon.reset()
  })

  describe('.getAll', () => {
    const method = 'getAll'

    testGetRequest({
      title: `get the trusts`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [balanceId],
      path: `/trusts/${balanceId}`
    })
  })
})
