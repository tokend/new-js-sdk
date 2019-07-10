import sinon from 'sinon'

import { WalletsManager } from './wallets-manager'
import { ApiCaller } from '../api-caller'

import { Wallet } from '../../wallet'
import { Keypair } from '../../base'

describe('Wallets manager', () => {
  let sandbox
  let walletsManagerInstance

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    walletsManagerInstance = new WalletsManager(
      ApiCaller.getInstance('https://api.test.com')
    )

    sandbox.stub(walletsManagerInstance._apiCaller, 'get')
      .withArgs('/kdf')
      .resolves({
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
          .getKdfParams('foo@bar.com', true)

        expect(walletsManagerInstance._apiCaller.get)
          .to.have.been.calledOnceWithExactly(
            '/kdf', { email: 'foo@bar.com', is_recovery: true }
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
            'foo@bar.com',
            'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3',
            'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
            'some-wallet-id',
            'some-session-id',
            'some-session-key'
          )
        )

        const result = await walletsManagerInstance.get(
          'foo@bar.com', 'qwe123'
        )

        expect(walletsManagerInstance._apiCaller.get
          .withArgs('/wallets/some-wallet-id')
        ).to.have.been.calledOnce

        expect(Wallet.fromEncrypted).calledOnceWithExactly({
          keychainData: 'SOME_KEYCHAIN_DATA',
          kdfParams: { bits: 256, n: 8, p: 1, r: 8, salt: '/1dwsCq6f1zdpIObxLBOiQ==' },
          salt: '/1dwsCq6f1zdpIObxLBOiQ==',
          email: 'foo@bar.com',
          password: 'qwe123',
          accountId: 'SOME_ACCOUNT_ID',
          sessionId: 'SOME_SESSION_ID',
          sessionKey: 'SOME_SESSION_KEY'
        })

        expect(result).to.deep.equal(
          new Wallet(
            'foo@bar.com',
            'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3',
            'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
            'some-wallet-id',
            'some-session-id',
            'some-session-key'
          )
        )
      })
    })

    describe('create', () => {
      it('returns new wallet, created by calling _apiCaller.post method with generated params', async () => {
        sandbox.stub(Wallet, 'generate').returns(
          new Wallet(
            'foo@bar.com',
            'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3',
            'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
            'some-wallet-id'
          )
        )
        sandbox.stub(walletsManagerInstance._apiCaller, 'post')
          .withArgs('/wallets')
          .resolves({
            data: {
              session: {
                id: 'some-session-id',
                encryptionKey: 'some-session-key'
              }
            }
          })
        console.log(WalletsManager)
        const result = await walletsManagerInstance.create(
          'foo@bar.com',
          'qwe123',
          Keypair.fromSecret('SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3')
        )
        console.log(result.response)

        expect(Wallet.generate).to.have.been.calledWithExactly('foo@bar.com')
        expect(walletsManagerInstance._apiCaller.post)
          .to.have.been.calledOnceWith('/wallets')

        expect(result.response).to.deep.equal({
          data: {
            session: {
              id: 'some-session-id',
              encryptionKey: 'some-session-key'
            }
          }
        })
        expect(result.recoverySeed).to.equal('SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3')
        expect(result.wallet.email).to.equal('foo@bar.com')
        expect(result.wallet.accountId).to.equal('GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S')
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
            'foo@bar.com',
            'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3',
            'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
            'some-wallet-id'
          )
        )
        sandbox.stub(walletsManagerInstance, '_getAccountIdByRecoveryId')
          .resolves('SOME_ACCOUNT_ID')

        sandbox.stub(
          walletsManagerInstance._signersManager,
          'createChangeSignerTransaction'
        ).resolves('SOME_TX_ENVELOPE')
        sandbox.stub(walletsManagerInstance._apiCaller, 'putWithSignature')
          .resolves()

        const result = await walletsManagerInstance.recovery(
          'foo@bar.com',
          'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3',
          'qwe123'
        )

        expect(Wallet.generate).to.have.been.calledWithExactly('foo@bar.com')
        expect(walletsManagerInstance._getAccountIdByRecoveryId)
          .to.have.been.calledOnce
        expect(walletsManagerInstance._signersManager
          .createChangeSignerTransaction
        ).to.have.been.calledOnce
        expect(walletsManagerInstance._apiCaller.putWithSignature)
          .to.have.been.calledOnce

        expect(result.email).to.equal('foo@bar.com')
        expect(result.accountId).to.equal('GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S')
      })
    })

    describe('changePassword', () => {
      const mockedWallet = new Wallet(
        'foo@bar.com',
        'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3',
        'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
        'some-wallet-id'
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

        const result = await walletsManagerInstance.changePassword('qwe123')

        expect(Wallet.generate).to.have.been.calledWithExactly(
          'foo@bar.com',
          'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S'
        )
        expect(walletsManagerInstance._signersManager
          .createChangeSignerTransaction
        ).to.have.been.calledOnce
        expect(walletsManagerInstance._apiCaller.putWithSignature)
          .to.have.been.calledOnce

        expect(result.email).to.equal('foo@bar.com')
        expect(result.accountId).to.equal('GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S')
      })
    })
  })
})
