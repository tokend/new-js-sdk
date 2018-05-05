import { Account } from './account'

describe('Account', () => {
  describe('.constructor', () => {
    it('fails to create Account object from an invalid address', () => {
      expectThrow(() => new Account('GBBB'))
    })

    it('creates an Account object', () => {
      let account = new Account('GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB')
      expect(account.accountId()).to.equal('GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB')
    })
  })
})
