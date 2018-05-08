import { HorizonServer } from './horizon'
import { ApiServer } from './api'
import { Wallet } from './wallet'
import { Network } from './base/network'
import mocks from './test_helpers/mock_factory'
import sinon from 'sinon'

import { TokenD } from './tokend_sdk'

describe('TokenD', () => {
  let sandbox
  let sdk
  const url = 'https://tokend.org/'
  const opts = { allowHttp: false }

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    sdk = new TokenD({ url, opts })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.constructor', () => {
    it('Should make an SDK instance.', () => {
      let sdk = new TokenD({ url, opts })

      expect(sdk).to.have.a.property('api').instanceOf(ApiServer)
      expect(sdk).to.have.a.property('horizon').instanceOf(HorizonServer)
    })

    it('Should use custom network passphrase.', () => {
      const customNetworkPassphrase = 'My network'
      sandbox.stub(Network, 'use')

      sdk = new TokenD({
        url,
        opts,
        networkPassphrase: customNetworkPassphrase
      })

      expect(Network.use).calledWith(customNetworkPassphrase)
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
