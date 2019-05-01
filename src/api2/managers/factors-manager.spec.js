import sinon from 'sinon'

import { FactorsManager } from './factors-manager'
import { ApiCaller } from '../api-caller'

import { Wallet } from '../../wallet'
import { TFARequiredError } from '../../errors'

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

      it('calls _apiCaller.put to proper endpoint with derived error attributes', async () => {
        sandbox.stub(factorsManagerInstance, '_getKdfParams')
          .resolves({ data: 'some-kdf-params' })
        sandbox.stub(Wallet, 'fromEncrypted').returns(mockedWallet)
        sandbox.stub(factorsManagerInstance._apiCaller, 'put')
          .resolves()

        await factorsManagerInstance.verifyPasswordFactor(
          new TFARequiredError({
            response: {
              data: {
                errors: [{
                  meta: {
                    token: 'some-token',
                    keychain_data: 'some-keychain-data',
                    salt: 'some-salt',
                    factor_id: '1'
                  }
                }]
              }
            }
          }),
          'qwe123'
        )

        expect(factorsManagerInstance._getKdfParams)
          .to.have.been.calledOnceWithExactly('foo@bar.com')
        expect(Wallet.fromEncrypted).to.have.been.calledOnceWithExactly({
          keychainData: 'some-keychain-data',
          kdfParams: 'some-kdf-params',
          salt: 'some-salt',
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
      it('calls apiCaller.put to proper endpoint with derived error attributes', async () => {
        sandbox.stub(factorsManagerInstance._apiCaller, 'put')
          .resolves()

        await factorsManagerInstance.verifyTotpFactor(
          new TFARequiredError({
            response: {
              data: {
                errors: [{
                  meta: {
                    wallet_id: 'some-wallet-id',
                    factor_id: '1',
                    token: 'some-token'
                  }
                }]
              }
            }
          }),
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
