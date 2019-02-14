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

export const REQUEST_TYPES = Object.freeze(
  xdrEnumToConstant('ReviewableRequestType')
)

export const FEE_TYPES = Object.freeze(
  xdrEnumToConstant('FeeType')
)

export const PAYMENT_FEE_SUBTYPES = Object.freeze(
  xdrEnumToConstant('PaymentFeeType')
)

export const ASSET_POLICIES = Object.freeze(
  xdrEnumToConstant('AssetPolicy')
)

export const ASSET_PAIR_POLICIES = Object.freeze(
  xdrEnumToConstant('AssetPairPolicy')
)

export const ACCOUNT_TYPES = Object.freeze(
  xdrEnumToConstant('AccountType')
)

export const OP_TYPES = Object.freeze(
  xdrEnumToConstant('OperationType')
)

export const SALE_TYPES = Object.freeze(
  xdrEnumToConstant('SaleType')
)

export const KEY_VALUE_ENTRY_TYPES = Object.freeze(
  xdrEnumToConstant('KeyValueEntryType')
)

export const CHECK_SALE_STATE_EFFECTS = Object.freeze(
  xdrEnumToConstant('CheckSaleStateEffect')
)

export const REVIEW_REQUEST_OP_ACTION = Object.freeze(
  xdrEnumToConstant('ReviewRequestOpAction')
)
