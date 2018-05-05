import mocks from '../../test_helpers/mock-factory'
import { toCamelCaseDeep } from '../../utils/case_converter'

describe('Balances', () => {
  let horizon

  const asset = 'USD'
  const account = 'GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB'

  beforeEach(() => {
    horizon = mocks.horizon()
  })

  afterEach(() => {
    horizon.reset()
  })

  describe('.getPage', () => {
    const order = 'asc'
    const cursor = '242343242342'
    const limit = 20

    const balances = [
      {
        balance_id: 'BC6G4WOCVGKVSZX7PXPGYNQHNGMXWPLJC2V42TNJBM3UKZWH2GA6LECE',
        account_id: 'GDIRVFMGEVQQ4IOEW2EHS2PFQQ6264HNJM5JRIYZRNXP4B62AM6OO47C',
        asset: 'ETH'
      }
    ]

    it('Should get a page of balances w/ query params.', async () => {
      horizon
        .onGet(
          '/balances',
          { params: { asset, account, order, cursor, limit } }
        )
        .reply((config) => {
          if (!config.authorized) {
            return [401]
          }

          return [200, { _embedded: { records: balances } }]
        })

      let response = await horizon
        .balances
        .getPage({ asset, account, order, cursor, limit })

      expect(response)
        .to.have.property('data')
        .deep.equal(toCamelCaseDeep(balances))
    })

    it('Should get a page of balances w/o query params', async () => {
      horizon
        .onGet('/balances')
        .reply((config) => {
          if (!config.authorized) {
            return [401]
          }

          return [200, { _embedded: { records: balances } }]
        })

      let response = await horizon
        .balances
        .getPage()

      expect(response)
        .to.have.property('data')
        .deep.equal(toCamelCaseDeep(balances))
    })
  })

  describe('.getAsset', () => {
    const balanceId = '432423423432'

    it('Should get balance asset.', async () => {
      horizon
        .onGet(`/balances/${balanceId}/asset`)
        .reply((config) => {
          if (!config.authorized) {
            return [401]
          }

          return [200, {}]
        })

      let response = await horizon
        .balances
        .getAsset(balanceId)

      expect(response).to.have.a.property('status').equal(200)
    })
  })

  describe('.getBalanceAccount', () => {
    const balanceId = '432423423432'

    it('Should get balance asset.', async () => {
      horizon
        .onGet(`/balances/${balanceId}/account`)
        .reply((config) => {
          if (!config.authorized) {
            return [401]
          }

          return [200, {}]
        })

      let response = await horizon
        .balances
        .getAccount(balanceId)

      expect(response).to.have.a.property('status').equal(200)
    })
  })
})
