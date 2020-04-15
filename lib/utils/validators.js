"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.validateNotUndefined = validateNotUndefined;
exports.validateArray = validateArray;
exports.validateString = validateString;
exports.validatePublicKey = validatePublicKey;
exports.validateSecretKey = validateSecretKey;
exports.validateBalanceKey = validateBalanceKey;
exports.validateAmount = validateAmount;
exports.validateDouble = validateDouble;
exports.validateUint64 = validateUint64;
exports.validateAssetCode = validateAssetCode;
exports.validateXdrEnumType = validateXdrEnumType;
exports.validateCreatorDetails = validateCreatorDetails;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _base_operation = require("../base/operations/base_operation");

var _keypair = require("../base/keypair");

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
function validateNotUndefined(_ref) {
  var value = _ref.value,
      fieldName = _ref.fieldName;

  if ((0, _isUndefined2.default)(value)) {
    throw new TypeError("".concat(fieldName, " must be defined"));
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


function validateArray(_ref2) {
  var value = _ref2.value,
      fieldName = _ref2.fieldName,
      minLength = _ref2.minLength,
      maxLength = _ref2.maxLength;

  if (!(0, _isArray2.default)(value)) {
    throw new TypeError("".concat(fieldName, " must be a valid array, got ").concat((0, _stringify.default)(value)));
  }

  if (minLength && value.length < minLength) {
    throw new Error("".concat(fieldName, " must have minimum length of ").concat(minLength, ", got ").concat(value.length));
  }

  if (maxLength && value.length > maxLength) {
    throw new Error("".concat(fieldName, " must have maximum length of ").concat(maxLength, ", got ").concat(value.length));
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


function validateString(_ref3) {
  var value = _ref3.value,
      fieldName = _ref3.fieldName,
      minLength = _ref3.minLength,
      maxLength = _ref3.maxLength;

  if (!_base_operation.BaseOperation.isValidString(value, minLength, maxLength)) {
    throw new TypeError("".concat(fieldName, " must be a valid string with params: ") + "".concat((0, _stringify.default)({
      minLength: minLength,
      maxLength: maxLength
    }), ", got ").concat((0, _stringify.default)(value)));
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


function validatePublicKey(_ref4) {
  var value = _ref4.value,
      fieldName = _ref4.fieldName;

  if (!_keypair.Keypair.isValidPublicKey(value)) {
    throw new TypeError("".concat(fieldName, " must be a valid public key, got ").concat((0, _stringify.default)(value)));
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


function validateSecretKey(_ref5) {
  var value = _ref5.value,
      fieldName = _ref5.fieldName;

  if (!_keypair.Keypair.isValidSecretKey(value)) {
    throw new TypeError("".concat(fieldName, " must be a valid secret key, got ").concat((0, _stringify.default)(value)));
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


function validateBalanceKey(_ref6) {
  var value = _ref6.value,
      fieldName = _ref6.fieldName;

  if (!_keypair.Keypair.isValidBalanceKey(value)) {
    throw new TypeError("".concat(fieldName, " must be a valid balance key, got ").concat((0, _stringify.default)(value)));
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


function validateAmount(_ref7) {
  var value = _ref7.value,
      fieldName = _ref7.fieldName,
      allowZero = _ref7.allowZero,
      max = _ref7.max,
      min = _ref7.min,
      maxDecimalPlaces = _ref7.maxDecimalPlaces;

  if (!_base_operation.BaseOperation.isValidAmount(value, allowZero, max, min, maxDecimalPlaces)) {
    throw new TypeError("".concat(fieldName, " must be a valid double string with params:") + "".concat((0, _stringify.default)({
      min: min,
      max: max,
      allowZero: allowZero,
      maxDecimalPlaces: maxDecimalPlaces
    }), ", ") + "got ".concat((0, _stringify.default)(value)));
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


function validateDouble(_ref8) {
  var value = _ref8.value,
      fieldName = _ref8.fieldName,
      max = _ref8.max,
      min = _ref8.min,
      maxDecimalPlaces = _ref8.maxDecimalPlaces;
  validateAmount({
    value: value,
    fieldName: fieldName,
    min: min,
    max: max,
    maxDecimalPlaces: maxDecimalPlaces,
    allowZero: true
  });
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


function validateUint64(_ref9) {
  var value = _ref9.value,
      fieldName = _ref9.fieldName,
      max = _ref9.max,
      min = _ref9.min;
  validateAmount({
    value: value,
    fieldName: fieldName,
    min: min,
    max: max,
    maxDecimalPlaces: 0,
    allowZero: true
  });
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


function validateAssetCode(_ref10) {
  var value = _ref10.value,
      fieldName = _ref10.fieldName;

  if (!_base_operation.BaseOperation.isValidAsset(value)) {
    throw new TypeError("".concat(fieldName, " must be valid asset code (alphanumeric string") + "with the length of 1-16, got ".concat((0, _stringify.default)(value)));
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


function validateXdrEnumType(_ref11) {
  var value = _ref11.value,
      type = _ref11.type,
      fieldName = _ref11.fieldName;

  if (!((0, _isObject2.default)(type) && type.enumName)) {
    throw new Error('Invalid XDR enum type provided');
  }

  if (!(value instanceof type)) {
    throw new TypeError("".concat(fieldName, " must be a valid xdr.").concat(type.enumName, ", got ").concat((0, _stringify.default)(value)));
  }
}
/**
 * Validate value to be non-empty object with snake_cased keys.
 *
 * @param {object} opts
 * @param {*} opts.value The value to validate.
 * @param {string} opts.fieldName The name of the field, containing value.
 * @param {Boolean} opts.validateWithoutSnakeCased Validate value with or without snake_cased.
 *
 * @throws {TypeError} Value should be non-empty object with snake_cased keys.
 */


function validateCreatorDetails(_ref12) {
  var value = _ref12.value,
      fieldName = _ref12.fieldName,
      _ref12$validateWithou = _ref12.validateWithoutSnakeCased,
      validateWithoutSnakeCased = _ref12$validateWithou === void 0 ? false : _ref12$validateWithou;
  var validateRule = validateWithoutSnakeCased ? !(0, _isObject2.default)(value) : !(0, _isObject2.default)(value) || !isObjectKeysSnakeCasedDeep(value);

  if (validateRule) {
    throw new TypeError("".concat(fieldName, " must be a non-empty object with snake_cased keys,\n       got ").concat((0, _stringify.default)(value)));
  }
}
/** @private Helpers */


function isObjectKeysSnakeCasedDeep(object) {
  var result = true;

  for (var _i = 0, _Object$entries = (0, _entries.default)(object); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    result &= /^[a-z_\d]+$/.test(key);

    if ((0, _isObject2.default)(value)) {
      result &= isObjectKeysSnakeCasedDeep(value);
    }
  }

  return result;
}