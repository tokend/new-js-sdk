import { ServerErrorBase } from '../errors'
import { toCamelCaseDeep } from '../utils/case_converter'

/**
 * Generic Horizon error response.
 *
 * @export
 * @class
 */
export class HorizonError extends ServerErrorBase {
  /**
   * Wrap a raw axios error.
   *
   * @param {object} originalError Raw axios response.
   * @param {axios} axios Axios instance used for request.
   */
  constructor (originalError, axios) {
    super(originalError, axios)
    let response = originalError.response.data
    this._detail = response.details
    this._title = response.title
    if (response.extras) {
      this._meta = toCamelCaseDeep(response.extras)
    }
  }
}

/**
 * Horizon 400(BadRequest) error.
 *
 * @export
 * @class
 */
export class BadRequestError extends HorizonError {}

/**
 * Horizon 401(Unauthorized) error.
 *
 * @export
 * @class
 */
export class UnauthorizedError extends HorizonError {}

/**
 * Horizon 404(Not Found) error.
 *
 * @export
 * @class
 */
export class NotFoundError extends HorizonError {}

/**
 * Horizon 500(Internal Server Error) error.
 *
 * @export
 * @class
 */
export class InternalServerError extends HorizonError {}
