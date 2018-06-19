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

  /**
   * Retry the failed request.
   * Use it to retry requests after 2FA.
   */
  retryRequest () {
    let config = this.originalError.config
    return this._axios(config)
  }
}
