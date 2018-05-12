import { ResourceGroupBase } from '../../resource_group_base'
import { Wallet } from '../../wallet'

/**
 * TFA factors.
 */
export class Factors extends ResourceGroupBase {
  /**
   * Get all TFA factors.
   *
   * @return {ApiResponse} Factors;
   */
  getAll () {
    return this._makeCallBuilder().get()
  }

  /**
   * Create a TOTP factor.
   *
   *
   */
  createTotpFactor () {
    return this._makeCallBuilderWithSignature()
      .post({ data: { type: 'totp' } })
  }

  /**
   * Change the factor priority.
   * Every factor with priority > 0 considered enabled.
   *
   * @param {string} factorId ID of the factor to be updated.
   * @param {Number} priority Desired factor priority.
   * @return {ApiResponse} Response.
   */
  changePriority (factorId, priority) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment(factorId)
      .patch({ data: { attributes: { priority } } })
  }

  /**
   * Delete the factor.
   *
   * @param {string} factorId ID of the factor to be deleted.
   * @return {ApiResponse} Response.
   */
  delete (factorId) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment(factorId)
      .delete()
  }

  /**
   * Verify password factor and retry the failed request.
   *
   * @param {TFAError} tfaError TFA error instance.
   * @param {string} password User's password.
   *
   * @return {ResponseBase} Response of the retried request.
   */
  async verifyPasswordFactorAndRetry (tfaError, password) {
    let meta = tfaError.meta
    let email = this._sdk.wallet.email

    let kdfParams = await this._getKdfParams(email)
    let factorWallet = Wallet.fromEncrypted(
      meta.keychainData,
      kdfParams,
      meta.salt,
      email,
      password
    )

    let otp = factorWallet.keypair.sign(meta.token).toString('base64')

    await this._makeCallBuilder(meta.walletId)
      .appendUrlSegment([meta.factorId, 'verification'])
      .put({
        data: {
          attributes: {
            token: meta.token,
            otp
          }
        }
      })

    return tfaError.retryFailedRequest()
  }

  /**
   * Verify TOTP factor and retry the failed request.
   *
   * @param {TFAError} tfaError TFA error instance.
   * @param {string} otp One time password from a TOTP app.
   *
   * @return {ResponseBase} Response of the retried request.
   */
  async verifyTotpFactorAndRetry (tfaError, otp) {
    await this._makeCallBuilder(tfaError.meta.walletId)
      .appendUrlSegment([tfaError.meta.factorId, 'verification'])
      .put({
        data: {
          attributes: {
            token: tfaError.meta.token,
            otp
          }
        }
      })

    return tfaError.retryFailedRequest()
  }

  _makeCallBuilder (walletId) {
    walletId = walletId || this._sdk.wallet.id
    return this._server._makeCallBuilder()
      .appendUrlSegment('wallets')
      .appendUrlSegment(walletId)
      .appendUrlSegment('factors')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }

  async _getKdfParams (email) {
    let kdfResponse = await this._sdk.api.wallets.getKdfParams(email)

    return kdfResponse.data
  }
}
