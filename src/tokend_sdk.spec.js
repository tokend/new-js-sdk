import { Horizon } from './horizon'
import { Api } from './api'
import { Wallet } from './wallet'
import mocks from './test_helpers/mock_factory'

import { TokenD } from './tokend_sdk'

describe('TokenD', () => {
  let sdk
  const url = 'https://tokend.org/'
  const opts = { allowHttp: false }

  beforeEach(() => {
    sdk = new TokenD(url, opts)
  })

  describe('.constructor', () => {
    it('Should make an SDK instance.', () => {
      let sdk = new TokenD(url, opts)

      expect(sdk).to.have.a.property('api').instanceOf(Api)
      expect(sdk).to.have.a.property('horizon').instanceOf(Horizon)
    })
  })

  describe('.useWallet', () => {
    it('Should use a wallet.', () => {
      let wallet = mocks.wallet()

      expectNoThrow(() => sdk.useWallet(wallet))
      expect(sdk).to.have.a.property('wallet').instanceOf(Wallet)
    })

    it('Should throw if an invalid wallet passed.', () => {
      expectThrow(() => sdk.useWallet(null))
    })
  })
})
