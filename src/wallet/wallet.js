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
   * @param {Keypair|string} signingKeypair User's key pair or a secret seed.
   * @param {string} accountId User's account ID.
   * @param {string} [walletId] Wallet ID.
   * @param {string} [sessionId] Session ID.
   * @param {string} [sessionKey] Session key.
   * @param {Array} [keypairs] array of {@link Keypair} or strings(secret seed) which saved in key storage
   */
  constructor (
    email,
    signingKeypair,
    accountId,
    walletId,
    sessionId,
    sessionKey,
    keypairs = []
  ) {
    if (isNil(email)) {
      throw new Error('Email is required.')
    }

    this._checkIfKeypairIsValid(signingKeypair)

    if (isString(signingKeypair)) {
      signingKeypair = Keypair.fromSecret(signingKeypair)
    }

    if (!Keypair.isValidPublicKey(accountId)) {
      throw new Error('Invalid account ID.')
    }

    if (walletId && !isString(walletId)) {
      throw new Error('Hex encoded wallet ID expected.')
    }

    if (sessionId && !isString(sessionId)) {
      throw new Error('Hex encoded session ID expected.')
    }

    if (sessionKey && !isString(sessionKey)) {
      throw new Error('Hex encoded session key expected.')
    }

    keypairs = keypairs.map(item => {
      this._checkIfKeypairIsValid(item)
      if (isString(item)) {
        return item
      }
      return item.secret()
    })

    keypairs = Array.from(new Set([
      signingKeypair.secret(),
      ...keypairs
    ]))
      .map(item => Keypair.fromSecret(item))
    this._email = email
    this._signingKeypair = signingKeypair
    this._accountId = accountId
    this._id = walletId
    this._sessionId = sessionId
    this._sessionKey = sessionKey
    this._keypairs = keypairs
  }

  /**
   * Generate a new wallet.
   *
   * @param {string} email User's email.
   * @param {string} [accountId] User's account ID.
   * @param {Array} [keypairs] array of {@link Keypair} or strings(secret seed) which saved in key storage
   *
   * @return {Wallet} The new wallet.
   */
  static generate (email, accountId = null, keypairs = []) {
    let keypair = Keypair.random()
    accountId = accountId || keypair.accountId()

    return new Wallet(
      email,
      keypair,
      accountId,
      null,
      null,
      null,
      [
        keypair,
        ...keypairs
      ]
    )
  }

  /**
   * Decrypt a wallet obtained from a wallet server.
   *
   * @param {object} opts
   * @param {object} opts.keychainData Encrypted wallet seed.
   * @param {object} opts.kdfParams Scrypt params used for encryption.
   * @param {string} opts.salt Salt used for encryption.
   * @param {string} opts.email User's email.
   * @param {string} opts.password User's password.
   * @param {string} opts.sessionId Session id.
   * @param {string} opts.sessionKey Session key.
   * @param {string} [opts.accountId] User's account ID.
   */
  static fromEncrypted (opts) {
    let rawMasterKey = crypto.calculateMasterKey(
      opts.salt,
      opts.email,
      opts.password,
      opts.kdfParams
    )
    let rawWalletId = crypto.deriveWalletId(rawMasterKey)
    let rawWalletKey = crypto.deriveWalletKey(rawMasterKey)
    let decryptedKeychain = JSON.parse(
      crypto.decryptData(opts.keychainData, rawWalletKey)
    )

    const mainSeed = decryptedKeychain.seed || decryptedKeychain.seeds[0]
    const allSeeds = decryptedKeychain.seeds || [mainSeed]
    return new Wallet(
      opts.email,
      Keypair.fromSecret(mainSeed),
      opts.accountId || decryptedKeychain.accountId,
      sjcl.codec.hex.fromBits(rawWalletId),
      opts.sessionId,
      opts.sessionKey,
      allSeeds
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

  /** @returns {Wallet} New wallet */
  static clone (wallet) {
    if (!(wallet instanceof Wallet)) {
      throw new TypeError('the arg should be a Wallet instance')
    }
    return new Wallet(
      wallet._email,
      wallet._signingKeypair,
      wallet._accountId,
      wallet._id,
      wallet._sessionId,
      wallet._sessionKey,
      wallet._keypairs
    )
  }

  clone () {
    return Wallet.clone(this)
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
    return this._signingKeypair.secret()
  }

  /**
   * Secret seeds which saved in key storage.
   */
  get secretSeeds () {
    return this._keypairs.map(item => item.secret())
  }

  /**
   * Get signing keypair.
   */
  get keypair () {
    return this._signingKeypair
  }

  /**
   * Get all keypairs.
   */
  get keypairs () {
    return this._keypairs
  }

  get nonSigningKeypairs () {
    const curKpId = this._signingKeypair.accountId()
    return this._keypairs.filter(el => el.accountId() !== curKpId)
  }

  /**
   * Get session ID.
   */
  get sessionId () {
    return this._sessionId
  }

  /**
   * Get session key.
   */
  get sessionKey () {
    return this._sessionKey
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
      seeds: this.secretSeeds
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
      this._signingKeypair,
      recoveryKeypair.accountId()
    )

    return recoveryWallet.encrypt(kdfParams, recoveryKeypair.secret())
  }

  switchSigningKeypair (kpPubKey) {
    if (!Keypair.isValidPublicKey(kpPubKey)) {
      throw new TypeError(`The argument should be a valid public key`)
    }

    const kp = this._keypairs.find(el => el.accountId() === kpPubKey)
    if (!kp) {
      throw new ReferenceError(`The wallet does not contain a keypair with the provided public key: ${kpPubKey}`)
    }

    this.useSigningKeypair(kp)
    return this
  }

  /**
   * Set signing Keypair
   *
   * @param {Keypair} keypair signing Keypair.
   */
  useSigningKeypair (keypair) {
    this._checkIfKeypairIsValid(keypair)
    if (isString(keypair)) {
      this._signingKeypair = Keypair.fromSecret(keypair)
    } else {
      this._signingKeypair = keypair
    }
  }

  _checkIfKeypairIsValid (keypair) {
    if (isNil(keypair)) {
      throw new Error('No keypair provided.')
    } else if (isString(keypair)) {
      if (!Keypair.isValidSecretKey(keypair)) {
        throw new Error('One of secret seed invalid.')
      }
    } else if (!(keypair instanceof Keypair)) {
      throw new Error('One of keypair invalid. Expected a Keypair instance or a string seed.')
    }
  }
}
