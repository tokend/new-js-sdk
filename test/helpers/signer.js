import { Helper } from './_helper'
import { base } from '../../src'

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
  /**
   * @param opts
   * @param {Keypair} targetAccountKp
   * @param {string} opts.id
   * @param {number} opts.roleID
   * @param {number} opts.weight
   */
  async create (opts, targetAccountKp) {
    const DEFAULTS = this.getBasicSignerData({
      id: opts.id
    })
    const op = base.ManageSignerBuilder.createSigner({
      ...DEFAULTS,
      ...opts
    })
    await this.submit(op, targetAccountKp)
  }
}
