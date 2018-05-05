import isUndefined from 'lodash/isUndefined'
import isString from 'lodash/isString'

export class Hasher {
  /**
     * Creates and returns a `xdr.Hash`.
     * @param {array|string} hash - 32 byte hash or hex encoded string
     * @returns {xdr.Hash}
     */
  static hash (hash) {
    let error = new Error('Expects a 32 byte hash value or hex encoded string. Got ' + hash)

    if (isUndefined(hash)) {
      throw error
    }

    if (isString(hash)) {
      if (!/^[0-9A-Fa-f]{64}$/g.test(hash)) {
        throw error
      }
      hash = Buffer.from(hash, 'hex')
    }

    if (!hash.length || hash.length !== 32) {
      throw error
    }

    return hash
  }
}
