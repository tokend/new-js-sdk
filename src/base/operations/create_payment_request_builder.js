import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { PaymentBuilder } from './payment_builder'
import { validateCreatorDetails } from '../../utils/validators'
import { isUndefined } from 'lodash'

export class CreatePaymentRequestBuilder {
  /**
   * Creates create payment request
   * @param {object} opts
   * @param {string} opts.sourceBalanceId
   * @param {string} opts.destination
   * @param {number|string} opts.amount
   * @param {object} opts.creatorDetails - details of the operation provided by creator
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
   * @param {number} [opts.allTasks] - Bitmask of all tasks which must be completed for the request approval
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   * @returns {xdr.CreatePaymentRequestOp}
   */
  static createPaymentRequest (opts) {
    let paymentAttrs = PaymentBuilder.prepareAttrs(opts)

    if (isUndefined(opts.creatorDetails)) {
      opts.creatorDetails = {}
    }

    validateCreatorDetails({
      value: opts.creatorDetails,
      fieldName: 'opts.creatorDetails'
    })

    let request = new xdr.CreatePaymentRequest({
      paymentOp: new xdr.PaymentOp(paymentAttrs),
      ext: new xdr.CreatePaymentRequestExt
        .movementRequestsDetail(JSON.stringify(opts.creatorDetails))

    })

    let createPaymentRequestOp = new xdr.CreatePaymentRequestOp({
      request: request,
      allTasks: opts.allTasks,
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}

    opAttrs.body = xdr.OperationBody
      .createPaymentRequest(createPaymentRequestOp)

    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static createPaymentRequestToObject (result, attrs) {
    PaymentBuilder.paymentToObject(result, attrs.request().paymentOp())
    result.allTasks = attrs.allTasks()
    switch (attrs.request().ext().switch()) {
      case xdr.LedgerVersion.emptyVersion(): {
        break
      }
      case xdr.LedgerVersion.movementRequestsDetail(): {
        result.creatorDetails = JSON.parse(attrs.request().ext().creatorDetails())
        break
      }
      default:
        throw new Error('Unexpected version of create payment request')
    }
  }
}
