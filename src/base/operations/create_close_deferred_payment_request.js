import { isUndefined } from 'lodash'
import xdr from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import {
  validateAmount,
  validateCreatorDetails,
  validateUint64
} from '../../utils/validators'

export class CreateCloseDeferredPaymentRequestBuilder {
  /**
   * Create deferred payment creation request operation
   * @param {object} opts
   * @param {string|number} opts.requestID - set to zero to create new request
   * @param {string} opts.deferredPaymentID
   * @param {string} opts.destination
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

    let requestAttrs = {
      deferredPaymentId: UnsignedHyper.fromString(opts.deferredPaymentID),
      amount: BaseOperation._toUnsignedXDRAmount(opts.amount),
      sequenceNumber: opts.sequenceNumber,
      creatorDetails: JSON.stringify(opts.creatorDetails),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    if (Keypair.isValidPublicKey(opts.destination)) {
      requestAttrs.destination = new xdr.CloseDeferredPaymentRequestDestination.account(
        Keypair.fromAccountId(opts.destination).xdrAccountId()
      )
    } else {
      requestAttrs.destination = new xdr.CloseDeferredPaymentRequestDestination.balance(
        Keypair.fromBalanceId(opts.destination).xdrAccountId()
      )
    }

    let request = new xdr.CloseDeferredPaymentRequest(requestAttrs)

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
    if (!Keypair.isValidPublicKey(opts.destination) && !Keypair
      .isValidBalanceKey(opts.destination)) {
      throw new TypeError(
        `opts.destination must be a valid balance key, got ${JSON.stringify(opts.destination)}`
      )
    }
    validateAmount({ value: opts.amount, fieldName: 'opts.amount' })
    validateCreatorDetails({ value: opts.creatorDetails, fieldName: 'opts.creatorDetails' })
  }

  static createCloseDeferredPaymentRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    result.allTasks = attrs.allTasks()
    result.deferredPaymentID = attrs.request().deferredPaymentId().toString()
    switch (attrs.request().destination().switch()) {
      case xdr.CloseDeferredPaymentRequestDestination.account().switch(): {
        result.destination = BaseOperation.accountIdtoAddress(
          attrs.request().destination().accountId())
        break
      }
      case xdr.CloseDeferredPaymentRequestDestination.balance().switch(): {
        result.destination = BaseOperation.balanceIdtoString(
          attrs.request().destination().balanceId())
        break
      }
    }
    result.amount = BaseOperation._fromXDRAmount(attrs.request().amount())
    result.creatorDetails = JSON.parse(attrs.request().creatorDetails())
    result.sequenceNumber = attrs.request().sequenceNumber().toString()

    return result
  }

  static cancelCloseDeferredPaymentRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()

    return result
  }
}
