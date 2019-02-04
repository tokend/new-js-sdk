"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var errors = _interopRequireWildcard(require("../../errors"));

var _parseJsonapiError = require("./parse-jsonapi-error");

describe('errors', function () {
  var testCases = [{
    name: 'Bad Request',
    status: 400,
    data: {
      errors: [{}]
    },
    expectedError: errors.BadRequestError
  }, {
    name: 'Not Allowed',
    status: 401,
    data: {
      errors: [{}]
    },
    expectedError: errors.NotAllowedError
  }, {
    name: 'Forbidden',
    status: 403,
    data: {
      errors: [{}]
    },
    expectedError: errors.ForbiddenRequestError
  }, {
    name: 'TFA Required',
    status: 403,
    data: {
      errors: [{
        code: 'tfa_required'
      }]
    },
    expectedError: errors.TFARequiredError
  }, {
    name: 'Verification Required',
    status: 403,
    data: {
      errors: [{
        code: 'verification_required'
      }]
    },
    expectedError: errors.VerificationRequiredError
  }, {
    name: 'Not Found',
    status: 404,
    data: {
      errors: [{}]
    },
    expectedError: errors.NotFoundError
  }, {
    name: 'Conflict',
    status: 409,
    data: {
      errors: [{}]
    },
    expectedError: errors.ConflictError
  }, {
    name: 'Internal Server Error',
    status: 500,
    data: {
      errors: [{}]
    },
    expectedError: errors.InternalServerError
  }, {
    name: 'Unexpected error',
    status: 488,
    data: {
      errors: [{}]
    },
    expectedError: errors.ServerError
  }];
  testCases.forEach(function (testCase) {
    it("Should parse \"".concat(testCase.name, "\" error."), function () {
      var error = (0, _parseJsonapiError.parseJsonapiError)({
        response: {
          status: testCase.status,
          data: testCase.data
        }
      });
      expect(error).to.be.an.instanceOf(testCase.expectedError);
    });
  });
});