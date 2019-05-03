import _isUndefined from 'lodash/isUndefined'
import _isArray from 'lodash/isArray'
import _isEmpty from 'lodash/isEmpty'
import _isObject from 'lodash/isObject'

import { BaseOperation } from '../base/operations/base_operation'
import { Keypair } from '../base/keypair'
import { default as xdr } from '../base/generated/xdr_generated'

/**
 * Validators for encapsulating types checks and throwing errors.
 *
 * @example
 * import { validateNotUndefined } from './validators'
 *
 * function someFunction (someParam) {
 *   validateNotUndefined({
 *     value: someParam,
 *     fieldName: 'Some field'
 *   })
 *
 *   // do something with someParam
 * }
 */

/** Common types validators */

/**
 * Validate value to be not undefined.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} [opts.fieldName] The name of the field, containing value.
 *
 * @throws {TypeError} Value should be defined.
 */
export function validateNotUndefined ({ value, fieldName = '' }) {
  if (_isUndefined(value)) {
    throw new TypeError(composeErrorMessage({
      value,
      statement: `should be defined`,
      fieldName
    }))
  }
}

/**
 * Validate value to be an array.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} [opts.fieldName] The name of the field, containing value.
 * @param {number} [opts.minLength] The minimum array length.
 *
 * @throws {TypeError} Value should be an array.
 * @throws {Error} Array should have at least minimum length.
 */
export function validateArray ({ value, fieldName = '', minLength }) {
  if (!_isArray(value)) {
    throw new TypeError(composeTypeErrorMessage({
      value,
      expectedType: 'array',
      fieldName
    }))
  }

  if (value.length < minLength) {
    throw new Error(composeErrorMessage({
      value,
      statement: `must have minimum length of ${minLength}`,
      fieldName
    }))
  }
}

/**
 * Validate value to be a string.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} [opts.fieldName] The name of the field, containing value.
 * @param {number} [opts.minLength] The minimum string length.
 * @param {number} [opts.maxLength] The maximum string length.
 *
 * @throws {TypeError} Value should be a valid string.
 */
export function validateString ({ value, fieldName = '', minLength, maxLength }) {
  if (!BaseOperation.isValidString(value, minLength, maxLength)) {
    throw new TypeError(composeErrorMessage({
      value,
      statement: 'must be a valid string',
      params: { minLength, maxLength },
      fieldName
    }))
  }
}

/** Keys validators */

/**
 * Validate value to be a public key.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} [opts.fieldName] The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a valid public key.
 */
export function validatePublicKey ({ value, fieldName = '' }) {
  if (!Keypair.isValidPublicKey(value)) {
    throw new TypeError(composeTypeErrorMessage({
      value,
      expectedType: 'public key',
      fieldName
    }))
  }
}

/**
 * Validate value to be a secret key.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} [opts.fieldName] The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a valid secret key.
 */
export function validateSecretKey ({ value, fieldName = '' }) {
  if (!Keypair.isValidSecretKey(value)) {
    throw new TypeError(composeTypeErrorMessage({
      value,
      expectedType: 'secret key',
      fieldName
    }))
  }
}

/**
 * Validate value to be a balance key.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} [opts.fieldName] The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a valid balance key.
 */
export function validateBalanceKey ({ value, fieldName = '' }) {
  if (!Keypair.isValidBalanceKey(value)) {
    throw new TypeError(composeTypeErrorMessage({
      value,
      expectedType: 'balance key',
      fieldName
    }))
  }
}

/** Fields validators */

/**
 * Validate value to be a int64 amount.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} [opts.fieldName] The name of the field, containing value.
 * @param {boolean} [opts.allowZero] Is zero amount allowed.
 * @param {number} [opts.min] The minimum amount.
 * @param {number} [opts.max] The maximum amount.
 *
 * @throws {TypeError} Value should be a valid int64 amount.
 */
export function validateAmount ({
  value,
  fieldName = '',
  allowZero = false,
  max,
  min
}) {
  if (!BaseOperation.isValidAmount(value, allowZero, max, min)) {
    throw new TypeError(composeErrorMessage({
      value,
      statement: 'should be a valid int64 amount',
      params: { min, max },
      fieldName
    }))
  }
}

/**
 * Validate value to be an asset code.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string=} [opts.fieldName] The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a valid asset code.
 */
export function validateAssetCode ({ value, fieldName = '' }) {
  if (!BaseOperation.isValidAsset(value)) {
    throw new TypeError(composeErrorMessage({
      value,
      statement: 'must be valid asset code of type String 1-16 long',
      fieldName
    }))
  }
}

/**
 * Validate value to be a `xdr.FeeType` instance.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string=} [opts.fieldName] The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a `xdr.FeeType` instance.
 */
export function validateFeeType ({ value, fieldName = '' }) {
  if (!(value instanceof xdr.FeeType)) {
    throw new TypeError(composeTypeErrorMessage({
      value,
      fieldName,
      expectedType: 'xdr.FeeType'
    }))
  }
}

/**
 * Validate value to be non-empty object with snake_cased keys.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string=} [opts.fieldName] The name of the field, containing value.
 *
 * @throws {TypeError} Value should be non-empty object with snake_cased keys.
 */
export function validateCreatorDetails ({ value, fieldName = '' }) {
  const isCreatorDetailsValid = _isObject(value) &&
    !_isEmpty(value) && isObjectKeysSnakeCasedDeep(value)

  if (!isCreatorDetailsValid) {
    throw new TypeError(composeTypeErrorMessage({
      value,
      statement: 'should be non-empty object with snake_cased keys',
      fieldName
    }))
  }
}

/** @private Helpers */

function composeTypeErrorMessage ({ value, expectedType, fieldName = '' }) {
  return composeErrorMessage({
    value,
    statement: `should be a valid ${expectedType}`,
    fieldName
  })
}

function composeErrorMessage ({ value, statement, params, fieldName = '' }) {
  const paramsString = composeParamsString(params)
  const errorStatement = paramsString
    ? `${statement} with ${paramsString}`
    : statement

  if (fieldName) {
    return `${fieldName} ${errorStatement}, got ${typeof value}: ${value}`
  } else {
    return `Value ${errorStatement}, got ${typeof value}: ${value}`
  }
}

function composeParamsString (params) {
  if (params) {
    return Object.keys(params)
      .filter(key => !_isUndefined(params[key]))
      .map(key => `${key} = ${params[key]}`)
      .join(', ')
  } else {
    return ''
  }
}

function isObjectKeysSnakeCasedDeep (object) {
  let result = true

  for (const [key, value] of Object.entries(object)) {
    if (_isObject(value)) {
      result &= isObjectKeysSnakeCasedDeep(value)
    } else {
      result &= /^[a-z_\d]+$/.test(key)
    }
  }

  return result
}
