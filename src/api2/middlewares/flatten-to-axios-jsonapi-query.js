import _ from 'lodash'

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
export function flattenToAxiosJsonApiQuery (requestConfig) {
  const config = _.cloneDeep(requestConfig)

  if (isDeeperThanOneNesting(config.params)) {
    throw new Error('Nested arrays or objects are not allowed for using in query params')
  }

  config.params = {
    ...flattenArraysOnly(config.params),
    ...flattenObjectsOnly(config.params),
    ...flattenPrimitivesOnly(config.params)
  }

  return config
}

function isDeeperThanOneNesting (object) {
  return Object.values(object)
    .filter((value) => isObjectOrArray(value))
    .reduce((acc, cur) => acc.concat(Object.values(cur)), [])
    .some((value) => isObjectOrArray(value))
}

function isObjectOrArray (arg) {
  return arg instanceof Object
}

function isObject (arg) {
  return !Array.isArray(arg) && arg instanceof Object
}

function flattenArraysOnly (object) {
  return Object.entries(object)
    .filter(([, value]) => Array.isArray(value))
    .map(([key, value]) => [key, value.join(',')])
    .reduce((res, [key, val]) => ({ ...res, ...{ [key]: val } }), {})
}

function flattenObjectsOnly (object) {
  return Object.entries(object)
    .filter(([, value]) => isObject(value))
    .map(([prefix, nestedObj]) => Object.entries(nestedObj)
      .map(([key, value]) => [`${prefix}[${key}]`, value])
    )
    .reduce((acc, row) => acc.concat(row), [])
    .reduce((res, [key, val]) => ({ ...res, ...{ [key]: val } }), {})
}

function flattenPrimitivesOnly (object) {
  return Object.entries(object)
    .filter(([, value]) => !isObjectOrArray(value))
    .reduce((res, [key, val]) => ({ ...res, ...{ [key]: val } }), {})
}
