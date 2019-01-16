import { KEY_VALUE_ENTRY_TYPES } from '../../src/const'

import { ManageKeyValueBuilder } from '../../src/base'
import { NotFoundError } from '../../src/errors'
import { Helper } from './_helper'

export class KeyValue extends Helper {
  async getEntryValue (key) {
    try {
      const { data } = await this.sdk.horizon.keyValue.get(key)
      return data.type.value
    } catch (e) {
      if (e instanceof NotFoundError) {
        return null
      } else {
        throw e
      }
    }
  }

  putEntries (entries) {
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

  delete (key) {
    return this.submit(ManageKeyValueBuilder.deleteKeyValue({ key }))
  }
}
