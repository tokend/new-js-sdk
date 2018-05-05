import _ from 'lodash'

export function toCamelCaseDeep (object) {
  return convertCaseDeep(object, _.camelCase)
}

export function toSnakeCaseDeep (object) {
  return convertCaseDeep(object, _.snakeCase)
}

function convertCaseDeep (object, transformPropertyName) {
  if (_.isString(object)) {
    return object
  }
  if (_.isArray(object)) {
    return _.map(object, obj => convertCaseDeep(obj, transformPropertyName))
  }

  let convertedObject = _.cloneDeep(object)

  // Convert keys to camel case
  convertedObject = _.mapKeys(
    convertedObject,
    (value, key) => transformPropertyName(key)
  )

  // Recursively apply throughout object
  return _.mapValues(
    convertedObject,
    value => {
      if (_.isPlainObject(value)) {
        return convertCaseDeep(value, transformPropertyName)
      } else if (_.isArray(value)) {
        return _.map(value, obj => convertCaseDeep(obj, transformPropertyName))
      }
      return value
    }
  )
}
