import { Wallet } from '../../wallet'

import middlewares from '../middlewares'

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
   * @return {Promise.<JsonapiResponse>} Response of the retried request.
   */
  async verifyPasswordFactorAndRetry (tfaError, password) {
    await this.verifyPasswordFactor(tfaError, password)
    return this._retryFailedRequest(tfaError)
  }

  /**
   * Verify password factor.
   *
   * @param {TFARequiredError} tfaError TFA error instance.
   * @param {string} password User's password.
   *
   * @return {Promise.<JsonapiResponse>} Response of verification request.
   */
  async verifyPasswordFactor (tfaError, password) {
    const meta = tfaError.meta
    const email = this._apiCaller.wallet.email
    const accountId = this._apiCaller.wallet.accountId

    const { data: kdfParams } = await this._getKdfParams(email)
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
    return this._apiCaller.put(endpoint, {
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
   * @return {Promise.<JsonapiResponse>} Response of the retried request.
   */
  async verifyTotpFactorAndRetry (tfaError, otp) {
    await this.verifyTotpFactor(tfaError, otp)
    return this._retryFailedRequest(tfaError)
  }

  /**
   * Verify TOTP factor.
   *
   * @param {TFARequiredError} tfaError TFA error instance.
   * @param {string} otp One time password from a TOTP app.
   *
   * @return {Promise.<JsonapiResponse>} Response of verification request.
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

  /**
   * Performs failed request and parses response/error.
   *
   * @param {TFARequiredError} error TFA error instance.
   *
   * @return {Promise.<JsonapiResponse>} Response of retried request.
   */
  async _retryFailedRequest (error) {
    let response
    try {
      response = await error.retryRequest()
    } catch (e) {
      throw middlewares.parseJsonapiError(e)
    }

    response = middlewares.parseJsonapiResponse(response)
    return response
  }

  /**
   * Performs failed request and parses response/error.
   *
   * @param {string} email Email for getting KDF params.
   *
   * @return {Promise.<JsonapiResponse>} KDF request response.
   */
  _getKdfParams (email) {
    return this._apiCaller.get('/kdf', { email })
  }
}
