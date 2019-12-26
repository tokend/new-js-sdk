import xdr from '../generated/xdr_generated'
import { UnsignedHyper } from 'js-xdr'
import { BaseOperation } from './base_operation'
import { validateCreatorDetails, validateUint64 } from '../../utils/validators'

export class ManageDataBuilder {
  /**
   * Create new data for source account.
   * @param {object} opts
   * @param {string} opts.securityType - security type of data
   * @param {object} opts.value - json object
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.CreateDataOp}
   */
  static createData (opts) {
    validateCreatorDetails({
      value: opts.value,
      fieldName: opts.value
    })

    let attrs = {
      securityType: Number.parseInt(opts.securityType, 10),
      value: JSON.stringify(opts.value),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.CreateDataOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createData(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Update existing data for source account.
   * Create new data for source account.
   * @param {object} opts
   * @param {string} opts.dataID - id of data
   * @param {object} opts.value - json object
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.UpdateDataOp}
   */
  static updateData (opts) {
    validateCreatorDetails({
      value: opts.value,
      fieldName: opts.value
    })
    validateUint64({
      value: opts.dataID,
      fieldName: 'opts.dataID',
      min: 1
    })

    let attrs = {
      dataID: UnsignedHyper.fromString(opts.dataID),
      value: JSON.stringify(opts.value),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.UpdateDataOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.updateData(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Delete existing data for source account.
   * @param {object} opts
   * @param {string} opts.dataID - public key of existing data
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.RemoveDataOp}
   */
  static removeData (opts) {
    validateUint64({
      value: opts.dataID,
      fieldName: 'opts.dataID',
      min: 1
    })

    let attrs = {
      dataID: UnsignedHyper.fromString(opts.dataID),
      ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
    }

    let op = new xdr.RemoveDataOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.removeData(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static updateDataToObject (result, attrs) {
    result.value = JSON.parse(attrs.value())
    result.securityType = attrs.securityType().toString()
    result.dataID = attrs.dataID().toString()
  }

  static removeDataToObject (result, attrs) {
    result.dataID = attrs.dataID().toString()
  }

  static createDataToObject (result, attrs) {
    result.value = JSON.parse(attrs.value())
    result.securityType = attrs.securityType().toString()
  }
}
