import { camelCase, toPairs, isObject, isArray } from 'lodash'
import * as urlHelper from '../utils/url_helper'
import { toCamelCaseDeep } from '../utils/case_converter'
import { ResponseBase } from '../response_base'

/**
 * Horizon response wrapper.
 *
 * @class
 */
export class HorizonResponse extends ResponseBase {
  /**
   * Wrap a raw axios response.
   *
   * @param {object} rawResponse Raw axios.js response object.
   * @param {Swarm} sdk Swarm SDK instance.
   */
  constructor (rawResponse, sdk) {
    super(rawResponse)

    this._sdk = sdk

    this._data = rawResponse.data
    this._data = this._resolveLinks(this._data)
    this._data = this._unwrapCollection(this._data)
    this._data = toCamelCaseDeep(this._data)
  }

  /**
   * Get response data.
   *
   * @override
   */
  get data () {
    return this._data
  }

  _resolveLinks (data) {
    if (data._links) {
      toPairs(data._links).forEach(pair => {
        let key = pair[0]
        let value = pair[1]
        let methodName = camelCase('fetch_' + key)
        this[methodName] = this._makeLinkCaller(
          value.href,
          value.templated
        )
      })

      delete data._links
    }

    for (let key in data) {
      this._resolveNestedLinks(data[key])
    }

    return data
  }

  _resolveNestedLinks (obj) {
    if (!(isObject(obj) || isArray(obj))) {
      return
    }
    if (obj._links) {
      toPairs(obj._links).forEach(pair => {
        let key = pair[0]
        let value = pair[1]
        let methodName = camelCase('fetch_' + key)
        obj[methodName] = this._makeLinkCaller(
          value.href,
          value.templated
        )
      })

      delete obj._links
    }

    for (let key in obj) {
      this._resolveNestedLinks(obj[key])
    }
  }

  _unwrapCollection (data) {
    return data._embedded ? data._embedded.records : data
  }

  _makeLinkCaller (link, templated) {
    return (params) => {
      if (templated) {
        link = urlHelper.resolveTemplate(link, params)
      }

      let query = urlHelper.parseQueryParams(link)

      let callBuilder = this._sdk.horizon._makeCallBuilder()
        .appendUrlSegment(link)

      if (this._sdk.wallet) {
        callBuilder = callBuilder.withSignature()
      }

      return callBuilder.get(query)
    }
  }
}
