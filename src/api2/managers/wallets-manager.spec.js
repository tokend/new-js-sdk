import sinon from 'sinon'

import { WalletsManager } from './wallets-manager'
import { ApiCaller } from '../api-caller'

import { Wallet } from '../../wallet'
import { Keypair } from '../../base'

describe('Wallets manager', () => {
  let sandbox
  let walletsManagerInstance

  const email = 'foo@bar.com'
  const accountId = 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S'
  const seed = 'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3'
  const password = 'qwe123'
  const keypairs = [
    seed,
    'SDKJWNPRGPM7LWFJHRPQKKUSOZTO2SKFUYT2AE3DBXAR5X7C6LIMVGZA'
  ]

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    walletsManagerInstance = new WalletsManager(
      ApiCaller.getInstance('https://api.test.com')
    )

    let stubGet = sandbox.stub(walletsManagerInstance._apiCaller, 'get')
      .withArgs('/v3/key_values/signer_role:default')
      .resolves({
        data: {
          value: {
            u32: 1
          }
        }
      })

    stubGet.withArgs('/kdf').resolves({
      data: {
        bits: 256,
        n: 8,
        p: 1,
        r: 8,
        salt: '/1dwsCq6f1zdpIObxLBOiQ=='
      }
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('method', () => {
    describe('getKdfParams', () => {
      it('returns KDF params calling _apiCaller.get with correct params', async () => {
        const result = await walletsManagerInstance
          .getKdfParams(email, true)

        expect(walletsManagerInstance._apiCaller.get)
          .to.have.been.calledOnceWithExactly(
            '/kdf', { email: email, is_recovery: true }
          )
        expect(result).to.deep.equal({
          data: {
            bits: 256,
            n: 8,
            p: 1,
            r: 8,
            salt: '/1dwsCq6f1zdpIObxLBOiQ=='
          }
        })
      })
    })

    describe('getSignerRoleId', () => {
      it('returns signer role id calling _apiCaller.get with correct params', async () => {
        const result = await walletsManagerInstance
          .getSignerRoleId()

        expect(walletsManagerInstance._apiCaller.get)
          .to.have.been.calledOnceWith('/v3/key_values/signer_role:default')
        expect(result).to.deep.equal({
          data: {
            value: {
              u32: 1
            }
          }
        })
      })
    })

    describe('get', () => {
      it('returns decrypted wallet received from response of _apiCaller.get method called with derived wallet ID', async () => {
        sandbox.stub(Wallet, 'deriveId').returns('some-wallet-id')
        walletsManagerInstance._apiCaller.get
          .withArgs('/wallets/some-wallet-id')
          .resolves({
            data: {
              accountId: 'SOME_ACCOUNT_ID',
              keychainData: 'SOME_KEYCHAIN_DATA',
              session: {
                id: 'SOME_SESSION_ID',
                encryptionKey: 'SOME_SESSION_KEY'
              }
            }
          })
        sandbox.stub(Wallet, 'fromEncrypted').returns(
          new Wallet(
            email,
            seed,
            accountId,
            'some-wallet-id',
            'some-session-id',
            'some-session-key'
          )
        )

        const result = await walletsManagerInstance.get(
          email, password
        )

        expect(walletsManagerInstance._apiCaller.get
          .withArgs('/wallets/some-wallet-id')
        ).to.have.been.calledOnce

        expect(Wallet.fromEncrypted).calledOnceWithExactly({
          keychainData: 'SOME_KEYCHAIN_DATA',
          kdfParams: { bits: 256, n: 8, p: 1, r: 8, salt: '/1dwsCq6f1zdpIObxLBOiQ==' },
          salt: '/1dwsCq6f1zdpIObxLBOiQ==',
          email: email,
          password: password,
          accountId: 'SOME_ACCOUNT_ID',
          sessionId: 'SOME_SESSION_ID',
          sessionKey: 'SOME_SESSION_KEY'
        })

        expect(result).to.deep.equal(
          new Wallet(
            email,
            seed,
            accountId,
            'some-wallet-id',
            'some-session-id',
            'some-session-key'
          )
        )
      })
    })

    describe('createWithSigners', () => {
      it('returns new wallet, created by calling _apiCaller.post method with generated params', async () => {
        sandbox.stub(Wallet, 'generate').returns(
          new Wallet(
            email,
            seed,
            accountId,
            'some-wallet-id',
            null,
            null,
            keypairs
          )
        )
        sandbox.stub(walletsManagerInstance._apiCaller, 'post')
          .withArgs('/wallets')
          .resolves({
            data: {
              accountId: accountId,
              session: {
                id: 'some-session-id',
                encryptionKey: 'some-session-key'
              }
            }
          })
        const result = await walletsManagerInstance.createWithSigners(
          email,
          password,
          [],
          keypairs
        )

        expect(Wallet.generate).to.have.been.calledWithExactly(
          email,
          null,
          keypairs
        )
        expect(walletsManagerInstance._apiCaller.post)
          .to.have.been.calledOnceWith('/wallets')

        expect(result.response).to.deep.equal({
          data: {
            accountId: accountId,
            session: {
              id: 'some-session-id',
              encryptionKey: 'some-session-key'
            }
          }
        })
        expect(result.wallet.email).to.equal(email)
        expect(result.wallet.accountId).to.equal(accountId)
      })
    })

    describe('create', () => {
      it('returns new wallet, created by calling _apiCaller.post method with generated params', async () => {
        sandbox.stub(Wallet, 'generate').returns(
          new Wallet(
            email,
            seed,
            accountId,
            'some-wallet-id'
          )
        )
        sandbox.stub(walletsManagerInstance._apiCaller, 'post')
          .withArgs('/wallets')
          .resolves({
            data: {
              accountId: accountId,
              session: {
                id: 'some-session-id',
                encryptionKey: 'some-session-key'
              }
            }
          })
        const result = await walletsManagerInstance.create(
          email,
          password,
          Keypair.fromSecret(seed)
        )

        expect(Wallet.generate).to.have.been.calledWithExactly(email, null, [])
        expect(walletsManagerInstance._apiCaller.post)
          .to.have.been.calledOnceWith('/wallets')

        expect(result.response).to.deep.equal({
          data: {
            accountId: accountId,
            session: {
              id: 'some-session-id',
              encryptionKey: 'some-session-key'
            }
          }
        })
        expect(result.recoverySeed).to.equal(seed)
        expect(result.wallet.email).to.equal(email)
        expect(result.wallet.accountId).to.equal(accountId)
      })
    })

    describe('verifyEmail', () => {
      it('calls _apiCaller.put with derived verification params', async () => {
        const payload = (Buffer.from(
          JSON.stringify({
            type: 1,
            meta: {
              token: 'some-token',
              wallet_id: 'some-wallet-id'
            }
          })
        )).toString('base64')
        sandbox.stub(walletsManagerInstance._apiCaller, 'put')
          .withArgs('/wallets/some-wallet-id/verification')
          .resolves()

        await walletsManagerInstance.verifyEmail(payload)

        expect(walletsManagerInstance._apiCaller.put)
          .to.have.been.calledOnceWithExactly(
            '/wallets/some-wallet-id/verification',
            {
              data: {
                type: 'wallet_verification',
                attributes: { token: 'some-token' }
              }
            }
          )
      })
    })

    describe('resendEmail', () => {
      it('calls _apiCaller.post with derived verification wallet ID', async () => {
        sandbox.stub(walletsManagerInstance._apiCaller, 'post')
          .withArgs('/wallets/some-wallet-id/verification')
          .resolves()

        await walletsManagerInstance.resendEmail('some-wallet-id')

        expect(walletsManagerInstance._apiCaller.post)
          .to.have.been.calledOnceWithExactly(
            '/wallets/some-wallet-id/verification'
          )
      })
    })

    describe('recovery', () => {
      it('changes user\'s main wallet by calling _apiCaller.putWithSignature with derived params', async () => {
        sandbox.stub(Wallet, 'generate').returns(
          new Wallet(
            email,
            seed,
            accountId,
            'some-wallet-id'
          )
        )
        sandbox.stub(walletsManagerInstance, '_getAccountIdByEmail')
          .resolves(accountId)

        sandbox.stub(
          walletsManagerInstance._signersManager,
          'createChangeSignerTransaction'
        ).resolves('SOME_TX_ENVELOPE')
        sandbox.stub(walletsManagerInstance._apiCaller, 'putWithSignature')
          .resolves()

        const result = await walletsManagerInstance.recovery(
          email,
          seed,
          password,
          []
        )

        expect(Wallet.generate).to.have.been.calledWithExactly(
          email,
          accountId,
          []
        )
        expect(walletsManagerInstance._getAccountIdByEmail)
          .to.have.been.calledOnce
        expect(walletsManagerInstance._signersManager
          .createChangeSignerTransaction
        ).to.have.been.calledOnce
        expect(walletsManagerInstance._apiCaller.putWithSignature)
          .to.have.been.calledOnce

        expect(result.email).to.equal(email)
        expect(result.accountId).to.equal(accountId)
      })
    })

    describe('changePassword', () => {
      const mockedWallet = new Wallet(
        email,
        seed,
        accountId,
        'some-wallet-id',
        null,
        null,
        keypairs
      )

      it('changes user\'s main wallet by calling _apiCaller.putWithSignature with derived params', async () => {
        sandbox.stub(walletsManagerInstance._apiCaller, 'wallet')
          .get(() => mockedWallet)
        sandbox.stub(Wallet, 'generate').returns(mockedWallet)

        sandbox.stub(
          walletsManagerInstance._signersManager,
          'createChangeSignerTransaction'
        ).resolves('SOME_TX_ENVELOPE')

        sandbox.stub(walletsManagerInstance._apiCaller, 'putWithSignature')
          .resolves()

        const result = await walletsManagerInstance.changePassword(password)

        expect(Wallet.generate).to.have.been.calledWithExactly(
          email,
          accountId,
          keypairs
        )
        expect(walletsManagerInstance._signersManager
          .createChangeSignerTransaction
        ).to.have.been.calledOnce
        expect(walletsManagerInstance._apiCaller.putWithSignature)
          .to.have.been.calledOnce

        expect(result.email).to.equal(email)
        expect(result.accountId).to.equal(accountId)
      })
    })
  })
})
