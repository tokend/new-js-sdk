"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenToAxiosJsonApiQuery = flattenToAxiosJsonApiQuery;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/values"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _lodash = _interopRequireDefault(require("lodash"));

/**
 * flattenToAxiosJsonApiQuery is needed to provide easier interface for complex query
 * params. The following object:
 *
 * {
 *   arrayParam: ['foo', 'bar', 'baz', 123],
 *   objectParam: {
 *     foo: 'bar',
 *     fizz: 'buz'
 *   },
 *   primitiveParam: '12'
 * }
 *
 * will be transformed to the object:
 *
 * {
 *   arrayParam: 'foo,bar,baz,123',
 *   'objectParam[foo]' :'bar',
 *   'objectParam[fizz]': 'buzz',
 *   primitivePara: '12'
 * }
 *
 * the main use case for this stuff is building JSON API queries by transforming
 * objects like this:
 * {
 *   include: ['comments', 'articles'],
 *   filter: {
 *     first_name: 'John',
 *     min_age: 25
 *   },
 *   page: {
 *     number: 3,
 *     limit: 15
 *   }
 * }
 * to objects like this:
 * {
 *   'include': 'comments, 'articles',
 *   'filter[first_name]': 'John',
 *   'filter[min_age]': 25,
 *   'page[number]': 3,
 *   'page[limit]': 15
 * }
 * so then your http client will build the valid URL:
 *
 * http://api.com/authors?include=comments,articles&filter[first_name]=John&filter[min_age]=25&page[number]=3&page[limit]=15
 *
 * Nested objects or nested arrays:
 * {
 *   param1: [1,2,[3,4]],
 *   param2: {
 *     anotherParam: {
 *       foo: 'bar'
 *     }
 *   }
 * }
 * are considered invalid an function will throw Error, if such object passed
 *
 * @param {object} requestConfig - axios request config with the raw, not formatted `params` object
 * @return {object} resultQuery - the formatted query object that is valid to use
 * in http-clients
 */
function flattenToAxiosJsonApiQuery(requestConfig) {
  var config = _lodash.default.cloneDeep(requestConfig);

  if (isDeeperThanOneNesting(config.params)) {
    throw new Error('Nested arrays or objects are not allowed for using in query params');
  }

  config.params = (0, _objectSpread5.default)({}, flattenArraysOnly(config.params), flattenObjectsOnly(config.params), flattenPrimitivesOnly(config.params));
  return config;
}

function isDeeperThanOneNesting(object) {
  return (0, _values.default)(object).filter(function (value) {
    return isObjectOrArray(value);
  }).reduce(function (acc, cur) {
    return acc.concat((0, _values.default)(cur));
  }, []).some(function (value) {
    return isObjectOrArray(value);
  });
}

function isObjectOrArray(arg) {
  return arg instanceof Object;
}

function isObject(arg) {
  return !(0, _isArray.default)(arg) && arg instanceof Object;
}

function flattenArraysOnly(object) {
  return (0, _entries.default)(object).filter(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        value = _ref2[1];

    return (0, _isArray.default)(value);
  }).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return [key, value.join(',')];
  }).reduce(function (res, _ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
        key = _ref6[0],
        val = _ref6[1];

    return (0, _objectSpread5.default)({}, res, (0, _defineProperty2.default)({}, key, val));
  }, {});
}

function flattenObjectsOnly(object) {
  return (0, _entries.default)(object).filter(function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
        value = _ref8[1];

    return isObject(value);
  }).map(function (_ref9) {
    var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
        prefix = _ref10[0],
        nestedObj = _ref10[1];

    return (0, _entries.default)(nestedObj).map(function (_ref11) {
      var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
          key = _ref12[0],
          value = _ref12[1];

      return ["".concat(prefix, "[").concat(key, "]"), value];
    });
  }).reduce(function (acc, row) {
    return acc.concat(row);
  }, []).reduce(function (res, _ref13) {
    var _ref14 = (0, _slicedToArray2.default)(_ref13, 2),
        key = _ref14[0],
        val = _ref14[1];

    return (0, _objectSpread5.default)({}, res, (0, _defineProperty2.default)({}, key, val));
  }, {});
}

function flattenPrimitivesOnly(object) {
  return (0, _entries.default)(object).filter(function (_ref15) {
    var _ref16 = (0, _slicedToArray2.default)(_ref15, 2),
        value = _ref16[1];

    return !isObjectOrArray(value);
  }).reduce(function (res, _ref17) {
    var _ref18 = (0, _slicedToArray2.default)(_ref17, 2),
        key = _ref18[0],
        val = _ref18[1];

    return (0, _objectSpread5.default)({}, res, (0, _defineProperty2.default)({}, key, val));
  }, {});
}