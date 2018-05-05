import { toCamelCaseDeep } from '../utils/case_converter'

/**
 * Contains array of the API errors.
 */
export class ApiErrors extends Error {
  /**
   * Wrap a raw API error response.
   *
   * @param {Error} originalError Original error response.
   */
  constructor (originalError) {
    super('The API responded with an error.')
    this.originalError = originalError
    this.errors = originalError.errors.map((err) => this._parseError(err))
  }

  _parseError (error) {
    let parsedError
    switch (error.status) {
      case '400':
        parsedError = new BadRequestError(error)
        break
      case '401':
        parsedError = new NotAllowedError(error)
        break
      case '403':
        if (error.code === 'tfa_required') {
          parsedError = new TFARequiredError(error)
        } else if (error.code === 'verification_required') {
          parsedError = new VerificationRequiredError(error)
        } else {
          parsedError = new ForbiddenRequestError(error)
        }
        break
      case '404':
        parsedError = new NotFoundError(error)
        break
      case '409':
        parsedError = new ConflictError(error)
        break
      case '500':
        parsedError = new InternalServerError(error)
        break
      default:
        parsedError = new ApiError(error)
    }

    return parsedError
  }
}

/**
 * Generic API error response.
 *
 * @export
 * @class
 */
export class ApiError extends Error {
  /**
   * Wrap axios error.
   *
   * @constructor
   * @param {Error} originalError Axios.js response error.
   */
  constructor (originalError) {
    super(originalError.detail)
    this.title = originalError.title
    this.meta = toCamelCaseDeep(originalError.meta || {})
    this.originalError = originalError
  }
}

/**
 * "Bad Request" error.
 * error.meta contains description of the invalid field name.
 *
 * @export
 * @class
 */
export class BadRequestError extends ApiError {}

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
