import { Wallet } from '../wallet'

/**
 * Factors manager.
 */

export class FactorsManager {
  /**
   * FactorsManager constructor.
   *
   * @param {ApiCaller} apiCaller ApiCaller instance to process the requests.
   */
  constructor (apiCaller) {
    this._apiCaller = apiCaller
  }

  /**
   * Verify password factor and retry the failed request.
   *
   * @param {TFARequiredError} tfaError TFA error instance.
   * @param {string} password User's password.
   *
   * @return {JsonapiResponse} Response of the retried request.
   */
  async verifyPasswordFactorAndRetry (tfaError, password) {
    await this.verifyPasswordFactor(tfaError, password)
    return tfaError.retryRequest()
  }

  /**
   * Verify password factor.
   *
   * @param {TFARequiredError} tfaError TFA error instance.
   * @param {string} password User's password.
   *
   * @return {JsonapiResponse} Response of the retried request.
   */
  async verifyPasswordFactor (tfaError, password) {
    const meta = tfaError.meta
    const email = this._apiCaller.wallet.email
    const accountId = this._apiCaller.wallet.accountId

    const { data: kdfParams } = await this.getKdfParams(email)
    const factorWallet = Wallet.fromEncrypted({
      keychainData: meta.keychainData,
      kdfParams,
      salt: meta.salt,
      email,
      password,
      accountId
    })

    const otp = factorWallet.keypair.sign(meta.token).toString('base64')

    const walletId = this._apiCaller.wallet.id
    const endpoint = `/wallets/${walletId}/factors/${meta.factorId}/verification`
    await this._apiCaller.put(endpoint, {
      data: {
        attributes: {
          token: meta.token,
          otp
        }
      }
    })
  }

  /**
   * Verify TOTP factor and retry the failed request.
   *
   * @param {TFARequiredError} tfaError TFA error instance.
   * @param {string} otp One time password from a TOTP app.
   *
   * @return {JsonapiResponse} Response of the retried request.
   */
  async verifyTotpFactorAndRetry (tfaError, otp) {
    await this.verifyTotpFactor(tfaError, otp)
    return tfaError.retryRequest()
  }

  /**
   * Verify TOTP factor.
   *
   * @param {TFARequiredError} tfaError TFA error instance.
   * @param {string} otp One time password from a TOTP app.
   */
  verifyTotpFactor (tfaError, otp) {
    const walletId = tfaError.meta.walletId
    const factorId = tfaError.meta.factorId

    const endpoint = `/wallets/${walletId}/factors/${factorId}/verification`
    return this._apiCaller.put(endpoint, {
      data: {
        attributes: {
          token: tfaError.meta.token,
          otp
        }
      }
    })
  }
}
