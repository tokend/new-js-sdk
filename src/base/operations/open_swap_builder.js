import isUndefined from 'lodash/isUndefined'

import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { Hyper } from 'js-xdr'
import { Hasher } from '../util/hasher'

export class OpenSwapBuilder {
  static prepareAttrs (opts) {
    let attrs = {}

    if (!Keypair.isValidBalanceKey(opts.sourceBalance)) {
      throw new TypeError('sourceBalance is invalid')
    }

    if (Keypair.isValidPublicKey(opts.destination)) {
      attrs.destination = new xdr.OpenSwapOpDestination.account(
        Keypair.fromAccountId(opts.destination).xdrAccountId()
      )
    } else if (Keypair.isValidBalanceKey(opts.destination)) {
      attrs.destination = new xdr.OpenSwapOpDestination.balance(
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
      OpenSwapBuilder.ensureFeeValid(opts.feeData.sourceFee)
    } catch (e) {
      throw new TypeError('sourceFee.' + e.message)
    }

    try {
      OpenSwapBuilder.ensureFeeValid(opts.feeData.destinationFee)
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
    attrs.feeData = new xdr.PaymentFeeData({
      sourceFee,
      destinationFee,
      sourcePaysForDest: opts.feeData.sourcePaysForDest,
      ext: new xdr.PaymentFeeDataExt(xdr.LedgerVersion.emptyVersion())
    })

    if (isUndefined(opts.details)) {
      throw new Error('details is invalid')
    }

    attrs.details = JSON.stringify(opts.details)
    attrs.sourceBalance = Keypair.fromBalanceId(opts.sourceBalance).xdrBalanceId()
    attrs.amount = BaseOperation._toUnsignedXDRAmount(opts.amount)
    attrs.secretHash = Hasher.hash(opts.secretHash)
    attrs.lockTime = Hyper.fromString(opts.lockTime)

    attrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

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
   * Creates OpenSwap operation where destination is AccountID or BalanceID
   * @param {object} opts
   * @param {string} opts.sourceBalance
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
   * @param {string} opts.secretHash
   * @param {string} opts.lockTime
   * @param {object} opts.details
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.OpenSwapOp}
   */
  static openSwap (opts) {
    let attrs = OpenSwapBuilder.prepareAttrs(opts)
    let openSwapOp = new xdr.OpenSwapOp(attrs)
    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.openSwap(openSwapOp)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static openSwapToObject (result, attrs) {
    result.sourceBalance = BaseOperation.balanceIdtoString(attrs.sourceBalance())
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
    result.details = JSON.parse(attrs.details())
    result.secretHash = attrs.secretHash().toString('hex')
    result.lockTime = attrs.lockTime().toString()

    return result
  }
}
