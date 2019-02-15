import Jsona from 'jsona'
import { toCamelCaseDeep } from '../../utils/case_converter'

export function parseJsonapiResponse (response) {
  return new JsonapiResponse(response)
}

/**
 * API response wrapper.
 *
 * @class
 */
export class JsonapiResponse {
  /**
   * Wrap a raw axios.js response object.
   *
   * @constructor
   * @param {object} rawResponse Raw axios.js response object.
   */
  constructor (rawResponse) {
    this._rawResponse = rawResponse
    this._parseResponse(rawResponse)
    this._parseLinks(rawResponse)
  }

  /**
   * Get response data.
   */
  get data () {
    return this._data
  }

  /**
   * Get response links.
   */
  get links () {
    return this._links
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

  _parseResponse (response) {
    if (response.status === 204) {
      return
    }

    const formatter = new Jsona()
    const parsed = formatter.deserialize(response.data)

    this._data = toCamelCaseDeep(parsed)
  }

  _parseLinks (response) {
    if (response.data && response.data.links) {
      this._links = response.data.links
    } else {
      this._links = {}
    }
  }
}
