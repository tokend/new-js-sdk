import _ from 'lodash'

/**
 * parseQuery is needed to provide easier interface for complex query
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
 * @param {object} rawQuery - the raw, not formatted query object
 * @return {object} resultQuery - the formatted query object that is valid to use
 * in http-clients
 */
export function parseQuery (rawQuery) {
  let resultQuery = {}

  for (const [key, value] of Object.entries(rawQuery)) {
    if (_.isArray(value)) {
      parseArrayParam(resultQuery, key, value)
    } else if (_.isObject(value)) {
      parseObjectParam(resultQuery, key, value)
    } else {
      parsePrimitiveParam(resultQuery, key, value)
    }
  }

  return resultQuery
}

function parseObjectParam (resultQuery, key, objParam) {
  for (const [k, value] of Object.entries(objParam)) {
    if (_.isObject(value)) {
      throw new Error('Nested objects are not allowed for using in query params')
    }

    resultQuery[`${key}[${k}]`] = value
  }
}

function parseArrayParam (resultQuery, key, arrParam) {
  for (const v of Object.values(arrParam)) {
    if (_.isArray(v)) {
      throw new Error('Nested arrays are not allowed for using in query params')
    }

    resultQuery[key] = arrParam.join(',')
  }
}

function parsePrimitiveParam (resultQuery, key, primitiveParam) {
  resultQuery[key] = primitiveParam
}
