import { BaseOperation } from './base_operation'
import xdr from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import isString from 'lodash/isString'
import { UnsignedHyper } from 'js-xdr'

export class ManageKeyValueBuilder {
  /**
   * Creates put key value operation
   * @param {object} opts
   *
   * @param {string} opts.key
   * @param {number|string} opts.value
   * @param {number} opts.entryType
   * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
   *
   * @returns {xdr.PutKeyValueOp}
   */
  static putKeyValue (opts) {
    let attributes = {}

    let value
    if (isNaN(opts.value) || opts.entryType === xdr.KeyValueEntryType.string().value) {
      value = new xdr.KeyValueEntryValue.string(opts.value)
    } else if (isUndefined(opts.entryType) ||
      opts.entryType === xdr.KeyValueEntryType.uint32().value) {
      value = new xdr.KeyValueEntryValue.uint32(Number(opts.value))
    } else if (opts.entryType === xdr.KeyValueEntryType.uint64().value) {
      value = new xdr.KeyValueEntryValue.uint64((UnsignedHyper.fromString(opts.value)))
    } else {
      throw new Error('Cannot figure out value type')
    }

    if (isUndefined(opts.key)) {
      throw new Error('key_value key must be defined')
    }
    if (!isString(opts.key)) {
      throw new Error('key_value key must be string')
    }

    attributes.value = value
    attributes.key = opts.key

    attributes.key = opts.key
    attributes.ext = new xdr.PutKeyValueOpExt(xdr.LedgerVersion.emptyVersion())

    let op = new xdr.PutKeyValueOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.putKeyValue(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Creates delete key value operation
   * @param {object} opts
   *
   * @param {string} opts.key
   *
   * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
   *
   * @returns {xdr.RemoveKeyValueOp}
   */
  static deleteKeyValue (opts) {
    if (isUndefined(opts.key)) {
      throw new Error('key_value key must be defined')
    }
    if (!isString(opts.key)) {
      throw new Error('key_value key must be string')
    }

    let attributes = {
      key: opts.key
    }

    attributes.ext = new xdr.RemoveKeyValueOpExt(xdr.LedgerVersion.emptyVersion())

    let op = new xdr.RemoveKeyValueOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.removeKeyValue(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static putKeyValueOpToObject (result, attrs) {
    result.key = attrs.key().toString()
    let value = attrs.value()
    switch (value.switch()) {
      case xdr.KeyValueEntryType.string():
        result.value = value.stringValue().toString()
        break
      case xdr.KeyValueEntryType.uint32():
        result.value = value.ui32Value().toString()
        break
      case xdr.KeyValueEntryType.uint64():
        result.value = value.ui64Value().toString()
        break
    }
  }

  static removeKeyValueOpToObject (result, attrs) {
    result.key = attrs.key().toString()
  }
}
