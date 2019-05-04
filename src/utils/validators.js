import _isUndefined from 'lodash/isUndefined'
import _isArray from 'lodash/isArray'
import _isEmpty from 'lodash/isEmpty'
import _isObject from 'lodash/isObject'

import { BaseOperation } from '../base/operations/base_operation'
import { Keypair } from '../base/keypair'

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
    throw new TypeError(`${fieldName} must be defined`)
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
export function validateArray ({ value, fieldName = '', minLength, maxLength }) {
  if (!_isArray(value)) {
    throw new TypeError(
      `${fieldName} must be a valid array, got ${JSON.stringify(value)}`
    )
  }

  if (minLength && value.length < minLength) {
    throw new Error(
      `${fieldName} must have minimum length of ${minLength}, got ${value.length}`
    )
  }

  if (maxLength && value.length > maxLength) {
    throw new Error(
      `${fieldName} must have maximum length of ${maxLength}, got ${value.length}`
    )
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
    throw new TypeError(
      `${fieldName} must be a valid string with params:
       ${JSON.stringify({ minLength, maxLength })}, got ${JSON.stringify(value)}`
    )
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
    throw new TypeError(
      `${fieldName} must be a valid public key, got ${JSON.stringify(value)}`
    )
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
    throw new TypeError(
      `${fieldName} must be a valid secret key, got ${JSON.stringify(value)}`
    )
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
    throw new TypeError(
      `${fieldName} must be a valid balance key, got ${JSON.stringify(value)}`
    )
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
    throw new TypeError(
      `${fieldName} must be a valid int64 amount with params:
       ${JSON.stringify({ min, max, allowZero })},
       got ${JSON.stringify(value)}`
    )
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
    throw new TypeError(
      `${fieldName} must be valid asset code (alphanumeric string
       with the length of 1-16, got ${JSON.stringify(value)}`
    )
  }
}

/**
 * Validate value to be a specified type instance.
 *
 * @param {object} opts
 * @param {*} opts.type The type to validate.
 * @param {*} opts.value The value to validate.
 * @param {string=} [opts.fieldName] The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a specified type instance.
 */
export function validateType ({ value, type, fieldName = '' }) {
  if (!(value instanceof type)) {
    throw new TypeError(
      `${fieldName} must be a valid ${type.constructor.name},
       got ${JSON.stringify(value)} of type ${value.constructor.name}`
    )
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
    throw new TypeError(
      `${fieldName} must be a non-empty object with snake_cased keys,
       got ${JSON.stringify(value)}`
    )
  }
}

/** @private Helpers */

function isObjectKeysSnakeCasedDeep (object) {
  let result = true

  for (const [key, value] of Object.entries(object)) {
    result &= /^[a-z_\d]+$/.test(key)

    if (_isObject(value)) {
      result &= isObjectKeysSnakeCasedDeep(value)
    }
  }

  return result
}
