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
    sdk = new TokenD(url, opts)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.constructor', () => {
    it('Should make an SDK instance.', () => {
      let sdk = new TokenD(url, opts)

      expect(sdk).to.have.a.property('api').instanceOf(ApiServer)
      expect(sdk).to.have.a.property('horizon').instanceOf(HorizonServer)
    })
  })

  describe('.create', () => {
    const networkPassphrase = 'Main Net'
    const serverTimestamp = 1525881668
    const clockDiff = 133700

    beforeEach(async () => {
      sandbox.useFakeTimers((serverTimestamp - clockDiff) * 1000)
      sandbox
        .stub(HorizonServer.prototype, 'getNetworkDetails')
        .returns(Promise.resolve({
          data: {
            networkPassphrase,
            currentTime: serverTimestamp
          }
        }))
      sandbox.stub(Network, 'use')

      sdk = await TokenD.create(url, opts)
    })

    it('Should create an SDK instance.', async () => {
      expect(sdk).to.be.an.instanceOf(TokenD)
    })

    it('Should sync network passphrase.', async () => {
      expect(Network.use).to.be.calledWith(new Network(networkPassphrase))
    })

    it('Should sync clock.', async () => {
      expect(sdk).to.have.a.property('clockDiff').equal(-clockDiff)
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
