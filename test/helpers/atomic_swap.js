import { getRequestIdFromResultXdr, Helper } from './_helper'
import { base } from '../../src'

export class AtomicSwap extends Helper {
  /**
   * @param opts
   * @param {string} opts.bidID - id of bid for which request will be created.
   * @param {string} opts.baseAmount - amount which will be bought
   * @param {string} opts.quoteAsset - accepted assets
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the request
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      creatorDetails: {
        name: opts.bidID + ' bid id',
        short_description: 'Short description',
        description: 'Not so short description',
        logo: {
          key: 'gjrhtbejwkrkwqq',
          type: 'image/png'
        }
      }
    }

    const operation = base.CreateAtomicSwapRequestBuilder.createAtomicSwapRequest({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createAtomicSwapRequestResult')
  }
}
