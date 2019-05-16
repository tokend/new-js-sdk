import _set from 'lodash/set'

import { Wallet } from '../../wallet'
import { Keypair } from '../../base/keypair'

import { SignersManager } from './signers-manager'
import { ApiCaller } from '../api-caller'

import { VerificationRequiredError } from '../../errors'

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
    if (apiCaller) {
      this.useApi(apiCaller)
    }
  }

  useApi (api) {
    if (!(api instanceof ApiCaller)) {
      throw new Error('Is not ApiCaller')
    }
    this._signersManager = new SignersManager(api)
    this._apiCaller = api
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
    return this._apiCaller.get('/kdf', {
      email,
      is_recovery: isRecovery
    })
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
   *
   * @return {Promise.<JsonapiResponse>} Wallet verification request response.
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
   *
   * @return {Promise.<JsonapiResponse>} Verification request response.
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
   * @return {Promise.<Wallet>} New wallet.
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
    const tx = await this._signersManager.createChangeSignerTransaction({
      newPublicKey: newMainWallet.accountId,
      signingKeypair: recoveryWallet.keypair,
      sourceAccount: accountId
    })

    this._apiCaller.useWallet(recoveryWallet)

    const endpoint = `/wallets/${recoveryWallet.id}`
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

    return newMainWallet
  }

  /**
   * Change password.
   *
   * @param {string} newPassword Desired password.
   *
   * @return {Promise.<Wallet>} New wallet.
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

    const tx = await this._signersManager.createChangeSignerTransaction({
      newPublicKey: newMainWallet.keypair.accountId(),
      signingKeypair: oldWallet.keypair,
      sourceAccount: oldWallet.accountId,
      signerToReplace: oldWallet.keypair.accountId()
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
   * Get user account ID by provided recovery wallet ID.
   *
   * @param {string} recoveryWalletId ID of recovery wallet.
   *
   * @return {Promise.<string>} User's account ID.
   */
  async _getAccountIdByRecoveryId (recoveryWalletId) {
    const endpoint = `/wallets/${recoveryWalletId}`
    const { data: wallet } = await this._apiCaller.get(endpoint)

    return wallet.accountId
  }
}
