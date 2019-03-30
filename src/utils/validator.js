export class Validator {
  validateUint64 ({ value, fieldName = '' }) {
    if (!Number.isInteger(value)) {
      throw new Error(this._composeErrorMessage({
        value,
        expectedType: 'uint64',
        fieldName
      }))
    }
  }

  _composeErrorMessage ({ value, expectedType, fieldName = '' }) {
    if (fieldName) {
      return `${fieldName} should be a valid ${expectedType}, got ${typeof value}: ${value}`
    } else {
      return `${value} should be a valid ${expectedType}, got ${typeof value}`
    }
  }
}
