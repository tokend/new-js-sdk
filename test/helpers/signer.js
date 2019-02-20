import { Helper } from './_helper'

export class Signer extends Helper {
  /**
   * @param opts
   * @param opts.id
   */
  getBasicSignerData (opts) {
    return {
      publicKey: opts.id,
      roleID: '1',
      weight: '1000',
      identity: '1',
      details: {}
    }
  }
}
