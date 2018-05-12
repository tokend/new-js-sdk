/**
 * Network error.
 *
 * @export
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
 * @export
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
   * Retry the failed request.
   * Use it to retry requests after 2FA.
   */
  retryRequest () {
    let config = this.originalError.request.config
    return this._axios(config)
  }
}
