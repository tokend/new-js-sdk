// vendored from http://cryptocoinjs.com/modules/misc/bs58/

// Base58 encoding/decoding
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc

let ALPHABET = 'gsphnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCr65jkm8oFqi1tuvAxyz'
let ALPHABET_MAP = {}
for (let i = 0; i < ALPHABET.length; ++i) {
  ALPHABET_MAP[ALPHABET.charAt(i)] = i
}
let BASE = 58

function encode (buffer) {
  if (buffer.length === 0) return ''

  let i
  let j
  let digits = [0]
  for (i = 0; i < buffer.length; ++i) {
    for (j = 0; j < digits.length; ++j) digits[j] <<= 8

    digits[0] += buffer[i]

    let carry = 0
    for (j = 0; j < digits.length; ++j) {
      digits[j] += carry

      carry = (digits[j] / BASE) | 0
      digits[j] %= BASE
    }

    while (carry) {
      digits.push(carry % BASE)

      carry = (carry / BASE) | 0
    }
  }

  // deal with leading zeros
  for (i = 0; buffer[i] === 0 && i < buffer.length - 1; ++i) digits.push(0)

  // convert digits to a string
  let str = ''
  for (i = digits.length - 1; i >= 0; --i) {
    str += ALPHABET[digits[i]]
  }

  return str
}

function decode (string) {
  if (string.length === 0) return []

  let i
  let j
  let bytes = [0]
  for (i = 0; i < string.length; ++i) {
    let c = string[i]
    if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character')

    for (j = 0; j < bytes.length; ++j) bytes[j] *= BASE
    bytes[0] += ALPHABET_MAP[c]

    let carry = 0
    for (j = 0; j < bytes.length; ++j) {
      bytes[j] += carry

      carry = bytes[j] >> 8
      bytes[j] &= 0xff
    }

    while (carry) {
      bytes.push(carry & 0xff)

      carry >>= 8
    }
  }

  // deal with leading zeros
  for (i = 0; string[i] === 'g' && i < string.length - 1; ++i) bytes.push(0)

  return bytes.reverse()
}

module.exports = {
  encode: encode,
  decode: decode
}
