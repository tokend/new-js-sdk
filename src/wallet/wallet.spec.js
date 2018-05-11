import { Keypair } from '../base'

import { Wallet } from './wallet'

describe('Wallet', () => {
  const email = 'example@mail.com'
  const keypair = Keypair.fromSecret('SBRTPKBJIXEUIT37PZ5AN3HZRPRPF4EC7WK5LL55IZJHYKAJLA2I4KKX')
  const recoveryKeypair = Keypair.fromSecret('SD5L6H3TLEVEIDNKEUVRM3UYL6FLSTRO2LZGMKMMWAR7FSER42U2OWMG')
  const accountId = keypair.accountId()
  const walletId = 'fa4323ab43243234324234232442'
  const password = 'password'
  const salt = 'pUQVfhuX9o3dBz14yIiEVg=='
  const kdfParams = { bits: 256, n: 8, p: 1, r: 8 }

  let wallet

  beforeEach(() => {
    wallet = new Wallet(email, keypair, accountId, walletId)
  })

  describe('.constructor', () => {
    it('Should instantiate a wallet w/o a walletId.', () => {
      expectNoThrow(() => new Wallet(email, keypair, accountId))
    })

    it('Should instantiate a wallet w/ a walletId.', () => {
      expectNoThrow(() => new Wallet(email, keypair, accountId, walletId))
    })

    it('Should instantiate a wallet from secret seed.', () => {
      expectNoThrow(() => new Wallet(email, keypair.secret(), accountId))
    })

    it('Should throw if email is missing.', () => {
      expectThrow(() => new Wallet(undefined, keypair, accountId))
    })

    it('Should throw if an email is invalid.', () => {
      expectThrow(() => new Wallet(432423, keypair, accountId))
    })

    it('Should throw if keypair is missing.', () => {
      expectThrow(() => new Wallet(email, undefined, accountId))
    })

    it('Should throw if a key pair is invalid.', () => {
      expectThrow(() => new Wallet(email, 42323423, accountId))
    })

    it('Should throw if a secret seed is invalid.', () => {
      expectThrow(() => new Wallet(email, 'bad seed', accountId))
    })

    it('Should throw if the account ID is invalid.', () => {
      expectThrow(() => new Wallet(email, keypair, 432432))
    })

    it('Should throw if the wallet ID is invalid.', () => {
      expectThrow(() => new Wallet(email, keypair, accountId, 432432))
    })
  })

  describe('.generate', () => {
    it('Should generate a wallet.', () => {
      let generatedWallet = Wallet.generate(email)
      expect(generatedWallet).to.be.an.instanceOf(Wallet)
    })

    it('Should generate a wallet with custom account ID.', () => {
      let generatedWallet = Wallet.generate(email, accountId)
      expect(generatedWallet).to.have.a.property('accountId').equal(accountId)
    })
  })

  describe('.fromEncrypted', () => {
    it('Should decrypt a wallet.', () => {
      let encryptedKeychain = 'eyJJViI6IllLa1RKbGgyUE1nVjBxRWYiLCJjaXBoZXJUZXh0IjoidXhRRHN3NXoyeWdZMFo3VmVGTmYzTHI1N0JpMnpoV1FZZThtRVhyWlZtUnJnTGpPU01mQlBmZElEMWtGOVZaOStsaGNTZXBIaTJnbERsbFk1QjZRUndCRmMvR2VwRjcvUlVwZnRwRWRUNVN1ci9HOVQvUnJ1T0E5dk42NUoyWkppYnhjRXVuYVFRenFCYVFwOTNVZ0Z2T3lMVlg3T1NrbVQvdnNJUGxoVk5yN3U2VGNuR2lrbGlqaWVrdlk0ZEp2NmwrVWRHWmkyZGhOeWc9PSIsImNpcGhlck5hbWUiOiJhZXMiLCJtb2RlTmFtZSI6ImdjbSJ9'
      let decryptedWallet = Wallet.fromEncrypted(
        encryptedKeychain,
        kdfParams,
        salt,
        email,
        password
      )

      expect(decryptedWallet).to.be.an.instanceOf(Wallet)
    })
  })

  describe('.fromRecoverySeed', () => {
    it('Should create a recovery wallet from a recovery seed.', () => {
      let recoveryWallet = Wallet.fromRecoverySeed(
        kdfParams,
        salt,
        email,
        recoveryKeypair.secret()
      )

      expect(recoveryWallet).to.be.an.instanceOf(Wallet)
      expect(recoveryWallet)
        .to.have.a.property('id')
        .equal('b29af63670c2ff250f6517b9bd23e2e0ab992db0df777305ac75c41766e9a718')
    })
  })

  describe('.deriveId', () => {
    it('Should derive wallet ID.', () => {
      let derivedId = Wallet.deriveId(email, password, kdfParams, salt)
      expect(derivedId).to.equal('a2b57747260e2e475214ab2775d31db207bd902882e3327e7f5110b3c415c2d9')
    })
  })

  describe('.encrypt', () => {
    it('Should encrypt a wallet.', () => {
      let encrypted = wallet.encrypt(kdfParams, password)

      expect(encrypted).to.have.a.property('id')
      expect(encrypted).to.have.a.property('salt')
      expect(encrypted).to.have.a.property('keychainData')
      expect(encrypted).to.have.a.property('email').equal(email)
      expect(encrypted).to.have.a.property('accountId').equal(accountId)
    })

    it('Should throw if no kdf params provided', () => {
      expectThrow(() => wallet.encrypt())
    })

    it('Should throw if no password provided.', () => {
      expectThrow(() => wallet.encrypt(kdfParams))
    })
  })

  describe('.encryptRecoveryData', () => {
    it('Should encrypt recovery data.', () => {
      let encrypted = wallet.encryptRecoveryData(kdfParams, recoveryKeypair)

      expect(encrypted).to.have.a.property('id')
      expect(encrypted).to.have.a.property('salt')
      expect(encrypted).to.have.a.property('keychainData')
      expect(encrypted).to.have.a.property('email').equal(email)
      expect(encrypted)
        .to.have.a.property('accountId')
        .equal(recoveryKeypair.accountId())
    })
  })

  describe('.id', () => {
    it('Should get wallet ID', () => {
      let result = wallet.id
      expect(result).to.equal(walletId)
    })

    it('Should throw if no wallet ID yet', () => {
      let idLess = new Wallet(email, keypair, accountId)
      expectThrow(() => idLess.id)
    })
  })

  describe('.secretSeed', () => {
    it('Should expose secret seed.', () => {
      expect(wallet).to.have.a.property('secretSeed').equal(keypair.secret())
    })
  })

  describe('.keypair', () => {
    it('Should expose keypair.', () => {
      expect(wallet).to.have.a.property('keypair').deep.equal(keypair)
    })
  })
})
