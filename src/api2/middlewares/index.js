import { flattenToAxiosJsonApiQuery } from './flatten-to-axios-jsonapi-query'
import { parseJsonapiResponse } from './parse-jsonapi-response'
import { parseJsonapiError } from './parse-jsonapi-error'
import { setJsonapiHeaders } from './set-jsonapi-headers'
import { signRequest } from './sign-request'

export default {
  flattenToAxiosJsonApiQuery,
  parseJsonapiResponse,
  parseJsonapiError,
  setJsonapiHeaders,
  signRequest
}
