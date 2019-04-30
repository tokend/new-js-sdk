import sinon from 'sinon'

import { FactorsManager } from './factors-manager'
import { ApiCaller } from '../api-caller'

import { Wallet } from '../../wallet'

describe('Factors manager', () => {
  let sandbox
  let factorsManagerInstance

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    factorsManagerInstance = new FactorsManager(
      ApiCaller.getInstance('https://api.test.com')
    )
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('method', () => {
    describe('verifyPasswordFactor', () => {
      const mockedWallet = new Wallet(
        'foo@bar.com',
        'SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3',
        'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
        'some-wallet-id'
      )

      beforeEach(() => {
        factorsManagerInstance._apiCaller.useWallet(mockedWallet)
      })

      it('gets attributes from error instance and sends PUT verification request', async () => {
        const keychainData = 'eyJJViI6IkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBREFBQUFCQUFBQUFRQUFBQUlBQUFBQndBQUFBUUFBQUFBIiwiY2lwaGVyVGV4dCI6Ii90enkreXV6ajdtdEEyTGlVQjFsQ013NWlPVUtjL2owOHVHcW9iK1ZsWk9XaEdHVWlLSUpmSWU0clY1c3JZMzVNRi83M1N4NTd3aUR1MFA0K2h0NjRHYnIzNFV6MHpZMUlZVGVUd2REbWVHZ1NBeVNQTGloS0c3OHNxY1NsV2owQmpxMU13ZVV3SEpXM1ZIMDFSeGlTUk5oSmlFcEtsUDdzOFhwZUhDNDlyM1RWOW9RcS9CcWJMeStERkZHRHNGWFFMenhBYnp2c0VxWGlnPT0iLCJjaXBoZXJOYW1lIjoiYWVzIiwibW9kZU5hbWUiOiJnY20ifQ=='

        sandbox.stub(factorsManagerInstance, '_getKdfParams')
          .resolves({ data: 'some-kdf-params' })
        sandbox.stub(Wallet, 'fromEncrypted').returns(mockedWallet)
        sandbox.stub(factorsManagerInstance._apiCaller, 'put')
          .withArgs('/wallets/some-wallet-id/factors/1/verification')
          .resolves()

        await factorsManagerInstance.verifyPasswordFactor(
          {
            meta: {
              token: 'some-token',
              keychainData,
              salt: '/1dwsCq6f1zdpIObxLBOiQ==',
              factorId: '1'
            }
          },
          'qwe123'
        )

        expect(factorsManagerInstance._getKdfParams)
          .to.have.been.calledOnceWithExactly('foo@bar.com')
        expect(Wallet.fromEncrypted).to.have.been.calledOnceWithExactly({
          keychainData: 'eyJJViI6IkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFEQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBREFBQUFCQUFBQUFRQUFBQUlBQUFBQndBQUFBUUFBQUFBIiwiY2lwaGVyVGV4dCI6Ii90enkreXV6ajdtdEEyTGlVQjFsQ013NWlPVUtjL2owOHVHcW9iK1ZsWk9XaEdHVWlLSUpmSWU0clY1c3JZMzVNRi83M1N4NTd3aUR1MFA0K2h0NjRHYnIzNFV6MHpZMUlZVGVUd2REbWVHZ1NBeVNQTGloS0c3OHNxY1NsV2owQmpxMU13ZVV3SEpXM1ZIMDFSeGlTUk5oSmlFcEtsUDdzOFhwZUhDNDlyM1RWOW9RcS9CcWJMeStERkZHRHNGWFFMenhBYnp2c0VxWGlnPT0iLCJjaXBoZXJOYW1lIjoiYWVzIiwibW9kZU5hbWUiOiJnY20ifQ==',
          kdfParams: 'some-kdf-params',
          salt: '/1dwsCq6f1zdpIObxLBOiQ==',
          email: 'foo@bar.com',
          password: 'qwe123',
          accountId: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S'
        })
        expect(factorsManagerInstance._apiCaller.put)
          .to.have.been.calledOnceWith(
            '/wallets/some-wallet-id/factors/1/verification'
          )
      })
    })

    describe('verifyTotpFactor', () => {
      it('gets attributes from error instance and sends PUT verification request', async () => {
        sandbox.stub(factorsManagerInstance._apiCaller, 'put')
          .withArgs('/wallets/some-wallet-id/factors/1/verification')
          .resolves()

        await factorsManagerInstance.verifyTotpFactor(
          {
            meta: {
              walletId: 'some-wallet-id',
              factorId: '1',
              token: 'some-token'
            }
          },
          '123456'
        )

        expect(factorsManagerInstance._apiCaller.put)
          .to.have.been.calledOnceWithExactly(
            '/wallets/some-wallet-id/factors/1/verification',
            {
              data: {
                attributes: {
                  token: 'some-token',
                  otp: '123456'
                }
              }
            }
          )
      })
    })
  })
})
