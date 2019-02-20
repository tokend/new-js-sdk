import { parseQueryParams } from '../utils/url_helper'
import { isArray, toPairs, camelCase, isString } from 'lodash'
import { toCamelCaseDeep } from '../utils/case_converter'
import { ResponseBase } from '../response_base'

/**
 * API response wrapper.
 *
 * @class
 */
export class ApiResponse extends ResponseBase {
  /**
   * Wrap a raw axios.js response object.
   *
   * @constructor
   * @param {object} rawResponse Raw axios.js response object.
   * @param {TokenD} sdk TokenD instance.
   */
  constructor (rawResponse, sdk) {
    super(rawResponse)
    this._sdk = sdk
    this._parseResponse(rawResponse)
  }

  /**
   * Get response data.
   *
   * @override
   */
  get data () {
    return this._data
  }

  _parseResponse (response) {
    // NOTE: API follows the JSON API spec
    if (response.status === 204) {
      return
    }

    let body = response.data

    if (isArray(body.data)) {
      this._data = body.data.map((item) => {
        let parsed = this._parseResourceObjectData(item)
        this._resolveRelationships(item, parsed, body.included)
        this._resolveLinks(item, parsed)

        return parsed
      })
    } else if (body.url) {
      // Legacy response on doc retrieval
      this._data = body
    } else {
      this._data = this._parseResourceObjectData(body.data)
      this._resolveRelationships(body.data, this, body.included)
    }

    this._resolveLinks(body, this)
    this._data = toCamelCaseDeep(this._data)
  }

  _parseResourceObjectData (resourceObject) {
    let data = {
      id: resourceObject.id,
      resourceType: resourceObject.type
    }

    return Object.assign(data, resourceObject.attributes)
  }

  _resolveLinks (source, target) {
    if (!source.links) {
      return
    }

    toPairs(source.links).forEach((pair) => {
      let key = pair[0]
      let value = pair[1]
      let methodName = camelCase('fetch_' + key)
      let link = isString(value) ? value : value.href
      target[methodName] = this._makeLinkCaller(link)
    })

    delete source.links
  }

  _makeLinkCaller (link) {
    return () => {
      let query = parseQueryParams(link)

      let callBuilder = this._sdk.api._makeCallBuilder()
        .appendUrlSegment(link)

      if (this._sdk.wallet) {
        callBuilder = callBuilder.withSignature()
      }

      return callBuilder.get(query)
    }
  }

  _resolveRelationships (source, target, inclusions = []) {
    if (!source.relationships) {
      return
    }

    let relationships = {}
    Object.keys(source.relationships).forEach((key) => {
      let value = source.relationships[key]
      relationships[key] = {
        id: value.data.id,
        resourceType: value.data.type
      }
      this._resolveLinks(value, relationships[key])
      if (inclusions.length) {
        this._findInclusion(inclusions, relationships[key])
      }
    })

    delete source.relationships
    target.relationships = toCamelCaseDeep(relationships)
  }

  _findInclusion (inclusions, target) {
    const inclusion = inclusions
      .find(i => i.type === target.resourceType && i.id === target.id)

    if (inclusion) {
      target.attributes = inclusion.attributes
    }
  }
}
