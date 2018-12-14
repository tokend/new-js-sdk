import { BaseOperation } from './base_operation'
import { default as xdr } from '../generated/xdr_generated'
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
   *
   * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
   *
   * @returns {xdr.ManageKeyValueOp}
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

    let KVEntry = new xdr.KeyValueEntry({
      key: opts.key,
      value: value,
      ext: new xdr.KeyValueEntryExt(xdr.LedgerVersion.emptyVersion())
    })

    attributes.action = new xdr.ManageKeyValueOpAction(xdr.ManageKvAction.put(), KVEntry)

    return ManageKeyValueBuilder.createManageKeyValueOp(attributes, opts)
  }

  /**
   * Creates delete key value operation
   * @param {object} opts
   *
   * @param {string} opts.key
   *
   * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
   *
   * @returns {xdr.ManageKeyValueOp}
   */
  static deleteKeyValue (opts) {
    let attributes = {}

    attributes.action = new xdr.ManageKeyValueOpAction(BaseOperation._keyValueActionFromNumber(
      xdr.ManageKvAction.remove().value))

    return ManageKeyValueBuilder.createManageKeyValueOp(attributes, opts)
  }

  static createManageKeyValueOp (attributes, opts) {
    if (isUndefined(opts.key)) {
      throw new Error('key_value key must be defined')
    }
    if (!isString(opts.key)) {
      throw new Error('key_value key must be string')
    }

    attributes.key = opts.key
    attributes.ext = new xdr.ManageKeyValueOpExt(xdr.LedgerVersion.emptyVersion())

    let manageKV = new xdr.ManageKeyValueOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageKeyValue(manageKV)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static manageKeyValueOpToObject (result, attrs) {
    result.key = attrs.key()
    let action = attrs.action().value()
    switch (attrs.action().switch()) {
      case xdr.ManageKvAction.put():
        result.action = new xdr.ManageKvAction.put().value
        switch (action.value().switch()) {
          case xdr.KeyValueEntryType.string():
            result.value = action.value().stringValue().toString()
            break
          case xdr.KeyValueEntryType.uint32():
            result.value = action.value().ui32Value().toString()
            break
          case xdr.KeyValueEntryType.uint64():
            result.value = action.value().ui64Value().toString()
            break
        }
        break
      case xdr.ManageKvAction.remove():
        result.action = new xdr.ManageKvAction.remove().value
        break
      default:
        throw new Error('invalid KV action type')
    }
  }
}
