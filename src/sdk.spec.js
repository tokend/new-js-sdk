import { HorizonServer } from './horizon'
import { ApiServer } from './api'
import { Wallet } from './wallet'
import { Network } from './base/network'
import mocks from './test_helpers/mock_factory'
import sinon from 'sinon'

import { Swarm } from './sdk'

describe('Swarm', () => {
  let sandbox
  let sdk
  const url = 'https://swarm.org/'
  const opts = { allowHttp: false }
  const wallet = mocks.wallet()

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    sdk = new Swarm(url, opts)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('.constructor', () => {
    it('Should make an SDK instance.', () => {
      let sdk = new Swarm(url, opts)

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

      sdk = await Swarm.create(url, opts)
    })

    it('Should create an SDK instance.', async () => {
      expect(sdk).to.be.an.instanceOf(Swarm)
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
      expectNoThrow(() => sdk.useWallet(wallet))
      expect(sdk).to.have.a.property('wallet').instanceOf(Wallet)
    })

    it('Should throw if an invalid wallet passed.', () => {
      expectThrow(() => sdk.useWallet(null))
    })
  })

  describe('.ejectWallet', () => {
    it('Should eject wallet.', () => {
      sdk.useWallet(wallet)
      expectNoThrow(() => sdk.ejectWallet())
      expect(sdk.wallet).to.be.null
    })
  })

  describe('.legacySignatures', () => {
    it('Should not use legacy signatures by default', () => {
      expect(sdk).to.have.a.property('legacySignatures').equal(false)
    })
  })
})
