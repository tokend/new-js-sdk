import { Helper } from './_helper'
import { ManageOfferBuilder } from '../../src/base'
import { CreateManageOfferRequestBuilder } from '../../src/base/operations/create_manage_offer_request_builder'

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

  /**
   * @param {object} opts
   * @param {string} opts.amount
   * @param {string} opts.baseBalance
   * @param {string} opts.quoteBalance
   * @param {boolean} opts.isBuy
   * @param {string} opts.price
   * @param {string} opts.fee
   * @param {string} opts.orderBookID
   * @param {number} opts.allTasks
   * @param {Keypair} signerKp
   */
  createRequest (opts, signerKp) {
    return this
      .submit(CreateManageOfferRequestBuilder.createManageOfferRequest(opts), signerKp)
  }
}
