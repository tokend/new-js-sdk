/**
 * Base class for request responses.
 *
 * @class
 */
export class ResponseBase {
  /**
   * Wrap a raw axios.js response object.
   *
   * @param {object} rawResponse Raw axios.js response object.
   */
  constructor (rawResponse) {
    this._rawResponse = rawResponse
  }

  /**
   * Get response data.
   */
  get data () {
    return this._rawResponse.data
  }

  /**
   * Get response HTTP status.
   */
  get httpStatus () {
    return this._rawResponse.status
  }

  /**
   * Get response headers.
   */
  get headers () {
    return this._rawResponse.headers
  }

  /**
   * Override JSON serialization.
   *
   * @return {object} Data to be serialized.
   */
  toJSON () {
    return this.data
  }
}
