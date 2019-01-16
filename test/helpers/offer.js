import { Helper } from './_helper'
import { ManageOfferBuilder } from '../../src/base'

export class Offer extends Helper {
  /**
   * @param {object} opts
   * @param {string} opts.amount
   * @param {string} opts.baseBalance
   * @param {string} opts.quoteBalance
   * @param {boolean} opts.isBuy
   * @param {string} opts.price
   * @param {string} opts.fee
   * @param {string} opts.orderBookID
   * @param {Keypair} signerKp
   */
  create (opts, signerKp) {
    return this.submit(ManageOfferBuilder.manageOffer(opts), signerKp)
  }
}
