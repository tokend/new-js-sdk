import sjcl from 'sjcl-tokend'
import { cloneDeep } from 'lodash'
import * as crypto from './crypto'

describe('wallet/crypto', () => {
  const key = fromBase64('6tRntTzIp/RbxSyk7PEzPNKC1yaK5Zt1L/3msZQsTVM=')
  describe('.encryptData', () => {
    it('Should correctly encrypt/decrypt data', () => {
      let secret = 'this is secret data'
      let encrypted = crypto.encryptData(secret, key)
      let decrypted = crypto.decryptData(encrypted, key)
      expect(decrypted).to.be.equal(secret)
    })

    it('Should throw if no data provided.', () => {
      expectThrow(() => crypto.encryptData(null, key))
    })
  })

  describe('.decryptData', () => {
    it('Should throw if data is corrupt.', () => {
      let encrypted = 'the corrupt'
      expectThrow(() => crypto.decryptData(encrypted, key))
    })
  })

  const masterKey = 'GDuj7CqgKXcuXxu1R67wvGKdC94BwBlJqs8tJwUhdn8='

  describe('.calculateMasterKey', () => {
    const salt = 'pUQVfhuX9o3dBz14yIiEVg=='
    const email = 'test@distlab.com'
    const password = 'password'
    const kdfParamsV1 = { id: 1, bits: 256, n: 4096, p: 1, r: 8 }
    const kdfParamsV2 = Object.assign(cloneDeep(kdfParamsV1), { id: 2 })

    it('Should calculate master key with KDF v.1', () => {
      let calculated = crypto.calculateMasterKey(
        salt,
        email,
        password,
        kdfParamsV1
      )

      expect(toBase64(calculated)).to.equal(masterKey)
    })

    it('Should calculate master key with KDF v.2', () => {
      let emailWithCaps = 'tEsT@distlab.com'

      let calculated = crypto.calculateMasterKey(
        salt,
        emailWithCaps,
        password,
        kdfParamsV2
      )

      expect(toBase64(calculated)).to.equal(masterKey)
    })
  })

  describe('.deriveWalletId', () => {
    it('Should derive wallet ID.', () => {
      let walletId = crypto.deriveWalletId(fromBase64(masterKey))
      expect(toBase64(walletId)).equal('Y5yxJ/femcvLkJAKuH/zinSIzd6Nbg9XeIsrFS5/EKM=')
    })
  })

  describe('.deriveWalletKey', () => {
    it('Should derive wallet key.', () => {
      let walletKey = crypto.deriveWalletKey(fromBase64(masterKey))
      expect(toBase64(walletKey)).equal('IqeLjTUXGYitNEscv/BvwG/pPVuz/uaTh3ov+KPF5Wc=')
    })
  })

  describe('.randomBytes', () => {
    it('Should generate random bytes.', () => {
      const length = 32

      let generated = crypto.randomBytes(length)
      expect(generated).to.be.an.instanceOf(Buffer)
      expect(generated).to.have.lengthOf(length)
    })
  })

  function toBase64 (raw) {
    return sjcl.codec.base64.fromBits(raw)
  }

  function fromBase64 (encoded) {
    return sjcl.codec.base64.toBits(encoded)
  }
})
