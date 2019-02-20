import { KEY_VALUE_ENTRY_TYPES } from '../../src/const'

import { ManageKeyValueBuilder, xdr } from '../../src/base'
import { NotFoundError } from '../../src/errors'
import { Helper } from './_helper'
import { isUndefined } from 'util';

export class KeyValue extends Helper {
  async getEntryValue(key) {
    try {
      const { data } = await this.sdk.horizon.keyValue.get(key)
      switch (data.type.value) {
        case xdr.KeyValueEntryType.uint32().value:
          return data.uint32Value
        case xdr.KeyValueEntryType.uint64().value:
          return data.uint64Value
        case xdr.KeyValueEntryType.string().value:
          return data.stringValue
        default:
          throw new Error("Unexpected key value entry type: " + data.type.name)
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        return null
      } else {
        throw e
      }
    }
  }

  putEntries(entries) {
    const operations = Object
      .entries(entries)
      .map(([key, value]) => {
        let entryType

        switch (typeof value) {
          case 'string':
            entryType = KEY_VALUE_ENTRY_TYPES.string
            break
          case 'number':
            // TODO: no workaround for uint64
            entryType = KEY_VALUE_ENTRY_TYPES.uint32
            break
          default:
            throw new Error(`Invalid value: ${value}`)
        }

        return { key, value, entryType }
      })
      .map(opts => ManageKeyValueBuilder.putKeyValue(opts))

    return this.submit(operations)
  }

  delete(key) {
    return this.submit(ManageKeyValueBuilder.deleteKeyValue({ key }))
  }
}
