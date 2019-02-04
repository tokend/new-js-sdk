import { get } from 'lodash'
import * as errors from '../../errors'

const STATUS_CODES = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalError: 500
}

/**
 *
 * @param error - raw axios error came from axios
 * @param axiosInstance - the instance of axios to be able to retry the request
 * @returns {Promise<never>}
 */
export function parseJsonapiError (error, axiosInstance) {
  const status = error.response.status
  const data = error.response.data

  switch (status) {
    case STATUS_CODES.badRequest:
      error = new errors.BadRequestError(error, axiosInstance)
      break
    case STATUS_CODES.unauthorized:
      error = new errors.NotAllowedError(error, axiosInstance)
      break
    case STATUS_CODES.forbidden:
      let errCode = get(data, 'errors[0].code')

      if (errCode === 'tfa_required') {
        error = new errors.TFARequiredError(error, axiosInstance)
      } else if (errCode === 'verification_required') {
        error = new errors.VerificationRequiredError(error, axiosInstance)
      } else {
        error = new errors.ForbiddenRequestError(error, axiosInstance)
      }
      break
    case STATUS_CODES.notFound:
      error = new errors.NotFoundError(error, axiosInstance)
      break
    case STATUS_CODES.conflict:
      error = new errors.ConflictError(error, axiosInstance)
      break
    case STATUS_CODES.internalError:
      error = new errors.InternalServerError(error, axiosInstance)
      break
    default:
      error = new errors.ServerError(error, axiosInstance)
  }

  return error
}
