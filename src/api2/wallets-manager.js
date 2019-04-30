import _set from 'lodash/set'

import { Wallet } from '../wallet'
import { Keypair } from '../base/keypair'

import { makeChangeSignerTransaction } from './middlewares/change-signers'

import { NotFoundError, VerificationRequiredError } from '../errors'

const DEFAULT_SIGNER_ROLE_KEY = 'signer_role:default'

/**
 * Wallets manager.
 */

export class WalletsManager {
  /**
   * WalletsManager constructor.
   *
   * @param {ApiCaller} apiCaller ApiCaller instance to process the requests.
   */
  constructor (apiCaller) {
    this._apiCaller = apiCaller
  }

  /**
   * Get key derivation params.
   *
   * @param {string} [email] User's email.
   * @param {boolean} [isRecovery=false] If true, get params for the recovery wallet.
   *
   * @return {Promise.<JsonapiResponse>} KDF params.
   */
  getKdfParams (email, isRecovery = false) {
    return this._apiCaller.get('/kdf', { email, isRecovery })
  }

  /**
   * Get an encrypted wallet.
   *
   * If verification is required, look for wallet ID in the errors meta:
   * ```js
   * err.meta.walletId
   * ```
   *
   * @param {string} email User's email.
   * @param {string} password User's password.
   *
   * @return {Promise.<Wallet>} User's wallet.
   */
  async get (email, password) {
    const { data: kdfParams } = await this.getKdfParams(email)
    const walletId = Wallet.deriveId(
      email, password, kdfParams, kdfParams.salt
    )

    let walletResponse
    try {
      walletResponse = await this._apiCaller.get(`/wallets/${walletId}`)
    } catch (err) {
      // HACK: expose wallet Id to allow resend email
      if (err instanceof VerificationRequiredError) {
        _set(err, '_meta.walletId', walletId)
      }

      throw err
    }

    return Wallet.fromEncrypted({
      keychainData: walletResponse.data.keychainData,
      kdfParams,
      salt: kdfParams.salt,
      email,
      password,
      accountId: walletResponse.data.accountId
    })
  }

  /**
   * Create a wallet.
   *
   * @param {string} email User's email.
   * @param {string} password User's password.
   * @param {Keypair} recoveryKeypair the keypair to later recover the account
   * @param {string} [referrerId] public key of the referrer
   *
   * @return {Promise.<object>} User's wallet and a recovery seed.
   */
  async create (email, password, recoveryKeypair, referrerId = '') {
    const { data: kdfParams } = await this.getKdfParams('')

    const mainWallet = Wallet.generate(email)
    const encryptedMainWallet = mainWallet.encrypt(kdfParams, password)

    const secondFactorWallet = Wallet.generate(email)
    const encryptedSecondFactorWallet = secondFactorWallet.encrypt(
      kdfParams, password
    )

    const walletRecoveryKeypair = recoveryKeypair || Keypair.random()
    const encryptedRecoveryWallet = mainWallet.encryptRecoveryData(
      kdfParams, walletRecoveryKeypair
    )

    const accountRefferer = referrerId
      ? { referrer: { data: { id: referrerId } } }
      : {}

    const response = await this._apiCaller.post('/wallets', {
      data: {
        type: 'wallet',
        id: encryptedMainWallet.id,
        attributes: {
          email,
          salt: encryptedMainWallet.salt,
          account_id: encryptedMainWallet.accountId,
          keychain_data: encryptedMainWallet.keychainData
        },
        relationships: {
          kdf: {
            data: {
              type: kdfParams.type,
              id: kdfParams.id
            }
          },
          recovery: {
            data: {
              type: 'recovery',
              id: encryptedRecoveryWallet.id
            }
          },
          factor: {
            data: {
              type: 'password',
              id: encryptedMainWallet.id
            }
          },
          ...accountRefferer
        }
      },
      included: [
        {
          type: 'password',
          id: encryptedMainWallet.id,
          attributes: {
            account_id: secondFactorWallet.accountId,
            keychain_data: encryptedSecondFactorWallet.keychainData,
            salt: encryptedSecondFactorWallet.salt
          }
        },
        {
          type: 'recovery',
          id: encryptedRecoveryWallet.id,
          attributes: {
            account_id: encryptedRecoveryWallet.accountId,
            keychain_data: encryptedRecoveryWallet.keychainData,
            salt: encryptedRecoveryWallet.salt
          }
        }
      ]
    })

    return {
      wallet: mainWallet,
      response: response,
      recoverySeed: walletRecoveryKeypair.secret()
    }
  }

  /**
   * Verify email.
   *
   * @param {string} payload Base64 encoded payload from the email link.
   */
  verifyEmail (payload) {
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf8')
    const jsonPayload = JSON.parse(decodedPayload)

    const endpoint = `/wallets/${jsonPayload.meta.wallet_id}/verification`
    return this._apiCaller.put(endpoint, {
      data: {
        type: 'wallet_verification',
        attributes: { token: jsonPayload.meta.token }
      }
    })
  }

  /**
   * Re-send verification email.
   *
   * @param {string} [walletId] ID of the wallet to resend email for.
   */
  resendEmail (walletId) {
    const verificationWalletId = walletId || this._apiCaller.wallet.id

    const endpoint = `/wallets/${verificationWalletId}/verification`
    return this._apiCaller.post(endpoint)
  }

  /**
   * Recover a wallet using the recovery seed.
   *
   * @param {string} email User's email.
   * @param {string} recoverySeed User's recovery seed.
   * @param {string} newPassword Desired password.
   *
   * @return {Wallet} New wallet.
   */
  async recovery (email, recoverySeed, newPassword) {
    const { data: kdfParams } = await this.getKdfParams(email, true)

    const recoveryWallet = Wallet.fromRecoverySeed(
      kdfParams,
      kdfParams.salt,
      email,
      recoverySeed
    )

    const newMainWallet = Wallet.generate(email)
    const encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword)

    const newSecondFactorWallet = Wallet.generate(email)
    const encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(
      kdfParams, newPassword
    )

    const accountId = await this._getAccountIdByRecoveryId(recoveryWallet.id)
    const signers = await this._getSigners(accountId)
    const signerRoleId = await this._getDefaultSignerRole()

    const tx = makeChangeSignerTransaction({
      newPublicKey: newMainWallet.accountId,
      signers,
      signingKeypair: recoveryWallet.keypair,
      sourceAccount: accountId,
      signerRoleId
    })

    const oldWallet = this._apiCaller.wallet
    this._apiCaller.useWallet(recoveryWallet)

    const endpoint = `/wallets/${recoveryWallet.id}`

    try {
      await this._apiCaller.putWithSignature(endpoint, {
        data: {
          type: 'wallet',
          id: encryptedNewMainWallet.id,
          attributes: {
            email,
            account_id: encryptedNewMainWallet.accountId,
            salt: encryptedNewMainWallet.salt,
            keychain_data: encryptedNewMainWallet.keychainData
          },
          relationships: {
            transaction: {
              data: {
                type: 'transaction',
                id: '1'
              }
            },
            kdf: {
              data: {
                type: kdfParams.type,
                id: kdfParams.id
              }
            },
            factor: {
              data: {
                type: 'password',
                id: encryptedNewMainWallet.id
              }
            }
          }
        },
        included: [
          {
            type: 'transaction',
            id: '1',
            attributes: { envelope: tx }
          },
          {
            id: encryptedNewMainWallet.id,
            type: 'password',
            attributes: {
              account_id: encryptedSecondFactorWallet.accountId,
              keychain_data: encryptedSecondFactorWallet.keychainData,
              salt: encryptedSecondFactorWallet.salt
            }
          }
        ]
      })
    } finally {
      this._apiCaller.useWallet(oldWallet)
    }

    return newMainWallet
  }

  /**
   * Change password.
   *
   * @param {string} newPassword Desired password.
   *
   * @return {Wallet} New wallet.
   */
  async changePassword (newPassword) {
    const oldWallet = this._apiCaller.wallet

    const { data: kdfParams } = await this.getKdfParams(oldWallet.email, true)

    const newMainWallet = Wallet.generate(oldWallet.email, oldWallet.accountId)
    const encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword)

    const newSecondFactorWallet = Wallet.generate(oldWallet.email)
    const encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(
      kdfParams, newPassword
    )

    const signers = await this._getSigners(this._apiCaller.wallet.accountId)
    const signerRoleId = await this._getDefaultSignerRole()

    const tx = makeChangeSignerTransaction({
      newPublicKey: newMainWallet.keypair.accountId(),
      signers,
      signingKeypair: oldWallet.keypair,
      sourceAccount: oldWallet.accountId,
      signerToReplace: oldWallet.keypair.accountId(),
      signerRoleId
    })

    const endpoint = `/wallets/${oldWallet.id}`
    await this._apiCaller.putWithSignature(endpoint, {
      data: {
        type: 'wallet',
        id: encryptedNewMainWallet.id,
        attributes: {
          email: oldWallet.email,
          account_id: newMainWallet.keypair.accountId(),
          salt: encryptedNewMainWallet.salt,
          keychain_data: encryptedNewMainWallet.keychainData
        },
        relationships: {
          transaction: {
            data: {
              type: 'transaction',
              id: '1'
            }
          },
          kdf: {
            data: {
              type: kdfParams.type,
              id: kdfParams.id
            }
          },
          factor: {
            data: {
              type: 'password',
              id: encryptedNewMainWallet.id
            }
          }
        }
      },
      included: [
        {
          type: 'transaction',
          id: '1',
          attributes: { envelope: tx }
        },
        {
          type: 'password',
          id: encryptedNewMainWallet.id,
          attributes: {
            account_id: encryptedSecondFactorWallet.accountId,
            keychain_data: encryptedSecondFactorWallet.keychainData,
            salt: encryptedSecondFactorWallet.salt
          }
        }
      ]
    })

    return newMainWallet
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

  async _getSigners (accountId) {
    try {
      const endpoint = `/v3/accounts/${accountId}/signers`
      const { data: signers } = await this._apiCaller.get(endpoint)

      return signers
    } catch (err) {
      if (err instanceof NotFoundError) {
        return []
      }
    }
  }

  async _getAccountIdByRecoveryId (recoveryWalletId) {
    const endpoint = `/wallets/${recoveryWalletId}`
    const { data: wallet } = await this._apiCaller.get(endpoint)

    return wallet.accountId
  }

  async _getDefaultSignerRole () {
    const endpoint = `/v3/key_values/${DEFAULT_SIGNER_ROLE_KEY}`
    const { data } = await this._apiCaller.get(endpoint)

    return String(data.value.u32)
  }
}
