import _ from 'lodash'

const MIME_TYPE_JSON_API = 'application/vnd.api+json'

const HEADER_CONTENT_TYPE = 'Content-Type'
const HEADER_ACCEPT = 'Accept'

export function setJsonapiHeaders (requestConfig) {
  const config = _.cloneDeep(requestConfig)

  config.headers = config.headers || {}

  config.headers[HEADER_CONTENT_TYPE] = MIME_TYPE_JSON_API
  config.headers[HEADER_ACCEPT] = MIME_TYPE_JSON_API

  return config.headers
}
