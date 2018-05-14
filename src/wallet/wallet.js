import { Keypair } from '../base'
import sjcl from 'sjcl-tokend'
import * as crypto from './crypto'
import { isNil, isString } from 'lodash'

/**
 * Manages user's key pair.
 *
 * @class
 */
export class Wallet {
  /**
   * Create a new instance from user's key pair.
   *
   * @constructor
   *
   * @param {string} email User's email.
   * @param {Keypair|string} keypair User's key pair or a secret seed.
   * @param {string} accountId User's account ID.
   * @param {string} [walletId] Wallet ID.
   */
  constructor (email, keypair, accountId, walletId) {
    if (isNil(email)) {
      throw new Error('Email is required.')
    }

    if (isNil(keypair)) {
      throw new Error('No keypair provided.')
    } else if (isString(keypair)) {
      if (!Keypair.isValidSecretKey(keypair)) {
        throw new Error('Invalid secret seed.')
      }
      keypair = Keypair.fromSecret(keypair)
    } else if (!(keypair instanceof Keypair)) {
      throw new Error('Invalid keypair. Expected a Keypair instance or a string seed.')
    }

    if (!Keypair.isValidPublicKey(accountId)) {
      throw new Error('Invalid account ID.')
    }

    if (walletId && !isString(walletId)) {
      throw new Error('Hex encoded wallet ID expected.')
    }

    this._email = email
    this._keypair = keypair
    this._accountId = accountId
    this._id = walletId
  }

  /**
   * Generate a new wallet.
   *
   * @param {string} email User's email.
   * @param {string} [accountId] User's account ID.
   *
   * @return {Wallet} The new wallet.
   */
  static generate (email, accountId = null) {
    let keypair = Keypair.random()
    accountId = accountId || keypair.accountId()

    return new Wallet(
      email,
      keypair,
      accountId
    )
  }

  /**
   * Decrypt a wallet obtained from a wallet server.
   *
   * @param {object} keychainData Encrypted wallet seed.
   * @param {object} kdfParams Scrypt params used for encryption.
   * @param {string} salt Salt used for encryption.
   * @param {string} email User's email.
   * @param {string} password User's password.
   */
  static fromEncrypted (keychainData, kdfParams, salt, email, password) {
    let rawMasterKey = crypto.calculateMasterKey(
      salt,
      email,
      password,
      kdfParams
    )
    let rawWalletId = crypto.deriveWalletId(rawMasterKey)
    let rawWalletKey = crypto.deriveWalletKey(rawMasterKey)
    let decryptedKeychain = JSON.parse(
      crypto.decryptData(keychainData, rawWalletKey)
    )

    return new Wallet(
      email,
      Keypair.fromSecret(decryptedKeychain.seed),
      decryptedKeychain.accountId,
      sjcl.codec.hex.fromBits(rawWalletId)
    )
  }

  /**
   * Restore recovery wallet from a recovery seed.
   *
   * @param {object} kdfParams Scrypt params.
   * @param {string} salt Salt used for encryption.
   * @param {string} email User's email.
   * @param {string} recoverySeed User's recovery seed.
   */
  static fromRecoverySeed (kdfParams, salt, email, recoverySeed) {
    let recoveryKeypair = Keypair.fromSecret(recoverySeed)
    let walletId = Wallet.deriveId(email, recoverySeed, kdfParams, salt)

    return new Wallet(
      email,
      recoveryKeypair,
      recoveryKeypair.accountId(),
      walletId
    )
  }

  /**
   * Derive the wallet ID.
   *
   * @param {string} email
   * @param {string} password
   * @param {object} kdfParams
   * @param {string} salt
   *
   * @return {string} Wallet ID.
   */
  static deriveId (email, password, kdfParams, salt) {
    let masterKey = crypto.calculateMasterKey(salt, email, password, kdfParams)
    let walletId = crypto.deriveWalletId(masterKey)

    return sjcl.codec.hex.fromBits(walletId)
  }

  /**
   * Wallet ID.
   */
  get id () {
    if (!this._id) {
      throw new Error('This wallet has no wallet ID yet.')
    }

    return this._id
  }

  /**
   * Account ID.
   */
  get accountId () {
    return this._accountId
  }

  /**
   * Email used for login.
   */
  get email () {
    return this._email
  }

  /**
   * Secret seed.
   */
  get secretSeed () {
    return this._keypair.secret()
  }

  /**
   * Get signing keypair.
   */
  get keypair () {
    return this._keypair
  }

  /**
   * Encrypt wallet to securely store it.
   *
   * @param {object} kdfParams Scrypt params.
   * @param {string} password User's password.
   * @return {object} Encrypted keychain and metadata.
   */
  encrypt (kdfParams, password) {
    if (isNil(kdfParams)) {
      throw new Error('KDF params required')
    }
    if (!isString(password) || password.length === 0) {
      throw new TypeError('Password must be a non-empty string')
    }

    let salt = crypto.randomBytes(16).toString('base64')
    let masterKey = crypto.calculateMasterKey(
      salt,
      this.email,
      password,
      kdfParams
    )

    // Decrypt keychain
    let walletKey = crypto.deriveWalletKey(masterKey)
    let rawKeychainData = {
      accountId: this.accountId,
      seed: this._keypair.secret()
    }
    let keychainData = crypto.encryptData(
      JSON.stringify(rawKeychainData),
      walletKey
    )

    // Derive wallet ID
    let rawWalletId = crypto.deriveWalletId(masterKey)
    this._id = sjcl.codec.hex.fromBits(rawWalletId)

    return {
      id: this._id,
      accountId: this.accountId,
      email: this.email,
      salt,
      keychainData
    }
  }

  /**
   * Generate wallet recovery data.
   *
   * @param {object} kdfParams Scrypt params.
   * @param {Keypair} recoveryKeypair Recovery keypair.
   */
  encryptRecoveryData (kdfParams, recoveryKeypair) {
    let recoveryWallet = new Wallet(
      this.email,
      this._keypair,
      recoveryKeypair.accountId()
    )

    return recoveryWallet.encrypt(kdfParams, recoveryKeypair.secret())
  }
}
