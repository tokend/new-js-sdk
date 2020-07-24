"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.parseJsonapiError = parseJsonapiError;

var _lodash = require("lodash");

var errors = _interopRequireWildcard(require("../../errors"));

var STATUS_CODES = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalError: 500
  /**
   *
   * @param error - raw axios error came from axios
   * @param axiosInstance - the instance of axios to be able to retry the request
   * @returns {Promise<never>}
   */

};

function parseJsonapiError(error, axiosInstance) {
  var status = (0, _lodash.get)(error, 'response.status');
  var data = (0, _lodash.get)(error, 'response.data');
  var errCode = (0, _lodash.get)(data, 'errors[0].code') || (0, _lodash.get)(data, 'errors[0].meta.result_codes.transaction');

  switch (status) {
    case STATUS_CODES.badRequest:
      if (errCode === 'tx_failed') {
        error = new errors.TransactionError(error, axiosInstance);
      } else {
        error = new errors.BadRequestError(error, axiosInstance);
      }

      break;

    case STATUS_CODES.unauthorized:
      error = new errors.NotAllowedError(error, axiosInstance);
      break;

    case STATUS_CODES.forbidden:
      if (errCode === 'tfa_required') {
        error = new errors.TFARequiredError(error, axiosInstance);
      } else if (errCode === 'verification_required') {
        error = new errors.VerificationRequiredError(error, axiosInstance);
      } else {
        error = new errors.ForbiddenRequestError(error, axiosInstance);
      }

      break;

    case STATUS_CODES.notFound:
      error = new errors.NotFoundError(error, axiosInstance);
      break;

    case STATUS_CODES.conflict:
      error = new errors.ConflictError(error, axiosInstance);
      break;

    case STATUS_CODES.internalError:
      error = new errors.InternalServerError(error, axiosInstance);
      break;

    default:
      error = new errors.ServerError(error, axiosInstance);
  }

  return error;
}