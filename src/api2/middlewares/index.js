import { parseJsonapiResponse } from './parse-jsonapi-response'
import { parseJsonapiError } from './parse-jsonapi-error'
import { setJsonapiHeaders } from './set-jsonapi-headers'
import { signRequest } from './sign-request'
import { parseQuery } from './parse-query'

export default {
  parseJsonapiResponse,
  parseJsonapiError,
  setJsonapiHeaders,
  signRequest,
  parseQuery
}
