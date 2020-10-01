import { isUndefined } from 'lodash'
import {
  validateAmount,
  validateBalanceKey,
  validateCreatorDetails,
  validatePublicKey, validateUint64
} from '../../utils/validators'
import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'

export class CreateDeferredPaymentCreationRequestBuilder {
  /**
   * Create deferred payment creation request operation
   * @param {object} opts
   * @param {string|number} opts.requestID - set to zero to create new request
   * @param {string} opts.sourceBalanceId
   * @param {string} opts.destination
   * @param {number|string} opts.amount
   * @param {number} opts.sequenceNumber
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.Operation}
   */
  static createDeferredPaymentCreationRequest (opts) {
    if (isUndefined(opts.sequenceNumber) || opts.sequenceNumber < 0) {
      opts.sequenceNumber = 0
    }
    this._validateRequest(opts)

    let request = new xdr.CreateDeferredPaymentRequest({
      sourceBalance: Keypair.fromBalanceId(opts.sourceBalanceId).xdrBalanceId(),
      destination: Keypair.fromAccountId(opts.destination).xdrAccountId(),
      amount: BaseOperation._toUnsignedXDRAmount(opts.amount),
      sequenceNumber: opts.sequenceNumber,
      creatorDetails: JSON.stringify(opts.creatorDetails),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    })

    let attrs = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      allTasks: opts.allTasks,
      request: request,
      ext: new xdr.CreateDeferredPaymentCreationRequestOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let opBody = new xdr.CreateDeferredPaymentCreationRequestOp(attrs)
    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.createDeferredPaymentCreationRequest(opBody)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  /**
   * @param {string} opts.requestID
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.Operation}
   */
  static cancelDeferredPaymentCreationRequest (opts) {
    validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })

    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CancelDeferredPaymentCreationRequestOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CancelDeferredPaymentCreationRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.cancelDeferredPaymentCreationRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static _validateRequest (opts) {
    validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })
    validateBalanceKey({ value: opts.sourceBalanceId, fieldName: 'opts.sourceBalanceId' })
    validatePublicKey({ value: opts.destination, fieldName: 'opts.destination' })
    validateAmount({ value: opts.amount, fieldName: 'opts.amount' })
    validateCreatorDetails({ value: opts.creatorDetails, fieldName: 'opts.creatorDetails' })
  }

  static createDeferredPaymentCreationRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    result.allTasks = attrs.allTasks()
    result.sourceBalanceId = BaseOperation.balanceIdtoString(attrs.request().sourceBalance())
    result.destination = BaseOperation.accountIdtoAddress(attrs.request().destination())
    result.amount = BaseOperation._fromXDRAmount(attrs.request().amount())
    result.creatorDetails = JSON.parse(attrs.request().creatorDetails())
    result.sequenceNumber = attrs.request().sequenceNumber().toString()

    return result
  }

  static cancelDeferredPaymentCreationRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()

    return result
  }
}
