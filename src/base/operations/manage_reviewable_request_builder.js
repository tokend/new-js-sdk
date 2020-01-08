import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import {
  validateArray,
  validateCreatorDetails,
  validateUint64
} from '../../utils/validators'
import { CreateAccountBuilder } from './create_account_builder'
import { PaymentBuilder } from './payment_builder'
import { ManageSignerBuilder } from './manage_signer_builder'
import { InitiateKYCRecoveryBuilder } from './initiate_kyc_recovery_builder'
import { IssuanceBuilder } from './issuance_builder'
import { KYCRecoveryBuilder } from './kyc_recovery_builder'
import { ManageKeyValueBuilder } from './manage_key_value_builder'
import { ChangeAccountRolesBuilder } from './change_account_roles_builder'
import { UnsignedHyper } from 'js-xdr'

export class ReviewableRequestBuilder {
  /**
   * Creates operation to create reviewable request
   * @param {object} opts
   * @param {array} opts.operations - operations to be put in reviewable request
   * @param {string} opts.securityType - security type of the request
   * @param {string} opts.creatorDetails - details about the reason due to which alert was raised
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   *
   * @returns {xdr.CreateReviewableRequestOp}
   */
  static createReviewableRequest (opts) {
    validateUint64({
      value: opts.securityType,
      fieldName: 'opts.securityType',
      min: 1
    })
    validateCreatorDetails({
      value: opts.creatorDetails,
      fieldName: 'opts.creatorDetails'
    })
    validateArray({
      value: opts.operations,
      fieldName: 'opts.operations',
      minLength: 1,
      maxLength: 100
    })

    let rrOperations = []
    for (let op of opts.operations) {
      rrOperations.push(this.convertOperationToReviewableRequestOperation(op))
    }

    let attributes = {
      creatorDetails: JSON.stringify(opts.creatorDetails),
      securityType: opts.securityType,
      operations: rrOperations
    }

    let createRequest = new xdr.CreateReviewableRequestOp(attributes)

    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.createReviewableRequest(createRequest)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Creates operation to update reviewable request
   * @param {object} opts
   * @param {string} opts.requestID - id of the reviewable request to update
   * @param {array} opts.operations - operations to be put in reviewable request
   * @param {string} opts.creatorDetails - details about the reason due to which alert was raised
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   *
   * @returns {xdr.UpdateReviewableRequestOp}
   */
  static updateReviewableRequest (opts) {
    validateUint64({
      value: opts.requestID,
      fieldName: 'opts.requestID',
      min: 1
    })
    validateCreatorDetails({
      value: opts.creatorDetails,
      fieldName: 'opts.creatorDetails'
    })
    validateArray({
      value: opts.operations,
      fieldName: 'opts.operations',
      minLength: 1,
      maxLength: 100
    })

    let rrOperations = []
    for (let op of opts.operations) {
      rrOperations.push(this.convertOperationToReviewableRequestOperation(op))
    }

    let attributes = {
      creatorDetails: JSON.stringify(opts.creatorDetails),
      requestId: UnsignedHyper.fromString(opts.requestID),
      operations: rrOperations,
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let updateRequest = new xdr.UpdateReviewableRequestOp(attributes)

    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.updateReviewableRequest(updateRequest)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Creates operation to remove reviewable request
   * @param {object} opts
   * @param {string} opts.requestID - id of the reviewable request to update
   * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
   *
   * @returns {xdr.RemoveReviewableRequestOp}
   */
  static removeReviewableRequest (opts) {
    validateUint64({
      value: opts.requestID,
      fieldName: 'opts.requestID',
      min: 1
    })
    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let removeRequest = new xdr.RemoveReviewableRequestOp(attributes)

    let opAttributes = {}
    opAttributes.body = new xdr.OperationBody.removeReviewableRequest(removeRequest)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Converts the XDR Operation object to the XDR Reviewable request operation
   * operation.
   * @param {xdr.Operation} operation - An XDR Operation.
   * @return {xdr.ReviewableRequestOperation}
   */
  static convertOperationToReviewableRequestOperation (operation) {
    let result = {}

    switch (operation.body().switch()) {
      case xdr.OperationType.createReviewableRequest():
      case xdr.OperationType.updateReviewableRequest():
      case xdr.OperationType.removeReviewableRequest():
      case xdr.OperationType.reviewRequest():
        throw new Error('Invalid operation')
      case xdr.OperationType.createAccount():
        result = xdr.ReviewableRequestOperation.createAccount(operation.body().createAccount())
        break
      case xdr.OperationType.payment():
        result = xdr.ReviewableRequestOperation.payment(operation.body().value())
        break
      case xdr.OperationType.createSigner():
        result = xdr.ReviewableRequestOperation.createSigner(operation.body().createSigner())
        break
      case xdr.OperationType.updateSigner():
        result = xdr.ReviewableRequestOperation.updateSigner(operation.body().updateSigner())
        break
      case xdr.OperationType.removeSigner():
        result = xdr.ReviewableRequestOperation.removeSigner(operation.body().removeSigner())
        break
      case xdr.OperationType.initiateKycRecovery():
        result = xdr.ReviewableRequestOperation
          .initiateKycRecovery(operation.body().initiateKycRecovery())
        break
      case xdr.OperationType.issuance():
        result = xdr.ReviewableRequestOperation.issuance(operation.body().issuance())
        break
      case xdr.OperationType.kycRecovery():
        result = xdr.ReviewableRequestOperation.kycRecovery(operation.body().kycRecovery())
        break
      case xdr.OperationType.putKeyValue():
        result = xdr.ReviewableRequestOperation.putKeyValue(operation.body().putKeyValue())
        break
      case xdr.OperationType.removeKeyValue():
        result = xdr.ReviewableRequestOperation
          .removeKeyValue(operation.body().removeKeyValue())
        break
      case xdr.OperationType.changeAccountRole():
        result = xdr.ReviewableRequestOperation
          .changeAccountRole(operation.body().changeAccountRole())
        break
      default:
        throw new Error('Unsupported operation')
    }

    return result
  }

  static createReviewableRequestOperationToObject (result, attrs) {
    result.securityType = attrs.securityType().toString()
    result.creatorDetails = JSON.parse(attrs.creatorDetails().toString())
    let operations = []
    for (let rrOp of attrs.operations()) {
      operations.push(this.reviewableRequestOperationToObject(rrOp))
    }
    result.operations = operations
  }

  static updateReviewableRequestOperationToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    result.creatorDetails = JSON.parse(attrs.creatorDetails().toString())
    let operations = []
    for (let rrOp of attrs.operations()) {
      operations.push(this.reviewableRequestOperationToObject(rrOp))
    }
    result.operations = operations
  }

  static removeReviewableRequestOperationToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
  }

  /**
   * Converts the XDR ReviewableRequestOperation object to the opts object used to create the XDR
   * operation.
   * @param {xdr.ReviewableRequestOperation} operation - An XDR Operation.
   * @return {Operation}
   */
  static reviewableRequestOperationToObject (operation) {
    let result = {}

    let attrs = operation.value()
    result.type = operation.switch().name
    switch (operation.switch()) {
      case xdr.OperationType.createAccount():
        CreateAccountBuilder.createAccountToObject(result, attrs)
        break
      case xdr.OperationType.payment():
        PaymentBuilder.paymentToObject(result, attrs)
        break
      case xdr.OperationType.createSigner():
        ManageSignerBuilder.createSignerToObject(result, attrs)
        break
      case xdr.OperationType.updateSigner():
        ManageSignerBuilder.updateSignerToObject(result, attrs)
        break
      case xdr.OperationType.removeSigner():
        ManageSignerBuilder.removeSignerToObject(result, attrs)
        break
      case xdr.OperationType.initiateKycRecovery():
        InitiateKYCRecoveryBuilder.initiateKYCRecoveryToObject(result, attrs)
        break
      case xdr.OperationType.issuance():
        IssuanceBuilder.issuanceToObject(result, attrs)
        break
      case xdr.OperationType.kycRecovery():
        KYCRecoveryBuilder.kycRecoveryOpToObject(result, attrs)
        break
      case xdr.OperationType.putKeyValue():
        ManageKeyValueBuilder.putKeyValueOpToObject(result, attrs)
        break
      case xdr.OperationType.removeKeyValue():
        ManageKeyValueBuilder.removeKeyValueOpToObject(result, attrs)
        break
      case xdr.OperationType.changeAccountRole():
        ChangeAccountRolesBuilder.changeAccountRolesOpToObject(result, attrs)
        break
      default:
        throw new Error('Unknown operation')
    }
    return result
  }
}
