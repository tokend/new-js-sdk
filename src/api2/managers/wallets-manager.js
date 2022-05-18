import _set from 'lodash/set'
import _get from 'lodash/get'

import { Wallet } from '../../wallet'
import { Keypair } from '../../base/keypair'

import { Signer } from './signer'

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

  getSignerRoleId () {
    return this._apiCaller.get('/v3/key_values/signer_role:default')
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
      accountId: walletResponse.data.accountId,
      sessionId: walletResponse.data.session.id,
      sessionKey: walletResponse.data.session.encryptionKey
    })
  }

  /**
   * Create a wallet.
   *
   * @param {string} email User's email.
   * @param {string} password User's password.
   * @param {Array} [signers] array of {@link Signer}
   * @param {Array} [additionalKeypairs] array of {@link Keypair} or strings(secret seed) which will be saved to key storage
   * @param {number} [role] User's role.
   * @param {string} [inviteCode] Invite code using the user who registered
   *
   * @return {Promise.<object>} User's wallet.
   */
  async createWithSigners (
    email,
    password,
    signers = [],
    additionalKeypairs = [],
    role,
    inviteCode = ''
  ) {
    signers.forEach(item => {
      if (!(item instanceof Signer)) {
        throw new TypeError('A signer instance expected.')
      }
    })
    const { data: kdfParams } = await this.getKdfParams('')
    const { data: roleId } = await this.getSignerRoleId()

    const mainWallet = Wallet.generate(email, null, additionalKeypairs)
    const encryptedMainWallet = mainWallet.encrypt(kdfParams, password)

    const secondFactorWallet = Wallet.generate(email, null, additionalKeypairs)
    const encryptedSecondFactorWallet = secondFactorWallet.encrypt(
      kdfParams, password
    )

    const defaultSignerRoleId = roleId.value.u32 || roleId.value.u64
    const defaultSigner = signers
      .find(el => el.attributes.role_id === defaultSignerRoleId)
    if (defaultSigner) {
      if (!defaultSigner.id) {
        defaultSigner.id = mainWallet.accountId
      }
    } else {
      const defaultSigner = new Signer({
        id: mainWallet.accountId,
        roleId: defaultSignerRoleId,
        weight: 1000,
        identity: 1
      })
      signers.push(defaultSigner)
    }

    const relationshipsSigners = signers.map(item => {
      return {
        type: item.type,
        id: item.id
      }
    })

    const response = await this._apiCaller.post('/wallets', {
      data: {
        type: 'wallet',
        id: encryptedMainWallet.id,
        attributes: {
          email,
          salt: encryptedMainWallet.salt,
          account_id: encryptedMainWallet.accountId,
          keychain_data: encryptedMainWallet.keychainData,
          ...(inviteCode ? { invite_code: inviteCode } : {}),
          ...(role ? { role: role } : {})
        },
        relationships: {
          kdf: {
            data: {
              type: kdfParams.type,
              id: kdfParams.id
            }
          },
          factor: {
            data: {
              type: 'password',
              id: encryptedMainWallet.id
            }
          },
          signers: {
            data: relationshipsSigners
          }
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
        ...signers
      ]
    })

    const walletWithSession = new Wallet(
      mainWallet.email,
      mainWallet.keypair,
      _get(response, 'data.accountId'),
      mainWallet.id,
      _get(response, 'data.session.id'),
      _get(response, 'data.session.encryptionKey'),
      mainWallet.secretSeeds
    )

    return {
      wallet: walletWithSession,
      response: response
    }
  }

  /**
   * Create a wallet.
   *
   * @param {string} email User's email.
   * @param {string} password User's password.
   * @param {Keypair} recoveryKeypair the keypair to later recover the account
   * @param {string} [referrerId] public key of the referrer
   * @param {Array} [additionalKeypairs] array of {@link Keypair} or strings(secret seed) which will be saved to key storage
   * @param {number} [role] User's role.
   * @param {string} [inviteCode] Invite code using the user who registered
   *
   * @return {Promise.<object>} User's wallet and a recovery seed.
   */
  async create (
    email,
    password,
    recoveryKeypair,
    referrerId = '',
    additionalKeypairs = [],
    role,
    inviteCode = ''
  ) {
    const walletRecoveryKeypair = recoveryKeypair || Keypair.random()
    const recoverySigner = new Signer({
      id: walletRecoveryKeypair.accountId(),
      roleId: 1,
      weight: 1000,
      identity: 1
    })
    const wallet = await this.createWithSigners(
      email,
      password,
      [recoverySigner],
      additionalKeypairs,
      role,
      inviteCode
    )
    wallet.recoverySeed = walletRecoveryKeypair.secret()
    return wallet
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
   * @deprecated Use {@link kycRecovery}
   *
   * @param {string} email User's email.
   * @param {string} recoverySeed User's recovery seed.
   * @param {string} newPassword Desired password.
   * @param {Array} newAdditionalKeypairs array of {@link Keypair} or strings(secret seed) which will be saved to key storage
   *
   * @return {Promise.<Wallet>} New wallet.
   */
  async recovery (email, recoverySeed, newPassword, newAdditionalKeypairs) {
    const { data: kdfParams } = await this.getKdfParams(email, true)
    const accountId = await this._getAccountIdByEmail(email)

    const recoveryWallet = Wallet.fromRecoverySeed(
      kdfParams,
      kdfParams.salt,
      email,
      recoverySeed
    )

    const newMainWallet = Wallet.generate(email, accountId, newAdditionalKeypairs)
    const encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword)

    const newSecondFactorWallet = Wallet.generate(email, accountId, newAdditionalKeypairs)
    const encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(
      kdfParams, newPassword
    )

    const tx = await this._signersManager.createChangeSignerTransaction({
      newPublicKey: newMainWallet.keypair.accountId(),
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
   * Recover a wallet using the kyc recovery.
   *
   * @param {string} email User's email.
   * @param {string} newPassword Desired password.
   * @param {Array} [additionalKeypairs] array of {@link Keypair} or strings(secret seed) which will be saved to key storage for new account
   *
   * @return {Promise.<Wallet>} New wallet.
   */
  async kycRecovery (email, newPassword, additionalKeypairs = []) {
    const { data: kdfParams } = await this.getKdfParams(email, true)

    const newMainWallet = Wallet.generate(email, null, additionalKeypairs)
    const encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword)

    const newSecondFactorWallet = Wallet.generate(email, null, additionalKeypairs)
    const encryptedSecondFactorWallet = newSecondFactorWallet.encrypt(
      kdfParams, newPassword
    )

    this._apiCaller.useWallet(newMainWallet)

    const endpoint = `/wallets/${encryptedNewMainWallet.id}`
    await this._apiCaller.putWithSignature(endpoint, {
      data: {
        type: 'recovery-wallet',
        id: encryptedNewMainWallet.id,
        attributes: {
          email,
          salt: encryptedNewMainWallet.salt,
          keychain_data: encryptedNewMainWallet.keychainData
        },
        relationships: {
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
          },
          signer: {
            data: {
              type: 'signer',
              id: encryptedNewMainWallet.accountId
            }
          }
        }
      },
      included: [
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
   * @param {Keypair[]} [additionalKeypairs] array of {@link Keypair} or strings(secret seed) which will be saved to key storage
   *
   * @return {Promise.<Wallet>} New wallet.
   */
  async changePassword (newPassword, additionalKeypairs = []) {
    const oldWallet = this._apiCaller.wallet

    const { data: kdfParams } = await this.getKdfParams(oldWallet.email, true)

    const newMainWallet = Wallet.generate(
      oldWallet.email,
      oldWallet.accountId,
      [...oldWallet.secretSeeds, ...additionalKeypairs]
    )
    const encryptedNewMainWallet = newMainWallet.encrypt(kdfParams, newPassword)

    const newSecondFactorWallet = Wallet.generate(
      oldWallet.email,
      null,
      [...oldWallet.secretSeeds, ...additionalKeypairs]
    )
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
   * Change email.
   *
   * @param {string} newEmail Desired email.
   * @param {string} password Current password.
   * @param {Wallet} [wallet] Wallet to change the email
   *
   * @return {Promise.<Wallet>} Updated wallet.
   */
  async changeEmail ({
    newEmail,
    password,
    wallet
  }) {
    const { data: kdfParams } = await this.getKdfParams('')
    wallet = Wallet.clone(wallet || this._apiCaller.wallet)

    const oldWalletId = wallet.id
    wallet._email = newEmail
    const encryptedWallet = wallet.encrypt(kdfParams, password)

    const extraKps = wallet.nonSigningKeypairs
    const factorWallet = Wallet.generate(newEmail, null, extraKps)
    const encryptedFactorWallet = factorWallet.encrypt(kdfParams, password)

    const signers = await this._signersManager.getSigners(wallet.accountId)

    const body = {
      data: {
        type: 'wallet',
        id: encryptedWallet.id,
        attributes: {
          email: newEmail,
          salt: encryptedWallet.salt,
          account_id: encryptedWallet.accountId,
          keychain_data: encryptedWallet.keychainData
        },
        relationships: {
          kdf: {
            data: {
              type: kdfParams.type,
              id: kdfParams.id
            }
          },
          factor: {
            data: {
              type: 'password',
              id: encryptedWallet.id
            }
          },
          signers: {
            data: signers
          }
        }
      },
      included: [
        {
          type: 'password',
          id: encryptedWallet.id,
          attributes: {
            account_id: factorWallet.accountId,
            keychain_data: encryptedFactorWallet.keychainData,
            salt: encryptedFactorWallet.salt
          }
        },
        ...signers
      ]
    }
    const response = await this._apiCaller.post(`/wallets/${oldWalletId}`, body)

    return { wallet, response }
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

  /**
   * Get user account ID by email.
   *
   * @param {string} email account email.
   *
   * @return {Promise.<string>} User's account ID.
   */
  async _getAccountIdByEmail (email) {
    const { data } = await this._apiCaller.get('/identities', {
      filter: { identifier: email },
      page: { limit: 1 }
    })

    return _get(data[0], 'address')
  }
}
