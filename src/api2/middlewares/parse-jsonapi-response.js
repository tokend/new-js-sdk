import Jsona from 'jsona'
import { DeserializeCacheStub } from './deserialize-cache-stub'
import { camelCase, isString } from 'lodash'
import { toCamelCaseDeep } from '../../utils/case_converter'
import uri from 'urijs'

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
   * @param {ApiCaller} api - Instance of api that made the request
   */
  constructor (rawResponse, api) {
    this._api = api
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

  makeLinkCallers (api) {
    for (const [key, value] of Object.entries(this.links)) {
      const methodName = camelCase('fetch_' + key)
      const link = isString(value) ? value : value.href

      this[methodName] = _ => api.get(link)
    }
  }

  makeLinkCallersWithSignature (api) {
    for (const [key, value] of Object.entries(this.links)) {
      const methodName = camelCase('fetch_' + key)
      const link = isString(value) ? value : value.href

      const url = uri(link)
      const path = url.path()
      const query = url.search(true)

      this[methodName] = _ => api.getWithSignature(path, query)
    }
  }

  _parseResponse (response) {
    if (response.status === 204) {
      return
    }

    const formatter = new Jsona({
      DeserializeCache: DeserializeCacheStub
    })
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
