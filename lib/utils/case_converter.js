"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.toCamelCaseDeep = toCamelCaseDeep;
exports.toSnakeCaseDeep = toSnakeCaseDeep;

var _lodash = _interopRequireDefault(require("lodash"));

function toCamelCaseDeep(object) {
  return convertCaseDeep(object, _lodash.default.camelCase);
}

function toSnakeCaseDeep(object) {
  return convertCaseDeep(object, _lodash.default.snakeCase);
}

function convertCaseDeep(object, transformPropertyName) {
  if (_lodash.default.isString(object) || _lodash.default.isNumber(object)) {
    return object;
  }

  if (_lodash.default.isArray(object)) {
    return _lodash.default.map(object, function (obj) {
      return convertCaseDeep(obj, transformPropertyName);
    });
  }

  var convertedObject = _lodash.default.cloneDeep(object); // Convert keys to camel case


  convertedObject = _lodash.default.mapKeys(convertedObject, function (value, key) {
    return transformPropertyName(key);
  }); // Recursively apply throughout object

  return _lodash.default.mapValues(convertedObject, function (value) {
    if (_lodash.default.isPlainObject(value)) {
      return convertCaseDeep(value, transformPropertyName);
    } else if (_lodash.default.isArray(value)) {
      return _lodash.default.map(value, function (obj) {
        return convertCaseDeep(obj, transformPropertyName);
      });
    }

    return value;
  });
}