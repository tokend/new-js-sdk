import isUndefined from 'lodash/isUndefined'

import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class PaymentV2Builder {
  static prepareAttrs (opts) {
    let attrs = {}

    if (!Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
      throw new TypeError('sourceBalanceId is invalid')
    }

    if (Keypair.isValidPublicKey(opts.destination)) {
      attrs.destination = new xdr.PaymentOpV2Destination.account(
        Keypair.fromAccountId(opts.destination).xdrAccountId()
      )
    } else if (Keypair.isValidBalanceKey(opts.destination)) {
      attrs.destination = new xdr.PaymentOpV2Destination.balance(
        Keypair.fromBalanceId(opts.destination).xdrBalanceId()
      )
    } else {
      throw new TypeError('opts.destination is invalid')
    }

    if (!BaseOperation.isValidAmount(opts.amount)) {
      throw new TypeError('amount argument must be of type String and represent a positive number')
    }

    if (isUndefined(opts.feeData)) {
      throw new Error('feeData argument must be defined')
    }

    try {
      PaymentV2Builder.ensureFeeValid(opts.feeData.sourceFee)
    } catch (e) {
      throw new TypeError('sourceFee.' + e.message)
    }

    try {
      PaymentV2Builder.ensureFeeValid(opts.feeData.destinationFee)
    } catch (e) {
      throw new TypeError('destination.' + e.message)
    }
    let sourceFee = new xdr.Fee({
      percent: BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.percent),
      fixed: BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.fixed),
      ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
    })
    let destinationFee = new xdr.Fee({
      percent: BaseOperation._toUnsignedXDRAmount(
        opts.feeData.destinationFee.percent
      ),
      fixed: BaseOperation._toUnsignedXDRAmount(
        opts.feeData.destinationFee.fixed
      ),
      ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
    })
    attrs.feeData = new xdr.PaymentFeeDataV2({
      sourceFee,
      destinationFee,
      sourcePaysForDest: opts.feeData.sourcePaysForDest,
      ext: new xdr.PaymentFeeDataV2Ext(xdr.LedgerVersion.emptyVersion())
    })

    if (!BaseOperation.isValidSubject(opts.subject)) {
      throw new Error('subject argument must be of type String 0-256 long')
    }

    if (isUndefined(opts.reference)) {
      opts.reference = ''
    }

    attrs.sourceBalanceId = Keypair.fromBalanceId(opts.sourceBalanceId).xdrBalanceId()
    attrs.amount = BaseOperation._toUnsignedXDRAmount(opts.amount)
    attrs.subject = opts.subject
    attrs.reference = opts.reference
    attrs.ext = new xdr.PaymentOpV2Ext(xdr.LedgerVersion.emptyVersion())

    return attrs
  }

  static ensureFeeValid (fee) {
    if (!BaseOperation.isValidAmount(fee.fixed, true)) {
      throw new TypeError('fixed fee must be of type String and represent a positive number')
    }

    if (!BaseOperation.isValidAmount(fee.percent, true)) {
      throw new TypeError('fixed fee must be of type String and represent a positive number')
    }
  }

  /**
   * Creates PaymentV2 operation where destination is AccountID or BalanceID
   * @param {object} opts
   * @param {string} opts.sourceBalanceId
   * @param {string} opts.destination
   * @param {number|string} opts.amount
   * @param {object} opts.feeData
   * * @param {object} opts.feeData.sourceFee
   * * * @param {number|string} opts.feeData.sourceFee.percent
   * * * @param {number|string} opts.feeData.sourceFee.fixed
   * * @param {object} opts.feeData.destinationFee
   * * * @param {number|string} opts.feeData.destinationFee.percent
   * * * @param {number|string} opts.feeData.destinationFee.fixed
   * * @param {bool} opts.feeData.sourcePaysForDest
   * @param {string} opts.subject
   * @param {string} opts.reference
   * @returns {xdr.PaymentOpV2}
   */
  static paymentV2 (opts) {
    let attrs = PaymentV2Builder.prepareAttrs(opts)
    let paymentV2 = new xdr.PaymentOpV2(attrs)
    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.paymentV2(paymentV2)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static paymentV2ToObject (result, attrs) {
    result.sourceBalanceId = BaseOperation.balanceIdtoString(attrs.sourceBalanceId())
    switch (attrs.destination().switch()) {
      case xdr.PaymentDestinationType.account(): {
        result.destination = BaseOperation.accountIdtoAddress(attrs.destination().accountId())
        break
      }
      case xdr.PaymentDestinationType.balance(): {
        result.destination = BaseOperation.balanceIdtoString(attrs.destination().balanceId())
        break
      }
    }
    result.amount = BaseOperation._fromXDRAmount(attrs.amount())
    result.feeData = {
      sourceFee: {
        fixed: BaseOperation._fromXDRAmount(
          attrs.feeData().sourceFee().fixed()
        ),
        percent: BaseOperation._fromXDRAmount(
          attrs.feeData().sourceFee().percent()
        )
      },
      destinationFee: {
        fixed: BaseOperation._fromXDRAmount(
          attrs.feeData().destinationFee().fixed()
        ),
        percent: BaseOperation._fromXDRAmount(
          attrs.feeData().destinationFee().percent()
        )
      },
      sourcePaysForDest: attrs.feeData().sourcePaysForDest()
    }
    result.subject = attrs.subject().toString()
    result.reference = attrs.reference().toString()

    return result
  }
}
