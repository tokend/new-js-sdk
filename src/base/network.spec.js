
import { Network, Networks } from './network'

describe('Network', () => {
  describe('.current()', () => {
    it('defaults to the public network', () => {
      expect(Network.current().networkPassphrase()).to.equal(Networks.TESTNET)
    })
  })

  describe('.usePublicNetwork()', () => {
    beforeEach(() => {
      Network.useDefault()
    })

    it('switches to the public network', () => {
      Network.usePublicNetwork()
      expect(Network.current().networkPassphrase()).to.equal(Networks.PUBLIC)
    })
  })
})
