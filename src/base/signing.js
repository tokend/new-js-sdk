//  This module provides the signing functionality used by the stellar network
//  The code below may look a little strange... this is because we try to provide
//  the most efficient signing method possible.  First, we try to load the
//  native ed25519 package for node.js environments, and if that fails we
//  fallback to tweetnacl.js

let actualMethods = {}

/**
 * Use this flag to check if fast signing (provided by `ed25519` package) is available.
 * If your app is signing a large number of transaction or verifying a large number
 * of signatures make sure `ed25519` package is installed.
 */
export const FastSigning = checkFastSigning()

export function sign (data, secretKey) {
  return actualMethods.sign(data, secretKey)
}

export function verify (data, signature, publicKey) {
  return actualMethods.verify(data, signature, publicKey)
}

function checkFastSigning () {
  let ed25519Used = false

  let nacl = require('tweetnacl')

  actualMethods.sign = function (data, secretKey) {
    data = Buffer.from(data)
    data = new Uint8Array(data.toJSON().data)
    secretKey = new Uint8Array(secretKey.toJSON().data)

    let signature = nacl.sign.detached(data, secretKey)

    return Buffer.from(signature)
  }

  actualMethods.verify = function (data, signature, publicKey) {
    data = Buffer.from(data)
    data = new Uint8Array(data.toJSON().data)
    signature = new Uint8Array(signature.toJSON().data)
    publicKey = new Uint8Array(publicKey.toJSON().data)

    return nacl.sign.detached.verify(data, signature, publicKey)
  }

  return ed25519Used
}
