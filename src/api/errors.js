import { ServerErrorBase } from '../errors'
import { toCamelCaseDeep } from '../utils/case_converter'

/**
 * Generic API error response.
 */
export class ApiError extends ServerErrorBase {
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
    let unwrappedError = originalError.response.data.errors[0]
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
export class BadRequestError extends ApiError {
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
    let errors = originalError.response.data.errors
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
 * User is not allowed to perform this action.
 *
 * @export
 * @class
 */
export class NotAllowedError extends ApiError {}

/**
 * Forbidden.
 *
 * @export
 * @class
 */
export class ForbiddenRequestError extends ApiError {}

/**
 * Two Factor auth required.
 *
 * @export
 * @class
 */
export class TFARequiredError extends ApiError {}

/**
 * Account verification required.
 *
 * @export
 * @class
 */
export class VerificationRequiredError extends ApiError {}

/**
 * The requested resource was not found.
 *
 * @export
 * @class
 */
export class NotFoundError extends ApiError {}

/**
 * The request could not be completed due to a conflict with the current state of the target resource.
 *
 * @export
 * @class
 */
export class ConflictError extends ApiError {}

/**
 * Internal server error.
 *
 * @export
 * @class
 */
export class InternalServerError extends ApiError {}
