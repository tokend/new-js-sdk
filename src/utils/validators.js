/**
 * Example of use:
 *
 * ```js
 * import { validateUndefined } from './validators'
 *
 * function someFunction (someParam) {
 *   validateUndefined({
 *     value: someParam,
 *     fieldName: 'Some field'
 *   })
 *
 *   // do something with someParam
 * }
 * ```
 */

import _isUndefined from 'lodash/isUndefined'
import _isArray from 'lodash/isArray'
import _isEmpty from 'lodash/isEmpty'
import _isObject from 'lodash/isObject'

import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

import { default as xdr } from './base/generated/xdr_generated'

// common types
export function validateUndefined ({ value, fieldName = '' }) {
  if (_isUndefined(value)) {
    throw new TypeError(_composeErrorMessage({
      value,
      statement: `should be defined`,
      fieldName
    }))
  }
}

export function validateNaN ({ value, fieldName = '' }) {
  if (Number.isNaN(Number(value))) {
    throw new TypeError(_composeTypeErrorMessage({
      value,
      statement: 'should be not NaN',
      fieldName
    }))
  }
}

export function validateArray ({ value, fieldName = '', minLength }) {
  if (!_isArray(value)) {
    throw new TypeError(_composeTypeErrorMessage({
      value,
      expectedType: 'array',
      fieldName
    }))
  }

  if (value.length < minLength) {
    throw new Error(_composeErrorMessage({
      value,
      statement: `must have minimum length of ${minLength}`,
      fieldName
    }))
  }
}

export function validateString ({ value, fieldName = '', minLength, maxLength }) {
  if (!BaseOperation.isValidString(value, minLength, maxLength)) {
    throw new TypeError(_composeErrorMessage({
      value,
      statement: 'must be a valid string',
      fieldName
    }))
  }
}

// keys
export function validatePublicKey ({ value, fieldName = '' }) {
  if (!Keypair.isValidPublicKey(value)) {
    throw new TypeError(_composeTypeErrorMessage({
      value,
      expectedType: 'public key',
      fieldName
    }))
  }
}

export function validateSecretKey ({ value, fieldName = '' }) {
  if (!Keypair.isValidSecretKey(value)) {
    throw new TypeError(_composeTypeErrorMessage({
      value,
      expectedType: 'secret key',
      fieldName
    }))
  }
}

export function validateBalanceKey ({ value, fieldName = '' }) {
  if (!Keypair.isValidBalanceKey(value)) {
    throw new TypeError(_composeTypeErrorMessage({
      value,
      expectedType: 'balance key',
      fieldName
    }))
  }
}

// fields
export function validateAmount ({
  value,
  fieldName = '',
  allowZero = false,
  max = undefined,
  min = undefined
}) {
  if (!BaseOperation.isValidAmount(value, allowZero, max, min)) {
    throw new TypeError(_composeErrorMessage({
      value,
      statement: `should be a valid int64 amount`,
      fieldName
    }))
  }
}

export function validateSubject ({ value, fieldName = '' }) {
  if (!BaseOperation.isValidSubject(value)) {
    throw new TypeError(_composeErrorMessage({
      value,
      statement: `must be of type String 0-256 long`,
      fieldName
    }))
  }
}

export function validateAssetCode ({ value, fieldName = '' }) {
  if (!BaseOperation.isValidAsset(value)) {
    throw new TypeError(_composeErrorMessage({
      value,
      statement: `must be valid asset code`,
      fieldName
    }))
  }
}

export function validateFeeType ({ value, fieldName = '' }) {
  validateUndefined({ value, fieldName })

  if (!(value instanceof xdr.FeeType)) {
    throw new TypeError(_composeTypeErrorMessage({
      value,
      fieldName,
      expectedType: 'xdr.FeeType'
    }))
  }
}

export function validateCreatorDetails ({ value, fieldName = '' }) {
  const isCreatorDetailsValid = _isObject(value) &&
    !_isEmpty(value) && _isObjectKeysSnakeCased(value)

  if (!isCreatorDetailsValid) {
    throw new TypeError(_composeTypeErrorMessage({
      value,
      statement: 'should be non-empty object with snake_cased keys',
      fieldName
    }))
  }
}

// error messages
function _composeTypeErrorMessage ({ value, expectedType, fieldName = '' }) {
  return _composeErrorMessage({
    value,
    statement: `should be a valid ${expectedType}`,
    fieldName
  })
}

function _composeErrorMessage ({ value, statement, fieldName = '' }) {
  if (fieldName) {
    return `${fieldName} ${statement}, got ${typeof value}: ${value}`
  } else {
    return `${value} ${statement}, got ${typeof value}`
  }
}

function _isObjectKeysSnakeCased (object) {
  const objectKeysDeep = _getObjectKeysDeep(object)
  return !objectKeysDeep.some(item => item.match(/[A-Z | -]/))
}

function _getObjectKeysDeep (object) {
  let result = Object.keys(object)

  for (const key of Object.keys(object)) {
    if (_isObject(object[key])) {
      result = result.concat(_getObjectKeysDeep(object[key]))
    }
  }

  return result
}
