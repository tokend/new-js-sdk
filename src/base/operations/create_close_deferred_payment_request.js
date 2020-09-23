import { isUndefined } from 'lodash'
import xdr from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import {
  validateAmount,
  validateBalanceKey, validateCreatorDetails,
  validateUint64
} from '../../utils/validators'

export class CreateCloseDeferredPaymentRequestBuilder {
  /**
   * Create deferred payment creation request operation
   * @param {object} opts
   * @param {string|number} opts.requestID - set to zero to create new request
   * @param {string} opts.deferredPaymentID
   * @param {string} opts.destinationBalanceID
   * @param {number|string} opts.amount
   * @param {number} opts.sequenceNumber
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.Operation}
   */
  static createCloseDeferredPaymentRequest (opts) {
    if (isUndefined(opts.sequenceNumber) || opts.sequenceNumber < 0) {
      opts.sequenceNumber = 0
    }
    this._validateRequest(opts)

    let request = new xdr.CloseDeferredPaymentRequest({
      deferredPaymentId: UnsignedHyper.fromString(opts.deferredPaymentID),
      destinationBalance: Keypair.fromBalanceId(opts.destinationBalanceID).xdrAccountId(),
      amount: BaseOperation._toUnsignedXDRAmount(opts.amount),
      feeData: this._buildFeeData(opts),
      sequenceNumber: opts.sequenceNumber,
      creatorDetails: JSON.stringify(opts.creatorDetails),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    })

    let attrs = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      allTasks: opts.allTasks,
      request: request,
      ext: new xdr.CreateCloseDeferredPaymentRequestOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let opBody = new xdr.CreateCloseDeferredPaymentRequestOp(attrs)
    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.createCloseDeferredPaymentRequest(opBody)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  /**
   * @param {string} opts.requestID
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.Operation}
   */
  static cancelCloseDeferredPaymentRequest (opts) {
    validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })

    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CancelCloseDeferredPaymentRequestOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CancelCloseDeferredPaymentRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.cancelCloseDeferredPaymentRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static _validateRequest (opts) {
    validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })
    validateUint64({ value: opts.deferredPaymentID, fieldName: 'opts.deferredPaymentID' })
    validateBalanceKey({ value: opts.destinationBalanceID, fieldName: 'opts.destinationBalanceID' })
    validateAmount({ value: opts.amount, fieldName: 'opts.amount' })
    validateCreatorDetails({ value: opts.creatorDetails, fieldName: 'opts.creatorDetails' })
  }

  static _buildFeeData (opts) {
    let sourceFee = new xdr.Fee({
      percent: BaseOperation._toUnsignedXDRAmount('0'),
      fixed: BaseOperation._toUnsignedXDRAmount('0'),
      ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
    })
    let destinationFee = new xdr.Fee({
      percent: BaseOperation._toUnsignedXDRAmount(
        '0'
      ),
      fixed: BaseOperation._toUnsignedXDRAmount(
        '0'
      ),
      ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
    })
    return new xdr.PaymentFeeData({
      sourceFee,
      destinationFee,
      sourcePaysForDest: false,
      ext: new xdr.PaymentFeeDataExt(xdr.LedgerVersion.emptyVersion())
    })
  }

  static createCloseDeferredPaymentRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    result.allTasks = attrs.allTasks()
    result.deferredPaymentID = attrs.request().deferredPaymentId().toString()
    result.destinationBalanceID = BaseOperation
      .balanceIdtoString(attrs.request().destinationBalance())
    result.amount = BaseOperation._fromXDRAmount(attrs.request().amount())
    result.feeData = {
      sourceFee: {
        fixed: '0',
        percent: BaseOperation._fromXDRAmount(
          attrs.request().feeData().sourceFee().percent()
        )
      },
      destinationFee: {
        fixed: BaseOperation._fromXDRAmount(
          attrs.request().feeData().destinationFee().fixed()
        ),
        percent: BaseOperation._fromXDRAmount(
          attrs.request().feeData().destinationFee().percent()
        )
      },
      sourcePaysForDest: attrs.request().feeData().sourcePaysForDest()
    }
    result.creatorDetails = JSON.parse(attrs.request().creatorDetails())
    result.sequenceNumber = attrs.request().sequenceNumber().toString()

    return result
  }

  static cancelCloseDeferredPaymentRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()

    return result
  }
}
