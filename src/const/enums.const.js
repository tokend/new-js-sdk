import { xdr } from '../base'

export function xdrEnumToConstant (xdrEnum) {
  xdrEnum = typeof xdrEnum === 'string'
    ? xdr[xdrEnum]
    : xdrEnum

  try {
    const res = {}
    xdrEnum.values().forEach(function (item) { res[item.name] = item.value })
    return res
  } catch (error) {
    throw new Error(`xdrEnumToConstant: Cannot get values from provided xdrEnum (${xdrEnum})`)
  }
}

export const OP_TYPES = Object.freeze(
  xdrEnumToConstant('OperationType')
)

export const KEY_VALUE_ENTRY_TYPES = Object.freeze(
  xdrEnumToConstant('KeyValueEntryType')
)
