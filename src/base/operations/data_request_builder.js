import xdr from '../generated/xdr_generated'
import { UnsignedHyper } from 'js-xdr'
import * as validators from '../../utils/validators'
import { BaseOperation } from './base_operation'
import isUndefined from 'lodash/isUndefined'
import { Keypair } from '../keypair'

export class DataRequestBuilder {
  /**
     * Create data operation
     * @param {object} opts
     * @param {string|number} opts.requestID - set to zero to create new request
     * @param {string} opts.type
     * @param {object} opts.value
     * @param {string} opts.owner
     * @param {object} opts.creatorDetails
     * @param {number|string} opts.allTasks
     * @param {string} [opts.source] - The source account for the operation.
     * @returns {xdr.CreateDataCreationRequestOp}
     */
  static createDataCreationRequest (opts) {
    validators.validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })

    let request = this.validateDataCreationRequest(opts)

    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      allTasks: opts.allTasks,
      dataCreationRequest: request,
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CreateDataCreationRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createDataCreationRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * @param {string} opts.requestID
     * **/
  static cancelDataCreationRequest (opts) {
    validators.validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })

    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CancelDataCreationRequestOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CancelDataCreationRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.cancelDataCreationRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * @param {string} opts.type
     * @param {object} opts.value
     * @param {object} opts.creatorDetails
     * @param {number} opts.sequenceNumber
     * @param {string} opts.owner
     **/
  static validateDataCreationRequest (opts) {
    let attrs = {}

    validators.validateUint64({ value: opts.type, fieldName: 'opts.type' })
    validators.validateCreatorDetails({ value: opts.value, fieldName: 'opts.value' })
    validators.validateCreatorDetails({ value: opts.creatorDetails, fieldName: 'opts.creatorDetails' })
    validators.validatePublicKey({ value: opts.owner, fieldName: 'opts.owner' })

    let accountID = Keypair.fromAccountId(opts.owner).xdrPublicKey()

    if (isUndefined(opts.sequenceNumber) || opts.sequenceNumber < 0) {
      opts.sequenceNumber = 0
    }
    attrs.sequenceNumber = opts.sequenceNumber

    attrs.value = JSON.stringify(opts.value)
    attrs.creatorDetails = JSON.stringify(opts.creatorDetails)
    attrs.owner = accountID
    attrs.type = UnsignedHyper.fromString(opts.type)
    attrs.ext = new xdr.DataCreationRequestExt(xdr.LedgerVersion.emptyVersion())

    return new xdr.DataCreationRequest(attrs)
  }

  static dataCreationRequestToObject (result, attributes) {
    let request = attributes.dataCreationRequest()

    result.type = request.type().toString()
    result.value = JSON.parse(request.value())
    result.owner = BaseOperation.accountIdtoAddress(request.owner())
    result.sequenceNumber = request.sequenceNumber().toString()
  }

  static createDataCreationRequestToObject (result, attributes) {
    let dataCreationRequest = {}
    this.dataCreationRequestToObject(dataCreationRequest, attributes)

    result.dataCreationRequest = dataCreationRequest
    result.requestID = attributes.requestId().toString()
    result.allTasks = attributes.allTasks()
  }

  static cancelDataCreationRequestToObject (result, attributes) {
    result.requestID = attributes.requestId().toString()
  }
}
