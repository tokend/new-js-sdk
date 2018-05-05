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
