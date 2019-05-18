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
 * @param {string} opts.fieldName The name of the field, containing value.
 *
 * @throws {TypeError} Value should be defined.
 */
export function validateNotUndefined ({ value, fieldName }) {
  if (_isUndefined(value)) {
    throw new TypeError(`${fieldName} must be defined`)
  }
}

/**
 * Validate value to be an array.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} opts.fieldName The name of the field, containing value.
 * @param {number} [opts.minLength] The minimum array length.
 * @param {number} [opts.maxLength] The maximum array length.
 *
 * @throws {TypeError} Value should be an array.
 * @throws {Error} Array should have at least minimum length.
 */
export function validateArray ({ value, fieldName, minLength, maxLength }) {
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
 * @param {string} opts.fieldName The name of the field, containing value.
 * @param {number} [opts.minLength] The minimum string length.
 * @param {number} [opts.maxLength] The maximum string length.
 *
 * @throws {TypeError} Value should be a valid string.
 */
export function validateString ({ value, fieldName, minLength, maxLength }) {
  if (!BaseOperation.isValidString(value, minLength, maxLength)) {
    throw new TypeError(
      `${fieldName} must be a valid string with params: ` +
      `${JSON.stringify({ minLength, maxLength })}, got ${JSON.stringify(value)}`
    )
  }
}

/** Keys validators */

/**
 * Validate value to be a public key.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} opts.fieldName The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a valid public key.
 */
export function validatePublicKey ({ value, fieldName }) {
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
 * @param {string} opts.fieldName The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a valid secret key.
 */
export function validateSecretKey ({ value, fieldName }) {
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
 * @param {string} opts.fieldName The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a valid balance key.
 */
export function validateBalanceKey ({ value, fieldName }) {
  if (!Keypair.isValidBalanceKey(value)) {
    throw new TypeError(
      `${fieldName} must be a valid balance key, got ${JSON.stringify(value)}`
    )
  }
}

/** Fields validators */

/**
 * Validate value to be a double amount string.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} opts.fieldName The name of the field, containing value.
 * @param {boolean} [opts.allowZero] Is zero amount allowed.
 * @param {number} [opts.min] The minimum amount.
 * @param {number} [opts.max] The maximum amount.
 * @param {number} [opts.maxDecimalPlaces] The maximum decimal places allowed.
 *
 * @throws {TypeError} Value should be a valid double amount string.
 */
export function validateAmount ({
  value,
  fieldName,
  allowZero,
  max,
  min,
  maxDecimalPlaces
}) {
  if (!BaseOperation.isValidAmount(value, allowZero, max, min, maxDecimalPlaces)) {
    throw new TypeError(
      `${fieldName} must be a valid double string with params:` +
      `${JSON.stringify({ min, max, allowZero, maxDecimalPlaces })}, ` +
      `got ${JSON.stringify(value)}`
    )
  }
}

/**
 * Validate value to be a double string with specified precision.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} opts.fieldName The name of the field, containing value.
 * @param {number} [opts.min] The minimum amount.
 * @param {number} [opts.max] The maximum amount.
 * @param {number} [opts.maxDecimalPlaces] The maximum decimal places allowed.
 *
 * @throws {TypeError} Value should be a valid double string with specified precision.
 */
export function validateDouble ({
  value,
  fieldName,
  max,
  min,
  maxDecimalPlaces
}) {
  validateAmount({
    value,
    fieldName,
    min,
    max,
    maxDecimalPlaces,
    allowZero: true
  })
}

/**
 * Validate value to be a uint64 string.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} opts.fieldName The name of the field, containing value.
 * @param {number} [opts.min] The minimum amount.
 * @param {number} [opts.max] The maximum amount.
 *
 * @throws {TypeError} Value should be a valid uint64 string.
 */
export function validateUint64 ({
  value,
  fieldName,
  max,
  min
}) {
  validateAmount({
    value,
    fieldName,
    min,
    max,
    maxDecimalPlaces: 0,
    allowZero: true
  })
}

/**
 * Validate value to be an asset code.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} opts.fieldName The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a valid asset code.
 */
export function validateAssetCode ({ value, fieldName }) {
  if (!BaseOperation.isValidAsset(value)) {
    throw new TypeError(
      `${fieldName} must be valid asset code (alphanumeric string` +
      `with the length of 1-16, got ${JSON.stringify(value)}`
    )
  }
}

/**
 * Validate value to be a XDR-specified enum type instance.
 *
 * @param {object} opts
 * @param {xdr.*} opts.type The XDR enum type to validate.
 * @param {*} opts.value The value to validate.
 * @param {string} opts.fieldName The name of the field, containing value.
 *
 * @throws {TypeError} Value should be a XDR-specified enum type instance.
 */
export function validateXdrEnumType ({ value, type, fieldName }) {
  if (!(_isObject(type) && type.enumName)) {
    throw new Error('Invalid XDR enum type provided')
  }

  if (!(value instanceof type)) {
    throw new TypeError(
      `${fieldName} must be a valid xdr.${type.enumName}, got ${JSON.stringify(value)}`
    )
  }
}

/**
 * Validate value to be non-empty object with snake_cased keys.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} opts.fieldName The name of the field, containing value.
 *
 * @throws {TypeError} Value should be non-empty object with snake_cased keys.
 */
export function validateCreatorDetails ({ value, fieldName }) {
  const isValid = _isObject(value) && !_isEmpty(value) &&
    isObjectKeysSnakeCasedDeep(value)

  if (!isValid) {
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
