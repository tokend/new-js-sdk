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
   * Create mass operation request. Build on top of data request.
   * @param {object} opts
   * @param {string|number} opts.requestID - set to zero to create new request
   * @param {string} opts.type
   * @param {object} opts.value
   * @param {string[]} opts.value.blobs
   * @param {string} opts.owner
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.CreateDataCreationRequestOp}
   */
  static createMassOperationsRequest (opts) {
    validators.validateArray({ value: opts.value.blobs, fieldName: 'opts.value.blobs', minLength: 1, maxLength: 1000 })

    return this.createDataCreationRequest(opts)
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
    result.creatorDetails = JSON.parse(request.creatorDetails())
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

  /**
     * Create data update operation
     * @param {object} opts
     * @param {string|number} opts.requestID - set to zero to create new request
     * @param {string | number } opts.id - id of the data entry to update
     * @param {object} opts.value
     * @param {object} opts.creatorDetails
     * @param {number|string} opts.allTasks
     * @param {string} [opts.source] - The source account for the operation.
     * @returns {xdr.CreateDataUpdateRequestOp}
     */
  static createDataUpdateRequest (opts) {
    validators.validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })

    let request = this.validateDataUpdateRequest(opts)

    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      allTasks: opts.allTasks,
      dataUpdateRequest: request,
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CreateDataUpdateRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createDataUpdateRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * @param {string} opts.requestID
     * **/
  static cancelDataUpdateRequest (opts) {
    validators.validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })

    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CancelDataUpdateRequestOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CancelDataUpdateRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.cancelDataUpdateRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * @param {object} opts.value
     * @param {string | number } opts.id - id of the data to update
     * @param {object} opts.creatorDetails
     * @param {number} opts.sequenceNumber
     * @param {string} opts.owner
     **/
  static validateDataUpdateRequest (opts) {
    let attrs = {}

    validators.validateUint64({ value: opts.id, fieldName: 'opts.id' })
    validators.validateCreatorDetails({ value: opts.value, fieldName: 'opts.value' })
    validators.validateCreatorDetails({ value: opts.creatorDetails, fieldName: 'opts.creatorDetails' })

    if (isUndefined(opts.sequenceNumber) || opts.sequenceNumber < 0) {
      opts.sequenceNumber = 0
    }
    attrs.sequenceNumber = opts.sequenceNumber

    attrs.value = JSON.stringify(opts.value)
    attrs.creatorDetails = JSON.stringify(opts.creatorDetails)
    attrs.id = UnsignedHyper.fromString(opts.id)
    attrs.ext = new xdr.DataUpdateRequestExt(xdr.LedgerVersion.emptyVersion())

    return new xdr.DataUpdateRequest(attrs)
  }

  static dataUpdateRequestToObject (result, attributes) {
    let request = attributes.dataUpdateRequest()

    result.id = request.id().toString()
    result.value = JSON.parse(request.value())
    result.sequenceNumber = request.sequenceNumber().toString()
  }

  static createDataUpdateRequestToObject (result, attributes) {
    let dataUpdateRequest = {}
    this.dataUpdateRequestToObject(dataUpdateRequest, attributes)

    result.dataUpdateRequest = dataUpdateRequest
    result.requestID = attributes.requestId().toString()
    result.allTasks = attributes.allTasks()
  }

  static cancelDataUpdateRequestToObject (result, attributes) {
    result.requestID = attributes.requestId().toString()
  }

  /**
   * Create data remove operation
   * @param {object} opts
   * @param {string|number} opts.requestID - set to zero to create new request
   * @param {string | number } opts.id - id of the data entry to remove
   * @param {object} opts.creatorDetails
   * @param {number|string} opts.allTasks
   * @param {string} [opts.source] - The source account for the operation.
   * @returns {xdr.CreateDataRemoveRequestOp}
   */
  static createDataRemoveRequest (opts) {
    validators.validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })

    let request = this.validateDataRemoveRequest(opts)

    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      allTasks: opts.allTasks,
      dataRemoveRequest: request,
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CreateDataRemoveRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createDataRemoveRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * @param {string} opts.requestID
   * **/
  static cancelDataRemoveRequest (opts) {
    validators.validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })

    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CancelDataRemoveRequestOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CancelDataRemoveRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.cancelDataRemoveRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * @param {string | number } opts.id - id of the data to remove
   * @param {object} opts.creatorDetails
   * @param {number} opts.sequenceNumber
   * @param {string} opts.owner
   **/
  static validateDataRemoveRequest (opts) {
    let attrs = {}

    validators.validateUint64({ value: opts.id, fieldName: 'opts.id' })
    validators.validateCreatorDetails({ value: opts.creatorDetails, fieldName: 'opts.creatorDetails' })

    if (isUndefined(opts.sequenceNumber) || opts.sequenceNumber < 0) {
      opts.sequenceNumber = 0
    }
    attrs.sequenceNumber = opts.sequenceNumber

    attrs.creatorDetails = JSON.stringify(opts.creatorDetails)
    attrs.id = UnsignedHyper.fromString(opts.id)
    attrs.ext = new xdr.DataRemoveRequestExt(xdr.LedgerVersion.emptyVersion())

    return new xdr.DataRemoveRequest(attrs)
  }

  static dataRemoveRequestToObject (result, attributes) {
    let request = attributes.dataRemoveRequest()

    result.id = request.id().toString()
    result.sequenceNumber = request.sequenceNumber().toString()
  }

  static createDataRemoveRequestToObject (result, attributes) {
    let dataRemoveRequest = {}
    this.dataRemoveRequestToObject(dataRemoveRequest, attributes)

    result.dataRemoveRequest = dataRemoveRequest
    result.requestID = attributes.requestId().toString()
    result.allTasks = attributes.allTasks()
  }

  static cancelDataRemoveRequestToObject (result, attributes) {
    result.requestID = attributes.requestId().toString()
  }

  /**
     * Create data owner update operation
     * @param {object} opts
     * @param {string|number} opts.requestID - set to zero to create new request
     * @param {object} opts.updateDataOwnerOp
     * @param {object} opts.creatorDetails
     * @param {number|string} opts.allTasks
     * @param {string} [opts.source] - The source account for the operation.
     * @returns {xdr.CreateDataOwnerUpdateRequestOp}
     */
  static createDataOwnerUpdateRequest (opts) {
    validators.validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })
    let request = this.validateDataOwnerUpdateRequest(opts)
    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      allTasks: opts.allTasks,
      dataOwnerUpdateRequest: request,
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CreateDataOwnerUpdateRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createDataOwnerUpdateRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * @param {string} opts.requestID
     * **/
  static cancelDataOwnerUpdateRequest (opts) {
    validators.validateUint64({ value: opts.requestID, fieldName: 'opts.requestID' })

    let attributes = {
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CancelDataOwnerUpdateRequestOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CancelDataOwnerUpdateRequestOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.cancelDataOwnerUpdateRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * @param {object} opts.updateDataOwnerOp
     * @param {string | number } opts.id - id of the data to update owner
     * @param {object} opts.creatorDetails
     * @param {number} opts.sequenceNumber
     **/
  static validateDataOwnerUpdateRequest (opts) {
    let attrs = {}

    validators.validateCreatorDetails({ value: opts.creatorDetails, fieldName: 'opts.creatorDetails' })

    if (isUndefined(opts.sequenceNumber) || opts.sequenceNumber < 0) {
      opts.sequenceNumber = 0
    }
    attrs.sequenceNumber = opts.sequenceNumber

    attrs.updateDataOwnerOp = opts.updateDataOwnerOp
    attrs.creatorDetails = JSON.stringify(opts.creatorDetails)
    attrs.ext = new xdr.DataOwnerUpdateRequestExt(xdr.LedgerVersion.emptyVersion())

    return new xdr.DataOwnerUpdateRequest(attrs)
  }

  static dataOwnerUpdateRequestToObject (result, attributes) {
    let request = attributes.dataOwnerUpdateRequest()

    result.id = request.id().toString()
    result.updateDataOwnerOp = request.updateDataOwnerOp().toString()
    result.sequenceNumber = request.sequenceNumber().toString()
  }

  static createDataOwnerUpdateRequestToObject (result, attributes) {
    let dataOwnerUpdateRequest = {}
    this.dataOwnerUpdateRequestToObject(dataOwnerUpdateRequest, attributes)

    result.dataOwnerUpdateRequest = dataOwnerUpdateRequest()
    result.requestID = attributes.requestId().toString()
    result.allTasks = attributes.allTasks()
  }

  static cancelDataOwnerUpdateRequestToObject (result, attributes) {
    result.requestID = attributes.requestId().toString()
  }
}
