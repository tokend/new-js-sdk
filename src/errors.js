import { toCamelCaseDeep } from './utils/case_converter'
import { get } from 'lodash'

/**
 * Network error.
 *
 * @class
 */
export class NetworkError extends Error {
  constructor (message, data) {
    super(message)
    this.data = data
  }
};

/**
 * Request timeout error.
 *
 * @class
 */
export class TimeoutError extends Error {
  constructor (message, data) {
    super(message)
    this.data = data
  }
}

/**
 * Base class for server errors.
 */
export class ServerErrorBase extends Error {
  /**
   * Wrap a raw axios error.
   *
   * @param {object} originalError Raw axios response.
   * @param {axios} axios Axios instance used for request.
   */
  constructor (originalError, axios) {
    super(originalError.message)
    this.originalError = originalError
    this._axios = axios
  }

  /**
   * Response HTTP status.
   */
  get httpStatus () {
    return this.originalError.response.status
  }

  /**
   * Error meta.
   */
  get meta () {
    return this._meta
  }

  /**
   * A short, human-readable summary of the problem.
   */
  get title () {
    return this._title
  }

  /**
   * A human-readable explanation specific to this occurrence of the problem.
   */
  get detail () {
    return this._detail
  }

  get requestPath () {
    return this.originalError.response.request.path
  }

  /**
   * Retry the failed request.
   * Use it to retry requests after 2FA.
   */
  retryRequest () {
    let config = this.originalError.config
    return this._axios(config)
  }
}

/**
 * Generic server error response.
 */
export class ServerError extends ServerErrorBase {
  constructor (originalError, axios) {
    super(originalError, axios)

    const unwrappedError = get(originalError, 'response.data.errors[0]', {})
    this._title = unwrappedError.title
    this._detail = unwrappedError.detail
    this._meta = toCamelCaseDeep(unwrappedError.meta || {})
  }
}

/**
 * "Bad Request" error.
 * `error.nestedErrors` may contain per-field errors.
 *
 * @export
 * @class
 */
export class BadRequestError extends ServerError {
  /**
   * Wrap a raw API error response.
   *
   * @constructor
   *
   * @param {Error} originalError Original error response.
   * @param {axios} axios Axios instance used for the request.
   */
  constructor (originalError, axios) {
    super(originalError, axios)
    let errors = get(originalError, 'response.data.errors', [])
    if (errors.length > 1) {
      this._title = 'Request contains some errors.'
      this._detail = 'Request contains some errors. Check "nestedErrors"'
      this._nestedErrors = errors.map(err => ({
        title: err.title,
        detail: err.detail,
        meta: toCamelCaseDeep(err.meta)
      }))
    }
  }

  /**
   * Errors for every invalid field.
   */
  get nestedErrors () {
    return this._nestedErrors
  }
}

/**
 * "Bad Request" error - transaction is failed.
 * `error.nestedErrors` may contain per-field errors.
 *
 * @export
 * @class
 */
export class TransactionError extends ServerError {
  /**
   * Wrap a raw API error response.
   *
   * @constructor
   *
   * @param {Error} originalError Original error response.
   * @param {axios} axios Axios instance used for the request.
   */
  constructor (originalError, axios) {
    super(originalError, axios)

    let error = originalError.response.data.errors[0]

    this._title = 'Transaction Failed'
    this._detail = 'Transaction failed because of some operations. Check "resultCodes"'
    this._resultCodes = get(error, 'meta.extras.result_codes')
  }

  includesOpCode (opCode) {
    return this._resultCodes.operations.includes(opCode)
  }

  /**
   * Information about failed operations.
   */

  get resultCodes () {
    return this._resultCodes
  }
}

/**
 * User is not allowed to perform this action.
 *
 * @export
 * @class
 */
export class NotAllowedError extends ServerError {}

/**
 * Forbidden.
 *
 * @export
 * @class
 */
export class ForbiddenRequestError extends ServerError {}

/**
 * Two Factor auth required.
 *
 * @export
 * @class
 */
export class TFARequiredError extends ServerError {}

/**
 * Account verification required.
 *
 * @export
 * @class
 */
export class VerificationRequiredError extends ServerError {}

/**
 * The requested resource was not found.
 *
 * @export
 * @class
 */
export class NotFoundError extends ServerError {}

/**
 * The request could not be completed due to a conflict with the current state of the target resource.
 *
 * @export
 * @class
 */
export class ConflictError extends ServerError {}

/**
 * Internal server error (500)
 *
 * @export
 * @class
 */
export class InternalServerError extends ServerError {}

/**
 * Horizon 401(Unauthorized) error.
 *
 * @class
 */
export class UnauthorizedError extends ServerError {}
