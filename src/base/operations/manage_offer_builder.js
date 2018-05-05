import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'

export class ManageOfferBuilder {
  /**
     * Returns an XDR ManageOffer. A "manage offer" operations creates offer.
     * @param {object} opts
     * @param {string} opts.baseBalance
     * @param {string} opts.quoteBalance
     * @param {boolean} opts.isBuy - if true - buys base asset, false - sells base asset
     * @param {number|string} opts.amount - Amount of the base asset
     * @param {number|string} opts.price - Price of the offer
     * @param {number|string} opts.orderBookID - 0 - for secondary market, otherwise to participate in sale
     * @returns {xdr.ManageBalanceOp}
     */
  static manageOffer (opts) {
    let attributes = {
      ext: new xdr.ManageOfferOpExt(xdr.LedgerVersion.emptyVersion())
    }

    if (!Keypair.isValidBalanceKey(opts.baseBalance)) {
      throw new Error('baseBalance is invalid')
    }

    if (!Keypair.isValidBalanceKey(opts.quoteBalance)) {
      throw new Error('quoteBalance is invalid')
    }

    if (typeof (opts.isBuy) !== 'boolean') {
      throw new Error('isBuy must be boolean')
    }

    if (!BaseOperation.isValidAmount(opts.amount, true)) {
      throw new TypeError(
        'amount argument must be of type String and represent a positive number or zero'
      )
    }
    attributes.amount = BaseOperation._toXDRAmount(opts.amount)

    if (!BaseOperation.isValidAmount(opts.price, true)) {
      throw new TypeError(
        'price argument must be of type String and represent a positive number or zero'
      )
    }
    attributes.price = BaseOperation._toXDRAmount(opts.price)

    if (!BaseOperation.isValidAmount(opts.fee, true)) {
      throw new TypeError(
        'fee argument must be of type String and represent a positive number or zero'
      )
    }
    attributes.fee = BaseOperation._toXDRAmount(opts.fee)

    if (isUndefined(opts.offerID)) {
      opts.offerID = '0'
    }

    if (isUndefined(opts.orderBookID)) {
      opts.orderBookID = '0'
    }

    attributes.offerId = UnsignedHyper
      .fromString(opts.offerID)
    attributes.orderBookId = UnsignedHyper
      .fromString(opts.orderBookID)
    attributes.baseBalance = Keypair
      .fromBalanceId(opts.baseBalance)
      .xdrBalanceId()
    attributes.quoteBalance = Keypair
      .fromBalanceId(opts.quoteBalance)
      .xdrBalanceId()
    attributes.isBuy = opts.isBuy

    let manageOfferOp = new xdr.ManageOfferOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageOffer(manageOfferOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Returns an XDR ManageOffer. A "manage offer" operations deletes offer.
     * @param {object} opts
     * @param {string} opts.baseBalance
     * @param {string} opts.quoteBalance
     * @param {string} opts.price
     * @param {number|string} opts.offerID - offer id
     * @param {number|string} opts.orderBookID - 0 - for secondary market, otherwise to participate in sale
     * @returns {xdr.ManageBalanceOp}
     */
  static cancelOffer (opts) {
    opts.isBuy = true
    opts.amount = '0'
    opts.fee = '0'
    opts.price = '1'
    return ManageOfferBuilder.manageOffer(opts)
  }

  static manageOfferOpToObject (result, attrs) {
    result.amount = BaseOperation._fromXDRAmount(attrs.amount())
    result.price = BaseOperation._fromXDRAmount(attrs.price())
    result.fee = BaseOperation._fromXDRAmount(attrs.fee())
    result.isBuy = attrs.isBuy()
    result.baseBalance = BaseOperation.balanceIdtoString(attrs.baseBalance())
    result.quoteBalance = BaseOperation.balanceIdtoString(attrs.quoteBalance())
    result.offerID = attrs.offerId().toString()
    result.orderBookID = attrs.orderBookId().toString()
  }
}
