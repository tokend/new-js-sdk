import { reduce, isString } from 'lodash'
import crypto from 'crypto'
import sjcl from 'sjcl-tokend'

const ivLength = 96 / 8 // bytes

export function deriveWalletId (masterKey) {
  return deriveFromKeyFunction('WALLET_ID', masterKey)
}

export function deriveWalletKey (masterKey) {
  return deriveFromKeyFunction('WALLET_KEY', masterKey)
}

function deriveFromKeyFunction (token, masterKey) {
  // eslint-disable-next-line new-cap
  let hmac = new sjcl.misc.hmac(masterKey, sjcl.hash.sha256)
  return hmac.encrypt(token)
}

export function randomBytes (length) {
  let buffer = Buffer.alloc(length)
  crypto.randomFillSync(buffer)

  return buffer
}

export function encryptData (data, key) {
  if (!isString(data)) {
    throw new TypeError('data must be a String.')
  }

  let cipherName = 'aes'
  let modeName = 'gcm'

  let cipher = new sjcl.cipher[cipherName](key)
  let rawIV = randomBytes(ivLength).toString('hex')
  let encryptedData = sjcl.mode[modeName].encrypt(
    cipher,
    sjcl.codec.utf8String.toBits(data),
    rawIV
  )

  data = JSON.stringify({
    IV: sjcl.codec.base64.fromBits(rawIV),
    cipherText: sjcl.codec.base64.fromBits(encryptedData),
    cipherName: cipherName,
    modeName: modeName
  })

  return base64Encode(data)
}

export function decryptData (encryptedData, key) {
  let rawCipherText
  let rawIV
  let cipherName
  let modeName
  try {
    let resultObject = JSON.parse(base64Decode(encryptedData))
    rawIV = sjcl.codec.base64.toBits(resultObject.IV)
    rawCipherText = sjcl.codec.base64.toBits(resultObject.cipherText)
    cipherName = resultObject.cipherName
    modeName = resultObject.modeName
  } catch (e) {
    throw new Error('Corrupt data.')
  }
  let cipher = new sjcl.cipher[cipherName](key)
  let rawData = sjcl.mode[modeName].decrypt(cipher, rawCipherText, rawIV)
  return sjcl.codec.utf8String.fromBits(rawData)
}

export function calculateMasterKey (s0, email, password, kdfParams) {
  if (kdfParams.id === 2) {
    email = email.toLowerCase()
  }
  let versionBits = sjcl.codec.hex.toBits('0x01')
  let s0Bits = sjcl.codec.base64.toBits(s0)
  let emailBits = sjcl.codec.utf8String.toBits(email)
  let unhashedSaltBits = reduce(
    [versionBits, s0Bits, emailBits],
    sjcl.bitArray.concat
  )
  let salt = sjcl.hash.sha256.hash(unhashedSaltBits)

  return sjcl.misc.scrypt(
    password,
    salt,
    kdfParams.n,
    kdfParams.r,
    kdfParams.p,
    kdfParams.bits
  )
}

function base64Encode (str) {
  return (Buffer.from(str)).toString('base64')
}

function base64Decode (str) {
  return (Buffer.from(str, 'base64')).toString()
}
