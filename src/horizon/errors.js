/**
 * Generic Horizon error response.
 *
 * @export
 * @class
 */
export class HorizonError extends Error {}

/**
 * Horizon 400(BadRequest) error.
 *
 * @export
 * @class
 */
export class BadRequestError extends HorizonError {
  /**
   * Wrap axios error.
   *
   * @constructor
   * @param {Error} originalError Axios.js response error.
   */
  constructor (originalError) {
    super(originalError.message)
    this.originalError = originalError
  }
}

/**
 * Horizon 401(Unauthorized) error.
 *
 * @export
 * @class
 */
export class UnauthorizedError extends HorizonError {
  /**
   * Wrap axios error.
   *
   * @constructor
   * @param {Error} originalError Axios.js response error.
   */
  constructor (originalError) {
    super(originalError.message)
    this.originalError = originalError
  }
}

/**
 * Horizon 404(Not Found) error.
 *
 * @export
 * @class
 */
export class NotFoundError extends HorizonError {
  /**
   * Wrap axios error.
   *
   * @constructor
   * @param {Error} originalError Axios.js response error.
   */
  constructor (originalError) {
    super(originalError.message)
    this.originalError = originalError
  }
}

/**
 * Horizon 500(Internal Server Error) error.
 *
 * @export
 * @class
 */
export class InternalServerError extends HorizonError {
  /**
   * Wrap axios error.
   *
   * @constructor
   * @param {Error} originalError Axios.js response error.
   */
  constructor (originalError) {
    super(originalError.message)
    this.originalError = originalError
  }
}
