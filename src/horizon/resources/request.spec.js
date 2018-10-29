import mocks from '../../test_helpers/mock_factory'
import {
  testRequestSignature, testGetRequest
} from './generic_test_cases.spec'

describe('Requests', () => {
  const sdk = mocks.tokenDSdk()
  const account = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB'
  const anotherAccount = 'GDF7RAKSHWC5GKY2NRLYTZTBGFES5WX5Q6PRLX4VGH7X6TGLHLRPFIGD'
  const resourceGroup = sdk.horizon.request
  const query = Object.freeze({
    reviewer: account,
    requestor: anotherAccount,
    state: 2
  })

  const getPath = segment => `/request/${segment}`

  afterEach(() => {
    sdk.horizon.reset()
  })

  describe('.get', () => {
    const method = 'get'
    const id = '10'

    testGetRequest({
      title: `Should get request by id.`,
      horizon: sdk.horizon,
      resourceGroup,
      args: [id],
      method,
      path: `/requests/${id}`
    })
  })

  describe('.getAllForAssets', () => {
    const method = 'getAllForAssets'
    const segment = 'assets'

    testGetRequest({
      title: `Should get assets requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [ query ],
      params: query,
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: getPath(segment)
    })
  })

  describe('.getAllForPreissuances', () => {
    const method = 'getAllForPreissuances'
    const segment = 'preissuances'

    testGetRequest({
      title: `Should get preissuances requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [ query ],
      params: query,
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: getPath(segment)
    })
  })

  describe('.getAllForIssuances', () => {
    const method = 'getAllForIssuances'
    const segment = 'issuances'

    testGetRequest({
      title: `Should get issuances requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [ query ],
      params: query,
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: getPath(segment)
    })
  })

  describe('.getAllForWithdrawals', () => {
    const method = 'getAllForWithdrawals'
    const segment = 'withdrawals'

    testGetRequest({
      title: `get withdrawals requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [ query ],
      params: query,
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: getPath(segment)
    })
  })

  describe('.getAllForSales', () => {
    const method = 'getAllForSales'
    const segment = 'sales'

    testGetRequest({
      title: `get sales requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [ query ],
      params: query,
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: getPath(segment)
    })
  })

  describe('.getAllForLimitsUpdates', () => {
    const method = 'getAllForLimitsUpdates'
    const segment = 'limits_updates'

    testGetRequest({
      title: `get limits_updates requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [ query ],
      params: query,
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: getPath(segment)
    })
  })

  describe('.getAllForUpdateKyc', () => {
    const method = 'getAllForUpdateKyc'
    const segment = 'update_kyc'

    testGetRequest({
      title: `get update_kyc requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [ query ],
      params: query,
      path: getPath(segment)
    })

    testGetRequest({
      title: `get update_kyc requests without query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [],
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [],
      path: getPath(segment)
    })
  })

  describe('.getAllForUpdateSaleDetails', () => {
    const method = 'getAllForUpdateSaleDetails'
    const segment = 'update_sale_details'

    testGetRequest({
      title: `get update_sale_details requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [ query ],
      params: query,
      path: getPath(segment)
    })

    testGetRequest({
      title: `get update_sale_details requests without query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [],
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [],
      path: getPath(segment)
    })
  })

  describe('.getAllForUpdateSaleEndTime', () => {
    const method = 'getAllForUpdateSaleEndTime'
    const segment = 'update_sale_end_time'

    testGetRequest({
      title: `get update_sale_end_time requests with query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [ query ],
      params: query,
      path: getPath(segment)
    })

    testGetRequest({
      title: `get update_sale_end_time requests without query params.`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [],
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [query],
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      args: [],
      path: getPath(segment)
    })
  })

  describe('.getAllAtomicSwapBids', () => {
    const method = 'getAllAtomicSwapBids'
    const segment = 'atomic_swap_bids'

    testGetRequest({
      title: `get atomic_swap_bids requests`,
      horizon: sdk.horizon,
      resourceGroup,
      method,
      path: getPath(segment)
    })

    testRequestSignature({
      horizon: sdk.horizon,
      resourceGroup,
      method,
      path: getPath(segment)
    })
  })
})
